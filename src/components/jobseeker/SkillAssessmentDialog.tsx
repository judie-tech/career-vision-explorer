
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, Trophy } from "lucide-react";
import { useSkillsAssessment } from "@/hooks/use-skills-assessment";

interface SkillAssessmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SkillAssessmentDialog = ({ open, onOpenChange }: SkillAssessmentDialogProps) => {
  const { skills, verifySkill } = useSkillsAssessment();

  const availableAssessments = [
    { id: "frontend", name: "Frontend Development", duration: "15 mins", difficulty: "Intermediate" },
    { id: "javascript", name: "JavaScript", duration: "10 mins", difficulty: "Beginner" },
    { id: "react", name: "React", duration: "20 mins", difficulty: "Advanced" },
    { id: "communication", name: "Communication Skills", duration: "12 mins", difficulty: "Beginner" },
    { id: "agile", name: "Agile Methodology", duration: "8 mins", difficulty: "Intermediate" },
  ];

  const handleStartAssessment = (assessmentId: string) => {
    // Find matching skill and verify it (simulate taking assessment)
    const matchingSkill = skills.find(skill => 
      skill.name.toLowerCase().includes(assessmentId) || 
      assessmentId.includes(skill.name.toLowerCase())
    );
    
    if (matchingSkill) {
      verifySkill(matchingSkill.id);
    }
    
    onOpenChange(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Skill Assessments</DialogTitle>
          <DialogDescription>
            Take assessments to verify your skills and improve your profile
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="h-5 w-5 text-blue-600" />
              <h3 className="font-medium text-blue-900">Your Progress</h3>
            </div>
            <Progress value={(skills.filter(s => s.isVerified).length / skills.length) * 100} className="mb-2" />
            <p className="text-sm text-blue-700">
              {skills.filter(s => s.isVerified).length} of {skills.length} skills verified
            </p>
          </div>

          <div className="space-y-3">
            {availableAssessments.map((assessment) => (
              <div key={assessment.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{assessment.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <Clock className="h-4 w-4" />
                      {assessment.duration}
                      <Badge className={getDifficultyColor(assessment.difficulty)}>
                        {assessment.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <Button 
                    size="sm"
                    onClick={() => handleStartAssessment(assessment.id)}
                  >
                    Start Assessment
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <h3 className="font-medium text-green-900">Benefits of Skill Verification</h3>
            </div>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Increase profile visibility to employers</li>
              <li>• Demonstrate proven expertise</li>
              <li>• Get better job recommendations</li>
              <li>• Stand out from other candidates</li>
            </ul>
          </div>

          <div className="pt-2">
            <Button variant="ghost" onClick={() => onOpenChange(false)} className="w-full">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
