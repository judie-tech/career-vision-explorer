
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
      console.log('Loading jobs from backend API...');
      
      // Use the general jobs endpoint that doesn't require authentication
      const jobsResponse = await jobsService.getJobs({
        is_active: true,
        page: 1,
        limit: 50, // Load more jobs for better user experience
        sort_by: 'created_at',
        sort_order: 'desc'
      });
      
      console.log('Jobs response from API:', jobsResponse);
      
      // Extract jobs array from the paginated response
      const apiJobs = jobsResponse.jobs || [];
      
      if (apiJobs.length === 0) {
        console.warn('No jobs found in API response, falling back to mock data');
        const { mockJobs } = await import("@/data/mockJobs");
        setJobs(mockJobs);
        toast.info('Showing sample jobs. Backend has no jobs in database.');
        return;
      }
      
      // Transform API data to match frontend format
      const transformedJobs = apiJobs.map((apiJob: any) => {
        console.log('Transforming job:', apiJob);
        return {
          id: apiJob.job_id || apiJob.id,
          title: apiJob.title,
          company: apiJob.company,
          location: apiJob.location,
          type: apiJob.job_type || "Full-time",
          salary: apiJob.salary_range || "Competitive",
          posted: apiJob.created_at ? new Date(apiJob.created_at).toLocaleDateString() : 'Recently',
          matchScore: Math.floor(Math.random() * 30) + 70, // Random match score for display
          skills: apiJob.skills_required || apiJob.skills || [],
          description: apiJob.description || apiJob.requirements || 'No description available',
          experienceLevel: apiJob.experience_level || "Mid Level",
          companyInfo: {
            logoUrl: undefined // Could be added to profile table later
          }
        };
      });
      
      console.log('Transformed jobs:', transformedJobs);
      setJobs(transformedJobs);
      toast.success(`Loaded ${transformedJobs.length} jobs from database`);
      
    } catch (error: any) {
      console.error('Error loading jobs from API:', error);
      console.log('Falling back to mock data due to error');
      
      // Fallback to mock data if backend is not available
      const { mockJobs } = await import("@/data/mockJobs");
      setJobs(mockJobs);
      toast.error('Failed to load jobs from database. Showing sample data.');
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
