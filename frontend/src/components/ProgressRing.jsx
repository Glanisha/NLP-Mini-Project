import { useEffect, useState } from "react"

const ProgressRing = ({
  percentage = 0,
  size = 140,
  strokeWidth = 10,
  animate = true,
  showPercentage = true,
  className = "",
}) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0)

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setAnimatedPercentage(percentage)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setAnimatedPercentage(percentage)
    }
  }, [percentage, animate])

  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference

  const getColorClass = () => "text-foreground"

  const getStrokeColor = () => "var(--primary)"

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle cx={size / 2} cy={size / 2} r={radius} stroke="var(--muted)" strokeWidth={strokeWidth} fill="none" />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getStrokeColor()}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>

      {showPercentage && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-bold transition-all duration-1000 ease-out ${getColorClass()}`}>
            {Math.round(animatedPercentage)}%
          </span>
          <span className="text-xs text-muted-foreground font-semibold mt-1 tracking-wide">MATCH SCORE</span>
        </div>
      )}
    </div>
  )
}

export default ProgressRing
