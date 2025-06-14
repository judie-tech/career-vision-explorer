
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Award, TrendingUp } from "lucide-react";

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
    <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-amber-50/20">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Award className="h-5 w-5 text-amber-600" />
          Recent Assessments
        </CardTitle>
        <CardDescription className="text-gray-600">Results from your latest skill assessments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assessments.map((assessment, index) => (
            <div key={index} className="flex justify-between items-center p-4 bg-white/60 rounded-lg border-l-4 border-l-amber-400 hover:shadow-md transition-all duration-200">
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{assessment.title}</p>
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  Completed {assessment.date}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge 
                  className={`font-bold ${
                    assessment.score >= 80 
                      ? 'bg-green-100 text-green-800 border-green-200' 
                      : 'bg-amber-100 text-amber-800 border-amber-200'
                  }`}
                >
                  {assessment.score}%
                </Badge>
                {assessment.badgeEarned && (
                  <Star className="h-5 w-5 text-amber-500 fill-current" />
                )}
              </div>
            </div>
          ))}
          
          <Button 
            variant="ghost" 
            className="w-full text-sm font-medium hover:bg-amber-50 text-amber-700 hover:text-amber-800 transition-colors duration-200"
            onClick={onShowSkillsDialog}
          >
            Take New Assessment →
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentAssessmentsCard;
