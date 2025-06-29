import { create } from "zustand";
import { toast } from "sonner";
import { jobsService } from "../services/jobs.service";
import { Job, JobCreate, JobUpdate } from "../types/api";

// Define AdminJob UI type separately from API Job
export interface EmployerJob extends Job {
  id: string;
  postedDate: string;
  status: "active" | "expired" | "draft";
  applications: number;
  type: string;
  experience: string;
  department: string;
}

// Helper to transform API Job into UI EmployerJob shape
function toEmployerJob(job: Job): EmployerJob {
  return {
    ...job,
    id: job.job_id,
    postedDate: new Date(job.created_at).toISOString().split("T")[0],
    status: job.is_active ? "active" : "expired",
    applications: job.application_count ?? 0,
    description: job.description ?? "",
    requirements: typeof job.requirements === 'string' ? job.requirements.split(/\r?\n|,/) : job.requirements,
    salary: job.salary_range ?? "",
    type: (job.job_type?.toLowerCase() as any) || "full-time",
    experience: job.experience_level ?? "",
    department: job.posted_by_company ?? "",
  };
}

function toEmployerJobs(jobs: Job[]): EmployerJob[] {
  return jobs.map(toEmployerJob);
}

interface EmployerJobsStore {
  jobs: EmployerJob[];
  filteredJobs: EmployerJob[];
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
  getJobById: (id: string) => EmployerJob | undefined;
}

export const useEmployerJobs = create<EmployerJobsStore>((set, get) => ({
  jobs: [],
  filteredJobs: [],
  searchQuery: "",
  statusFilter: "all",
  loading: false,
  error: null,

  fetchJobs: async () => {
    set({ loading: true, error: null });
    try {
      const apiJobs = await jobsService.getMyJobs(true);
      const employerJobs = toEmployerJobs(apiJobs);
      set((state) => ({
        jobs: employerJobs,
        filteredJobs: filterJobs(employerJobs, state.searchQuery, state.statusFilter),
        loading: false,
      }));
    } catch (error: any) {
      set({ loading: false, error: error?.message || "Failed to fetch jobs" });
      toast.error("Failed to fetch jobs");
    }
  },

  addJob: async (jobData) => {
    set({ loading: true, error: null });
    try {
      const newApiJob = await jobsService.createJob(jobData);
      const newEmployerJob = toEmployerJob(newApiJob);
      set((state) => ({
        jobs: [...state.jobs, newEmployerJob],
        filteredJobs: filterJobs([...state.jobs, newEmployerJob], state.searchQuery, state.statusFilter),
        loading: false,
      }));
      toast.success(`Job "${jobData.title}" has been created successfully`);
    } catch (error: any) {
      set({ loading: false, error: error?.message || "Failed to create job" });
      toast.error("Failed to create job");
    }
  },

  updateJob: async (id, updates) => {
    set({ loading: true, error: null });
    try {
      const updatedApiJob = await jobsService.updateJob(id, updates);
      const updatedEmployerJob = toEmployerJob(updatedApiJob);
      set((state) => ({
        jobs: state.jobs.map(job =>
          job.id === id ? updatedEmployerJob : job
        ),
        filteredJobs: filterJobs(
          state.jobs.map(job => (job.id === id ? updatedEmployerJob : job)),
          state.searchQuery,
          state.statusFilter
        ),
        loading: false,
      }));
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
      set((state) => ({
        jobs: state.jobs.filter(j => j.id !== id),
        filteredJobs: filterJobs(
          state.jobs.filter(j => j.id !== id),
          state.searchQuery,
          state.statusFilter
        ),
        loading: false,
      }));
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
    return get().jobs.find(job => job.id === id);
  },
}));

function filterJobs(jobs: EmployerJob[], searchQuery: string, statusFilter: string): EmployerJob[] {
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