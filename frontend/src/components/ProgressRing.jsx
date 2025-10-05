import React, { useEffect, useState } from 'react';

const ProgressRing = ({ 
  percentage = 0, 
  size = 140, 
  strokeWidth = 8, 
  animate = true,
  showPercentage = true,
  className = ""
}) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  
  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setAnimatedPercentage(percentage);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setAnimatedPercentage(percentage);
    }
  }, [percentage, animate]);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference;
  
  // Dynamic color based on percentage
  const getColor = (percent) => {
    if (percent >= 80) return '#10B981'; // Green
    if (percent >= 60) return '#F59E0B'; // Yellow
    if (percent >= 40) return '#F97316'; // Orange
    return '#EF4444'; // Red
  };

  const getGradientId = (percent) => {
    if (percent >= 80) return 'greenGradient';
    if (percent >= 60) return 'yellowGradient';
    if (percent >= 40) return 'orangeGradient';
    return 'redGradient';
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        <defs>
          <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="yellowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>
          <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#DC2626" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          fill="none"
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#${getGradientId(animatedPercentage)})`}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          filter="url(#glow)"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      
      {showPercentage && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span 
            className="text-3xl font-bold transition-all duration-1000 ease-out"
            style={{ color: getColor(animatedPercentage) }}
          >
            {Math.round(animatedPercentage)}%
          </span>
          <span className="text-xs text-gray-500 font-medium mt-1">
            Match Score
          </span>
        </div>
      )}
      
      {/* Pulsing effect for high scores */}
      {animatedPercentage >= 80 && (
        <div className="absolute inset-0 rounded-full border-2 border-green-400 animate-ping opacity-20"></div>
      )}
    </div>
  );
};

export default ProgressRing;