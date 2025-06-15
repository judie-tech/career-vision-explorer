
export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: "Applied" | "Reviewing" | "Interview" | "Hired" | "Rejected";
  notes?: string;
  coverLetter?: string;
  resume?: string;
}

export interface ApplicationData {
  jobId: string;
  coverLetter?: string;
  resume?: string;
  customAnswers?: Record<string, string>;
}

export class ApplicationsApi {
  private static baseUrl = '/api/applications';

  static async getApplications(): Promise<JobApplication[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return [
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
      }
    ];
  }

  static async getApplicationById(id: string): Promise<JobApplication | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      id,
      jobId: "1",
      jobTitle: "Senior Frontend Developer",
      company: "TechCorp",
      appliedDate: "2024-06-10",
      status: "Reviewing",
      coverLetter: "Dear Hiring Manager, I am excited to apply...",
    };
  }

  static async submitApplication(data: ApplicationData): Promise<JobApplication> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      id: Date.now().toString(),
      jobId: data.jobId,
      jobTitle: "Job Title",
      company: "Company Name",
      appliedDate: new Date().toISOString().split('T')[0],
      status: "Applied",
      coverLetter: data.coverLetter,
      resume: data.resume,
    };
  }

  static async updateApplicationStatus(id: string, status: JobApplication['status']): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return true;
  }

  static async withdrawApplication(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return true;
  }
}
