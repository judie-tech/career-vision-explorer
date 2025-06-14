
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
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
      <Card className="relative bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden backdrop-blur-sm">
        {/* Match Score Bar */}
        <div className="h-2 bg-gradient-to-r from-transparent via-slate-700 to-transparent">
          <div 
            className={`h-full bg-gradient-to-r ${
              job.matchScore >= 90 ? 'from-green-400 to-emerald-500' : 
              job.matchScore >= 80 ? 'from-blue-400 to-cyan-500' : 
              job.matchScore >= 70 ? 'from-yellow-400 to-orange-500' : 
              'from-orange-400 to-red-500'
            } shadow-lg`} 
            style={{ width: `${job.matchScore}%` }}
          ></div>
        </div>
        
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <div className="space-y-4">
              <div>
                <CardTitle className="text-3xl mb-3 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  {job.title}
                </CardTitle>
                <CardDescription className="text-xl text-slate-400 font-medium">
                  {job.company}
                </CardDescription>
              </div>
              
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-slate-400 bg-slate-800/50 px-3 py-2 rounded-lg">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  {job.location}
                </div>
                <div className="flex items-center gap-2 text-slate-400 bg-slate-800/50 px-3 py-2 rounded-lg">
                  <Briefcase className="h-4 w-4 text-indigo-400" />
                  {job.type}
                </div>
                <div className="flex items-center gap-2 text-slate-400 bg-slate-800/50 px-3 py-2 rounded-lg">
                  <Clock className="h-4 w-4 text-purple-400" />
                  {job.posted}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <Badge className={`text-lg px-4 py-2 font-bold border-0 ${
                  job.matchScore >= 90 ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 
                  job.matchScore >= 80 ? 'bg-gradient-to-r from-blue-500 to-cyan-600' : 
                  job.matchScore >= 70 ? 'bg-gradient-to-r from-yellow-500 to-orange-600' : 
                  'bg-gradient-to-r from-orange-500 to-red-600'
                } text-white shadow-lg`}>
                  {job.matchScore}% Match
                </Badge>
              </div>
              <BarChart3 className="h-8 w-8 text-slate-500" />
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};
