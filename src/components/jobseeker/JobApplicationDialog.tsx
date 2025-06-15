
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { useJobApplications } from "@/hooks/use-job-applications";
import { toast } from "sonner";
import { JobSummaryCard } from "./application/JobSummaryCard";
import { CoverLetterSection } from "./application/CoverLetterSection";
import { ResumeUploadSection } from "./application/ResumeUploadSection";
import { ApplicationActions } from "./application/ApplicationActions";

interface JobApplicationDialogProps {
  job: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const JobApplicationDialog = ({ job, open, onOpenChange }: JobApplicationDialogProps) => {
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addApplication } = useJobApplications();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!job) return;

    setIsSubmitting(true);
    
    try {
      // Simulate upload delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      addApplication({
        jobId: job.id,
        jobTitle: job.title,
        company: job.company || "Unknown Company",
      });

      onOpenChange(false);
      setCoverLetter("");
      setResumeFile(null);
    } catch (error) {
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!job) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-2xl font-bold">Apply for Position</DialogTitle>
          <DialogDescription className="text-base">
            Submit your application for this exciting opportunity
          </DialogDescription>
        </DialogHeader>

        <JobSummaryCard job={job} />

        <form onSubmit={handleSubmit} className="space-y-6">
          <CoverLetterSection 
            coverLetter={coverLetter}
            setCoverLetter={setCoverLetter}
          />

          <ResumeUploadSection 
            resumeFile={resumeFile}
            setResumeFile={setResumeFile}
          />

          <ApplicationActions 
            isSubmitting={isSubmitting}
            onCancel={() => onOpenChange(false)}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};
