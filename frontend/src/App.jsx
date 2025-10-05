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

const Target = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);

const CheckCircle = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 12 2 2 4-4"></path>
    <path d="m21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.12 0 4.07.74 5.61 1.98"></path>
  </svg>
);

const XCircle = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="m15 9-6 6"></path>
    <path d="m9 9 6 6"></path>
  </svg>
);

const TrendingUp = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22,7 13.5,15.5 8.5,10.5 2,17"></polyline>
    <polyline points="16,7 22,7 22,13"></polyline>
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
  const [matchingResults, setMatchingResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

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

      // Store matching results
      setMatchingResults(response.data.matching_analysis);
      setShowResults(true);
      
      setMessage(
        `Success! Documents processed and analyzed successfully.
        Resume: ${response.data.files_processed.resume.filename} (${response.data.files_processed.resume.text_length} characters)
        Job Description: ${response.data.files_processed.job_description.filename} (${response.data.files_processed.job_description.text_length} characters)`
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

  // Progress bar component for scores
  const ProgressBar = ({ percentage, color = 'indigo' }) => {
    const getColorClass = (color) => {
      switch (color) {
        case 'green': return 'bg-green-600';
        case 'yellow': return 'bg-yellow-600';
        case 'red': return 'bg-red-600';
        default: return 'bg-indigo-600';
      }
    };
    
    return (
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className={`${getColorClass(color)} h-3 rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
        ></div>
      </div>
    );
  };

  // Skill category component
  const SkillCategory = ({ category, score, matchedSkills, missingSkills }) => {
    const getScoreColor = (score) => {
      if (score >= 80) return 'text-green-600';
      if (score >= 60) return 'text-yellow-600';
      return 'text-red-600';
    };

    const getProgressColor = (score) => {
      if (score >= 80) return 'green';
      if (score >= 60) return 'yellow';
      return 'red';
    };

    return (
      <div className="border rounded-lg p-4 bg-white shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-semibold text-gray-700 capitalize">
            {category.replace('_', ' ')}
          </h4>
          <span className={`font-bold text-lg ${getScoreColor(score)}`}>
            {score.toFixed(1)}%
          </span>
        </div>
        <ProgressBar percentage={score} color={getProgressColor(score)} />
        
        {matchedSkills && matchedSkills.length > 0 && (
          <div className="mt-3">
            <p className="text-sm text-green-600 font-medium mb-1">✓ Matched Skills:</p>
            <div className="flex flex-wrap gap-1">
              {matchedSkills.map((skill, idx) => (
                <span key={idx} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {missingSkills && missingSkills.length > 0 && (
          <div className="mt-3">
            <p className="text-sm text-red-600 font-medium mb-1">✗ Missing Skills:</p>
            <div className="flex flex-wrap gap-1">
              {missingSkills.map((skill, idx) => (
                <span key={idx} className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Main results component
  const MatchingResults = ({ results }) => {
    if (!results) return null;

    const getOverallScoreColor = (score) => {
      if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
      if (score >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      return 'text-red-600 bg-red-50 border-red-200';
    };

    const getMatchIcon = (score) => {
      if (score >= 80) return <CheckCircle className="w-8 h-8 text-green-600" />;
      if (score >= 60) return <Target className="w-8 h-8 text-yellow-600" />;
      return <XCircle className="w-8 h-8 text-red-600" />;
    };

    return (
      <div className="mt-8 space-y-6">
        {/* Overall Match Score */}
        <div className={`rounded-xl p-6 border-2 ${getOverallScoreColor(results.overall_match_percentage)}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {getMatchIcon(results.overall_match_percentage)}
              <div>
                <h3 className="text-2xl font-bold">Overall Match Score</h3>
                <p className="text-sm opacity-80">Based on skills and content analysis</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">{results.overall_match_percentage}%</div>
              <div className="text-sm opacity-80">
                Text Similarity: {results.text_similarity_score}%
              </div>
            </div>
          </div>
        </div>

        {/* Skill Analysis */}
        {Object.keys(results.skill_match_scores).length > 0 && (
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-indigo-600" />
              Skill Category Analysis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(results.skill_match_scores).map(([category, score]) => (
                <SkillCategory
                  key={category}
                  category={category}
                  score={score}
                  matchedSkills={results.matched_skills[category]}
                  missingSkills={results.missing_skills[category]}
                />
              ))}
            </div>
          </div>
        )}

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center">
              <CheckCircle className="w-6 h-6 text-blue-600 mr-2" />
              <div>
                <p className="text-sm text-blue-600 font-medium">Matched Skills</p>
                <p className="text-2xl font-bold text-blue-800">
                  {Object.values(results.matched_skills).reduce((sum, skills) => sum + skills.length, 0)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
            <div className="flex items-center">
              <XCircle className="w-6 h-6 text-orange-600 mr-2" />
              <div>
                <p className="text-sm text-orange-600 font-medium">Missing Skills</p>
                <p className="text-2xl font-bold text-orange-800">
                  {Object.values(results.missing_skills).reduce((sum, skills) => sum + skills.length, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <div className="flex items-center">
              <Target className="w-6 h-6 text-purple-600 mr-2" />
              <div>
                <p className="text-sm text-purple-600 font-medium">Skill Categories</p>
                <p className="text-2xl font-bold text-purple-800">
                  {Object.keys(results.skill_match_scores).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Reset button */}
        <div className="text-center">
          <button
            onClick={() => {
              setShowResults(false);
              setMatchingResults(null);
              setResumeFile(null);
              setJdFile(null);
              setMessage('');
            }}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-200"
          >
            Analyze Another Pair
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className={`w-full ${showResults ? 'max-w-6xl' : 'max-w-2xl'} bg-white shadow-2xl rounded-3xl p-6 sm:p-10 border border-gray-200 transition-all duration-300`}>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          Resume-Job Match Analyzer
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Upload your resume and job description (as PDFs) to get an AI-powered matching score and detailed skill analysis.
        </p>

        {!showResults && (
          <>
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
                  Analyzing Match Score...
                </div>
              ) : (
                'Analyze Resume & Job Match'
              )}
            </button>
          </>
        )}

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

        {showResults && <MatchingResults results={matchingResults} />}
      </div>
    </div>
  );
};

export default App;
