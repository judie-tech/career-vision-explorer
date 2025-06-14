
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface Assessment {
  title: string;
  score: number;
  date: string;
  badgeEarned: boolean;
}

interface RecentAssessmentsCardProps {
  assessments: Assessment[];
  onShowSkillsDialog: () => void;
}

const RecentAssessmentsCard = ({ assessments, onShowSkillsDialog }: RecentAssessmentsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Assessments</CardTitle>
        <CardDescription>Results from your latest skill assessments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assessments.map((assessment, index) => (
            <div key={index} className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0">
              <div>
                <p className="font-medium">{assessment.title}</p>
                <p className="text-xs text-gray-500">Completed {assessment.date}</p>
              </div>
              <div className="flex items-center">
                <Badge className={`mr-2 ${assessment.score >= 80 ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                  {assessment.score}%
                </Badge>
                {assessment.badgeEarned && (
                  <Star className="h-4 w-4 text-amber-500" />
                )}
              </div>
            </div>
          ))}
          
          <Button 
            variant="ghost" 
            className="w-full text-sm"
            onClick={onShowSkillsDialog}
          >
            Take New Assessment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentAssessmentsCard;
