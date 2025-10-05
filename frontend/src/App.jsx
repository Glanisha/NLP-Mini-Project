import { useState } from "react"
import axios from "axios"
import { FaCheck, FaTimes } from "react-icons/fa"
import Header from "./components/Header"
import FileUpload from "./components/FileUpload"
import ResultsDisplay from "./components/ResultsDisplay"

const App = () => {
  // Use Vite environment variable for the backend URL. Vite exposes variables that start with VITE_ via import.meta.env
  // Example value (production): https://your-backend.example.com/process-docs
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/process-docs"

  if (!import.meta.env.VITE_API_URL) {
    // Warn during development when the env var isn't set so deployers know to add it in Vercel
    // eslint-disable-next-line no-console
    console.warn("VITE_API_URL is not set. Falling back to http://localhost:8000/process-docs. Set VITE_API_URL in your Vercel/environment to point to the backend.")
  }

  const [resumeFile, setResumeFile] = useState(null)
  const [jdFile, setJdFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [isError, setIsError] = useState(false)
  const [matchingResults, setMatchingResults] = useState(null)

  const handleFileChange = (setter) => (event) => {
    setter(event.target.files[0] || null)
    setMessage("")
    setIsError(false)
  }

  const handleSubmit = async () => {
    if (!resumeFile || !jdFile) {
      setMessage("Please upload both the Resume and the Job Description PDF.")
      setIsError(true)
      return
    }

    setLoading(true)
    setMessage("Uploading and processing documents...")
    setIsError(false)

    const formData = new FormData()
    formData.append("resume", resumeFile)
    formData.append("job_description", jdFile)

    try {
      const response = await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      setMatchingResults(response.data.matching_analysis)
      setMessage("Analysis completed successfully!")
    } catch (error) {
      console.error("API Error:", error)
      let errorMsg = "An unknown error occurred."
      if (error.response) {
        errorMsg = error.response.data.detail || "Server error occurred during processing."
      } else if (error.request) {
        errorMsg = "No response from server. Check if the FastAPI server is running."
      }
      setMessage(`Upload Failed: ${errorMsg}`)
      setIsError(true)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setMatchingResults(null)
    setResumeFile(null)
    setJdFile(null)
    setMessage("")
    setIsError(false)
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 lg:p-8 dark">
      <div className="max-w-7xl mx-auto">
        <div
          className={`bg-card border border-border rounded-lg p-6 sm:p-8 lg:p-10 transition-all duration-700 ${matchingResults ? "max-w-none" : "max-w-5xl mx-auto"}`}
        >
          <Header />

          {message && (
            <div
              className={`mb-8 p-4 rounded-md border-l-4 transition-all duration-300 ${
                isError
                  ? "bg-muted border-primary text-foreground"
                  : "bg-muted border-primary text-foreground"
              }`}
            >
              <div className="flex items-center">
                <span className="mr-3 text-foreground">
                  {isError ? <FaTimes className="w-5 h-5" /> : <FaCheck className="w-5 h-5" />}
                </span>
                <p className="font-medium text-foreground">{message}</p>
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
            <ResultsDisplay results={matchingResults} onReset={handleReset} />
          )}
        </div>
      </div>
    </div>
  )
}

export default App
