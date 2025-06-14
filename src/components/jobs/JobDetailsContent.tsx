
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Target, Zap, Award, Briefcase, Heart } from "lucide-react";

interface JobDetailsContentProps {
  job: {
    description: string;
    skills: string[];
    requirements: string[];
    responsibilities: string[];
    benefits: string[];
  };
}

export const JobDetailsContent = ({ job }: JobDetailsContentProps) => {
  return (
    <Card className="career-card">
      <CardContent className="p-8">
        <div className="space-y-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Target className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">About this role</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed text-lg pl-9">{job.description}</p>
          </div>
          
          {/* Skills Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Zap className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">Required Skills</h3>
            </div>
            <div className="flex flex-wrap gap-3 pl-9">
              {job.skills.map(skill => (
                <Badge 
                  key={skill} 
                  className="bg-primary text-primary-foreground border-0 px-4 py-2 text-sm font-semibold rounded-lg hover:bg-primary/90"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          
          <Separator />
          
          {/* Requirements Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Award className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">Requirements</h3>
            </div>
            <ul className="space-y-3 pl-9">
              {job.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                  <span className="text-muted-foreground leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Responsibilities Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Briefcase className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">Responsibilities</h3>
            </div>
            <ul className="space-y-3 pl-9">
              {job.responsibilities.map((resp, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                  <span className="text-muted-foreground leading-relaxed">{resp}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Benefits Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Heart className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">Benefits</h3>
            </div>
            <ul className="space-y-3 pl-9">
              {job.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                  <span className="text-muted-foreground leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
