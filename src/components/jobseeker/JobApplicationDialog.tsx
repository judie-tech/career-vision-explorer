
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useJobApplications } from "@/hooks/use-job-applications";
import { toast } from "sonner";
import { Building, MapPin, Briefcase, DollarSign, FileText, Upload } from "lucide-react";

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Please upload a PDF or Word document");
        return;
      }
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      
      setResumeFile(file);
      toast.success("Resume uploaded successfully");
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

        {/* Job Summary Card */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100 space-y-4">
          <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 text-gray-700">
              <Building className="h-5 w-5 text-blue-600" />
              <span className="font-medium">{job.company}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <MapPin className="h-5 w-5 text-blue-600" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Briefcase className="h-5 w-5 text-blue-600" />
              <span>{job.type}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <DollarSign className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-green-600">{job.salary}</span>
            </div>
          </div>
          
          {job.matchScore && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600">Match Score:</span>
              <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                job.matchScore >= 90 ? 'bg-green-100 text-green-800' : 
                job.matchScore >= 80 ? 'bg-blue-100 text-blue-800' : 
                job.matchScore >= 70 ? 'bg-yellow-100 text-yellow-800' : 
                'bg-orange-100 text-orange-800'
              }`}>
                {job.matchScore}%
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Cover Letter Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <Label htmlFor="coverLetter" className="text-lg font-semibold">Cover Letter</Label>
            </div>
            <Textarea
              id="coverLetter"
              placeholder="Tell us why you're the perfect fit for this role. Highlight your relevant experience and what excites you about this opportunity..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={6}
              className="resize-none"
              required
            />
            <p className="text-sm text-gray-500">
              {coverLetter.length}/500 characters recommended
            </p>
          </div>

          {/* Resume Upload Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-blue-600" />
              <Label htmlFor="resume" className="text-lg font-semibold">Resume/CV</Label>
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <Input
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
                required
              />
              <label htmlFor="resume" className="cursor-pointer">
                <div className="space-y-2">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                  <div className="text-sm">
                    <span className="font-medium text-blue-600 hover:text-blue-500">
                      Click to upload
                    </span>
                    <span className="text-gray-500"> or drag and drop</span>
                  </div>
                  <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 5MB</p>
                </div>
              </label>
            </div>
            {resumeFile && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center gap-2 text-green-800">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm font-medium">{resumeFile.name}</span>
                  <span className="text-xs text-green-600">
                    ({(resumeFile.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)} 
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </div>
              ) : (
                "Submit Application"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
