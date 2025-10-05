import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaDownload,
  FaRedo,
  FaTrophy,
  FaLightbulb,
  FaChartLine,
} from "react-icons/fa"
import ProgressRing from "./ProgressRing"

const SkillsList = ({ title, skills, icon: Icon, emptyMessage }) => (
  <div className="bg-card border border-border rounded-lg p-6 transition-all duration-300">
    <div className="flex items-center mb-5">
      <div className="p-3 rounded-xl bg-muted mr-3">
        <Icon className="w-5 h-5 text-foreground" />
      </div>
      <h3 className="text-lg font-bold text-foreground">{title}</h3>
      <span className="ml-auto px-4 py-1.5 rounded-full text-sm font-bold bg-primary text-primary-foreground">{skills.length}</span>
    </div>

    {skills.length > 0 ? (
      <div className="max-h-48 overflow-y-auto pr-2">
        <div className="flex flex-wrap gap-2.5">
          {skills.map((skill, idx) => (
            <span
              key={idx}
              className="px-4 py-2 rounded-xl text-sm font-semibold border border-border bg-muted text-foreground"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    ) : (
      <p className="text-muted-foreground text-sm italic">{emptyMessage}</p>
    )}
  </div>
)

const ScoreCard = ({ percentage }) => {
  const getScoreLevel = (score) => {
    if (score >= 80)
      return {
        level: "Excellent Match",
        tips: "Outstanding match! You're exceptionally well-qualified for this role.",
      }
    if (score >= 60)
      return {
        level: "Good Match", 
        tips: "Good match with room for improvement in missing skills.",
      }
    if (score >= 40)
      return {
        level: "Fair Match",
        tips: "Moderate match. Consider highlighting transferable skills.",
      }
    return {
      level: "Needs Improvement",
      tips: "Focus on developing the missing key skills for better alignment.",
    }
  }

  const scoreInfo = getScoreLevel(percentage)

  return (
    <div className="bg-muted rounded-lg p-8 border-l-4 border-primary">
      <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 lg:space-x-8">
        <div className="text-center lg:text-left flex-1">
          <div className="flex items-center justify-center lg:justify-start mb-3">
            <FaChartLine className="w-6 h-6 text-foreground mr-3" />
            <h2 className="text-3xl font-bold text-foreground">Match Analysis Complete</h2>
          </div>
          <p className="text-xl font-bold text-foreground mb-3">{scoreInfo.level}</p>
          <p className="text-muted-foreground text-base leading-relaxed max-w-xl">{scoreInfo.tips}</p>
        </div>

        <div className="flex items-center space-x-10">
          <ProgressRing percentage={percentage} size={140} />

          <div className="text-center">
            <div className="p-4 rounded-lg bg-primary mb-3">
              <FaTrophy className="w-10 h-10 mx-auto text-primary-foreground" />
            </div>
            <p className="text-sm text-muted-foreground font-semibold">Your Score</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const ActionCard = ({ onReset, onDownload }) => (
  <div className="bg-card border border-border rounded-lg p-6">
    <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
      <div className="flex items-center">
        <div className="p-3 rounded-xl bg-primary mr-4">
          <FaLightbulb className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-bold text-foreground text-lg">What's Next?</h3>
          <p className="text-sm text-muted-foreground">Download your report or analyze another pair</p>
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={onDownload}
          className="flex items-center space-x-2 px-5 py-3 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-all duration-300 font-semibold"
        >
          <FaDownload className="w-4 h-4" />
          <span>Download</span>
        </button>

        <button
          onClick={onReset}
          className="flex items-center space-x-2 px-5 py-3 bg-muted text-foreground rounded-xl hover:bg-accent transition-all duration-300 font-semibold border border-border"
        >
          <FaRedo className="w-4 h-4" />
          <span>New Analysis</span>
        </button>
      </div>
    </div>
  </div>
)

const ResultsDisplay = ({ results, onReset }) => {
  if (!results) return null

  const resumeSkills = Object.values(results.resume_skills || {}).flat()
  const jobSkills = Object.values(results.job_description_skills || {}).flat()
  const matchedSkills = Object.values(results.matched_skills || {}).flat()
  const missingSkills = Object.values(results.missing_skills || {}).flat()
  const percentage = results.overall_match_percentage || 0

  const handleDownload = () => {
    alert("Report download feature coming soon!")
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <ScoreCard percentage={percentage} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SkillsList
          title="Resume Skills"
          skills={resumeSkills}
          icon={FaCheckCircle}
          emptyMessage="No skills detected in resume"
        />

        <SkillsList
          title="Job Requirements"
          skills={jobSkills}
          icon={FaCheckCircle}
          emptyMessage="No skills detected in job description"
        />

        <SkillsList
          title="Matched Skills"
          skills={matchedSkills}
          icon={FaCheckCircle}
          emptyMessage="No matching skills found"
        />

        <SkillsList
          title="Missing Skills"
          skills={missingSkills}
          icon={FaExclamationTriangle}
          emptyMessage="All required skills are present!"
        />
      </div>

      <ActionCard onReset={onReset} onDownload={handleDownload} />
    </div>
  )
}

export default ResultsDisplay
