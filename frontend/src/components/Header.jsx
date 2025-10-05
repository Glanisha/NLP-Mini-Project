import { FaRocket, FaBrain } from "react-icons/fa"

const Header = () => {
  return (
    <div className="text-center mb-12">
      {/* <div className="flex justify-center items-center mb-8">
        <div className="relative">
          <div className="relative bg-primary p-5 rounded-lg shadow-lg">
            <FaBrain className="w-10 h-10 text-primary-foreground" />
          </div>
        </div>
        <FaRocket className="w-7 h-7 text-foreground ml-6" />
      </div> */}

      <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 leading-tight text-foreground">
        Smart Resume Matcher
      </h1>

      <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
        Leverage AI-powered analysis to match your resume against job descriptions. Get instant insights, skill
        matching, and actionable improvement suggestions.
      </p>

      <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8">
        <div className="flex items-center text-sm text-muted-foreground">
          <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
          <span className="font-medium">AI Skill Analysis</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
          <span className="font-medium">Instant Results</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
          <span className="font-medium">Career Insights</span>
        </div>
      </div>
    </div>
  )
}

export default Header
