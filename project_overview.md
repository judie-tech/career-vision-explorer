# Project Overview: File Structure and Process Correlation

This document provides an overview of the project's file structure, how different parts of the application are connected, and a proposed file organization to improve clarity and maintainability.

## 1. Current File Structure and Process Correlation

The application is a modern web platform with a decoupled frontend and backend.

### High-Level Directory Structure

*   `jobsportal/`: The Python backend, built with FastAPI.
    *   `app/`: Core application logic.
        *   `api/`: API endpoint definitions.
        *   `models/`: Database models (e.g., User, Job, Profile).
        *   `schemas/`: Pydantic schemas for data validation and serialization.
        *   `services/`: Business logic services.
        *   `core/`: Configuration and core settings.
    *   `tests/`: Backend tests.
*   `src/`: The React/TypeScript frontend.
    *   `components/`: Reusable UI components, organized by feature (e.g., `auth`, `jobs`, `profile`).
    *   `pages/`: Top-level page components that correspond to routes.
    *   `hooks/`: Custom React hooks for state management and side effects (e.g., `useAuth`, `useJobsFilter`).
    *   `services/`: Frontend services that communicate with the backend API.
    *   `lib/`: Utility functions and library initializations (e.g., `api-client.ts`).
    *   `types/`: TypeScript type definitions.
    *   `routes/`: Application routing configuration.
    *   `assets/`: Static assets like images and fonts.
*   `docs/`: Project documentation.
*   `public/`: Public assets and `index.html`.

### Process Correlation: User Authentication Flow

Here's an example of how a typical process, user login, flows through the application:

1.  **User Interaction (UI Layer):**
    *   The user enters their credentials into the `LoginForm` component located in [`src/components/auth/LoginForm.tsx`](src/components/auth/LoginForm.tsx).
    *   The `Login` page at [`src/pages/Login.tsx`](src/pages/Login.tsx) renders this component.

2.  **State Management and Logic (Hooks Layer):**
    *   On form submission, the `onSubmit` handler in [`src/pages/Login.tsx`](src/pages/Login.tsx) calls the `login` function from the `useAuth` hook ([`src/hooks/use-auth.tsx`](src/hooks/use-auth.tsx)).

3.  **Frontend Service Layer:**
    *   The `login` function in the `useAuth` hook calls the `login` method in the `AuthService` ([`src/services/auth.service.ts`](src/services/auth.service.ts)).

4.  **API Client (Library Layer):**
    *   `AuthService` uses the shared `apiClient` ([`src/lib/api-client.ts`](src/lib/api-client.ts)) to make a POST request to the backend's `/api/v1/auth/login` endpoint.

5.  **Backend API Layer (FastAPI):**
    *   The request is received by the authentication router in the `jobsportal` backend (e.g., `jobsportal/app/api/v1/endpoints/auth.py`).

6.  **Backend Service and Database Layer:**
    *   The API endpoint calls a service function to authenticate the user, which involves querying the database to verify the user's credentials.

7.  **Response Flow:**
    *   The backend returns a JWT token to the frontend.
    *   The `apiClient` receives the response, and the `AuthService` stores the token and user data.
    *   The `useAuth` hook updates the application's authentication state, and the UI re-renders to show the user as logged in.

## 2. Proposed File Organization

The current file structure is generally well-organized. However, some improvements can be made to enhance consistency and scalability.

### Proposed `src/` Directory Structure

```
src/
├── api/                # Centralized API service definitions (optional, can keep in services)
├── assets/             # Static assets (images, fonts, etc.)
├── components/         # Reusable UI components
│   ├── common/         # Shared components (Button, Input, Card, etc.)
│   ├── features/       # Feature-specific components
│   │   ├── auth/
│   │   ├── jobs/
│   │   └── profile/
│   └── layout/         # Layout components (Navbar, Footer, Sidebar)
├── config/             # Application configuration
├── constants/          # Application-wide constants
├── contexts/           # React context providers
├── hooks/              # Custom React hooks
├── lib/                # Third-party library configurations and utilities
├── pages/              # Page components mapped to routes
├── providers/          # Global application providers (Theme, Auth, etc.)
├── routes/             # Routing configuration
├── services/           # Business logic and API communication
├── store/              # Global state management (e.g., Zustand stores)
├── styles/             # Global styles and themes
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

### Key Improvements:

*   **`components/`:**
    *   `common/`: A dedicated directory for truly generic and reusable components like `Button`, `Input`, and `Card`. This avoids duplication and promotes consistency.
    *   `features/`: Grouping components by feature (`auth`, `jobs`, `profile`) makes it easier to locate and manage feature-specific code.
*   **`store/`:** Centralizing Zustand stores in a `store/` directory improves clarity over mixing them with hooks.
*   **`contexts/` vs. `providers/`:**
    *   `contexts/`: For defining the contexts themselves.
    *   `providers/`: For the components that provide the context values.
*   **`constants/`:** A dedicated place for application-wide constants (e.g., API keys, route paths, default values).

This structure provides a clear separation of concerns and makes the codebase easier to navigate and maintain as the project grows.