
import { create } from "zustand";
import { toast } from "sonner";

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: "Applied" | "Reviewing" | "Interview" | "Hired" | "Rejected";
  notes?: string;
}

interface JobApplicationStore {
  applications: JobApplication[];
  addApplication: (application: Omit<JobApplication, 'id' | 'appliedDate'>) => void;
  updateApplicationStatus: (id: string, status: JobApplication['status']) => void;
  getApplicationsByStatus: (status: JobApplication['status']) => JobApplication[];
  getApplicationForJob: (jobId: string) => JobApplication | undefined;
}

const initialApplications: JobApplication[] = [
  {
    id: "1",
    jobId: "1",
    jobTitle: "Senior Frontend Developer",
    company: "TechCorp",
    appliedDate: "2024-06-10",
    status: "Reviewing",
  },
  {
    id: "2",
    jobId: "2",
    jobTitle: "UX Designer",
    company: "DesignStudio",
    appliedDate: "2024-06-12",
    status: "Applied",
  },
  {
    id: "3",
    jobId: "3",
    jobTitle: "Backend Engineer",
    company: "DevCorp",
    appliedDate: "2024-06-08",
    status: "Interview",
  },
];

export const useJobApplications = create<JobApplicationStore>((set, get) => ({
  applications: initialApplications,
  
  addApplication: (application) => {
    const newApplication: JobApplication = {
      ...application,
      id: Date.now().toString(),
      appliedDate: new Date().toISOString().split('T')[0],
      status: "Applied",
    };
    
    set((state) => ({
      applications: [...state.applications, newApplication],
    }));
    
    toast.success(`Applied to ${application.jobTitle} successfully!`);
  },
  
  updateApplicationStatus: (id, status) => {
    set((state) => ({
      applications: state.applications.map((app) =>
        app.id === id ? { ...app, status } : app
      ),
    }));
    
    const application = get().applications.find(app => app.id === id);
    if (application) {
      toast.success(`Application status updated to ${status}`);
    }
  },
  
  getApplicationsByStatus: (status) => {
    return get().applications.filter(app => app.status === status);
  },
  
  getApplicationForJob: (jobId) => {
    return get().applications.find(app => app.jobId === jobId);
  },
}));
