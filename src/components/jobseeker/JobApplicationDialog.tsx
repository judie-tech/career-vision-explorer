
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { useJobApplications } from "@/hooks/use-job-applications";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { JobSummaryCard } from "./application/JobSummaryCard";
import { CoverLetterSection } from "./application/CoverLetterSection";
import { ResumeUploadSection } from "./application/ResumeUploadSection";
import { ApplicationActions } from "./application/ApplicationActions";
import { applicationsService, aiService } from "@/services";
import { ApplicationCreate } from "@/types/api";
import { useEffect } from "react";

interface JobApplicationDialogProps {
  job: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const JobApplicationDialog = ({ job, open, onOpenChange }: JobApplicationDialogProps) => {
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingCV, setIsUploadingCV] = useState(false);
  const [cvUploaded, setCvUploaded] = useState(false);
  
  const { isJobSeeker, isFreelancer, isAuthenticated, user } = useAuth();
  
  // Allow both job seekers and freelancers to view and apply for jobs
  const canApplyForJobs = isJobSeeker() || isFreelancer();
  
  const { refetch: refetchApplications } = canApplyForJobs
    ? useJobApplications()
    : { refetch: () => {} };

useEffect(() => {
    async function checkCVStatus() {
      if (open && canApplyForJobs) {
        const isCVParsed = await aiService.checkIfCVParsed();
        setCvUploaded(isCVParsed);
      }
    }
    checkCVStatus();
  }, [open, canApplyForJobs]);

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!job) return;

    // Check if user is authenticated
    if (!isAuthenticated || !user) {
      toast.error("Please log in to apply for jobs");
      onOpenChange(false);
      // Redirect to login page
      setTimeout(() => {
        window.location.href = '/login';
      }, 1000);
      return;
    }

    // Check if user has the right role
    if (!canApplyForJobs) {
      toast.error("Only job seekers and freelancers can apply for jobs");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // If resume file is provided and CV not already uploaded, parse it first
      if (resumeFile && !cvUploaded) {
        setIsUploadingCV(true);
        toast.info("Parsing your CV, please wait...");
        
        try {
          const parseResult = await aiService.uploadAndParseCV(resumeFile);
          console.log('CV parse result:', parseResult);
          
          if (parseResult.status === 'success') {
            toast.success("CV parsed and profile updated successfully!");
            setCvUploaded(true);
          } else {
            toast.error("Failed to parse CV. Please try again.");
            return;
          }
        } catch (error) {
          console.error('CV parsing error:', error);
          toast.error("Failed to upload CV. Please try again.");
          return;
        } finally {
          setIsUploadingCV(false);
        }
      }
      
      console.log('Job object:', job);
      console.log('Job ID being sent:', job.job_id);
      
      const applicationData: ApplicationCreate = {
        job_id: job.job_id, // Use job_id consistently
        cover_letter: coverLetter,
      };
      
      console.log('Application data being sent:', applicationData);
      
      // Now submit without the resume file since it's already parsed
      await applicationsService.createApplication(applicationData, null);

      toast.success("Application submitted successfully!");
      refetchApplications();
      onOpenChange(false);
      setCoverLetter("");
      setResumeFile(null);
    } catch (error) {
      console.error("Application submission error:", error);
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
            cvAlreadyUploaded={cvUploaded}
          />

          <ApplicationActions 
            isSubmitting={isSubmitting || isUploadingCV}
            onCancel={() => onOpenChange(false)}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};
