# Match Percentage Logic Documentation

This document provides a comprehensive overview of the match percentage logic in the JobsPortal application, covering both the backend and frontend implementation.

## Backend

The backend for the match percentage logic is built with FastAPI and handles the core logic for calculating the match score between a user's skills and a job's requirements.

### Key Components

*   **`job_service.py` (services):** This file contains the `search_jobs_by_skills` and `get_job` functions, which are the core of the match percentage logic.
*   **`cv_parser_service.py` (services):** This file contains the `calculate_skill_match` function, which uses a pre-trained `spacy` model to calculate the semantic similarity between a user's skills and a job's requirements.

### Logic Flow

1.  **Fetch User Skills:** The `search_jobs_by_skills` and `get_job` functions first fetch the user's skills from their profile.
2.  **Fetch Active Jobs:** The `search_jobs_by_skills` function fetches all active jobs from the database, while the `get_job` function fetches a single job by its ID.
3.  **Calculate Match Score:** For each job, the `calculate_skill_match` function from the `CVParserService` is called to calculate the semantic similarity between the user's skills and the job's requirements. The `match_score` is calculated as a weighted percentage of the number of matching skills, where the weights are retrieved from the `skill_weights` field of the job and the similarity score from `spacy`.
4.  **Return Scored Jobs:** The `search_jobs_by_skills` function returns a list of all active jobs, each with a `match_score` and a list of `matched_skills`. The `get_job` function returns a single job with its `match_score`.

## Frontend

The frontend for the match percentage logic is built with React and provides a user-friendly interface for displaying the match score to the user.

### Key Components

*   **`use-jobs-filter.tsx` (hook):** This hook uses the `matchScore` to filter jobs.
*   **`JobCard.tsx` (component):** This component displays the `matchScore` to the user as a progress bar and a badge.
*   **`JobDetails.tsx` (page):** This page displays the details for a single job, including a breakdown of the match score.

### Logic Flow

1.  **Fetch Scored Jobs:** The `useJobPosts` hook fetches the list of all available jobs, including the `match_score` for each job.
2.  **Filter Jobs:** The `use-jobs-filter.tsx` hook allows the user to filter jobs based on the `matchScore`.
3.  **Display Match Score:** The `JobCard.tsx` and `JobDetails.tsx` components display the `matchScore` to the user.

## Potential Improvements

The current implementation of the match percentage logic is a good starting point, but it could be improved to provide a more accurate and nuanced match score. Here are some potential improvements:

*   **Experience Level:** The backend could be updated to consider the user's experience level when calculating the match score. For example, a user with more experience could be given a higher score for a job that requires more experience.
*   **Location:** The backend could be updated to consider the user's location when calculating the match score. For example, a user who is located in the same city as the job could be given a higher score.
*   **AI-Powered Matching:** The backend could be updated to use a more advanced AI-powered matching algorithm to provide a more accurate and nuanced match score. This could involve using natural language processing to analyze the job description and the user's resume, and then using a machine learning model to predict the likelihood of a successful match.