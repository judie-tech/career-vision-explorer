
import { useState, useEffect, useRef } from "react";
import Layout from "@/components/layout/Layout";
import { JobsContainer } from "@/components/jobs/JobsContainer";
import { jobsService } from "../services/jobs.service";
import { Job as ApiJob } from "../types/api";
import { toast } from "sonner";
import { AIJobMatchRequest,  } from "@/services/ai-job-matching.service";
import { apiClient } from "@/lib/api-client";
import { SalaryExpectationsStep } from "@/components/onboarding/steps/SalaryExpectationsStep";

// Frontend Job type for the UI components
interface Job {
  job_id: string;
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

// Helper function to generate UUID-like strings for mock data compatibility
const generateMockUUID = (id: string): string => {
  // convert simple id to uuid format for backend compatibilty
  const padded = id.padStart(8, '0');
  return `${padded.slice(0, 8)}-0000-0000-0000-000000000000`;
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
     
      {/*
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
        */}


        console.log('Loading AI job recommendations...')
        try {
          // Try to get AI recommendations first
        // 1) Get AI recommendations based on profile skills and optional preferences
        const recommendations = await apiClient.get<Array<{ job_id: string; match_score: number; reasons: string[]}>>(
          '/vector/jobs/recommendations'
        );

        console.log('AI recommendations:', recommendations);

        if (!mountedRef.current) {
          console.log('Component unmounted, skipping state update');
          return;
        }

        if (recommendations && recommendations.length > 0) {
          // Fetch full job details
          const jobsDetails = await Promise.all(
            recommendations.map((rec) => jobsService.getJobById(rec.job_id) )
          );

          // Transform and match details with match_score
          const transformedJobs = jobsDetails.map((apiJob: any, index: number) => {
            const rec = recommendations[index];
            return {
              id: apiJob.job_id || apiJob.id,
              job_id: apiJob.job_id || apiJob.id,
              title: apiJob.title,
              company: apiJob.company,
              location: apiJob.location,
              type: apiJob.job_type || "Full-time",
              salary: apiJob.salary_range || "Competitive",
              posted: apiJob.created_at ? new Date(apiJob.created_at).toLocaleDateString() : 'Recently',
              matchScore: Math.round(rec?.match_score ?? apiJob.match_score ?? 0),
              skills: apiJob.skills_required || apiJob.skills || [],
              description: apiJob.description || apiJob.requirements || "No description available",
              experienceLevel: apiJob.experience_level || "Mid Level",
              companyInfo: {
                logoUrl: undefined
              }
            } as Job;
          });
          console.log('Transformed AI-recommended jobs:', transformedJobs);

          if (mountedRef.current) {
            setJobs(transformedJobs);
            toast.success(`Loaded ${transformedJobs.length} AI-recommended jobs`);
          }
          return;
        }
      } catch (aiError: any) {
   console.warn('No AI recommendations returned, falling back to jobs list');      }
      // Fallback: Try to load regular jobs list
      console.log('Loading jobs from regular backend API...');


      try {
      
          // Fallback to regular jobs list if AI returned nothing
          const jobsResponse = await jobsService.getJobs({
            is_active: true,
            page: 1,
            limit: 50,
            sort_by: 'created_at',
            sort_order: 'desc'
          });

          console.log('Jobs response from API:', jobsResponse);
          if (!mountedRef.current) {
            console.log('Component unmounted, skipping state update');
            return;
          }

          const apiJobs = jobsResponse.jobs || [];
          if (apiJobs.length > 0) {
          
          const transformedJobs = apiJobs.map((apiJob: any) => ({
            id: apiJob.job_id || apiJob.id,
            job_id: apiJob.job_id || apiJob.id,
            title: apiJob.title,
            company: apiJob.company,
            location: apiJob.location,
            type: apiJob.job_type || "Full-time",
            salary: apiJob.salary_range || "Competitive",
            posted: apiJob.created_at ? new Date(apiJob.created_at).toLocaleDateString(): 'Recently',
            matchScore: apiJob.match_score ?? Math.floor(Math.random() * 30) + 70,
            skills: apiJob.skiils_required || apiJob.skills || [],
            description: apiJob.description || apiJob.requirements || "No description svailable",
            experienceLevel: apiJob.experience_level || "Mid Level",
            companyInfo: {
              logoUrl: undefined
            }
            
          } as Job
        )
      );
        {/*  transformedJobs.forEach(job =>
            console.log(`Job: ${job.title} - Match Score: ${job.matchScore}%`)
          );*/}
          if (mountedRef.current) {
            setJobs(transformedJobs);
            toast.success(`Loaded ${transformedJobs.length} jobs (fallback)`);
          }
          return;
        }
      }
      catch (jobsError: any) {
        console.log('Regular jobs endpoint also failed, falling back to mock data');
      }

      // Final fallback: Load mock data with UUID-compstiblr IDS
      console.log('Loading mock data with UUID-compatible IDS... ');
      const { mockJobs } = await import("@/data/mockJobs");

      // Transform mock jobs to have UUID-compatible IDs
      const transformedMockJobs = mockJobs.map((mockJob: any) => ({
        ...mockJob,
        job_id: generateMockUUID(mockJob.id || mockJob.job_id),
        id: generateMockUUID(mockJob.id || mockJob.job_id)
      }));
       

     
      if (mountedRef.current) {
        setJobs(transformedMockJobs);
        toast.info('Showing sample jobs from database');
      }
      
    } catch (error: any) {
      console.error('Error loading jobs from API:', error);
      
      if (mountedRef.current) {
        console.log('Falling back to mock data due to error');
        
        try {
          const { mockJobs } = await import("@/data/mockJobs");

          // Transform mock jobs to have UUID-compatible IDS
          const transformedMockJobs = mockJobs.map((mockJob: any) => ({
            ...mockJob,
            job_id: generateMockUUID(mockJob.id || mockJob.job_id),
            id: generateMockUUID(mockJob.id || mockJob.job_id)
          }));
          setJobs(transformedMockJobs);
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
              <p className="mt-4 text-gray-600">Loading jobs ...</p>
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