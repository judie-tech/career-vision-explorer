import { apiClient } from '../lib/api-client';
import { Job, JobCreate, JobUpdate, PaginatedResponse } from '../types/api';

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

class JobsService {
  async getJobs(params?: JobSearchParams): Promise<PaginatedResponse<Job>> {
    const queryParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const queryString = queryParams.toString();
    const endpoint = queryString ? `/jobs?${queryString}` : '/jobs';
    
    return await apiClient.get<PaginatedResponse<Job>>(endpoint);
  }

  async getJobById(jobId: string): Promise<Job> {
    return await apiClient.get<Job>(`/jobs/${jobId}`);
  }

  async createJob(jobData: JobCreate): Promise<Job> {
    return await apiClient.post<Job>('/jobs', jobData);
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
    const endpoint = includeInactive ? `/admin/jobs?include_inactive=true` : '/admin/jobs';
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
    return await apiClient.get<Job[]>('/jobs/search');
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
    return await apiClient.get('/jobs/stats');
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

  // AI-powered job matching
  async aiMatchJobs(params: {
    skills: string[];
    location_preference?: string;
    salary_expectation?: string;
  }): Promise<Array<{
    job_id: string;
    title: string;
    company: string;
    location: string;
    salary_range?: string;
    match_score: number;
    matched_skills: string[];
    created_at: string;
  }>> {
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
    const endpoint = `/jobs/ai-match?${queryString}`;
    
    // Backend expects POST request with query parameters
    return await apiClient.post(endpoint, {});
  }

  // Get employer dashboard data
  async getEmployerDashboard(): Promise<string> {
    return await apiClient.get('/jobs/employer/dashboard');
  }
}

export const jobsService = new JobsService();
