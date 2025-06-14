
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
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
      <Card className="relative bg-slate-800/50 border border-slate-700/50 rounded-2xl backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="space-y-8">
            {/* About Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Target className="h-6 w-6 text-blue-400" />
                <h3 className="text-xl font-bold text-white">About this role</h3>
              </div>
              <p className="text-slate-300 leading-relaxed text-lg pl-9">{job.description}</p>
            </div>
            
            {/* Skills Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Zap className="h-6 w-6 text-purple-400" />
                <h3 className="text-xl font-bold text-white">Required Skills</h3>
              </div>
              <div className="flex flex-wrap gap-3 pl-9">
                {job.skills.map(skill => (
                  <Badge 
                    key={skill} 
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 px-4 py-2 text-sm font-semibold rounded-lg hover:scale-105 transition-transform duration-200"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            <Separator className="bg-slate-700/50" />
            
            {/* Requirements Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Award className="h-6 w-6 text-emerald-400" />
                <h3 className="text-xl font-bold text-white">Requirements</h3>
              </div>
              <ul className="space-y-3 pl-9">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-3 flex-shrink-0"></div>
                    <span className="text-slate-300 leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Responsibilities Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Briefcase className="h-6 w-6 text-cyan-400" />
                <h3 className="text-xl font-bold text-white">Responsibilities</h3>
              </div>
              <ul className="space-y-3 pl-9">
                {job.responsibilities.map((resp, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mt-3 flex-shrink-0"></div>
                    <span className="text-slate-300 leading-relaxed">{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Benefits Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Heart className="h-6 w-6 text-pink-400" />
                <h3 className="text-xl font-bold text-white">Benefits</h3>
              </div>
              <ul className="space-y-3 pl-9">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full mt-3 flex-shrink-0"></div>
                    <span className="text-slate-300 leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
