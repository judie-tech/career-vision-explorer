
import { useState } from "react";
import { toast } from "sonner";
import { JobApplicationDialog } from "@/components/jobseeker/JobApplicationDialog";
import { useJobApplications } from "@/hooks/use-job-applications";
import { JobsHeader } from "./JobsHeader";
import { JobsSearchBar } from "./JobsSearchBar";
import { JobsFilters } from "./JobsFilters";
import { JobsList } from "./JobsList";
import { useJobsFilter } from "@/hooks/use-jobs-filter";

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

interface JobsContainerProps {
  jobs: Job[];
}

export const JobsContainer = ({ jobs }: JobsContainerProps) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applicationDialogOpen, setApplicationDialogOpen] = useState(false);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  
  const { getApplicationForJob } = useJobApplications();
  
  const {
    searchTerm,
    setSearchTerm,
    filter,
    setFilter,
    salaryRange,
    setSalaryRange,
    selectedSkills,
    setSelectedSkills,
    filtersVisible,
    setFiltersVisible,
    filteredJobs,
    activeFiltersCount,
    resetFilters
  } = useJobsFilter(jobs);
  
  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setApplicationDialogOpen(true);
  };

  const handleSaveJob = (jobId: string) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
      toast.success("Job removed from saved jobs");
    } else {
      setSavedJobs([...savedJobs, jobId]);
      toast.success("Job saved successfully");
    }
  };

  const isJobApplied = (jobId: string) => {
    return !!getApplicationForJob(jobId);
  };

  const isJobSaved = (jobId: string) => {
    return savedJobs.includes(jobId);
  };

  return (
    <>
      <JobsHeader />
      
      <JobsSearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filtersVisible={filtersVisible}
        setFiltersVisible={setFiltersVisible}
        activeFiltersCount={activeFiltersCount}
      />
      
      {filtersVisible && (
        <div className="animate-fade-in">
          <JobsFilters
            filter={filter}
            setFilter={setFilter}
            salaryRange={salaryRange}
            setSalaryRange={setSalaryRange}
            selectedSkills={selectedSkills}
            setSelectedSkills={setSelectedSkills}
            resetFilters={resetFilters}
          />
        </div>
      )}
      
      <JobsList
        jobs={filteredJobs}
        isJobApplied={isJobApplied}
        isJobSaved={isJobSaved}
        onApply={handleApply}
        onSave={handleSaveJob}
      />

      <JobApplicationDialog
        job={selectedJob}
        open={applicationDialogOpen}
        onOpenChange={setApplicationDialogOpen}
      />
    </>
  );
};
