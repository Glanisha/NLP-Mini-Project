# NLP Mini Project

A compact, production-ready proof-of-concept application that analyzes a candidate's resume against a job description and returns a match analysis and recommended next steps. This repository contains a Python backend (FastAPI) and a React + Vite frontend.

This README explains the project's purpose, architecture, local development steps, environment variables, and deployment guidance for Vercel (frontend) and Uvicorn (backend).

## Table of contents

- [Why this project](#why-this-project)
- [Architecture](#architecture)
- [Repository structure](#repository-structure)
- [Requirements](#requirements)
- [Local setup](#local-setup)
  - [Backend (FastAPI)](#backend-fastapi)
  - [Frontend (React + Vite)](#frontend-react--vite)
- [Environment variables](#environment-variables)
- [Deployment](#deployment)
  - [Frontend on Vercel](#frontend-on-vercel)
  - [Backend on a server / cloud](#backend-on-a-server--cloud)
- [Usage](#usage)
- [Development notes](#development-notes)
- [Contributing](#contributing)
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
   pip install -r requirements.txt
   ```

2. Run the backend with hot reload (development):

   ```powershell
   uvicorn main:app --reload
   ```

   By default the backend listens on `http://127.0.0.1:8000` and exposes an endpoint at `/process-docs`.

### Frontend (React + Vite)

1. Install dependencies and copy the example env:

   ```powershell
   cd frontend
   npm install
   copy .env.example .env
   # Edit .env and set VITE_API_URL if your backend is not on the default localhost:8000
   ```

2. Run the dev server:

   ```powershell
   npm run dev
   ```

The frontend will use the environment variable `VITE_API_URL` when set, and otherwise fall back to `http://localhost:8000/process-docs`.

## Environment variables

- `VITE_API_URL` (frontend): Full backend endpoint including path (for example `https://api.example.com/process-docs`). Set this in Vercel or your local `.env` when not using the default local backend.

Backend env vars (if any) should be set in `backend/.env` or via your hosting environment — check `backend/` for any `.env.example` or config values.

## Deployment

### Frontend on Vercel

1. Push your repo to GitHub (or connect your Git provider) and import the project in Vercel.
2. In Vercel dashboard → Project → Settings → Environment Variables, add the key `VITE_API_URL` and set the value to your backend endpoint (e.g. `https://api.example.com/process-docs`).
3. Deploy the project. Vite reads env vars at build time, so redeploy after changing env variables.

See `frontend/VERCEL.md` for a short guide.

### Backend on a server / cloud

You can deploy the backend using any provider that supports Python apps (e.g., Render, Railway, AWS, Azure). A straightforward option for simple hosting is to use a small Linux server and run with Uvicorn/Hypercorn behind a process manager (systemd) and reverse proxy (Nginx).

## Usage

1. Open the frontend in a browser.
2. Upload a Resume PDF and a Job Description PDF.
3. Click Analyze. The frontend will upload both files to the backend endpoint and display the results when complete.

## Development notes

- The frontend is already themed using OKLCH dark variables and uses CSS custom properties for typography. Tailwind utility classes are used for layout and weights (font-bold, font-medium).
- The backend matching logic is implemented in `backend/matching_engine.py` and exposed via the FastAPI app in `backend/app.py` (or `backend/main.py`).

## Team

Made for: NLP Mini Project

Authors:

- Liza — https://github.com/Glanisha
- Gavin — https://github.com/gavin100305

