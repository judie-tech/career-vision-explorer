import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from 'react';
import { applicationsService } from '@/services';
import { Application } from '@/types/api';

interface JobApplicationsContextType {
  applications: Application[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  getApplicationForJob: (jobId: string) => Application | undefined;
}

const JobApplicationsContext = createContext<JobApplicationsContextType | undefined>(undefined);

export const JobApplicationsProvider = ({ children }: { children: ReactNode }) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await applicationsService.getMyApplications();
      setApplications(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch applications');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const getApplicationForJob = useCallback((jobId: string) => {
    return applications.find(app => app.job_id === jobId);
  }, [applications]);

  const value = {
    applications,
    isLoading,
    error,
    refetch: fetchApplications,
    getApplicationForJob,
  };

  return (
    <JobApplicationsContext.Provider value={value}>
      {children}
    </JobApplicationsContext.Provider>
  );
};

export const useJobApplications = () => {
  const context = useContext(JobApplicationsContext);
  if (context === undefined) {
    throw new Error('useJobApplications must be used within a JobApplicationsProvider');
  }
  return context;
};
