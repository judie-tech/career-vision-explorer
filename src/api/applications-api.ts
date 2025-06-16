
import { getCurrentUser } from '@/lib/auth';

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: "Applied" | "Reviewing" | "Interview" | "Hired" | "Rejected" | "Withdrawn";
  notes?: string;
  coverLetter?: string;
  resume?: string;
  interviewDate?: string;
  feedback?: string;
  salary?: string;
  location?: string;
  type?: string;
  matchScore?: number;
}

export interface ApplicationData {
  jobId: string;
  coverLetter?: string;
  resume?: string;
  customAnswers?: Record<string, string>;
  portfolioLinks?: string[];
  availableStartDate?: string;
  salaryExpectation?: string;
}

export class ApplicationsApi {
  private static baseUrl = '/api/applications';

  static async getApplications(): Promise<JobApplication[]> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const currentUser = getCurrentUser();
    if (!currentUser) {
      throw new Error('Authentication required');
    }
    
    return [
      {
        id: "1",
        jobId: "1",
        jobTitle: "Senior Frontend Developer",
        company: "TechCorp Kenya",
        appliedDate: "2024-06-10",
        status: "Interview",
        coverLetter: "Dear Hiring Manager, I am excited to apply for the Senior Frontend Developer position...",
        resume: "resume_john_doe.pdf",
        interviewDate: "2024-06-20",
        salary: "KES 120,000 - 180,000/month",
        location: "Nairobi, Kenya",
        type: "Full-time",
        matchScore: 95
      },
      {
        id: "2",
        jobId: "2",
        jobTitle: "UX/UI Designer",
        company: "Design Studio Africa",
        appliedDate: "2024-06-12",
        status: "Reviewing",
        coverLetter: "I am passionate about creating user-centered designs...",
        resume: "resume_john_doe.pdf",
        salary: "KES 80,000 - 120,000/month",
        location: "Remote",
        type: "Contract",
        matchScore: 88
      },
      {
        id: "3",
        jobId: "3",
        jobTitle: "Full Stack Developer",
        company: "StartupHub Nairobi",
        appliedDate: "2024-06-08",
        status: "Rejected",
        feedback: "Thank you for your interest. We decided to move forward with another candidate.",
        salary: "KES 100,000 - 150,000/month",
        location: "Nairobi, Kenya",
        type: "Full-time",
        matchScore: 78
      }
    ];
  }

  static async getApplicationById(id: string): Promise<JobApplication | null> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const currentUser = getCurrentUser();
    if (!currentUser) {
      throw new Error('Authentication required');
    }
    
    return {
      id,
      jobId: "1",
      jobTitle: "Senior Frontend Developer",
      company: "TechCorp Kenya",
      appliedDate: "2024-06-10",
      status: "Interview",
      coverLetter: "Dear Hiring Manager, I am excited to apply for the Senior Frontend Developer position at TechCorp Kenya. With over 5 years of experience in React development and a strong background in TypeScript, I believe I would be a valuable addition to your team.",
      resume: "resume_john_doe.pdf",
      interviewDate: "2024-06-20",
      notes: "Initial phone screening went well. Technical interview scheduled for next week.",
      salary: "KES 120,000 - 180,000/month",
      location: "Nairobi, Kenya",
      type: "Full-time",
      matchScore: 95
    };
  }

  static async submitApplication(data: ApplicationData): Promise<JobApplication> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const currentUser = getCurrentUser();
    if (!currentUser) {
      throw new Error('Authentication required');
    }
    
    const application: JobApplication = {
      id: Date.now().toString(),
      jobId: data.jobId,
      jobTitle: "Job Title", // Would get from job data
      company: "Company Name",
      appliedDate: new Date().toISOString().split('T')[0],
      status: "Applied",
      coverLetter: data.coverLetter,
      resume: data.resume,
      salary: "Competitive",
      location: "TBD",
      type: "Full-time",
      matchScore: 85
    };
    
    console.log('Application submitted:', application);
    return application;
  }

  static async updateApplicationStatus(id: string, status: JobApplication['status']): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const currentUser = getCurrentUser();
    if (!currentUser) {
      throw new Error('Authentication required');
    }
    
    console.log(`Application ${id} status updated to: ${status}`);
    return true;
  }

  static async withdrawApplication(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const currentUser = getCurrentUser();
    if (!currentUser) {
      throw new Error('Authentication required');
    }
    
    console.log(`Application ${id} withdrawn`);
    return true;
  }

  static async getApplicationStats(): Promise<{ total: number; pending: number; interviews: number; offers: number }> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const currentUser = getCurrentUser();
    if (!currentUser) {
      throw new Error('Authentication required');
    }
    
    return {
      total: 15,
      pending: 8,
      interviews: 3,
      offers: 1
    };
  }
}
