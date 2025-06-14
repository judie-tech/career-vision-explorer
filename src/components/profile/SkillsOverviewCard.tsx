
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

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
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Skills Overview</CardTitle>
        <CardDescription>Your top skills and proficiency levels</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {skills.slice(0, 4).map((skill) => (
            <div key={skill.id} className="space-y-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-sm font-medium">{skill.name}</span>
                  {skill.isVerified && (
                    <Badge variant="outline" className="ml-2 text-xs bg-green-50">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <span className="text-xs">{skill.proficiencyLevel * 20}%</span>
              </div>
              <Progress value={skill.proficiencyLevel * 20} />
            </div>
          ))}
          
          <Button 
            variant="ghost" 
            className="w-full text-sm"
            onClick={onShowSkillsDialog}
          >
            View All Skills
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsOverviewCard;
