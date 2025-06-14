
import { useState, createContext, useContext, ReactNode } from 'react';
import { toast } from "@/components/ui/sonner";

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "remote";
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  status: "active" | "paused" | "closed";
  postedDate: string;
  closingDate?: string;
  applicants: number;
  views: number;
  employerId: string;
};

type JobsContextType = {
  jobs: Job[];
  createJob: (jobData: Omit<Job, 'id' | 'postedDate' | 'applicants' | 'views'>) => Promise<boolean>;
  updateJob: (id: string, jobData: Partial<Job>) => Promise<boolean>;
  deleteJob: (id: string) => Promise<boolean>;
  getJobById: (id: string) => Job | undefined;
  getJobsByStatus: (status: Job['status']) => Job[];
  isLoading: boolean;
};

const JobsContext = createContext<JobsContextType | undefined>(undefined);

const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "full-time",
    salary: "$120,000 - $150,000",
    description: "We are looking for an experienced frontend developer to join our team.",
    requirements: ["React", "TypeScript", "5+ years experience"],
    benefits: ["Health insurance", "401k", "Remote work"],
    status: "active",
    postedDate: "2024-03-01",
    closingDate: "2024-04-01",
    applicants: 45,
    views: 320,
    employerId: "2",
  },
  {
    id: "2",
    title: "Product Manager",
    company: "StartupXYZ",
    location: "New York, NY",
    type: "full-time",
    salary: "$100,000 - $130,000",
    description: "Lead product development and strategy for our growing startup.",
    requirements: ["MBA", "Product management", "3+ years experience"],
    benefits: ["Equity", "Health insurance", "Flexible hours"],
    status: "active",
    postedDate: "2024-03-05",
    applicants: 23,
    views: 180,
    employerId: "2",
  },
];

export const JobsProvider = ({ children }: { children: ReactNode }) => {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [isLoading, setIsLoading] = useState(false);

  const createJob = async (jobData: Omit<Job, 'id' | 'postedDate' | 'applicants' | 'views'>): Promise<boolean> => {
    setIsLoading(true);
    try {
      const newJob: Job = {
        ...jobData,
        id: Date.now().toString(),
        postedDate: new Date().toISOString().split('T')[0],
        applicants: 0,
        views: 0,
      };
      setJobs(prev => [...prev, newJob]);
      toast.success("Job created successfully");
      return true;
    } catch (error) {
      toast.error("Failed to create job");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateJob = async (id: string, jobData: Partial<Job>): Promise<boolean> => {
    setIsLoading(true);
    try {
      setJobs(prev => prev.map(job => 
        job.id === id ? { ...job, ...jobData } : job
      ));
      toast.success("Job updated successfully");
      return true;
    } catch (error) {
      toast.error("Failed to update job");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteJob = async (id: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      setJobs(prev => prev.filter(job => job.id !== id));
      toast.success("Job deleted successfully");
      return true;
    } catch (error) {
      toast.error("Failed to delete job");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getJobById = (id: string): Job | undefined => {
    return jobs.find(job => job.id === id);
  };

  const getJobsByStatus = (status: Job['status']): Job[] => {
    return jobs.filter(job => job.status === status);
  };

  return (
    <JobsContext.Provider value={{
      jobs,
      createJob,
      updateJob,
      deleteJob,
      getJobById,
      getJobsByStatus,
      isLoading,
    }}>
      {children}
    </JobsContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobsContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobsProvider');
  }
  return context;
};
