
import React from "react";
import { 
  Dialog,
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Trash, ThumbsUp, ThumbsDown } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Applicant } from "@/hooks/use-applicants";

interface ApplicantProfileDialogProps {
  applicant: Applicant;
  onStatusChange: (id: string, status: string) => void;
  onScheduleInterview: (id: string) => void;
  children: React.ReactNode;
}

export function ApplicantProfileDialog({ 
  applicant, 
  onStatusChange, 
  onScheduleInterview,
  children 
}: ApplicantProfileDialogProps) {
  const [open, setOpen] = React.useState(false);
  
  const handleAccept = () => {
    onStatusChange(applicant.id, "Accepted");
    toast.success(`${applicant.name} has been accepted!`);
    setOpen(false);
  };
  
  const handleReject = () => {
    onStatusChange(applicant.id, "Rejected");
    toast.success(`${applicant.name} has been rejected.`);
    setOpen(false);
  };
  
  const handleScheduleInterview = () => {
    onScheduleInterview(applicant.id);
    toast.success(`Interview scheduled with ${applicant.name}`);
    setOpen(false);
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-800";
    if (score >= 80) return "bg-green-100 text-green-800";
    if (score >= 70) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Applicant Profile</DialogTitle>
          <DialogDescription>
            Review application details for {applicant.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">{applicant.name}</h3>
              <p className="text-sm text-gray-500">Applied for: {applicant.position}</p>
              <p className="text-sm text-gray-500">Applied: {applicant.appliedTime}</p>
            </div>
            <div>
              <span className={`${getScoreBadgeColor(applicant.matchScore)} text-xs px-3 py-1 rounded-full font-medium`}>
                {applicant.matchScore}% Match
              </span>
            </div>
          </div>
          
          <div className="border-t border-b py-4">
            <h4 className="font-medium mb-2">Match Score Breakdown</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Technical Skills</span>
                <span className="text-sm font-medium">{Math.round(applicant.matchScore * 0.6)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Experience</span>
                <span className="text-sm font-medium">{Math.round(applicant.matchScore * 0.3)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Education</span>
                <span className="text-sm font-medium">{Math.round(applicant.matchScore * 0.1)}%</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Resume</h4>
            <div className="bg-gray-50 p-4 rounded border">
              <p className="text-sm text-center">
                Resume preview would go here. <br />
                <a href="#" className="text-blue-600 hover:underline">
                  Download Resume (PDF)
                </a>
              </p>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Notes</h4>
            <p className="text-sm text-gray-600">
              {applicant.notes || "No notes available for this candidate."}
            </p>
          </div>
          
        </div>
        
        <DialogFooter className="flex justify-between">
          <div className="space-x-2">
            <Button 
              onClick={handleReject}
              variant="outline" 
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              <ThumbsDown className="h-4 w-4 mr-2" />
              Reject
            </Button>
            <Button 
              onClick={handleScheduleInterview}
              variant="outline"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Interview
            </Button>
          </div>
          <Button 
            onClick={handleAccept}
            className="bg-green-600 hover:bg-green-700"
          >
            <ThumbsUp className="h-4 w-4 mr-2" />
            Accept
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
