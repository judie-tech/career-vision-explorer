
import { getCurrentUser } from '@/lib/auth';

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
    size?: string;
    industry?: string;
  };
  requirements?: string[];
  benefits?: string[];
  isRemote?: boolean;
  isSaved?: boolean;
  hasApplied?: boolean;
}

export interface JobsApiResponse {
  jobs: Job[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
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
  isRemote?: boolean;
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

    await new Promise(resolve => setTimeout(resolve, 600));
    
    const mockJobs: Job[] = [
      {
        id: "1",
        title: "Senior Frontend Developer",
        company: "TechCorp Kenya",
        location: "Nairobi, Kenya",
        type: "Full-time",
        salary: "KES 120,000 - 180,000/month",
        posted: "2 days ago",
        matchScore: 95,
        experienceLevel: "Senior Level",
        skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
        description: "Join our dynamic team building cutting-edge web applications for African markets.",
        requirements: ["5+ years React experience", "TypeScript proficiency", "Team leadership"],
        benefits: ["Health insurance", "Flexible hours", "Learning budget"],
        isRemote: false,
        isSaved: false,
        hasApplied: false,
        companyInfo: {
          size: "50-200 employees",
          industry: "Technology"
        }
      },
      {
        id: "2",
        title: "UX/UI Designer",
        company: "Design Studio Africa",
        location: "Remote",
        type: "Contract",
        salary: "KES 80,000 - 120,000/month",
        posted: "1 week ago",
        matchScore: 88,
        experienceLevel: "Mid Level",
        skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
        description: "Create beautiful and intuitive designs for mobile and web applications.",
        requirements: ["3+ years UX/UI experience", "Portfolio required", "Figma expertise"],
        benefits: ["Remote work", "Flexible schedule", "Creative freedom"],
        isRemote: true,
        isSaved: true,
        hasApplied: false,
        companyInfo: {
          size: "10-50 employees",
          industry: "Design"
        }
      }
    ];

    const page = params.page || 1;
    const limit = params.limit || 10;
    
    return {
      jobs: mockJobs,
      total: 2,
      page,
      limit,
      hasMore: page * limit < 2
    };
  }

  static async getJobById(id: string): Promise<Job | null> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    if (!getCurrentUser()) {
      throw new Error('Authentication required');
    }
    
    return {
      id,
      title: "Senior Frontend Developer",
      company: "TechCorp Kenya",
      location: "Nairobi, Kenya",
      type: "Full-time",
      salary: "KES 120,000 - 180,000/month",
      posted: "2 days ago",
      matchScore: 95,
      experienceLevel: "Senior Level",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
      description: "Join our dynamic team building cutting-edge web applications for African markets. We're looking for a passionate developer to lead frontend initiatives.",
      requirements: ["5+ years React experience", "TypeScript proficiency", "Team leadership"],
      benefits: ["Health insurance", "Flexible hours", "Learning budget", "Equity options"],
      isRemote: false,
      isSaved: false,
      hasApplied: false,
      companyInfo: {
        logoUrl: "/placeholder.svg",
        size: "50-200 employees",
        industry: "Technology"
      }
    };
  }

  static async saveJob(jobId: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (!getCurrentUser()) {
      throw new Error('Authentication required');
    }
    
    console.log(`Job ${jobId} saved to wishlist`);
    return true;
  }

  static async unsaveJob(jobId: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (!getCurrentUser()) {
      throw new Error('Authentication required');
    }
    
    console.log(`Job ${jobId} removed from wishlist`);
    return true;
  }

  static async applyToJob(jobId: string, applicationData: any): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (!getCurrentUser()) {
      throw new Error('Authentication required');
    }
    
    console.log(`Applied to job ${jobId}:`, applicationData);
    return true;
  }

  static async getSavedJobs(): Promise<Job[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (!getCurrentUser()) {
      throw new Error('Authentication required');
    }
    
    return [];
  }
}
