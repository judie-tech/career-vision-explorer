
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building, Briefcase, Clock, BarChart3, Heart } from "lucide-react";
import { Link } from "react-router-dom";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  matchScore: number;
  skills: string[];
  description: string;
  experienceLevel?: string;
}

interface JobCardProps {
  job: Job;
  isApplied: boolean;
  isSaved: boolean;
  onApply: (job: Job) => void;
  onSave: (jobId: string) => void;
}

export const JobCard = ({ job, isApplied, isSaved, onApply, onSave }: JobCardProps) => {
  return (
    <Card className="career-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
      {/* Match Score Progress Bar */}
      <div className="h-2 bg-muted">
        <div 
          className={`h-full transition-all duration-500 ${
            job.matchScore >= 90 ? 'bg-green-500' : 
            job.matchScore >= 80 ? 'bg-blue-500' : 
            job.matchScore >= 70 ? 'bg-yellow-500' : 
            'bg-orange-500'
          }`} 
          style={{ width: `${job.matchScore}%` }}
        ></div>
      </div>
      
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-200 flex items-center gap-3">
              {job.title}
              <Badge className={`text-sm px-3 py-1 font-bold ${
                job.matchScore >= 90 ? 'bg-green-500 hover:bg-green-600' : 
                job.matchScore >= 80 ? 'bg-blue-500 hover:bg-blue-600' : 
                job.matchScore >= 70 ? 'bg-yellow-500 hover:bg-yellow-600' : 
                'bg-orange-500 hover:bg-orange-600'
              } text-white border-0`}>
                {job.matchScore}% Match
              </Badge>
              {isApplied && (
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  Applied ✓
                </Badge>
              )}
            </CardTitle>
            <CardDescription className="text-lg font-medium">{job.company}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onSave(job.id)}
              className={`transition-all duration-200 ${
                isSaved ? "text-red-500 bg-red-50 border border-red-200" : "text-gray-400 hover:text-red-500"
              }`}
            >
              <Heart className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`} />
            </Button>
            <BarChart3 className="h-8 w-8 text-muted-foreground" />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            {job.location}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Briefcase className="h-4 w-4 text-primary" />
            {job.type}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building className="h-4 w-4 text-primary" />
            {job.salary}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-primary" />
            {job.posted}
          </div>
        </div>
        
        <p className="text-muted-foreground leading-relaxed">{job.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {job.skills.map(skill => (
            <Badge 
              key={skill} 
              className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
            >
              {skill}
            </Badge>
          ))}
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t">
          <Link to={`/jobs/${job.id}`}>
            <Button variant="outline" className="modern-btn-secondary">
              View Details
            </Button>
          </Link>
          <Button 
            onClick={() => onApply(job)}
            disabled={isApplied}
            className={`modern-btn-primary ${isApplied ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isApplied ? 'Applied ✓' : 'Apply Now'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
