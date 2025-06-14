
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Code } from "lucide-react";

interface Skill {
  id: string;
  name: string;
  proficiencyLevel: number;
  isVerified: boolean;
}

interface SkillsOverviewCardProps {
  skills: Skill[];
  onShowSkillsDialog: () => void;
}

const SkillsOverviewCard = ({ skills, onShowSkillsDialog }: SkillsOverviewCardProps) => {
  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-green-50/20">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Code className="h-5 w-5 text-green-600" />
          Skills Overview
        </CardTitle>
        <CardDescription className="text-gray-600">Your top skills and proficiency levels</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {skills.slice(0, 4).map((skill) => (
            <div key={skill.id} className="space-y-3 p-3 bg-white/60 rounded-lg">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-800">{skill.name}</span>
                  {skill.isVerified && (
                    <Badge variant="outline" className="text-xs bg-green-50 border-green-200 text-green-700">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <span className="text-sm font-bold text-blue-600">{skill.proficiencyLevel * 20}%</span>
              </div>
              <Progress 
                value={skill.proficiencyLevel * 20} 
                className="h-2 bg-gray-100"
              />
            </div>
          ))}
          
          <Button 
            variant="ghost" 
            className="w-full text-sm font-medium hover:bg-green-50 text-green-700 hover:text-green-800 transition-colors duration-200"
            onClick={onShowSkillsDialog}
          >
            View All Skills →
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsOverviewCard;
