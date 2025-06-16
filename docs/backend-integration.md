# Backend Integration Guide

This document outlines the complete integration between the React frontend and FastAPI backend.

## Architecture Overview

```
Frontend (React + TypeScript)
├── API Client Layer (src/lib/api-client.ts)
├── Services Layer (src/services/)
├── Hooks Layer (src/hooks/ & src/core/hooks/)
├── Components Layer (src/components/)
└── Pages Layer (src/pages/)

Backend (FastAPI + Python)
├── API Routes (jobsportal/app/routes/)
├── Services (jobsportal/app/services/)
├── Models (jobsportal/app/models/)
├── Schemas (jobsportal/app/schema/)
└── Database (Supabase PostgreSQL)
```

## Setup Instructions

### 1. Environment Configuration

Create `.env` file in the root directory:
```env
# Backend API Configuration
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_BACKEND_URL=http://localhost:8000

# Supabase Configuration
VITE_SUPABASE_URL=https://oxmwdtwhdslfiqspobch.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Backend Setup

Navigate to the backend directory:
```bash
cd jobsportal
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 3. Frontend Setup

Install dependencies and start the development server:
```bash
npm install
npm run dev
```

## API Integration

### Authentication Flow

1. **Registration/Login**: Uses `/auth/register` and `/auth/login` endpoints
2. **Token Management**: JWT tokens stored in localStorage
3. **Auto-refresh**: Tokens automatically refreshed when expired
4. **Role-based Access**: Support for job_seeker, employer, and admin roles

### Services Architecture

#### Auth Service (`src/services/auth.service.ts`)
- User authentication and authorization
- Token management and refresh
- Role-based access control

#### Jobs Service (`src/services/jobs.service.ts`)
- Job CRUD operations
- Advanced search and filtering
- AI-powered job recommendations

#### Profile Service (`src/services/profile.service.ts`)
- User profile management
- Resume upload and analysis
- Skills management

#### Applications Service (`src/services/applications.service.ts`)
- Job application management
- Application status tracking
- Bulk operations for employers

#### Skills Service (`src/services/skills.service.ts`)
- Skills assessment and tracking
- Skill gap analysis
- Market demand insights

#### AI Service (`src/services/ai.service.ts`)
- Resume analysis
- Job matching
- Career path recommendations
- Interview question generation

### Mobile API Integration

#### Offline Support
- Data caching for offline use
- Sync mechanism for pending changes
- Progressive Web App capabilities

#### Push Notifications
- Device registration
- Notification delivery
- Scheduling system

#### Performance Optimization
- Critical data preloading
- Lazy loading strategies
- Efficient caching

## Database Schema Integration

### User Management
- **profile** table: User profiles with skills and preferences
- **users** table: Legacy user data (being migrated)

### Job Management
- **jobs_listing** table: Job postings with full details
- **applications** table: Job applications with status tracking

### Skills & Analytics
- **skills_listing** table: Available skills with market data
- **recommendations** table: AI-generated skill recommendations

## API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/refresh` - Token refresh
- `GET /auth/me` - Current user info

### Jobs
- `GET /jobs` - Search jobs with filters
- `GET /jobs/{id}` - Get job details
- `POST /jobs` - Create job (employers)
- `PUT /jobs/{id}` - Update job
- `DELETE /jobs/{id}` - Delete job

### Applications
- `GET /applications` - Get user applications
- `POST /applications` - Submit application
- `PUT /applications/{id}` - Update application
- `DELETE /applications/{id}` - Withdraw application

### Profile
- `GET /profile` - Get user profile
- `PUT /profile` - Update profile
- `POST /profile/image` - Upload profile image
- `POST /profile/resume` - Upload resume

### Skills
- `GET /skills` - Get available skills
- `POST /skills/{name}/assess` - Start skill assessment
- `POST /skills/{name}/submit` - Submit assessment
- `GET /skills/recommendations` - Get skill recommendations

### AI Features
- `POST /ai/analyze-resume` - Analyze resume
- `POST /ai/job-match` - Analyze job match
- `POST /ai/skill-gap` - Skill gap analysis
- `POST /ai/interview-questions` - Generate interview questions

## Error Handling

### API Client
- Automatic token refresh on 401 errors
- Retry logic for network failures
- Graceful degradation for offline mode

### Service Layer
- Comprehensive error catching
- User-friendly error messages
- Fallback mechanisms

## Testing

### Frontend Testing
```bash
npm run test
npm run test:e2e
```

### Backend Testing
```bash
cd jobsportal
python -m pytest
```

### Integration Testing
```bash
npm run test:integration
```

## Deployment

### Production Environment Variables
```env
VITE_API_BASE_URL=https://your-api-domain.com/api/v1
VITE_BACKEND_URL=https://your-api-domain.com
```

### Build Commands
```bash
# Frontend
npm run build

# Backend
cd jobsportal
pip install -r requirements.txt
```

## Performance Considerations

1. **API Response Caching**: Implemented in React Query
2. **Lazy Loading**: Components and routes loaded on demand
3. **Image Optimization**: Automatic image compression
4. **Bundle Splitting**: Code split by routes and features
5. **Service Worker**: Offline functionality and caching

## Security

1. **JWT Authentication**: Secure token-based auth
2. **Role-based Access**: Different permissions per user type
3. **Input Validation**: Both frontend and backend validation
4. **CORS Configuration**: Proper cross-origin settings
5. **Rate Limiting**: API rate limiting on backend

## Monitoring & Analytics

1. **Error Tracking**: Frontend error boundaries
2. **Performance Monitoring**: Web vitals tracking
3. **User Analytics**: Usage pattern analysis
4. **API Monitoring**: Response time and error rate tracking

## Support

For questions or issues:
1. Check the error logs in browser dev tools
2. Verify backend server is running on port 8000
3. Ensure database connection is working
4. Check network connectivity for API calls