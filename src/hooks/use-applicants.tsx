
import { create } from "zustand";

export interface Applicant {
  id: string;
  name: string;
  position: string;
  appliedTime: string;
  matchScore: number;
  status: "Review" | "Interview" | "Accepted" | "Rejected";
  jobId: string;
  email: string;
  phone?: string;
  notes?: string;
  resumeUrl?: string;
}

interface ApplicantsStore {
  applicants: Applicant[];
  getApplicantsByJobId: (jobId: string) => Applicant[];
  getApplicantById: (id: string) => Applicant | undefined;
  updateApplicantStatus: (id: string, status: "Review" | "Interview" | "Accepted" | "Rejected") => void;
  getAllApplicants: () => Applicant[];
}

// Sample applicant data
const initialApplicants: Applicant[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    position: "Senior Frontend Developer",
    appliedTime: "2 days ago",
    matchScore: 95,
    status: "Review",
    jobId: "1",
    notes: "Strong portfolio with React projects. 5 years of experience."
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael@example.com",
    position: "Full Stack Engineer",
    appliedTime: "3 days ago",
    matchScore: 92,
    status: "Interview",
    jobId: "1",
    notes: "Good experience with both frontend and backend. Strong problem-solving skills."
  },
  {
    id: "3",
    name: "Alex Rodriguez",
    email: "alex@example.com",
    position: "UX Designer",
    appliedTime: "1 week ago",
    matchScore: 86,
    status: "Accepted",
    jobId: "2",
    notes: "Great portfolio with innovative designs. Good communication skills."
  },
  {
    id: "4",
    name: "Jamie Smith",
    email: "jamie@example.com", 
    position: "DevOps Engineer",
    appliedTime: "1 week ago",
    matchScore: 71,
    status: "Rejected",
    jobId: "4",
    notes: "Limited experience with our required technologies."
  },
  {
    id: "5",
    name: "Taylor Wilson",
    email: "taylor@example.com",
    position: "Senior Frontend Developer",
    appliedTime: "4 days ago",
    matchScore: 89,
    status: "Review",
    jobId: "1",
    notes: "Strong React and TypeScript skills. Worked on similar projects."
  },
  {
    id: "6",
    name: "Jordan Lee",
    email: "jordan@example.com",
    position: "Backend Engineer",
    appliedTime: "5 days ago",
    matchScore: 84,
    status: "Review",
    jobId: "3",
    notes: "Good experience with Node.js and databases. Solid system design knowledge."
  },
];

export const useApplicants = create<ApplicantsStore>((set, get) => ({
  applicants: initialApplicants,
  
  getApplicantsByJobId: (jobId) => {
    return get().applicants.filter(applicant => applicant.jobId === jobId);
  },
  
  getApplicantById: (id) => {
    return get().applicants.find(applicant => applicant.id === id);
  },
  
  updateApplicantStatus: (id, status) => {
    set((state) => ({
      applicants: state.applicants.map(applicant => 
        applicant.id === id 
          ? { ...applicant, status }
          : applicant
      )
    }));
  },
  
  getAllApplicants: () => {
    return get().applicants;
  }
}));
