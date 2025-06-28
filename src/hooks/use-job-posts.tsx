
import { create } from "zustand";
import { toast } from "sonner";
import { jobsService } from "../services/jobs.service";


export interface JobPost {
  id: string;
  title: string;
  description: string;
  location: string;
  type: string;
  salary: string;
  isBoosted: boolean;
  datePosted: string;
  applicants: number;
  views: number;
}

export interface JobFilters {
  jobType?: string;
  dateRange?: number;
  boostedOnly?: boolean;
  searchQuery?: string;
  location?: string;
}

interface JobStore {
  jobs: JobPost[];
  filteredJobs: JobPost[];
  filters: JobFilters;
  addJob: (job: JobPost) => void;
  removeJob: (id: string) => void;
  updateJob: (id: string, updatedJob: Partial<JobPost>) => void;
  getJob: (id: string) => JobPost | undefined;
  updateFilters: (filters: Partial<JobFilters>) => void;
  resetFilters: () => void;
}

// Enhanced sample job data
const initialJobs: JobPost[] = [];

export const useJobPosts = create<JobStore>((set, get) => ({
  jobs: [],
  filteredJobs: [],
  filters: {
    jobType: 'all',
    dateRange: 30,
    boostedOnly: false,
    searchQuery: '',
    location: 'all',
  },

  fetchJobs: async () => {
    try {
      const response = await jobsService.getJobs();
      // Map API jobs to JobPost UI shape
      const mappedJobs: JobPost[] = response.jobs.map(job => ({
        id: job.job_id,
        title: job.title,
        description: job.description ?? '',
        location: job.location,
        type: job.job_type ?? 'Full-time',
        salary: job.salary_range ?? '',
        isBoosted: false, // No field in API, default false
        datePosted: job.created_at,
        applicants: job.application_count ?? 0,
        views: 0, // No field in API, default 0
      }));
      set({
        jobs: mappedJobs,
        filteredJobs: mappedJobs,
      });
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
      toast.error('Failed to load jobs');
    }
  },

  addJob: (job) => {
    set((state) => {
      const newJobs = [...state.jobs, job];
      return {
        jobs: newJobs,
        filteredJobs: applyFilters(newJobs, state.filters),
      };
    });
    toast.success("Job posted successfully!");
  },

  removeJob: (id) => {
    const jobToRemove = get().jobs.find(job => job.id === id);
    if (jobToRemove) {
      set((state) => {
        const newJobs = state.jobs.filter(job => job.id !== id);
        return {
          jobs: newJobs,
          filteredJobs: applyFilters(newJobs, state.filters),
        };
      });
      toast.success(`Job "${jobToRemove.title}" has been deleted.`);
    }
  },

  updateJob: (id, updatedJob) => {
    const jobs = get().jobs;
    const jobIndex = jobs.findIndex(job => job.id === id);
    
    if (jobIndex !== -1) {
      const updatedJobs = [...jobs];
      updatedJobs[jobIndex] = { ...updatedJobs[jobIndex], ...updatedJob };
      
      set((state) => ({
        jobs: updatedJobs,
        filteredJobs: applyFilters(updatedJobs, state.filters),
      }));
      toast.success(`Job updated successfully.`);
    }
  },

  getJob: (id) => {
    return get().jobs.find(job => job.id === id);
  },

  updateFilters: (newFilters) => {
    set((state) => {
      const updatedFilters = { ...state.filters, ...newFilters };
      return {
        filters: updatedFilters,
        filteredJobs: applyFilters(state.jobs, updatedFilters),
      };
    });
  },

  resetFilters: () => {
    const defaultFilters = {
      jobType: 'all',
      dateRange: 30,
      boostedOnly: false,
      searchQuery: '',
      location: 'all',
    };
    set((state) => ({
      filters: defaultFilters,
      filteredJobs: applyFilters(state.jobs, defaultFilters),
    }));
  },
}));


// Enhanced filter function
function applyFilters(jobs: JobPost[], filters: JobFilters): JobPost[] {
  return jobs.filter(job => {
    // Filter by job type
    if (filters.jobType && filters.jobType !== 'all' && job.type !== filters.jobType) {
      return false;
    }
    
    // Filter by location
    if (filters.location && filters.location !== 'all' && !job.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    
    // Filter by date range
    if (filters.dateRange) {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - filters.dateRange);
      if (new Date(job.datePosted) < cutoffDate) {
        return false;
      }
    }
    
    // Filter by boosted status
    if (filters.boostedOnly && !job.isBoosted) {
      return false;
    }
    
    // Filter by search query
    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const query = filters.searchQuery.toLowerCase();
      return (
        job.title.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query) ||
        job.type.toLowerCase().includes(query) ||
        job.salary.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
}
