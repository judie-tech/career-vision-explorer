
import React from "react";
import { Label } from "@/components/ui/label";
import { Briefcase } from "lucide-react";
import { JobPost } from "@/hooks/use-job-posts";

interface JobPositionSectionProps {
  jobs: JobPost[];
  selectedJobId: string;
  onJobChange: (jobId: string) => void;
}

export const JobPositionSection = ({
  jobs,
  selectedJobId,
  onJobChange,
}: JobPositionSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-3">
        <Briefcase className="h-5 w-5 text-blue-600" />
        <Label className="text-base font-medium">Job Position</Label>
      </div>
      <select
        value={selectedJobId}
        onChange={(e) => onJobChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        required
      >
        <option value="">Select a job position</option>
        {jobs.map((job) => (
          <option key={job.id} value={job.id}>
            {job.title} - {job.location}
          </option>
        ))}
      </select>
    </div>
  );
};
