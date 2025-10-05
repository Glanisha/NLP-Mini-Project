import React, { useRef, useState } from 'react';
import { FaFileAlt, FaUpload, FaCheckCircle, FaCloudUploadAlt } from 'react-icons/fa';

const FileUploadCard = ({ 
  label, 
  file, 
  onFileChange, 
  accept = "application/pdf",
  maxSize = "1MB",
  step = "1"
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileChange({ target: { files } });
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col space-y-3">
      <label className="text-sm font-semibold text-gray-700 flex items-center">
        <span className="bg-indigo-100 text-indigo-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-2">
          {step}
        </span>
        <FaFileAlt className="w-4 h-4 mr-2 text-indigo-600" />
        {label}
      </label>
      
      <div
        className={`
          relative border-2 border-dashed rounded-2xl p-6 cursor-pointer
          transition-all duration-300 ease-in-out transform hover:scale-[1.02]
          ${isDragOver 
            ? 'border-indigo-400 bg-indigo-50 shadow-lg' 
            : file 
            ? 'border-green-400 bg-green-50 shadow-md' 
            : 'border-gray-300 bg-gray-50 hover:border-indigo-300 hover:bg-indigo-50'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={accept}
          onChange={onFileChange}
        />
        
        <div className="flex flex-col items-center text-center">
          {file ? (
            <>
              <div className="bg-green-100 p-3 rounded-full mb-3">
                <FaCheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-sm font-semibold text-green-700 mb-1 truncate max-w-full">
                {file.name}
              </p>
              <p className="text-xs text-green-600">
                {(file.size / 1024 / 1024).toFixed(2)} MB • Ready to analyze
              </p>
            </>
          ) : (
            <>
              <div className={`p-3 rounded-full mb-3 transition-colors ${
                isDragOver ? 'bg-indigo-100' : 'bg-gray-100'
              }`}>
                {isDragOver ? (
                  <FaCloudUploadAlt className="w-8 h-8 text-indigo-500 animate-bounce" />
                ) : (
                  <FaUpload className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <p className="text-sm font-medium text-gray-700 mb-1">
                {isDragOver ? "Drop your file here" : "Click to upload or drag & drop"}
              </p>
              <p className="text-xs text-gray-500">
                PDF files only • Max {maxSize}
              </p>
            </>
          )}
        </div>
        
        {/* Animated background for drag state */}
        {isDragOver && (
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl animate-pulse"></div>
        )}
      </div>
    </div>
  );
};

const FileUpload = ({ 
  resumeFile, 
  jobFile, 
  onResumeChange, 
  onJobChange, 
  onSubmit, 
  loading,
  disabled = false
}) => {
  const isReady = resumeFile && jobFile && !loading && !disabled;

  return (
    <div className="space-y-8">
      {/* Upload Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FileUploadCard
          label="Upload Your Resume"
          file={resumeFile}
          onFileChange={onResumeChange}
          step="1"
        />
        <FileUploadCard
          label="Upload Job Description"
          file={jobFile}
          onFileChange={onJobChange}
          step="2"
        />
      </div>
      
      {/* Progress Indicator */}
      <div className="flex justify-center">
        <div className="flex items-center space-x-4">
          <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
            resumeFile ? 'bg-green-500 shadow-lg shadow-green-500/30' : 'bg-gray-300'
          }`}></div>
          <div className={`h-1 w-16 rounded transition-all duration-300 ${
            resumeFile ? 'bg-gradient-to-r from-green-500 to-indigo-500' : 'bg-gray-300'
          }`}></div>
          <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
            jobFile ? 'bg-green-500 shadow-lg shadow-green-500/30' : 'bg-gray-300'
          }`}></div>
          <div className={`h-1 w-16 rounded transition-all duration-300 ${
            isReady ? 'bg-gradient-to-r from-indigo-500 to-purple-500' : 'bg-gray-300'
          }`}></div>
          <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
            isReady ? 'bg-purple-500 shadow-lg shadow-purple-500/30 animate-pulse' : 'bg-gray-300'
          }`}></div>
        </div>
      </div>
      
      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          onClick={onSubmit}
          disabled={!isReady}
          className={`
            relative px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg
            transition-all duration-300 ease-in-out transform
            ${isReady
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:scale-105 hover:shadow-xl active:scale-95'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          {loading ? (
            <div className="flex items-center space-x-3">
              <svg className="animate-spin w-5 h-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Analyzing Documents...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <FaCloudUploadAlt className="w-5 h-5" />
              <span>Analyze Resume Match</span>
            </div>
          )}
          
          {/* Glow effect for ready state */}
          {isReady && !loading && (
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur-lg opacity-30 animate-pulse"></div>
          )}
        </button>
      </div>
    </div>
  );
};

export default FileUpload;