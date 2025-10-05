import React, { useState } from 'react';
import axios from 'axios';

// --- Icon components (using Lucide-React equivalent for a single file) ---
const FileText = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"></path>
    <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
    <path d="M10 9H8"></path>
    <path d="M16 13H8"></path>
    <path d="M16 17H8"></path>
  </svg>
);

const UploadCloud = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
    <path d="M12 12v9"></path>
    <path d="m16 16-4-4-4 4"></path>
  </svg>
);

const AlertCircle = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" x2="12" y1="8" y2="12"></line>
    <line x1="12" x2="12.01" y1="16" y2="16"></line>
  </svg>
);


// --- Main Component ---
const App = () => {
  // IMPORTANT: Replace this with your actual Render backend URL after deployment!
  const API_URL = 'http://localhost:8000/process-docs'; 

  const [resumeFile, setResumeFile] = useState(null);
  const [jdFile, setJdFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // Utility function to handle file selection
  const handleFileChange = (setter) => (event) => {
    setter(event.target.files[0] || null);
    setMessage('');
    setIsError(false);
  };

  const handleSubmit = async () => {
    if (!resumeFile || !jdFile) {
      setMessage('Please upload both the Resume and the Job Description PDF.');
      setIsError(true);
      return;
    }

    setLoading(true);
    setMessage('Uploading and processing documents...');
    setIsError(false);

    const formData = new FormData();
    // The keys 'resume' and 'job_description' must match the parameter names in main.py
    formData.append('resume', resumeFile);
    formData.append('job_description', jdFile);

    try {
      const response = await axios.post(API_URL, formData, {
        headers: {
          // Setting content type to 'multipart/form-data' is crucial for file uploads
          'Content-Type': 'multipart/form-data', 
        },
      });

      setMessage(
        `Success! Backend received and processed files.
        Resume Size: ${response.data.resume_size} bytes.
        JD Size: ${response.data.jd_size} bytes.
        Check your FastAPI console for the extracted text printout!`
      );
    } catch (error) {
      console.error('API Error:', error);
      let errorMsg = 'An unknown error occurred.';
      if (error.response) {
        // Handle FastAPI HTTP exceptions
        errorMsg = error.response.data.detail || 'Server error occurred during processing.';
      } else if (error.request) {
        errorMsg = 'No response from server. Check if the FastAPI server is running and the API_URL is correct.';
      }
      setMessage(`Upload Failed: ${errorMsg}`);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const UploadInput = ({ label, file, onChangeHandler, icon: Icon }) => (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-700 flex items-center">
        <Icon className="w-5 h-5 mr-2 text-indigo-600" />
        {label}
      </label>
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition duration-150 ease-in-out p-4">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <UploadCloud className="w-8 h-8 mb-3 text-gray-400" />
          {file ? (
            <p className="text-sm text-indigo-600 font-semibold truncate max-w-full">{file.name}</p>
          ) : (
            <>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PDF (Max 1MB)</p>
            </>
          )}
        </div>
        <input 
          type="file" 
          className="hidden" 
          accept="application/pdf" 
          onChange={onChangeHandler} 
          required 
        />
      </label>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-3xl p-6 sm:p-10 border border-gray-200">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          PDF Document Processor
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Upload your resume and the job description (as PDFs) for processing by the FastAPI backend.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UploadInput 
            label="1. Upload Your Resume (PDF)"
            file={resumeFile}
            onChangeHandler={handleFileChange(setResumeFile)}
            icon={FileText}
          />
          <UploadInput 
            label="2. Upload Job Description (PDF)"
            file={jdFile}
            onChangeHandler={handleFileChange(setJdFile)}
            icon={FileText}
          />
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={loading || !resumeFile || !jdFile}
          className={`
            mt-8 w-full py-3 rounded-xl text-white font-semibold shadow-lg transition duration-200 ease-in-out
            ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl active:bg-indigo-800'}
            disabled:opacity-60 disabled:cursor-not-allowed
          `}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing Files...
            </div>
          ) : (
            'Submit Documents to FastAPI'
          )}
        </button>

        {message && (
          <div 
            className={`mt-6 p-4 rounded-xl border-l-4 ${isError ? 'bg-red-50 border-red-400 text-red-700' : 'bg-green-50 border-green-400 text-green-700'}`}
            role="alert"
          >
            <div className="flex items-center">
              <span className="mr-2">
                <AlertCircle className="w-5 h-5" />
              </span>
              <p className="font-medium whitespace-pre-wrap">{message}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
