
import React, { useState } from "react";
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
import { TrendingUp, Zap } from "lucide-react";
import { useJobPosts, JobPost } from "@/hooks/use-job-posts";
import { toast } from "sonner";

interface BoostJobDialogProps {
  job: JobPost;
}

export function BoostJobDialog({ job }: BoostJobDialogProps) {
  const { updateJob } = useJobPosts();
  const [open, setOpen] = useState(false);

  const handleToggleBoost = () => {
    const newBoostedStatus = !job.isBoosted;
    updateJob(job.id, { isBoosted: newBoostedStatus });
    
    if (newBoostedStatus) {
      toast.success(`"${job.title}" has been boosted!`);
    } else {
      toast.success(`"${job.title}" boost has been removed.`);
    }
    
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant={job.isBoosted ? "outline" : "default"} 
          size="sm"
          className={job.isBoosted ? "text-green-600 border-green-600" : ""}
        >
          {job.isBoosted ? (
            <>
              <Zap className="h-4 w-4 mr-1 fill-current" />
              Boosted
            </>
          ) : (
            <>
              <TrendingUp className="h-4 w-4 mr-1" />
              Boost
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            {job.isBoosted ? "Remove Boost" : "Boost Job Listing"}
          </DialogTitle>
          <DialogDescription>
            {job.isBoosted 
              ? "Remove the boost from this job listing to return it to standard visibility."
              : "Boost this job listing to increase its visibility and attract more candidates."
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-2">{job.title}</h4>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{job.location}</span>
              <span>•</span>
              <span>{job.type}</span>
              <span>•</span>
              <span>{job.salary}</span>
            </div>
            <div className="flex items-center gap-4 mt-2 text-sm">
              <span>{job.applicants} applicants</span>
              <span>{job.views} views</span>
              {job.isBoosted && (
                <Badge className="bg-green-100 text-green-800">
                  Currently Boosted
                </Badge>
              )}
            </div>
          </div>
          
          {!job.isBoosted && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h5 className="font-medium text-blue-900 mb-2">Boost Benefits:</h5>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Appears at the top of search results</li>
                <li>• Increased visibility to job seekers</li>
                <li>• Higher application rates</li>
                <li>• Priority placement in recommendations</li>
              </ul>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleToggleBoost}>
            {job.isBoosted ? "Remove Boost" : "Boost Job"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
