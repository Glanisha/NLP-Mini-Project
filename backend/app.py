from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
from pypdf import PdfReader
import uvicorn

app = FastAPI(
    title="PDF Processor API",
    description="Receives PDFs in memory and extracts text without saving files.",
    version="1.0.0"
)

# CORS Configuration - Updated for better connectivity
origins = [
    "http://localhost:3000",
    "http://localhost:5173",  # Vite dev server default
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
    # Add your production URLs here when deploying
    # "https://your-vercel-app.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"]
)

def extract_text_from_pdf_bytes(pdf_bytes: bytes) -> str:
    """Helper function to extract text from raw PDF bytes using pypdf."""
    try:
        pdf_file_object = BytesIO(pdf_bytes)
        pdf_reader = PdfReader(pdf_file_object)
        text = ""
        
        for page_num, page in enumerate(pdf_reader.pages):
            try:
                extracted_page_text = page.extract_text()
                if extracted_page_text:
                    text += f"--- Page {page_num + 1} ---\n{extracted_page_text}\n\n"
            except Exception as page_error:
                print(f"Warning: Could not extract text from page {page_num + 1}: {page_error}")
                continue
        
        return text.strip()
    except Exception as e:
        raise HTTPException(
            status_code=422, 
            detail=f"Error processing PDF content: {str(e)}"
        )

@app.get("/")
async def root():
    """Health check endpoint"""
    return {"message": "PDF Processor API is running", "status": "healthy"}

@app.get("/health")
async def health_check():
    """Detailed health check"""
    return {"status": "healthy", "service": "PDF Processor API", "version": "1.0.0"}

@app.post("/process-docs/")
async def process_documents(
    resume: UploadFile = File(..., description="The applicant's resume in PDF format."),
    job_description: UploadFile = File(..., description="The job description in PDF format.")
):
    """
    Receives two PDF files in memory, extracts text, and returns processing results.
    No files are saved to the server's disk.
    """
    
    # Validate file types
    allowed_content_types = ["application/pdf"]
    
    if resume.content_type not in allowed_content_types:
        raise HTTPException(
            status_code=400,
            detail=f"Resume must be a PDF file. Received: {resume.content_type}"
        )
    
    if job_description.content_type not in allowed_content_types:
        raise HTTPException(
            status_code=400,
            detail=f"Job description must be a PDF file. Received: {job_description.content_type}"
        )
    
    try:
        # Process Resume File
        print(f"\n--- Processing Resume: {resume.filename} ---")
        resume_contents = await resume.read()
        resume_text = extract_text_from_pdf_bytes(resume_contents)
        
        print(f"Resume file size: {len(resume_contents)} bytes")
        print(f"Resume text length: {len(resume_text)} characters")
        print("\n[RESUME TEXT PREVIEW]")
        print(resume_text[:500] + "..." if len(resume_text) > 500 else resume_text)
        print("\n" + "="*50)
        
        # Process Job Description File
        print(f"\n--- Processing Job Description: {job_description.filename} ---")
        jd_contents = await job_description.read()
        jd_text = extract_text_from_pdf_bytes(jd_contents)
        
        print(f"Job description file size: {len(jd_contents)} bytes")
        print(f"Job description text length: {len(jd_text)} characters")
        print("\n[JOB DESCRIPTION TEXT PREVIEW]")
        print(jd_text[:500] + "..." if len(jd_text) > 500 else jd_text)
        print("\n" + "="*50)
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Unexpected error processing files: {str(e)}"
        )
    
    finally:
        # Ensure file handles are closed
        await resume.close()
        await job_description.close()
    
    # Return comprehensive processing results
    return {
        "message": "Documents processed successfully! Check server console for extracted text.",
        "files_processed": {
            "resume": {
                "filename": resume.filename,
                "size_bytes": len(resume_contents),
                "text_length": len(resume_text),
                "content_type": resume.content_type
            },
            "job_description": {
                "filename": job_description.filename,
                "size_bytes": len(jd_contents),
                "text_length": len(jd_text),
                "content_type": job_description.content_type
            }
        },
        "total_text_extracted": len(resume_text) + len(jd_text),
        "processing_timestamp": "processed successfully"
    }

if __name__ == "__main__":
    uvicorn.run(
        app,  # Can use app object when reload=False
        host="0.0.0.0",
        port=8000
        # reload=True  ← Remove this line
    )
