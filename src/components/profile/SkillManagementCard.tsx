
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
  category: string;
}

interface SkillManagementCardProps {
  skills: Skill[];
  onUpdateSkill: (skillId: string, level: number) => void;
  onVerifySkill: (skillId: string) => void;
}

const SkillManagementCard = ({ skills, onUpdateSkill, onVerifySkill }: SkillManagementCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Skill Management</CardTitle>
        <CardDescription>Add, remove, and verify your skills</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Technical Skills</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.filter(skill => ["Programming", "Frontend", "Backend"].includes(skill.category)).slice(0, 6).map((skill) => (
                <div key={skill.id} className="border rounded-md p-3">
                  <div className="flex justify-between">
                    <span className="font-medium">{skill.name}</span>
                    {skill.isVerified && (
                      <Badge variant="outline" className="text-xs bg-green-50">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Proficiency</span>
                      <span>{skill.proficiencyLevel * 20}%</span>
                    </div>
                    <Progress value={skill.proficiencyLevel * 20} />
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs flex-1"
                      onClick={() => onUpdateSkill(skill.id, skill.proficiencyLevel)}
                    >
                      Edit
                    </Button>
                    {!skill.isVerified && (
                      <Button 
                        size="sm" 
                        className="text-xs flex-1"
                        onClick={() => onVerifySkill(skill.id)}
                      >
                        Verify
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              <div className="border border-dashed rounded-md p-3 flex items-center justify-center">
                <Button variant="ghost" className="text-sm">+ Add Skill</Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillManagementCard;
