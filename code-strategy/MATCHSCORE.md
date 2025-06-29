# Strategy for Fixing the Match Score Bug

## 1. The Problem
The main job listings page (`/jobs`) currently displays a "0% Match" score for every job. This is because the frontend is fetching data from a generic endpoint that does not calculate the personalized match score for the logged-in user.

## 2. The Goal
The objective is to ensure the job listings page displays the correct, backend-calculated `match_score` for each job, based on the user's skills.

## 3. Root Cause Analysis
- **Frontend (`src/pages/Jobs.tsx`):** The `loadJobs` function calls `jobsService.getJobs()`.
- **Frontend Service (`src/services/jobs.service.ts`):** The `getJobs()` function calls the generic `GET /jobs` API endpoint.
- **Backend Route (`jobsportal/app/routes/jobs.py`):** The `GET /jobs` endpoint (`list_jobs`) is designed for general browsing and does not perform any skill matching.
- **The Correct Endpoint:** The `GET /jobs/search` endpoint (`search_jobs_by_skills`) is the correct one to use, as it is specifically designed to calculate a `match_score` based on the user's profile skills.
- **Data Mismatch:** A secondary issue is that the `search_jobs_by_skills` function was originally designed to return a simplified `JobSearchResult` object, which lacks fields required by the frontend UI.

## 4. Step-by-Step Solution

### Step 1: Modify the Backend Service
- **File:** `jobsportal/app/services/job_service.py`
- **Action:** Modify the `search_jobs_by_skills` function. Instead of creating and returning a list of `JobSearchResult` objects, it will construct and return a list of the full `JobResponse` objects. This ensures the `match_score` is calculated and included alongside all other job details required by the frontend.

### Step 2: Update the Backend Route
- **File:** `jobsportal/app/routes/jobs.py`
- **Action:** Change the `response_model` for the `GET /jobs/search` endpoint from `List[JobSearchResult]` to `List[JobResponse]`. This aligns the route's documentation and validation with the new data structure being returned by the service.

### Step 3: Update the Frontend Service
- **File:** `src/services/jobs.service.ts`
- **Action:** Update the TypeScript return type for the `searchJobsBySkills` function to `Promise<Job[]>`. This will reflect that the function now returns an array of full job objects.

### Step 4: Update the Frontend Page
- **File:** `src/pages/Jobs.tsx`
- **Action:** In the `loadJobs` function, change the API call from `jobsService.getJobs()` to `jobsService.searchJobsBySkills()`. The data transformation logic will also be updated to handle the direct array of jobs returned by the new service call.

## 5. Known Side-Issues
- **Pylance Errors in `jobs.py`:** There are existing type errors in the `activate_job` and `deactivate_job` routes related to the `JobUpdate` schema. These are separate from the match score issue and will be addressed after this primary bug is resolved.