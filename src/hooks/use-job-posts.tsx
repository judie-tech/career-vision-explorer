
import { create } from "zustand";
import { toast } from "@/components/ui/sonner";

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

interface JobStore {
  jobs: JobPost[];
  addJob: (job: JobPost) => void;
  removeJob: (id: string) => void;
  updateJob: (id: string, updatedJob: Partial<JobPost>) => void;
  getJob: (id: string) => JobPost | undefined;
}

// Sample job data
const initialJobs: JobPost[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    description: "We're looking for an experienced Frontend Developer to join our team.",
    location: "Remote",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    isBoosted: true,
    datePosted: "2023-05-01T12:00:00Z",
    applicants: 12,
    views: 245,
  },
  {
    id: "2",
    title: "UX Designer",
    description: "Design beautiful user experiences for our products.",
    location: "San Francisco",
    type: "Full-time",
    salary: "$90,000 - $110,000",
    isBoosted: false,
    datePosted: "2023-05-05T09:30:00Z",
    applicants: 8,
    views: 187,
  },
  {
    id: "3",
    title: "Backend Engineer",
    description: "Build scalable APIs and backend systems.",
    location: "New York",
    type: "Full-time",
    salary: "$130,000 - $160,000",
    isBoosted: true,
    datePosted: "2023-05-03T14:15:00Z",
    applicants: 15,
    views: 312,
  },
  {
    id: "4",
    title: "DevOps Engineer",
    description: "Manage our cloud infrastructure and CI/CD pipelines.",
    location: "Remote",
    type: "Full-time",
    salary: "$115,000 - $140,000",
    isBoosted: false,
    datePosted: "2023-05-07T10:45:00Z",
    applicants: 6,
    views: 153,
  },
];

export const useJobPosts = create<JobStore>((set, get) => ({
  jobs: initialJobs,
  
  addJob: (job) => set((state) => ({
    jobs: [...state.jobs, job]
  })),
  
  removeJob: (id) => {
    const jobToRemove = get().jobs.find(job => job.id === id);
    if (jobToRemove) {
      set((state) => ({
        jobs: state.jobs.filter(job => job.id !== id)
      }));
      toast.success(`Job "${jobToRemove.title}" has been deleted.`);
    }
  },
  
  updateJob: (id, updatedJob) => {
    const jobs = get().jobs;
    const jobIndex = jobs.findIndex(job => job.id === id);
    
    if (jobIndex !== -1) {
      const updatedJobs = [...jobs];
      updatedJobs[jobIndex] = { ...updatedJobs[jobIndex], ...updatedJob };
      
      set({ jobs: updatedJobs });
      toast.success(`Job updated successfully.`);
    }
  },
  
  getJob: (id) => {
    return get().jobs.find(job => job.id === id);
  }
}));
