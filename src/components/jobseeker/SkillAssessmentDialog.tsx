
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle } from "lucide-react";
import { useSkillsAssessment, Skill } from "@/hooks/use-skills-assessment";

interface SkillAssessmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SkillAssessmentDialog = ({ open, onOpenChange }: SkillAssessmentDialogProps) => {
  const { skills, verifySkill } = useSkillsAssessment();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = ["all", ...new Set(skills.map(skill => skill.category))];
  const filteredSkills = selectedCategory === "all" 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  const handleVerifySkill = (skillId: string) => {
    verifySkill(skillId);
  };

  const getProficiencyColor = (level: number) => {
    if (level >= 4) return "text-green-600";
    if (level >= 3) return "text-yellow-600";
    return "text-red-600";
  };

  const getProficiencyText = (level: number) => {
    if (level >= 4) return "Advanced";
    if (level >= 3) return "Intermediate";
    if (level >= 2) return "Beginner";
    return "Learning";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Skills Assessment</DialogTitle>
          <DialogDescription>
            Verify your skills to improve your profile completion and job matches
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category === "all" ? "All Skills" : category}
              </Button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredSkills.map((skill) => (
              <div key={skill.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{skill.name}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {skill.category}
                    </Badge>
                    {skill.isVerified && (
                      <Badge variant="default" className="text-xs bg-green-100 text-green-800">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-sm ${getProficiencyColor(skill.proficiencyLevel)}`}>
                      {getProficiencyText(skill.proficiencyLevel)}
                    </span>
                    <Progress value={skill.proficiencyLevel * 20} className="w-20 h-2" />
                  </div>
                </div>
                <Button
                  size="sm"
                  variant={skill.isVerified ? "outline" : "default"}
                  onClick={() => handleVerifySkill(skill.id)}
                  disabled={skill.isVerified}
                  className="ml-4"
                >
                  {skill.isVerified ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Verified
                    </>
                  ) : (
                    <>
                      <Circle className="h-4 w-4 mr-1" />
                      Verify
                    </>
                  )}
                </Button>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <Button onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
