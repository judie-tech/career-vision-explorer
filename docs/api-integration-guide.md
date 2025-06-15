
# API Integration Guide

## Quick Start

### 1. Installation
All API services are already included in the project. Import them as needed:

```typescript
import { JobsApi } from '@/api/jobs-api';
import { ProfileApi } from '@/api/profile-api';
import { ApplicationsApi } from '@/api/applications-api';
import { CareerPathsApi } from '@/api/career-paths-api';
import { SkillsApi } from '@/api/skills-api';
import { MobileApi } from '@/api/mobile-api'; // For mobile app only
```

### 2. Basic Usage

```typescript
// Search for jobs
const jobResults = await JobsApi.searchJobs({
  query: 'React Developer',
  location: 'Nairobi'
});

// Get user profile
const profile = await ProfileApi.getProfile();

// Submit job application
const application = await ApplicationsApi.submitApplication({
  jobId: 'job123',
  coverLetter: 'My cover letter...'
});
```

### 3. Error Handling

```typescript
try {
  const jobs = await JobsApi.searchJobs(params);
  console.log('Jobs found:', jobs.jobs.length);
} catch (error) {
  console.error('API Error:', error);
  // Handle error appropriately
}
```

## React Hook Integration

### Custom Hooks for API Calls

```typescript
// hooks/useJobs.ts
import { useState, useEffect } from 'react';
import { JobsApi, JobSearchParams } from '@/api/jobs-api';

export const useJobs = (params: JobSearchParams) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const result = await JobsApi.searchJobs(params);
        setJobs(result.jobs);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [params]);

  return { jobs, loading, error };
};
```

### Usage in Components

```typescript
// components/JobsList.tsx
import { useJobs } from '@/hooks/useJobs';

const JobsList = () => {
  const { jobs, loading, error } = useJobs({
    query: 'developer',
    page: 1,
    limit: 10
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {jobs.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};
```

## State Management Integration

### With Zustand

```typescript
// stores/jobsStore.ts
import { create } from 'zustand';
import { JobsApi } from '@/api/jobs-api';

interface JobsStore {
  jobs: Job[];
  loading: boolean;
  searchJobs: (params: JobSearchParams) => Promise<void>;
  saveJob: (jobId: string) => Promise<void>;
}

export const useJobsStore = create<JobsStore>((set, get) => ({
  jobs: [],
  loading: false,
  
  searchJobs: async (params) => {
    set({ loading: true });
    try {
      const result = await JobsApi.searchJobs(params);
      set({ jobs: result.jobs, loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
  
  saveJob: async (jobId) => {
    await JobsApi.saveJob(jobId);
    // Update local state as needed
  }
}));
```

### With React Query

```typescript
// hooks/useJobsQuery.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { JobsApi } from '@/api/jobs-api';

export const useJobsQuery = (params: JobSearchParams) => {
  return useQuery({
    queryKey: ['jobs', params],
    queryFn: () => JobsApi.searchJobs(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useSaveJobMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: JobsApi.saveJob,
    onSuccess: () => {
      // Invalidate and refetch jobs
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });
};
```

## Testing APIs

### Mock API Responses

```typescript
// __tests__/api-mocks.ts
export const mockJobsResponse = {
  jobs: [
    {
      id: '1',
      title: 'Frontend Developer',
      company: 'Tech Corp',
      location: 'Nairobi',
      type: 'Full-time',
      salary: '100K-150K',
      posted: '2 days ago',
      matchScore: 90,
      skills: ['React', 'TypeScript'],
      description: 'Great opportunity...'
    }
  ],
  total: 1,
  page: 1,
  limit: 10
};
```

### Unit Tests

```typescript
// __tests__/jobs-api.test.ts
import { JobsApi } from '@/api/jobs-api';

describe('JobsApi', () => {
  test('searchJobs returns formatted response', async () => {
    const result = await JobsApi.searchJobs({ query: 'developer' });
    
    expect(result).toHaveProperty('jobs');
    expect(result).toHaveProperty('total');
    expect(result.jobs).toBeInstanceOf(Array);
  });

  test('getJobById returns single job', async () => {
    const job = await JobsApi.getJobById('1');
    
    expect(job).toHaveProperty('id');
    expect(job).toHaveProperty('title');
  });
});
```

## Best Practices

### 1. Error Boundaries

```typescript
// components/ApiErrorBoundary.tsx
import React from 'react';

class ApiErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong with the API</h2>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### 2. Loading States

```typescript
// components/LoadingSpinner.tsx
export const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
  </div>
);
```

### 3. Retry Logic

```typescript
// utils/apiUtils.ts
export const withRetry = async (fn: Function, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
};

// Usage
const jobsWithRetry = await withRetry(() => JobsApi.searchJobs(params));
```

### 4. Caching Strategy

```typescript
// utils/cache.ts
class ApiCache {
  private cache = new Map();
  private ttl = 5 * 60 * 1000; // 5 minutes

  set(key: string, data: any) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  get(key: string) {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }
}

export const apiCache = new ApiCache();
```

## Migration Guide

### From Mock to Real APIs

When you're ready to connect to real backend APIs:

1. **Update base URLs** in each API service
2. **Add authentication headers** to requests
3. **Handle real error responses** from server
4. **Update response interfaces** to match backend schema
5. **Add request/response logging** for debugging

```typescript
// Example migration for JobsApi
export class JobsApi {
  private static baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
  
  static async searchJobs(params: JobSearchParams): Promise<JobsApiResponse> {
    const queryParams = new URLSearchParams();
    // ... build query params
    
    const response = await fetch(`${this.baseUrl}/jobs?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    return response.json();
  }
}
```

This guide provides a complete foundation for integrating and using the frontend APIs in your Career Vision Explorer application.
