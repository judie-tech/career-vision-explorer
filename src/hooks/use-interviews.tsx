
import { create } from "zustand";
import { toast } from "@/components/ui/sonner";

export interface Interview {
  id: string;
  applicantId: string;
  applicantName: string;
  position: string;
  scheduledDate: string; // ISO string
  status: "Scheduled" | "Completed" | "Cancelled" | "Rescheduled";
  notes?: string;
}

interface InterviewsStore {
  interviews: Interview[];
  addInterview: (interview: Interview) => void;
  getInterviewById: (id: string) => Interview | undefined;
  cancelInterview: (id: string) => void;
  updateInterview: (id: string, updates: Partial<Interview>) => void;
  getAllInterviews: () => Interview[];
}

// Sample interview data
const initialInterviews: Interview[] = [
  {
    id: "1",
    applicantId: "2",
    applicantName: "Michael Chen",
    position: "Full Stack Engineer",
    scheduledDate: "2023-05-15T14:00:00Z",
    status: "Scheduled",
  },
  {
    id: "2",
    applicantId: "5",
    applicantName: "Taylor Wilson",
    position: "Senior Frontend Developer",
    scheduledDate: "2023-05-16T10:30:00Z",
    status: "Scheduled",
  },
  {
    id: "3",
    applicantId: "6",
    applicantName: "Jordan Lee",
    position: "Backend Engineer",
    scheduledDate: "2023-05-17T15:00:00Z",
    status: "Scheduled",
  },
];

export const useInterviews = create<InterviewsStore>((set, get) => ({
  interviews: initialInterviews,
  
  addInterview: (interview) => {
    set((state) => ({
      interviews: [...state.interviews, interview]
    }));
    toast.success(`Interview scheduled with ${interview.applicantName}`);
  },
  
  getInterviewById: (id) => {
    return get().interviews.find(interview => interview.id === id);
  },
  
  cancelInterview: (id) => {
    const interview = get().interviews.find(i => i.id === id);
    if (interview) {
      set((state) => ({
        interviews: state.interviews.map(i => 
          i.id === id ? { ...i, status: "Cancelled" } : i
        )
      }));
      toast.success(`Interview with ${interview.applicantName} has been cancelled`);
    }
  },
  
  updateInterview: (id, updates) => {
    const interview = get().interviews.find(i => i.id === id);
    if (interview) {
      set((state) => ({
        interviews: state.interviews.map(i => 
          i.id === id ? { ...i, ...updates } : i
        )
      }));
      toast.success(`Interview with ${interview.applicantName} has been updated`);
    }
  },
  
  getAllInterviews: () => {
    return get().interviews;
  }
}));
