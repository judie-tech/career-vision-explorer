
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
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
      <Card className="relative bg-slate-800/50 border border-slate-700/50 rounded-2xl backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl text-white">Apply for this job</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center p-6 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-xl border border-emerald-500/20">
            <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-2">
              {job.salary}
            </div>
            <div className="text-sm text-slate-400">Salary Range</div>
          </div>
          
          <div className="flex gap-3">
            <Button 
              className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:transform-none" 
              onClick={onApply}
              disabled={isApplied}
            >
              {isApplied ? 'Applied ✓' : 'Apply Now'}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={onSave}
              className={`border-slate-600 hover:border-slate-500 rounded-xl transition-all duration-300 transform hover:scale-110 ${
                isSaved ? "text-red-400 border-red-400 bg-red-400/10" : "text-slate-400 hover:text-white"
              }`}
            >
              <Heart className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`} />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleShare}
              className="border-slate-600 hover:border-slate-500 text-slate-400 hover:text-white rounded-xl transition-all duration-300 transform hover:scale-110"
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
          
          {isApplied && (
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-4 text-center">
              <p className="text-sm text-green-400 font-medium">
                ✓ Application submitted successfully
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
