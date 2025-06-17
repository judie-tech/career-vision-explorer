# Changes Made

## Resume Parsing

-   **Corrected API Endpoint:** Updated the `profile.service.ts` file to use the correct `/api/v1/skill-gap/parse-resume-advanced` endpoint for resume parsing.
-   **Updated Data Handling:** Modified the `Profile.tsx` component to correctly handle the data structure returned by the new endpoint.

## Job Search

-   **Fixed HTTP Method:** Corrected the `jobs.service.ts` file to use the `GET` method for the `/api/v1/jobs/search` endpoint.

## Authentication

-   **Implemented Token Refresh:** Added logic to the `api-client.ts` file to automatically refresh the authentication token when it expires. This will prevent users from being logged out unexpectedly.

## Profile Update

-   **Corrected API Endpoint:** Fixed the `profile.service.ts` file to use the correct `PUT /api/v1/profiles/me` endpoint for updating user profiles.
-   **Fixed State Management:** Updated the `Profile.tsx` component to refresh the user's profile from the global state after a successful update, ensuring the UI reflects the latest data.