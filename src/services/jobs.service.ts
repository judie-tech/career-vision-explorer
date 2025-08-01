import { apiClient } from '../lib/api-client';
import { Job, JobCreate, JobUpdate, PaginatedResponse } from '../types/api';
import { trackDbOperation } from '../utils/performance';

export interface JobSearchParams {
  title?: string;
  company?: string;
  location?: string;
  salary_range?: string;
  is_active?: boolean;
  skills?: string[];
  sort_by?: 'created_at' | 'updated_at' | 'title' | 'company';
  sort_order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

// Simple in-memory cache with expiration
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

class JobsService {
  private cache = new Map<string, CacheEntry<any>>();
  private pendingRequests = new Map<string, Promise<any>>();
  private readonly CACHE_TTL = 60000; // 60 seconds cache TTL
  private readonly SHORT_CACHE_TTL = 30000; // 30 seconds for frequent requests
  private readonly AI_CACHE_TTL = 300000; // 5 minutes for AI-generated content

  private getCacheKey(endpoint: string, params?: any): string {
    return `${endpoint}_${JSON.stringify(params || {})}`;
  }

  private isExpired(entry: CacheEntry<any>): boolean {
    return Date.now() > entry.expiresAt;
  }

  private getFromCache<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (entry && !this.isExpired(entry)) {
      console.log(`Cache hit for: ${key}`);
      return entry.data;
    }
    
    if (entry && this.isExpired(entry)) {
      this.cache.delete(key);
      console.log(`Cache expired for: ${key}`);
    }
    
    return null;
  }

  private setCache<T>(key: string, data: T, ttl: number = this.CACHE_TTL): void {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      expiresAt: Date.now() + ttl
    };
    this.cache.set(key, entry);
    console.log(`Cached: ${key} (expires in ${ttl}ms)`);
  }

  private async dedupedRequest<T>(key: string, requestFn: () => Promise<T>): Promise<T> {
    // Check if there's already a pending request for this key
    const pendingRequest = this.pendingRequests.get(key);
    if (pendingRequest) {
      console.log(`Deduplicating request for: ${key}`);
      return pendingRequest;
    }

    // Create new request and store it
    const promise = requestFn().finally(() => {
      // Clean up pending request when done
      this.pendingRequests.delete(key);
    });

    this.pendingRequests.set(key, promise);
    return promise;
  }

  async getJobs(params?: JobSearchParams, options?: { signal?: AbortSignal; skipCache?: boolean }): Promise<PaginatedResponse<Job>> {
    return trackDbOperation('Load Jobs', async () => {
      const queryParams = new URLSearchParams();
      
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            // Map frontend parameter names to backend expected names
            if (key === 'title') {
              queryParams.append('search', value.toString());
            } else {
              queryParams.append(key, value.toString());
            }
          }
        });
      }
      
      const queryString = queryParams.toString();
      const endpoint = queryString ? `/jobs/?${queryString}` : '/jobs/';
      const cacheKey = this.getCacheKey(endpoint, params);

      // Check cache first (unless explicitly skipped)
      if (!options?.skipCache) {
        const cached = this.getFromCache<PaginatedResponse<Job>>(cacheKey);
        if (cached) {
          return cached;
        }
      }

      // Use deduplication for multiple simultaneous requests
      return this.dedupedRequest(cacheKey, async () => {
        try {
          // Try fast timeout first for better UX
          let result: PaginatedResponse<Job>;
          try {
            result = await apiClient.getFast<PaginatedResponse<Job>>(endpoint, { signal: options?.signal });
          } catch (error: any) {
            if (error.message?.includes('timed out') && !options?.signal?.aborted) {
              console.log('Fast request timed out, trying with longer timeout...');
              result = await apiClient.get<PaginatedResponse<Job>>(endpoint, { timeout: 30000, signal: options?.signal });
            } else {
              throw error;
            }
          }

          // Cache successful response with shorter TTL for frequent requests
          this.setCache(cacheKey, result, this.SHORT_CACHE_TTL);
          return result;
        } catch (error: any) {
          console.error('Jobs API request failed:', error);
          throw error;
        }
      });
    });
  }

  async getJobById(jobId: string): Promise<Job> {
    return await apiClient.get<Job>(`/jobs/${jobId}`);
  }

  async createJob(jobData: JobCreate): Promise<Job> {
    return await apiClient.post<Job>('/jobs/', jobData);
  }

  async updateJob(jobId: string, jobData: JobUpdate): Promise<Job> {
    return await apiClient.put<Job>(`/jobs/${jobId}`, jobData);
  }

  async deleteJob(jobId: string): Promise<{ message: string }> {
    return await apiClient.delete<{ message: string }>(`/jobs/${jobId}`);
  }

  async getMyJobs(includeInactive = false): Promise<Job[]> {
    const endpoint = includeInactive ? `/jobs/my-jobs?include_inactive=true` : '/jobs/my-jobs';
    return await apiClient.get<Job[]>(endpoint);
  }

  async getAllJobs(includeInactive = false): Promise<Job[]> {
    const endpoint = includeInactive ? `/jobs/admin/jobs/?include_inactive=true` : '/jobs/admin/jobs/';
    return await apiClient.get<Job[]>(endpoint);
  }

  async activateJob(jobId: string): Promise<Job> {
    return await apiClient.post<Job>(`/jobs/${jobId}/activate`);
  }

  async deactivateJob(jobId: string): Promise<Job> {
    return await apiClient.post<Job>(`/jobs/${jobId}/deactivate`);
  }

  // Search jobs by user's skills
  async searchJobsBySkills(): Promise<Job[]> {
    return await apiClient.get<Job[]>('/jobs/search/');
  }

  // Get global job statistics
  async getJobStats(): Promise<{
    total_jobs: number;
    active_jobs: number;
    total_applications: number;
    companies_count: number;
    locations_count: number;
    avg_applications_per_job: number;
  }> {
    return await apiClient.get('/jobs/stats/');
  }

  // Get my job statistics (employer only)
  async getMyJobStats(): Promise<{
    total_jobs: number;
    active_jobs: number;
    total_applications: number;
    companies_count: number;
    locations_count: number;
    avg_applications_per_job: number;
  }> {
    return await apiClient.get('/jobs/my-stats');
  }

  // AI-powered job matching with request cancellation support
  async aiMatchJobs(
    params: {
      skills: string[];
      location_preference?: string;
      salary_expectation?: string;
    },
    options?: { signal?: AbortSignal }
  ): Promise<Array<{
    job_id: string;
    title: string;
    company: string;
    location: string;
    salary_range?: string;
    match_score: number;
    matched_skills: string[];
    created_at: string;
  }>> {
    return trackDbOperation('AI Job Matching', async () => {
      const queryParams = new URLSearchParams();
      
      // Add skills as multiple query parameters
      params.skills.forEach(skill => {
        queryParams.append('skills', skill);
      });
      
      if (params.location_preference) {
        queryParams.append('location_preference', params.location_preference);
      }
      
      if (params.salary_expectation) {
        queryParams.append('salary_expectation', params.salary_expectation);
      }
      
      const queryString = queryParams.toString();
      const endpoint = `/jobs/ai-match/?${queryString}`;
      
      // Backend expects POST request with query parameters and signal for cancellation
      return await apiClient.post(endpoint, {}, { signal: options?.signal });
    });
  }

  // Get employer dashboard data
  async getEmployerDashboard(): Promise<string> {
    return await apiClient.get('/jobs/employer/dashboard');
  }

  // Cache AI results with longer TTL
  cacheAIResult<T>(key: string, data: T): void {
    this.setCache(key, data, this.AI_CACHE_TTL);
  }

  getCachedAIResult<T>(key: string): T | null {
    return this.getFromCache<T>(key);
  }

  // Clear cache (useful for testing or when data needs refresh)
  clearCache(): void {
    this.cache.clear();
    console.log('Cache cleared');
  }
}

export const jobsService = new JobsService();
