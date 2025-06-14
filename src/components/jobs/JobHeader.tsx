
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin, Briefcase, Clock, BarChart3 } from "lucide-react";

interface JobHeaderProps {
  job: {
    title: string;
    company: string;
    location: string;
    type: string;
    posted: string;
    matchScore: number;
  };
}

export const JobHeader = ({ job }: JobHeaderProps) => {
  return (
    <Card className="career-card">
      {/* Match Score Bar */}
      <div className="h-2 bg-muted rounded-t-xl">
        <div 
          className={`h-full rounded-t-xl ${
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
          <div className="space-y-4">
            <div>
              <CardTitle className="text-3xl mb-3">
                {job.title}
              </CardTitle>
              <CardDescription className="text-xl font-medium">
                {job.company}
              </CardDescription>
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                {job.location}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Briefcase className="h-4 w-4 text-primary" />
                {job.type}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4 text-primary" />
                {job.posted}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right">
              <Badge className={`text-lg px-4 py-2 font-bold ${
                job.matchScore >= 90 ? 'bg-green-500 hover:bg-green-600' : 
                job.matchScore >= 80 ? 'bg-blue-500 hover:bg-blue-600' : 
                job.matchScore >= 70 ? 'bg-yellow-500 hover:bg-yellow-600' : 
                'bg-orange-500 hover:bg-orange-600'
              } text-white`}>
                {job.matchScore}% Match
              </Badge>
            </div>
            <BarChart3 className="h-8 w-8 text-muted-foreground" />
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};
