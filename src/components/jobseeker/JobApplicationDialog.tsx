
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { JobPost } from "@/hooks/use-job-posts";
import { useJobApplications } from "@/hooks/use-job-applications";

interface JobApplicationDialogProps {
  job: JobPost | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const JobApplicationDialog = ({ job, open, onOpenChange }: JobApplicationDialogProps) => {
  const [coverLetter, setCoverLetter] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");
  const [availableDate, setAvailableDate] = useState("");
  const { addApplication, getApplicationForJob } = useJobApplications();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!job) return;

    // Check if already applied
    const existingApplication = getApplicationForJob(job.id);
    if (existingApplication) {
      onOpenChange(false);
      return;
    }

    addApplication({
      jobId: job.id,
      jobTitle: job.title,
      company: "Company Name", // In a real app, this would come from job data
      status: "Applied",
      notes: coverLetter,
    });

    // Reset form
    setCoverLetter("");
    setExpectedSalary("");
    setAvailableDate("");
    onOpenChange(false);
  };

  if (!job) return null;

  const existingApplication = getApplicationForJob(job.id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Apply for {job.title}</DialogTitle>
          <DialogDescription>
            {existingApplication 
              ? `You have already applied for this position. Status: ${existingApplication.status}`
              : "Complete your application below"
            }
          </DialogDescription>
        </DialogHeader>

        {existingApplication ? (
          <div className="space-y-4">
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground">
                Applied on {new Date(existingApplication.appliedDate).toLocaleDateString()}
              </p>
              <p className="text-sm font-medium">Status: {existingApplication.status}</p>
            </div>
            <Button onClick={() => onOpenChange(false)} className="w-full">
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="coverLetter">Cover Letter</Label>
              <Textarea
                id="coverLetter"
                placeholder="Tell us why you're interested in this position..."
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                required
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="expectedSalary">Expected Salary</Label>
              <Input
                id="expectedSalary"
                placeholder="e.g., $80,000 - $100,000"
                value={expectedSalary}
                onChange={(e) => setExpectedSalary(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="availableDate">Available Start Date</Label>
              <Input
                id="availableDate"
                type="date"
                value={availableDate}
                onChange={(e) => setAvailableDate(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Submit Application
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
