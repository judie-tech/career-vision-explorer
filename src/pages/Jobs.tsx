
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { JobsContainer } from "@/components/jobs/JobsContainer";
import { jobsService } from "../services/jobs.service";
import { Job as ApiJob } from "../types/api";
import { toast } from "sonner";

// Frontend Job type for the UI components
interface Job {
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

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJobs();
  }, []);


  const loadJobs = async () => {
    try {
      setLoading(true);
      const response = await jobsService.getJobs({
        limit: 50,
        is_active: true
      });
      // Transform API data to match frontend format
      const transformedJobs = (response.jobs || []).map((apiJob: any) => ({
        id: apiJob.job_id,
        title: apiJob.title,
        company: apiJob.company,
        location: apiJob.location,
        type: apiJob.job_type || "Full-time",
        salary: apiJob.salary_range || "Competitive",
        posted: new Date(apiJob.created_at).toLocaleDateString(),
        matchScore: 85, // Default match score - could be calculated based on user skills
        skills: apiJob.skills_required || [],
        description: apiJob.description || apiJob.requirements,
        experienceLevel: apiJob.experience_level || "Mid Level",
        companyInfo: {
          logoUrl: undefined // Could be added to profile table later
        }
      }));
      
      setJobs(transformedJobs);
    } catch (error: any) {
      console.error('Error loading jobs:', error);
      toast.error('Failed to load jobs from database');
      // Fallback to mock data if backend is not available
      const { mockJobs } = await import("@/data/mockJobs");
      setJobs(mockJobs);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
          <div className="relative container py-6 sm:py-12 px-3 sm:px-4">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading jobs from database...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
        
        <div className="relative container py-6 sm:py-12 px-3 sm:px-4">
          <JobsContainer jobs={jobs} />
        </div>
      </div>
    </Layout>
  );
};

export default Jobs;
