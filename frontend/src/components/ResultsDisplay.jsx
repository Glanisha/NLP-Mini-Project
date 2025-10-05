import React from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaDownload, FaRedo, FaTrophy, FaLightbulb } from 'react-icons/fa';
import ProgressRing from './ProgressRing';

const SkillsList = ({ title, skills, color, icon: Icon, emptyMessage }) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
    <div className="flex items-center mb-4">
      <div className={`p-2 rounded-lg ${color.bg} mr-3`}>
        <Icon className={`w-5 h-5 ${color.text}`} />
      </div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <span className={`ml-auto px-3 py-1 rounded-full text-sm font-medium ${color.badge}`}>
        {skills.length}
      </span>
    </div>
    
    {skills.length > 0 ? (
      <div className="max-h-40 overflow-y-auto">
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, idx) => (
            <span
              key={idx}
              className={`px-3 py-1 rounded-lg text-sm font-medium border ${color.skill}`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    ) : (
      <p className="text-gray-500 text-sm italic">{emptyMessage}</p>
    )}
  </div>
);

const ScoreCard = ({ percentage }) => {
  const getScoreLevel = (score) => {
    if (score >= 80) return { level: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-50', tips: 'Outstanding match! You\'re well-qualified for this role.' };
    if (score >= 60) return { level: 'Good', color: 'text-yellow-600', bgColor: 'bg-yellow-50', tips: 'Good match with room for improvement in missing skills.' };
    if (score >= 40) return { level: 'Fair', color: 'text-orange-600', bgColor: 'bg-orange-50', tips: 'Moderate match. Consider highlighting transferable skills.' };
    return { level: 'Needs Work', color: 'text-red-600', bgColor: 'bg-red-50', tips: 'Focus on developing the missing key skills.' };
  };

  const scoreInfo = getScoreLevel(percentage);

  return (
    <div className={`${scoreInfo.bgColor} rounded-2xl p-8 border-l-4 border-l-green-400`}>
      <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
        <div className="text-center lg:text-left">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Match Analysis Complete</h2>
          <p className={`text-lg font-semibold ${scoreInfo.color} mb-2`}>{scoreInfo.level} Match</p>
          <p className="text-gray-600 max-w-md">{scoreInfo.tips}</p>
        </div>
        
        <div className="flex items-center space-x-8">
          <ProgressRing percentage={percentage} size={120} />
          
          <div className="text-center">
            <FaTrophy className={`w-8 h-8 mx-auto mb-2 ${scoreInfo.color}`} />
            <p className="text-sm text-gray-600 font-medium">Your Score</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActionCard = ({ onReset, onDownload }) => (
  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
    <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
      <div className="flex items-center">
        <FaLightbulb className="w-6 h-6 text-indigo-600 mr-3" />
        <div>
          <h3 className="font-semibold text-gray-800">What's Next?</h3>
          <p className="text-sm text-gray-600">Download your report or analyze another pair</p>
        </div>
      </div>
      
      <div className="flex space-x-3">
        <button
          onClick={onDownload}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <FaDownload className="w-4 h-4" />
          <span>Download Report</span>
        </button>
        
        <button
          onClick={onReset}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <FaRedo className="w-4 h-4" />
          <span>Analyze Another</span>
        </button>
      </div>
    </div>
  </div>
);

const ResultsDisplay = ({ results, onReset }) => {
  if (!results) return null;

  const resumeSkills = Object.values(results.resume_skills || {}).flat();
  const jobSkills = Object.values(results.job_description_skills || {}).flat();
  const matchedSkills = Object.values(results.matched_skills || {}).flat();
  const missingSkills = Object.values(results.missing_skills || {}).flat();
  const percentage = results.overall_match_percentage || 0;

  const handleDownload = () => {
    // TODO: Implement PDF report generation
    alert('Report download feature coming soon!');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Score Overview */}
      <ScoreCard percentage={percentage} />
      
      {/* Skills Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SkillsList
          title="Resume Skills"
          skills={resumeSkills}
          icon={FaCheckCircle}
          color={{
            bg: 'bg-blue-100',
            text: 'text-blue-600',
            badge: 'bg-blue-100 text-blue-700',
            skill: 'bg-blue-50 border-blue-200 text-blue-700'
          }}
          emptyMessage="No skills detected in resume"
        />
        
        <SkillsList
          title="Job Requirements"
          skills={jobSkills}
          icon={FaCheckCircle}
          color={{
            bg: 'bg-purple-100',
            text: 'text-purple-600',
            badge: 'bg-purple-100 text-purple-700',
            skill: 'bg-purple-50 border-purple-200 text-purple-700'
          }}
          emptyMessage="No skills detected in job description"
        />
        
        <SkillsList
          title="Matched Skills"
          skills={matchedSkills}
          icon={FaCheckCircle}
          color={{
            bg: 'bg-green-100',
            text: 'text-green-600',
            badge: 'bg-green-100 text-green-700',
            skill: 'bg-green-50 border-green-200 text-green-700'
          }}
          emptyMessage="No matching skills found"
        />
        
        <SkillsList
          title="Missing Skills"
          skills={missingSkills}
          icon={FaExclamationTriangle}
          color={{
            bg: 'bg-red-100',
            text: 'text-red-600',
            badge: 'bg-red-100 text-red-700',
            skill: 'bg-red-50 border-red-200 text-red-700'
          }}
          emptyMessage="All required skills are present!"
        />
      </div>
      
      {/* Actions */}
      <ActionCard onReset={onReset} onDownload={handleDownload} />
      
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ResultsDisplay;