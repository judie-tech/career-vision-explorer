
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Heart, Share2 } from "lucide-react";
import { toast } from "sonner";

interface JobActionsProps {
  job: {
    id: string;
    salary: string;
  };
  isApplied: boolean;
  isSaved: boolean;
  onApply: () => void;
  onSave: () => void;
}

export const JobActions = ({ job, isApplied, isSaved, onApply, onSave }: JobActionsProps) => {
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Job link copied to clipboard");
  };

  return (
    <Card className="career-card">
      <CardHeader>
        <CardTitle className="text-xl">Apply for this job</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center p-6 bg-muted rounded-xl border">
          <div className="text-3xl font-bold text-primary mb-2">
            {job.salary}
          </div>
          <div className="text-sm text-muted-foreground">Salary Range</div>
        </div>
        
        <div className="flex gap-3">
          <Button 
            className="flex-1 modern-btn-primary" 
            onClick={onApply}
            disabled={isApplied}
          >
            {isApplied ? 'Applied ✓' : 'Apply Now'}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={onSave}
            className={`transition-all ${
              isSaved ? "text-red-500 border-red-300 bg-red-50" : ""
            }`}
          >
            <Heart className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`} />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleShare}
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
        
        {isApplied && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <p className="text-sm text-green-700 font-medium">
              ✓ Application submitted successfully
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
