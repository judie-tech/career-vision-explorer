import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { jobsService } from '@/services/jobs.service';
import { Job, JobCreate, JobUpdate } from '@/types/api';
import { toast } from 'sonner';
import { useState, useMemo, useEffect } from 'react';
import { useApiErrorHandler } from './use-api-error-handler';

// Define EmployerJob UI type separately from API Job
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

const EMPLOYER_JOBS_QUERY_KEY = 'employer-jobs';

export const useEmployerJobs = () => {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { handleApiError } = useApiErrorHandler();

  // Fetch employer jobs
  const {
    data: jobs = [],
    isLoading,
    error,
    refetch
  } = useQuery<Job[], Error>({
    queryKey: [EMPLOYER_JOBS_QUERY_KEY],
    queryFn: () => jobsService.getMyJobs(true),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep cache for 10 minutes
    retry: (failureCount, error) => {
      // Don't retry on 401/403 errors
      if (error?.message?.includes('401') || error?.message?.includes('403')) {
        return false;
      }
      return failureCount < 3;
    },
  });

  // Handle API errors with proper redirects for 401/403
  useEffect(() => {
    if (error) {
      handleApiError(error, 'Failed to load employer jobs');
    }
  }, [error, handleApiError]);

  // Transform jobs to employer format
  const employerJobs = useMemo(() => toEmployerJobs(jobs), [jobs]);

  // Filter jobs based on search and status
  const filteredJobs = useMemo(() => {
    return employerJobs.filter(job => {
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
  }, [employerJobs, searchQuery, statusFilter]);

  // Create job mutation
  const createJobMutation = useMutation<Job, Error, JobCreate>({
    mutationFn: (jobData) => jobsService.createJob(jobData),
    onSuccess: (newJob, variables) => {
      queryClient.invalidateQueries({ queryKey: [EMPLOYER_JOBS_QUERY_KEY] });
      toast.success(`Job "${variables.title}" has been created successfully`);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create job");
    },
  });

  // Update job mutation
  const updateJobMutation = useMutation<Job, Error, { id: string; updates: JobUpdate }>({
    mutationFn: ({ id, updates }) => jobsService.updateJob(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EMPLOYER_JOBS_QUERY_KEY] });
      toast.success("Job has been updated successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update job");
    },
  });

  // Delete job mutation
  const deleteJobMutation = useMutation<{ message: string }, Error, string>({
    mutationFn: (id) => jobsService.deleteJob(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EMPLOYER_JOBS_QUERY_KEY] });
      toast.success("Job has been deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete job");
    },
  });

  // Get job by ID
  const getJobById = (id: string) => {
    return employerJobs.find(job => job.id === id);
  };

  return {
    jobs: employerJobs,
    filteredJobs,
    searchQuery,
    statusFilter,
    loading: isLoading || createJobMutation.isPending || updateJobMutation.isPending || deleteJobMutation.isPending,
    error: error?.message || null,
    fetchJobs: refetch,
    addJob: createJobMutation.mutate,
    updateJob: (id: string, updates: JobUpdate) => updateJobMutation.mutate({ id, updates }),
    deleteJob: deleteJobMutation.mutate,
    setSearchQuery,
    setStatusFilter,
    getJobById,
  };
};
