
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useJobApplications } from "@/hooks/use-job-applications";
import { toast } from "sonner";

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
      addApplication({
        jobId: job.id,
        jobTitle: job.title,
        company: job.company || "Unknown Company",
      });

      toast.success(`Successfully applied to ${job.title}!`);
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
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Apply for {job.title}</DialogTitle>
          <DialogDescription>
            Submit your application for this position at {job.company}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="coverLetter">Cover Letter</Label>
            <Textarea
              id="coverLetter"
              placeholder="Write a brief cover letter explaining why you're interested in this position..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={4}
              required
            />
          </div>

          <div>
            <Label htmlFor="resume">Resume/CV</Label>
            <Input
              id="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
              required
            />
          </div>

          <div className="bg-blue-50 p-3 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-1">Job Details:</h4>
            <p className="text-sm text-blue-800">{job.title}</p>
            <p className="text-sm text-blue-600">{job.location} • {job.type}</p>
            <p className="text-sm text-blue-600">{job.salary}</p>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
