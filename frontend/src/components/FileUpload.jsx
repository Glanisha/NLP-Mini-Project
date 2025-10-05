import { useRef, useState } from "react"
import { FaFileAlt, FaUpload, FaCheckCircle, FaCloudUploadAlt, FaSpinner } from "react-icons/fa"

const FileUploadCard = ({ label, file, onFileChange, accept = "application/pdf", maxSize = "1MB", step = "1" }) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      onFileChange({ target: { files } })
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="flex flex-col space-y-4">
      <label className="text-sm font-semibold text-foreground flex items-center">
        <span className="bg-primary text-primary-foreground rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold mr-3">
          {step}
        </span>
        <FaFileAlt className="w-4 h-4 mr-2 text-foreground" />
        {label}
      </label>

      <div
        className={`
          relative border-2 border-dashed rounded-lg p-8 cursor-pointer
          transition-all duration-300 ease-in-out
          ${
            isDragOver
              ? "border-primary bg-muted"
              : file
                ? "border-primary bg-muted"
                : "border-border bg-card hover:border-primary hover:bg-muted"
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input ref={fileInputRef} type="file" className="hidden" accept={accept} onChange={onFileChange} />

        <div className="flex flex-col items-center text-center">
          {file ? (
            <>
              <div className="bg-primary p-4 rounded-full mb-4">
                <FaCheckCircle className="w-10 h-10 text-primary-foreground" />
              </div>
              <p className="text-base font-semibold text-foreground mb-2 truncate max-w-full">{file.name}</p>
              <p className="text-sm text-muted-foreground">
                {(file.size / 1024 / 1024).toFixed(2)} MB • Ready to analyze
              </p>
            </>
          ) : (
            <>
              <div className={`p-4 rounded-full mb-4 transition-all duration-300 ${
                isDragOver ? "bg-primary" : "bg-muted"
              }`}>
                {isDragOver ? (
                  <FaCloudUploadAlt className="w-10 h-10 text-primary-foreground" />
                ) : (
                  <FaUpload className="w-10 h-10 text-muted-foreground" />
                )}
              </div>
              <p className="text-base font-medium text-foreground mb-2">
                {isDragOver ? "Drop your file here" : "Click to upload or drag & drop"}
              </p>
              <p className="text-sm text-muted-foreground">PDF files only • Max {maxSize}</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

const FileUpload = ({ resumeFile, jobFile, onResumeChange, onJobChange, onSubmit, loading, disabled = false }) => {
  const isReady = resumeFile && jobFile && !loading && !disabled

  return (
    <div className="space-y-10">
      {/* Upload Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FileUploadCard label="Upload Your Resume" file={resumeFile} onFileChange={onResumeChange} step="1" />
        <FileUploadCard label="Upload Job Description" file={jobFile} onFileChange={onJobChange} step="2" />
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center">
        <div className="flex items-center space-x-4">
          <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
            resumeFile ? "bg-primary" : "bg-muted"
          }`}></div>
          <div className={`h-1 w-20 rounded transition-all duration-500 ${
            resumeFile ? "bg-primary" : "bg-muted"
          }`}></div>
          <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
            jobFile ? "bg-primary" : "bg-muted"
          }`}></div>
          <div className={`h-1 w-20 rounded transition-all duration-500 ${
            isReady ? "bg-primary" : "bg-muted"
          }`}></div>
          <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
            isReady ? "bg-primary" : "bg-muted"
          }`}></div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          onClick={onSubmit}
          disabled={!isReady}
          className={`
            relative px-10 py-5 rounded-lg font-bold text-lg shadow-lg
            transition-all duration-300 ease-in-out
            ${
              isReady
                ? "bg-primary text-primary-foreground hover:opacity-90"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }
          `}
        >
          {loading ? (
            <div className="flex items-center space-x-3">
              <FaSpinner className="animate-spin w-5 h-5" />
              <span>Analyzing Documents...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <FaCloudUploadAlt className="w-6 h-6" />
              <span>Analyze Resume Match</span>
            </div>
          )}
        </button>
      </div>
    </div>
  )
}

export default FileUpload
