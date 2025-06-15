
# Website API Documentation

## Overview
This document describes the frontend API layer for the Career Vision Explorer website. All APIs are mock implementations for frontend-only functionality.

## Base Configuration
- **Base URL**: `/api`
- **Response Format**: JSON
- **Authentication**: Token-based (simulated)
- **Rate Limiting**: Not implemented (frontend-only)

## Authentication
All requests include a simulated authentication token in headers:
```typescript
headers: {
  'Authorization': 'Bearer <token>',
  'Content-Type': 'application/json'
}
```

## Jobs API

### Search Jobs
**Endpoint**: `GET /api/jobs`

**Parameters**:
```typescript
interface JobSearchParams {
  query?: string;           // Job title, company, or keywords
  location?: string;        // Job location
  type?: string;           // "Full-time", "Part-time", "Contract", etc.
  experienceLevel?: string; // "Entry", "Mid", "Senior", "Executive"
  skills?: string[];       // Required skills (comma-separated)
  salaryMin?: number;      // Minimum salary
  salaryMax?: number;      // Maximum salary
  page?: number;           // Page number (default: 1)
  limit?: number;          // Results per page (default: 10)
}
```

**Response**:
```typescript
interface JobsApiResponse {
  jobs: Job[];
  total: number;
  page: number;
  limit: number;
}
```

**Example Usage**:
```typescript
import { JobsApi } from '@/api/jobs-api';

const results = await JobsApi.searchJobs({
  query: 'frontend developer',
  location: 'Nairobi',
  experienceLevel: 'Mid',
  page: 1,
  limit: 20
});
```

### Get Job by ID
**Endpoint**: `GET /api/jobs/:id`

```typescript
const job = await JobsApi.getJobById('job123');
```

### Save/Unsave Job
**Endpoints**: 
- `POST /api/jobs/:id/save`
- `DELETE /api/jobs/:id/save`

```typescript
await JobsApi.saveJob('job123');
await JobsApi.unsaveJob('job123');
```

### Apply to Job
**Endpoint**: `POST /api/jobs/:id/apply`

```typescript
await JobsApi.applyToJob('job123', {
  coverLetter: 'Dear Hiring Manager...',
  resume: 'resume_file_id'
});
```

## Profile API

### Get User Profile
**Endpoint**: `GET /api/profile`

```typescript
const profile = await ProfileApi.getProfile();
```

### Update Profile
**Endpoint**: `PUT /api/profile`

```typescript
const updatedProfile = await ProfileApi.updateProfile({
  name: 'John Doe',
  bio: 'Updated bio',
  skills: ['React', 'Node.js']
});
```

### Upload Profile Image
**Endpoint**: `POST /api/profile/image`

```typescript
const imageUrl = await ProfileApi.uploadProfileImage(imageFile);
```

### Upload Resume
**Endpoint**: `POST /api/profile/resume`

```typescript
const resumeId = await ProfileApi.uploadResume(resumeFile);
```

## Applications API

### Get All Applications
**Endpoint**: `GET /api/applications`

```typescript
const applications = await ApplicationsApi.getApplications();
```

### Get Application by ID
**Endpoint**: `GET /api/applications/:id`

```typescript
const application = await ApplicationsApi.getApplicationById('app123');
```

### Submit Application
**Endpoint**: `POST /api/applications`

```typescript
const newApplication = await ApplicationsApi.submitApplication({
  jobId: 'job123',
  coverLetter: 'Cover letter text',
  resume: 'resume_id'
});
```

### Update Application Status
**Endpoint**: `PUT /api/applications/:id/status`

```typescript
await ApplicationsApi.updateApplicationStatus('app123', 'Interview');
```

### Withdraw Application
**Endpoint**: `DELETE /api/applications/:id`

```typescript
await ApplicationsApi.withdrawApplication('app123');
```

## Career Paths API

### Get All Career Paths
**Endpoint**: `GET /api/career-paths`

```typescript
const careerPaths = await CareerPathsApi.getCareerPaths();
```

### Get Career Path by ID
**Endpoint**: `GET /api/career-paths/:id`

```typescript
const careerPath = await CareerPathsApi.getCareerPathById('path123');
```

### Enroll in Career Path
**Endpoint**: `POST /api/career-paths/:id/enroll`

```typescript
await CareerPathsApi.enrollInCareerPath('path123');
```

### Update Step Progress
**Endpoint**: `PUT /api/career-paths/:pathId/steps/:stepId`

```typescript
await CareerPathsApi.updateStepProgress('path123', 'step456', true);
```

## Skills API

### Get User Skills
**Endpoint**: `GET /api/skills`

```typescript
const skills = await SkillsApi.getUserSkills();
```

### Get Skill Assessments
**Endpoint**: `GET /api/skills/assessments`

```typescript
const assessments = await SkillsApi.getSkillAssessments();
```

### Start Skill Assessment
**Endpoint**: `POST /api/skills/:id/assess`

```typescript
const questions = await SkillsApi.startSkillAssessment('skill123');
```

### Submit Skill Assessment
**Endpoint**: `POST /api/skills/:id/submit`

```typescript
const result = await SkillsApi.submitSkillAssessment('skill123', [0, 2, 1, 3]);
```

### Add New Skill
**Endpoint**: `POST /api/skills`

```typescript
const newSkill = await SkillsApi.addSkill('Vue.js', 'Frontend');
```

## Error Handling

All APIs return consistent error responses:

```typescript
interface ApiError {
  error: {
    code: string;
    message: string;
    details?: any;
  }
}
```

Common error codes:
- `VALIDATION_ERROR`: Invalid request parameters
- `NOT_FOUND`: Resource not found
- `UNAUTHORIZED`: Invalid or missing authentication
- `RATE_LIMITED`: Too many requests
- `SERVER_ERROR`: Internal server error

Example error handling:
```typescript
try {
  const jobs = await JobsApi.searchJobs(params);
} catch (error) {
  if (error.code === 'VALIDATION_ERROR') {
    // Handle validation error
  } else if (error.code === 'NOT_FOUND') {
    // Handle not found
  }
}
```

## Data Models

### Job Model
```typescript
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  matchScore: number;
  skills: string[];
  description: string;
  experienceLevel?: string;
  companyInfo?: {
    logoUrl?: string;
  };
}
```

### User Profile Model
```typescript
interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  education: string;
  experience: string;
  location?: string;
  phone?: string;
  bio?: string;
  profileImage?: string;
  joinDate: string;
  profileComplete: number;
  skills?: string[];
  resume?: string;
}
```

### Application Model
```typescript
interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: "Applied" | "Reviewing" | "Interview" | "Hired" | "Rejected";
  notes?: string;
  coverLetter?: string;
  resume?: string;
}
```
