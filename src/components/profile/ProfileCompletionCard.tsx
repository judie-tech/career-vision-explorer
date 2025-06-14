
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle } from "lucide-react";

interface ProfileCompletionCardProps {
  profileCompletionScore: number;
  verifiedSkills: number;
  totalSkills: number;
}

const ProfileCompletionCard = ({ profileCompletionScore, verifiedSkills, totalSkills }: ProfileCompletionCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Profile Completion</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span className="font-medium">Overall Progress</span>
              <span>{profileCompletionScore}%</span>
            </div>
            <Progress value={profileCompletionScore} />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
              Personal Information
            </div>
            <div className="flex items-center text-sm">
              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
              Education History
            </div>
            <div className="flex items-center text-sm">
              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
              Skills & Assessments ({verifiedSkills}/{totalSkills})
            </div>
            <div className="flex items-center text-sm text-gray-400">
              <div className="h-4 w-4 mr-2 rounded-full border border-gray-300"></div>
              Certifications
            </div>
            <div className="flex items-center text-sm text-gray-400">
              <div className="h-4 w-4 mr-2 rounded-full border border-gray-300"></div>
              Portfolio Items
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCompletionCard;
