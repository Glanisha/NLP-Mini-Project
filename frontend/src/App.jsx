import React, { useState } from 'react';
import axios from 'axios';
import { FaCheck, FaTimes } from 'react-icons/fa';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import ResultsDisplay from './components/ResultsDisplay';

const App = () => {
  const API_URL = 'http://localhost:8000/process-docs';
  
  const [resumeFile, setResumeFile] = useState(null);
  const [jdFile, setJdFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [matchingResults, setMatchingResults] = useState(null);

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

      setMatchingResults(response.data.matching_analysis);
      setMessage('Analysis completed successfully!');
    } catch (error) {
      console.error('API Error:', error);
      let errorMsg = 'An unknown error occurred.';
      if (error.response) {
        errorMsg = error.response.data.detail || 'Server error occurred during processing.';
      } else if (error.request) {
        errorMsg = 'No response from server. Check if the FastAPI server is running.';
      }
      setMessage(`Upload Failed: ${errorMsg}`);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMatchingResults(null);
    setResumeFile(null);
    setJdFile(null);
    setMessage('');
    setIsError(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className={`bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 border border-white/20 transition-all duration-700 ${matchingResults ? 'max-w-none' : 'max-w-4xl mx-auto'}`}>
          
          <Header />
          
          {message && (
            <div className={`mb-8 p-4 rounded-2xl border-l-4 ${isError ? 'bg-red-50 border-red-400 text-red-700' : 'bg-green-50 border-green-400 text-green-700'}`}>
              <div className="flex items-center">
                <span className="mr-3">
                  {isError ? <FaTimes className="w-5 h-5" /> : <FaCheck className="w-5 h-5" />}
                </span>
                <p className="font-medium">{message}</p>
              </div>
            </div>
          )}

          {!matchingResults ? (
            <FileUpload
              resumeFile={resumeFile}
              jobFile={jdFile}
              onResumeChange={handleFileChange(setResumeFile)}
              onJobChange={handleFileChange(setJdFile)}
              onSubmit={handleSubmit}
              loading={loading}
            />
          ) : (
            <ResultsDisplay 
              results={matchingResults} 
              onReset={handleReset}
            />
          )}
          
        </div>
      </div>
    </div>
  );
};

export default App;
