
import { create } from "zustand";

export interface Interview {
  id: string;
  applicantId: string;
  applicantName: string;
  jobId: string;
  jobTitle: string;
  scheduledDate: string;
  scheduledTime: string;
  status: "Scheduled" | "Completed" | "Cancelled" | "Rescheduled";
  interviewType: "Phone" | "Video" | "In-Person";
  notes?: string;
  interviewer: string;
}

interface InterviewsStore {
  interviews: Interview[];
  scheduleInterview: (interview: Omit<Interview, "id">) => void;
  updateInterviewStatus: (id: string, status: Interview["status"]) => void;
  getInterviewsByJobId: (jobId: string) => Interview[];
  getUpcomingInterviews: () => Interview[];
}

const initialInterviews: Interview[] = [
  {
    id: "1",
    applicantId: "2",
    applicantName: "Michael Chen",
    jobId: "1",
    jobTitle: "Senior Frontend Developer",
    scheduledDate: "2024-06-17",
    scheduledTime: "10:00",
    status: "Scheduled",
    interviewType: "Video",
    interviewer: "Sarah Davis"
  },
  {
    id: "2",
    applicantId: "5",
    applicantName: "Taylor Wilson",
    jobId: "1",
    jobTitle: "Senior Frontend Developer",
    scheduledDate: "2024-06-18",
    scheduledTime: "14:00",
    status: "Scheduled",
    interviewType: "Phone",
    interviewer: "John Smith"
  },
  {
    id: "3",
    applicantId: "3",
    applicantName: "Alex Rodriguez",
    jobId: "2",
    jobTitle: "UX Designer",
    scheduledDate: "2024-06-15",
    scheduledTime: "11:00",
    status: "Completed",
    interviewType: "In-Person",
    interviewer: "Emily Johnson"
  }
];

export const useInterviews = create<InterviewsStore>((set, get) => ({
  interviews: initialInterviews,
  
  scheduleInterview: (interviewData) => {
    const newInterview: Interview = {
      ...interviewData,
      id: crypto.randomUUID(),
    };
    
    set((state) => ({
      interviews: [...state.interviews, newInterview],
    }));
  },
  
  updateInterviewStatus: (id, status) => {
    set((state) => ({
      interviews: state.interviews.map(interview =>
        interview.id === id 
          ? { ...interview, status }
          : interview
      ),
    }));
  },
  
  getInterviewsByJobId: (jobId) => {
    return get().interviews.filter(interview => interview.jobId === jobId);
  },
  
  getUpcomingInterviews: () => {
    const now = new Date();
    return get().interviews.filter(interview => {
      const interviewDate = new Date(`${interview.scheduledDate}T${interview.scheduledTime}`);
      return interviewDate > now && interview.status === "Scheduled";
    });
  },
}));
