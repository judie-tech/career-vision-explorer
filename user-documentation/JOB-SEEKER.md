# Job Seeker Functionality Documentation

This document provides a comprehensive overview of the job seeker functionality in the JobsPortal application, covering both the backend and frontend implementation.

## Backend

The backend for the job seeker functionality is built with FastAPI and handles all the core logic for user authentication, profile management, job searching, and application submission.

### Key Components

*   **`auth.py` (routes):** This file defines all the API endpoints related to user authentication, including registration, login, and password management.
*   **`profile.py` (routes):** This file defines all the API endpoints related to user profile management, including creating, updating, and retrieving user profiles.
*   **`jobs.py` (routes):** This file defines all the API endpoints related to job searching, including listing all jobs, searching for jobs by skills, and retrieving job details.
*   **`applications.py` (routes):** This file defines all the API endpoints related to job application submission and management.
*   **`ai.py` (routes):** This file defines all the API endpoints related to AI-powered features, including resume analysis and job recommendations.
*   **`interview.py` (routes):** This file defines all the API endpoints related to interview question generation.
*   **`gemini.py` (routes):** This file defines all the API endpoints related to direct access to the Gemini AI model.
*   **`analyze_skills.py` (routes):** This file defines all the API endpoints related to in-depth skill analysis and gap identification.
*   **`skill_gap.py` (routes):** This file defines all the API endpoints related to advanced skill gap analysis and learning recommendations.

### Endpoints

| Method | Path                          | Description                                     | User Role      |
|--------|-------------------------------|-------------------------------------------------|----------------|
| POST   | `/auth/register`              | Register a new user.                            | Public         |
| POST   | `/auth/login`                 | Log in a user.                                  | Public         |
| POST   | `/auth/refresh`               | Refresh an access token.                        | Authenticated  |
| POST   | `/auth/change-password`       | Change the current user's password.             | Authenticated  |
| POST   | `/auth/reset-password`        | Initiate a password reset.                      | Public         |
| POST   | `/auth/reset-password/confirm`| Confirm a password reset.                       | Public         |
| GET    | `/auth/me`                    | Get the current user's info.                    | Authenticated  |
| GET    | `/profile`                    | Get the current user's profile.                 | Authenticated  |
| PUT    | `/profile`                    | Update the current user's profile.              | Authenticated  |
| GET    | `/profile/stats`              | Get profile statistics.                         | Authenticated  |
| POST   | `/profile/skills`             | Add a skill to the user's profile.              | Authenticated  |
| DELETE | `/profile/skills/{skill}`     | Remove a skill from the user's profile.         | Authenticated  |
| PUT    | `/profile/skills`             | Update all skills for the user's profile.       | Authenticated  |
| GET    | `/jobs`                       | List all jobs with filters.                     | Public         |
| GET    | `/jobs/search`                | Search for jobs matching the user's skills.     | Authenticated  |
| GET    | `/jobs/{job_id}`              | Get job details by ID.                          | Public         |
| POST   | `/applications`               | Submit a job application.                       | Job Seeker     |
| GET    | `/applications/my`            | Get the current user's applications.            | Job Seeker     |
| GET    | `/applications/stats`         | Get application statistics.                     | Authenticated  |
| GET    | `/applications/{application_id}`| Get details for a specific application.         | Authenticated  |
| PUT    | `/applications/{application_id}`| Update an application.                          | Authenticated  |
| DELETE | `/applications/{application_id}`| Withdraw/delete an application.                 | Authenticated  |
| POST   | `/ai/extract-skills`          | Extract skills from an uploaded resume.         | Job Seeker     |
| POST   | `/ai/job-recommendations`     | Get AI-powered job recommendations.             | Job Seeker     |
| GET    | `/ai/skill-recommendations`   | Get personalized skill recommendations.         | Job Seeker     |
| POST   | `/ai/analyze-resume`          | Get AI-powered resume analysis.                 | Job Seeker     |
| POST   | `/interview/questions`        | Generate role-based interview questions.        | Authenticated  |
| POST   | `/gemini/generate`            | Generate text using the Gemini AI model.        | Authenticated  |
| POST   | `/analyze/skills`             | Analyze skills from an uploaded CV/resume.      | Job Seeker     |
| POST   | `/analyze/skill-gaps`         | Analyze skill gaps for a target role.           | Job Seeker     |
| POST   | `/analyze/match-to-job/{job_id}`| Match a user's skills to a specific job.        | Job Seeker     |
| POST   | `/analyze/job-based-recommendations`| Get skill recommendations based on a job title. | Job Seeker     |
| POST   | `/skill-gap/parse-resume-advanced`| Perform advanced parsing of a resume.           | Job Seeker     |
| POST   | `/skill-gap/analyze-skill-gap`| Perform a comprehensive skill gap analysis.     | Job Seeker     |
| GET    | `/skill-gap/learning-resources/{skill}`| Get curated learning resources for a skill.     | Job Seeker     |
| POST   | `/skill-gap/analyze-target-job`| Analyze skill gaps for a target job title.      | Job Seeker     |

## Frontend

The frontend for the job seeker functionality is built with React and provides a user-friendly interface for interacting with the job board.

### Key Components

*   **`useAuth.tsx` (hook):** This hook manages the user's session, including storing and retrieving the authentication token.
*   **`useUserProfile.tsx` (hook):** This hook is responsible for fetching and managing the user's profile data.
*   **`useJobPosts.tsx` (hook):** This hook is responsible for fetching and managing the list of all available jobs.
*   **`useJobApplications.tsx` (hook):** This hook manages the job seeker's applications. It keeps track of which jobs they have applied for and is used to display the "Applied" status.
*   **`Home.tsx` (page):** This is the main landing page for the application. It displays a featured jobs section, a search bar, and other promotional content.
*   **`Jobs.tsx` (page):** This page displays the main job listings. It uses the `useJobPosts` hook to fetch and display the list of all available jobs.
*   **`JobsList.tsx` (component):** This component renders the list of jobs on the `/jobs` page.
*   **`JobDetails.tsx` (page):** This page displays the details for a single job. It fetches the job data from the backend and displays it to the user.
*   **`JobApplicationDialog.tsx` (component):** This dialog allows the user to enter their application details and submit their application.
*   **`Profile.tsx` (page):** This page displays the user's profile information, including their skills, experience, and application history.

### Logic Flow

1.  **Authentication:** When a user logs in, the `useAuth` hook stores the authentication token in local storage. This token is then attached to all subsequent API requests to authenticate the user.
2.  **Profile Management:** The `useUserProfile` hook fetches the user's profile data from the backend and makes it available to all components that need it.
3.  **Viewing Jobs:** When a user navigates to the `/jobs` page, the `useJobPosts` hook fetches the list of all available jobs from the backend. The `JobsList` component then renders this list to the user.
4.  **Viewing Job Details:** When a user clicks on a job, they are navigated to the `JobDetails` page. This page fetches the details for the selected job from the backend and displays them to the user. The `isApplied` status is determined by checking if the job's ID is present in the list of applications fetched by the `useJobApplications` hook.
5.  **Applying for a Job:** When a user clicks the "Apply" button, the `JobApplicationDialog` is displayed. This dialog allows the user to enter their application details and submit their application. The `useJobApplications` hook is then used to refetch the list of applications, which updates the UI to show the "Applied" status.