
import { JobCard } from "./JobCard";

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
}

interface JobsListProps {
  jobs: Job[];
  isJobApplied: (jobId: string) => boolean;
  isJobSaved: (jobId: string) => boolean;
  onApply: (job: Job) => void;
  onSave: (jobId: string) => void;
}

export const JobsList = ({ jobs, isJobApplied, isJobSaved, onApply, onSave }: JobsListProps) => {
  if (jobs.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium mb-2">No jobs found</h3>
        <p className="text-gray-500">Try adjusting your filters or search term</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {jobs.map(job => (
        <JobCard
          key={job.id}
          job={job}
          isApplied={isJobApplied(job.id)}
          isSaved={isJobSaved(job.id)}
          onApply={onApply}
          onSave={onSave}
        />
      ))}
    </div>
  );
};
