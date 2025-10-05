<div align="center">

# NLP Mini Project

[![NLP](https://img.shields.io/badge/Natural%20Language%20Processing-NLP-blueviolet?style=for-the-badge&logo=python&logoColor=white)](https://github.com/gavin100305/NLP-Mini-Project)
[![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

</div>

---

## Technology Stack

<div align="center">

![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-API-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-Build%20Tool-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styling-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

</div>

## Overview

**NLP Mini Project** is a resume-to-job-description matching platform using NLP techniques. Upload your resume and a job description PDF, and get a professional match analysis with actionable recommendations.

### Key Features
- Upload resume and job description PDFs
- Backend NLP analysis and skill extraction
- Match score and recommendations
- Clean, modern UI with dark theme
- Easy deployment (Vercel for frontend, any Python host for backend)

## Architecture

```
NLP-Mini-Project/
├── frontend/   # React + Vite (UI)
├── backend/    # FastAPI (API & NLP engine)
└── README.md   # Project documentation
```

## Quick Start

### Prerequisites
- Node.js (16+)
- Python 3.11+

### Backend Setup
```bash
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend Setup
```bash
cd frontend
npm install
copy .env.example .env
# Edit .env and set VITE_API_URL if needed
npm run dev
```

## Environment Variables
- `VITE_API_URL` (frontend): Backend endpoint (e.g. `https://your-backend.com/process-docs`).
- Backend: See `backend/` for any `.env.example` or config files.

## Deployment
- **Frontend:** Deploy to Vercel. Set `VITE_API_URL` in Vercel project settings.
- **Backend:** Deploy to any Python host (Render, Railway, Azure, etc.) with Uvicorn.

## API Summary
- `POST /process-docs` — Upload resume and job description PDFs, receive match analysis JSON.
- (Optional) `GET /health` — Health check endpoint.

## Usage
1. Open the frontend in your browser.
2. Upload your resume and job description PDFs.
3. Click Analyze to view your match score and recommendations.

## Jupyter Notebook (Academic Submission)

The repository includes a Jupyter notebook `nlp_backend_notebook.ipynb` demonstrating the full backend NLP pipeline (PDF extraction, preprocessing, skill extraction, semantic similarity using SentenceTransformers, and matching analysis). This notebook is intended for academic submission and hands-on exploration.

Testing with your own PDFs
- To test the notebook or the backend locally, place two PDF files in the project root with the exact filenames:
  - `resume.pdf`
  - `job_description.pdf`

- Open `nlp_backend_notebook.ipynb` and run the cells. The notebook will automatically detect these files and run the full analysis pipeline, then save results to `analysis_results.json` in the project root.

- If the files are not found, the notebook will list available PDF files in the current directory and show the working directory to help troubleshoot.

## Team

<div align="center">

**Made for: NLP Mini Project**

| Name   | GitHub |
|--------|--------|
| Liza  | [Glanisha](https://github.com/Glanisha) |
| Gavin | [gavin100305](https://github.com/gavin100305) |

</div>

---
