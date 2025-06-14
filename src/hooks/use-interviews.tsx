
import { create } from "zustand";

export interface Interview {
  id: string;
  candidateName: string;
  candidateEmail: string;
  jobTitle: string;
  jobId: string;
  scheduledDate: string;
  scheduledTime: string;
  duration: string;
  status: "Scheduled" | "Completed" | "Cancelled" | "Rescheduled";
  type: "Phone" | "Video" | "In-person";
  notes?: string;
}

interface InterviewStore {
  interviews: Interview[];
  addInterview: (interview: Interview) => void;
  updateInterview: (id: string, updates: Partial<Interview>) => void;
  removeInterview: (id: string) => void;
  getInterviewsByJob: (jobId: string) => Interview[];
}

// Sample interview data
const initialInterviews: Interview[] = [
  {
    id: "1",
    candidateName: "John Doe",
    candidateEmail: "john.doe@email.com",
    jobTitle: "Senior Frontend Developer",
    jobId: "1",
    scheduledDate: "2023-06-15",
    scheduledTime: "10:00 AM",
    duration: "1 hour",
    status: "Scheduled",
    type: "Video",
  },
  {
    id: "2",
    candidateName: "Mike Johnson",
    candidateEmail: "mike.j@email.com",
    jobTitle: "Backend Engineer",
    jobId: "3",
    scheduledDate: "2023-06-16",
    scheduledTime: "2:00 PM",
    duration: "45 minutes",
    status: "Scheduled",
    type: "Phone",
  },
];

export const useInterviews = create<InterviewStore>((set, get) => ({
  interviews: initialInterviews,
  
  addInterview: (interview) => {
    set((state) => ({
      interviews: [...state.interviews, interview],
    }));
  },
  
  updateInterview: (id, updates) => {
    set((state) => ({
      interviews: state.interviews.map(interview =>
        interview.id === id ? { ...interview, ...updates } : interview
      ),
    }));
  },
  
  removeInterview: (id) => {
    set((state) => ({
      interviews: state.interviews.filter(interview => interview.id !== id),
    }));
  },
  
  getInterviewsByJob: (jobId) => {
    return get().interviews.filter(interview => interview.jobId === jobId);
  },
}));
