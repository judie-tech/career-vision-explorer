
import { create } from "zustand";
import { toast } from "sonner";
import { jobsService } from "../services/jobs.service";
import { Job, JobCreate, JobUpdate } from "../types/api";

// Define AdminJob UI type separately from API Job
export interface AdminJob {
  id: string;
  title: string;
  company: string;
  location: string;
  postedDate: string;
  status: "active" | "expired" | "draft";
  applications: number;
  description: string;
  requirements: string[];
  salary: string;
  type: string;
  experience: string;
  department: string;
}

// Helper to convert API Job to AdminJob UI shape
function toAdminJob(job: Job): AdminJob {
  return {
    id: job.job_id,
    title: job.title,
    company: job.company,
    location: job.location,
    postedDate: new Date(job.created_at).toISOString().split("T")[0],
    status: job.is_active ? "active" : "expired",
    applications: job.application_count ?? 0,
    description: job.description ?? "",
    requirements: job.requirements,
    salary: job.salary_range ?? "",
    type: job.job_type?.toLowerCase() || "full-time",
    experience: job.experience_level ?? "",
    department: job.posted_by_company ?? "",
  };
}

function toAdminJobs(jobs: Job[]): AdminJob[] {
  return jobs.map(toAdminJob);
}

// AdminJob UI shape
export interface AdminJob {
  id: string;
  title: string;
  company: string;
  location: string;
  postedDate: string;
  status: "active" | "expired" | "draft";
  applications: number;
  description: string;
  requirements: string[];
  salary: string;
  type: string;
  experience: string;
  department: string;
}

// Convert API Job to UI AdminJob
function toAdminJob(job: Job): AdminJob {
  return {
    id: job.job_id,
    title: job.title,
    company: job.company,
    location: job.location,
    postedDate: new Date(job.created_at).toISOString().split("T")[0],
    status: job.is_active ? "active" : "expired",
    applications: job.application_count ?? 0,
    description: job.description ?? "",
    requirements: job.requirements,
    salary: job.salary_range ?? "",
    type: job.job_type?.toLowerCase() || "full-time",
    experience: job.experience_level ?? "",
    department: job.posted_by_company ?? "",
  };
}

function toAdminJobs(jobs: Job[]): AdminJob[] {
  return jobs.map(toAdminJob);
}

// Helper to transform API Job into UI AdminJob shape
function toAdminJob(job: Job): AdminJob {
  return {
    id: job.job_id,
    title: job.title,
    company: job.company,
    location: job.location,
    postedDate: new Date(job.created_at).toISOString().split("T")[0],
    status: job.is_active ? "active" : "expired",
    applications: job.application_count ?? 0,
    description: job.description ?? "",
    requirements: job.requirements.split(/\r?\n|,/),
    salary: job.salary_range ?? "",
    type: (job.job_type?.toLowerCase() as any) || "full-time",
    experience: job.experience_level ?? "",
    department: job.posted_by_company ?? "",
  };
}

function toAdminJobs(jobs: Job[]): AdminJob[] {
  return jobs.map(toAdminJob);
}

export interface AdminJob extends Job {}

interface AdminJobsStore {
  jobs: AdminJob[];
  filteredJobs: AdminJob[];
  searchQuery: string;
  statusFilter: string;
  loading: boolean;
  error: string | null;
  fetchJobs: () => Promise<void>;
  addJob: (job: JobCreate) => Promise<void>;
  updateJob: (id: string, job: JobUpdate) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: string) => void;
  getJobById: (id: string) => AdminJob | undefined;
}

export const useAdminJobs = create<AdminJobsStore>((set, get) => ({
  jobs: [],
  filteredJobs: [],
  searchQuery: "",
  statusFilter: "all",
  loading: false,
  error: null,

  fetchJobs: async () => {
    set({ loading: true, error: null });
    try {
      const jobs = await jobsService.getMyJobs(true);
      set((state) => ({
        jobs,
        filteredJobs: filterJobs(jobs, state.searchQuery, state.statusFilter),
        loading: false,
        error: null,
      }));
    } catch (error: any) {
      set({ loading: false, error: error?.message || "Failed to fetch jobs" });
      toast.error("Failed to fetch jobs");
    }
  },

  addJob: async (jobData) => {
    set({ loading: true, error: null });
    try {
      const newJob = await jobsService.createJob(jobData);
      set((state) => {
        const newJobs = [...state.jobs, newJob];
        return {
          jobs: newJobs,
          filteredJobs: filterJobs(newJobs, state.searchQuery, state.statusFilter),
          loading: false,
          error: null,
        };
      });
      toast.success(`Job "${jobData.title}" has been created successfully`);
    } catch (error: any) {
      set({ loading: false, error: error?.message || "Failed to create job" });
      toast.error("Failed to create job");
    }
  },

  updateJob: async (id, updates) => {
    set({ loading: true, error: null });
    try {
      const updatedJob = await jobsService.updateJob(id, updates);
      set((state) => {
        const newJobs = state.jobs.map(job =>
          job.job_id === id ? updatedJob : job
        );
        return {
          jobs: newJobs,
          filteredJobs: filterJobs(newJobs, state.searchQuery, state.statusFilter),
          loading: false,
          error: null,
        };
      });
      toast.success(`Job has been updated successfully`);
    } catch (error: any) {
      set({ loading: false, error: error?.message || "Failed to update job" });
      toast.error("Failed to update job");
    }
  },

  deleteJob: async (id) => {
    set({ loading: true, error: null });
    try {
      await jobsService.deleteJob(id);
      set((state) => {
        const newJobs = state.jobs.filter(j => j.job_id !== id);
        return {
          jobs: newJobs,
          filteredJobs: filterJobs(newJobs, state.searchQuery, state.statusFilter),
          loading: false,
          error: null,
        };
      });
      toast.success(`Job has been deleted successfully`);
    } catch (error: any) {
      set({ loading: false, error: error?.message || "Failed to delete job" });
      toast.error("Failed to delete job");
    }
  },

  setSearchQuery: (query) => {
    set((state) => ({
      searchQuery: query,
      filteredJobs: filterJobs(state.jobs, query, state.statusFilter),
    }));
  },

  setStatusFilter: (status) => {
    set((state) => ({
      statusFilter: status,
      filteredJobs: filterJobs(state.jobs, state.searchQuery, status),
    }));
  },

  getJobById: (id) => {
    return get().jobs.find(job => job.job_id === id);
  },
}));

function filterJobs(jobs: AdminJob[], searchQuery: string, statusFilter: string): AdminJob[] {
  return jobs.filter(job => {
    const matchesSearch = searchQuery === "" ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && job.is_active) ||
      (statusFilter === "inactive" && !job.is_active);

    return matchesSearch && matchesStatus;
  });
}
