from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
from pypdf import PdfReader
import uvicorn
from matching_engine import get_resume_job_match_score
import nltk
import os
nltk.download('punkt')
nltk.download('stopwords')

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
        
        # Calculate matching score
        print("\n--- Calculating Resume-Job Match Score ---")
        try:
            matching_result = get_resume_job_match_score(resume_text, jd_text)
            print(f"Overall Match Score: {matching_result['overall_match_percentage']}%")
            print(f"Text Similarity Score: {matching_result['text_similarity_score']}%")
            print("Skill Match Scores:", matching_result['skill_match_scores'])
        except Exception as matching_error:
            print(f"Warning: Could not calculate matching score: {matching_error}")
            # Set default matching result in case of error
            matching_result = {
                'overall_match_percentage': 0.0,
                'text_similarity_score': 0.0,
                'skill_match_scores': {},
                'resume_skills': {},
                'job_description_skills': {},
                'matched_skills': {},
                'missing_skills': {},
                'error': str(matching_error)
            }
        
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
    
    # Return comprehensive processing results with matching score
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
        "processing_timestamp": "processed successfully",
        "matching_analysis": matching_result
    }

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=port
    )
