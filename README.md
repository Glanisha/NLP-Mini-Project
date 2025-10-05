# NLP Mini Project

A compact, production-ready proof-of-concept application that analyzes a candidate's resume against a job description and returns a match analysis and recommended next steps. This repository contains a Python backend (FastAPI) and a React + Vite frontend.

This README explains the project's purpose, architecture, local development steps, environment variables, and deployment guidance for Vercel (frontend) and Uvicorn (backend).

## Table of contents

Quick links to the main sections:

- Overview
   - [Why this project](#why-this-project)
   - [Architecture](#architecture)

- Getting started
   - [Requirements](#requirements)
   - [Local setup](#local-setup)
      - [Backend (FastAPI)](#backend-fastapi)
      - [Frontend (React + Vite)](#frontend-react--vite)

- Configuration & deployment
   - [Environment variables](#environment-variables)
   - [Deployment](#deployment)
      - [Frontend on Vercel](#frontend-on-vercel)
      - [Backend on a server / cloud](#backend-on-a-server--cloud)

- Usage & development
   - [Usage](#usage)
   - [Development notes](#development-notes)

- Project
   - [Team](#team)
   - [License](#license)

## Why this project

This project demonstrates a full-stack workflow for performing NLP-driven resume-to-job-description matching. It is designed to be easy to run locally for development, and to be deployable to common hosting platforms.

## Architecture

- Frontend: React + Vite. Collects two PDF files (resume and job description), submits them to the backend, and displays a clean, professional match analysis.
- Backend: FastAPI. Receives multipart uploads, runs the matching/analysis logic, and returns JSON containing the matching results used to render the frontend.

## Repository structure

- `frontend/` — React + Vite app (UI components, styles)
- `backend/` — FastAPI application (endpoints, matching engine)
- `README.md` — this file

## Requirements

- Node.js (16+ recommended) and npm or yarn for the frontend
- Python 3.11+ (or 3.10) and pip for the backend

## Local setup

Follow these steps to run both frontend and backend locally.

### Backend (FastAPI)

1. Create a Python virtual environment and install dependencies:

   ```powershell
   cd backend
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1

   # NLP Mini Project

   This repository contains a compact full-stack proof-of-concept that analyzes a candidate's resume against a job description and produces a matching analysis and recommendations. It includes a Python FastAPI backend and a React + Vite frontend.

   Overview
   --------

   This project demonstrates a simple, deployable workflow for document upload, NLP-based analysis, and results visualization. It's intended for learning, hackathon demos, and as a foundation for productionization.

   Key capabilities
   ----------------

   - Upload a resume PDF and a job description PDF via the frontend
   - Backend accepts multipart uploads, runs the matching engine, and returns structured JSON
   - Frontend displays match score, extracted skills, and suggested next steps

   Technology stack
   ----------------

   - Frontend: React (Vite) with Tailwind CSS
   - Backend: Python (FastAPI) served with Uvicorn
   - Deployment: Frontend (Vercel), Backend (any Python host / container)

   Repository layout
   -----------------

   ```
   NLP-Mini-Project/
   ├── frontend/        # React + Vite application
   ├── backend/         # FastAPI application and matching engine
   └── README.md        # This file
   ```

   Getting started — quick setup
   -----------------------------

   Prerequisites

   - Node.js 16+ and npm or yarn
   - Python 3.10+ (3.11 recommended)

   Run the backend

   ```powershell
   cd backend
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

   Run the frontend

   ```powershell
   cd frontend
   npm install
   copy .env.example .env
   # Edit .env to set VITE_API_URL if your backend is not the default
   npm run dev
   ```

   Configuration
   -------------

   Frontend environment

   - `VITE_API_URL` — full backend endpoint (e.g., `https://api.example.com/process-docs`). The frontend falls back to `http://localhost:8000/process-docs` when this is not set.

   Backend environment

   - Check `backend/` for any configuration or `.env.example` files. Typical values (if present) include database connection strings and secret keys.

   API summary
   -----------

   The backend exposes a small set of endpoints (example paths):

   - `POST /process-docs` — Accepts `resume` and `job_description` multipart files and returns JSON with matching analysis
   - (Optional) `GET /health` — Healthcheck endpoint for readiness

   Deployment notes
   ----------------

   Frontend (Vercel)

   1. Connect the repository to Vercel.
   2. In Vercel's project settings, add an environment variable named `VITE_API_URL` with your backend endpoint.
   3. Deploy — Vite reads env vars at build time, so ensure the variable is present before building.

   Backend

   - Deploy anywhere that runs Python apps (e.g., Render, Railway, Docker containers on cloud providers). Serve with Uvicorn/Gunicorn behind a reverse proxy for production.

   Usage
   -----

   1. Open the frontend in your browser.
   2. Upload a Resume PDF and a Job Description PDF.
   3. Click Analyze and review the matched skills and recommendations.

   Development notes
   -----------------

   - Styling uses OKLCH-based dark theme variables and Tailwind utilities.
   - If you change environment variables used by the frontend, rebuild/redeploy the static site.

   Team & credits
   --------------

   Made for: NLP Mini Project

   Authors:

   - Gavin — https://github.com/gavin100305
   - Liza — https://github.com/Glanisha

   License
   -------

   Add a license file (for example MIT) if you wish to make this code open source.

