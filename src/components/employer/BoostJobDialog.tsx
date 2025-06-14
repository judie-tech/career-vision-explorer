
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Eye, Users, Clock } from "lucide-react";
import { JobPost, useJobPosts } from "@/hooks/use-job-posts";
import { toast } from "sonner";

interface BoostJobDialogProps {
  job: JobPost;
}

export function BoostJobDialog({ job }: BoostJobDialogProps) {
  const { updateJob } = useJobPosts();
  const [open, setOpen] = React.useState(false);

  const handleBoost = () => {
    updateJob(job.id, { isBoosted: true });
    toast.success(`${job.title} has been boosted! It will appear at the top of search results.`);
    setOpen(false);
  };

  const handleRemoveBoost = () => {
    updateJob(job.id, { isBoosted: false });
    toast.success(`Boost removed from ${job.title}.`);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant={job.isBoosted ? "outline" : "default"} 
          size="sm"
          className={job.isBoosted ? "text-green-700 border-green-200" : ""}
        >
          <TrendingUp className="h-4 w-4 mr-2" />
          {job.isBoosted ? "Boosted" : "Boost"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {job.isBoosted ? "Manage Boost" : "Boost Job Listing"}
          </DialogTitle>
          <DialogDescription>
            {job.isBoosted 
              ? "This job is currently boosted and appears at the top of search results."
              : "Boost your job listing to increase visibility and attract more candidates."
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{job.title}</CardTitle>
              <CardDescription>{job.location} • {job.type}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span>{job.applicants} applicants</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-gray-500" />
                  <span>{job.views} views</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>Posted {new Date(job.datePosted).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {!job.isBoosted && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Boost Benefits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-green-700">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span>Appear at the top of search results</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span>Increase visibility by up to 300%</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span>Attract more qualified candidates</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span>Get highlighted with a special badge</span>
                </div>
              </CardContent>
            </Card>
          )}

          {job.isBoosted && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center gap-2 text-green-800">
                  <Badge className="bg-green-100 text-green-800">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Currently Boosted
                  </Badge>
                </div>
                <p className="text-center text-green-700 text-sm mt-2">
                  This listing is appearing at the top of search results
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        <DialogFooter>
          {job.isBoosted ? (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Keep Boost
              </Button>
              <Button variant="destructive" onClick={handleRemoveBoost}>
                Remove Boost
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleBoost}>
                Boost This Job
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
