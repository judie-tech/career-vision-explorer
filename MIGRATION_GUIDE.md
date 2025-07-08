# Frontend-Backend Integration Migration Guide

## Overview
This guide provides step-by-step instructions to complete the integration between the Career Vision Explorer frontend and Jobs Portal backend.

## Prerequisites
- Node.js 16+ installed
- Python 3.9+ installed
- Both frontend and backend repositories cloned

## Step 1: Clean Up Duplicate Files

Run the cleanup script to remove duplicate files:

```bash
cd career-vision-explorer
node cleanup-duplicates.js
```

## Step 2: Update Import Statements

After removing duplicates, update any imports that referenced the old paths:

### Before:
```typescript
import { useAuth } from '../core/hooks/use-auth';
```

### After:
```typescript
import { useAuth } from '../hooks/use-auth';
```

## Step 3: Environment Configuration

1. **Frontend (.env)**:
   - Copy `.env.example` to `.env`
   - Update with your actual values
   - DO NOT include sensitive API keys

2. **Backend (.env)**:
   - Ensure all sensitive keys are only in backend
   - Includes: GEMINI_API_KEY, JWT_SECRET, etc.

## Step 4: Start the Services

### Backend:
```bash
cd jobsportal
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Frontend:
```bash
cd career-vision-explorer
npm install
npm run dev
```

## Step 5: Test Integration Points

### 1. Authentication Flow
- Register a new user
- Login with credentials
- Check token storage in localStorage
- Verify profile loads correctly

### 2. Job Operations
- List jobs (public endpoint)
- Search jobs with filters
- Create job (employer only)
- Apply to job (job seeker only)

### 3. Profile Management
- View profile
- Update skills
- Search other profiles

## Step 6: Handle Missing Endpoints

The following endpoints are referenced in frontend but not implemented in backend:

1. **Profile Image Upload** (`/profile/image`)
   - Temporarily disable or show "Coming Soon"
   
2. **Resume Upload** (`/profile/resume`)
   - Temporarily disable or show "Coming Soon"
   
3. **Profile Analytics** (`/profile/analytics`)
   - Remove from UI or show placeholder data

## Step 7: Performance Optimization

1. **Enable Frontend Caching**:
   - Already implemented in services
   - Adjust cache TTL in `api.config.ts` if needed

2. **Monitor API Response Times**:
   - Check browser console for timing logs
   - Identify slow endpoints for optimization

## Step 8: Error Handling

Ensure proper error handling for:
- Network timeouts
- 401 Unauthorized (trigger token refresh)
- 404 Not Found (show appropriate message)
- 500 Server Error (show generic error)

## Common Issues and Solutions

### Issue: "Request timed out after 30 seconds"
**Solution**: Database might be slow on cold start. The frontend will retry with longer timeout automatically.

### Issue: "Profile not found"
**Solution**: New users need to complete profile setup. Redirect to profile completion page.

### Issue: "Invalid token"
**Solution**: Token might be expired. Frontend should automatically refresh token.

### Issue: Job search returns no results
**Solution**: Check if search parameter is being mapped correctly (title → search).

## Testing Checklist

- [ ] User registration works
- [ ] User login works
- [ ] Profile loads after login
- [ ] Jobs list displays correctly
- [ ] Job search/filter works
- [ ] Job application submission works
- [ ] Employer can create jobs
- [ ] Employer can view applicants
- [ ] Admin can access admin panel
- [ ] Logout clears all data

## Next Steps

1. Implement missing backend endpoints
2. Add response caching to backend
3. Implement file upload functionality
4. Add comprehensive error tracking
5. Set up monitoring and analytics

## Support

For issues or questions:
1. Check the INTEGRATION_REPORT.md for detailed findings
2. Review API documentation at http://localhost:8000/docs
3. Check browser console for detailed error messages