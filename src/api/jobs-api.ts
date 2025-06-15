
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  matchScore: number;
  skills: string[];
  description: string;
  experienceLevel?: string;
  companyInfo?: {
    logoUrl?: string;
  };
}

export interface JobsApiResponse {
  jobs: Job[];
  total: number;
  page: number;
  limit: number;
}

export interface JobSearchParams {
  query?: string;
  location?: string;
  type?: string;
  experienceLevel?: string;
  skills?: string[];
  salaryMin?: number;
  salaryMax?: number;
  page?: number;
  limit?: number;
}

export class JobsApi {
  private static baseUrl = '/api/jobs';

  static async searchJobs(params: JobSearchParams = {}): Promise<JobsApiResponse> {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          queryParams.append(key, value.join(','));
        } else {
          queryParams.append(key, value.toString());
        }
      }
    });

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock response - in a real app, this would be a fetch call
    return {
      jobs: [
        {
          id: "1",
          title: "Frontend Developer",
          company: "Tech Solutions Ltd",
          location: "Nairobi, Kenya",
          type: "Full-time",
          salary: "50K-80K KES/month",
          posted: "2 days ago",
          matchScore: 92,
          experienceLevel: "Mid Level",
          skills: ["React", "JavaScript", "CSS", "UI/UX"],
          description: "We're looking for a Frontend Developer to join our team and help build responsive web applications.",
        }
      ],
      total: 1,
      page: params.page || 1,
      limit: params.limit || 10
    };
  }

  static async getJobById(id: string): Promise<Job | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Mock response
    return {
      id,
      title: "Frontend Developer",
      company: "Tech Solutions Ltd",
      location: "Nairobi, Kenya",
      type: "Full-time",
      salary: "50K-80K KES/month",
      posted: "2 days ago",
      matchScore: 92,
      experienceLevel: "Mid Level",
      skills: ["React", "JavaScript", "CSS", "UI/UX"],
      description: "We're looking for a Frontend Developer to join our team and help build responsive web applications.",
    };
  }

  static async saveJob(jobId: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return true;
  }

  static async unsaveJob(jobId: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return true;
  }

  static async applyToJob(jobId: string, applicationData: any): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 800));
    return true;
  }
}
