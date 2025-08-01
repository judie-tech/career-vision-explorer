
import { useState, useEffect, useRef } from "react";
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
  const [error, setError] = useState<string | null>(null);
  const loadingRef = useRef(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    // Set mounted flag
    mountedRef.current = true;
    
    // Prevent double loading in React strict mode
    const shouldLoad = !loadingRef.current && jobs.length === 0;
    
    if (shouldLoad) {
      console.log('Initiating jobs load on mount');
      loadJobs();
    } else {
      console.log('Skipping jobs load - already loaded or loading');
    }

    // Cleanup function
    return () => {
      mountedRef.current = false;
      console.log('Jobs component unmounting');
    };
  }, []); // Empty dependency array - only run once on mount

  const loadJobs = async () => {
    // Prevent multiple simultaneous loads
    if (loadingRef.current) {
      console.log('Jobs already loading, skipping...');
      return;
    }
    
    loadingRef.current = true;
    setLoading(true);
    setError(null);
    
    try {
      console.log('Loading jobs from backend API...');
      
      // Use the general jobs endpoint that doesn't require authentication
      const jobsResponse = await jobsService.getJobs({
        is_active: true,
        page: 1,
        limit: 50,
        sort_by: 'created_at',
        sort_order: 'desc'
      });
      
      console.log('Jobs response from API:', jobsResponse);
      
      // Check if component is still mounted before updating state
      if (!mountedRef.current) {
        console.log('Component unmounted, skipping state update');
        return;
      }
      
      // Extract jobs array from the paginated response
      const apiJobs = jobsResponse.jobs || [];
      
      if (apiJobs.length === 0) {
        console.warn('No jobs found in API response, falling back to mock data');
        const { mockJobs } = await import("@/data/mockJobs");
        
        if (mountedRef.current) {
          setJobs(mockJobs);
          toast.info('Showing sample jobs. Backend has no jobs in database.');
        }
        return;
      }
      
      // Transform API data to match frontend format
      const transformedJobs = apiJobs.map((apiJob: any) => {
        return {
          id: apiJob.job_id || apiJob.id,
          job_id: apiJob.job_id || apiJob.id, // Keep job_id for API compatibility
          title: apiJob.title,
          company: apiJob.company,
          location: apiJob.location,
          type: apiJob.job_type || "Full-time",
          salary: apiJob.salary_range || "Competitive",
          posted: apiJob.created_at ? new Date(apiJob.created_at).toLocaleDateString() : 'Recently',
          matchScore: Math.floor(Math.random() * 30) + 70,
          skills: apiJob.skills_required || apiJob.skills || [],
          description: apiJob.description || apiJob.requirements || 'No description available',
          experienceLevel: apiJob.experience_level || "Mid Level",
          companyInfo: {
            logoUrl: undefined
          }
        };
      });
      
      console.log('Transformed jobs:', transformedJobs);
      
      if (mountedRef.current) {
        setJobs(transformedJobs);
        toast.success(`Loaded ${transformedJobs.length} jobs from database`);
      }
      
    } catch (error: any) {
      console.error('Error loading jobs from API:', error);
      
      if (mountedRef.current) {
        console.log('Falling back to mock data due to error');
        
        try {
          const { mockJobs } = await import("@/data/mockJobs");
          setJobs(mockJobs);
          setError('Failed to load jobs from database. Showing sample data.');
          toast.error('Failed to load jobs from database. Showing sample data.');
        } catch (mockError) {
          console.error('Failed to load mock data:', mockError);
          setError('Failed to load jobs. Please try again later.');
          toast.error('Failed to load jobs. Please try again later.');
        }
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
      loadingRef.current = false;
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
