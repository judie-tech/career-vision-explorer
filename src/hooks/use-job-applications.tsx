import { useQuery } from '@tanstack/react-query';
import { applicationsService } from '@/services';
import { Application } from '@/types/api';
import { useMemo } from 'react';

const APPLICATIONS_QUERY_KEY = 'applications';

export const useJobApplications = () => {
  const { data: applications = [], isLoading, error, refetch } = useQuery<Application[], Error>({
    queryKey: [APPLICATIONS_QUERY_KEY],
    queryFn: () => applicationsService.getMyApplications(),
  });

  const getApplicationForJob = useMemo(() => {
    return (jobId: string) => applications.find(app => app.job_id === jobId);
  }, [applications]);

  return {
    applications,
    isLoading,
    error: error ? error.message : null,
    refetch,
    getApplicationForJob,
  };
};
