import React from 'react';
import { FaFileAlt, FaRocket } from 'react-icons/fa';

const Header = () => {
  return (
    <div className="text-center mb-10">
      <div className="flex justify-center items-center mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-lg opacity-30 animate-pulse"></div>
          <div className="relative bg-gradient-to-r from-indigo-600 to-purple-700 p-4 rounded-full shadow-xl">
            <FaFileAlt className="w-8 h-8 text-white" />
          </div>
        </div>
        <FaRocket className="w-6 h-6 text-indigo-500 ml-4 animate-bounce" />
      </div>
      
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent mb-4">
        Smart Resume Matcher
      </h1>
      
      <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Analyze your resume against job descriptions. Get clear insights, skill matching, and improvement suggestions.
      </p>
      
      <div className="flex justify-center items-center mt-6 space-x-8">
        <div className="flex items-center text-sm text-gray-500">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
          Skill Analysis
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
          Instant Results
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
          Skill Insights
        </div>
      </div>
    </div>
  );
};

export default Header;