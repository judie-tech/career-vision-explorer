
import { Building, MapPin, Briefcase, DollarSign } from "lucide-react";

interface JobSummaryCardProps {
  job: any;
}

export const JobSummaryCard = ({ job }: JobSummaryCardProps) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100 space-y-4">
      <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-3 text-gray-700">
          <Building className="h-5 w-5 text-blue-600" />
          <span className="font-medium">{job.company}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-700">
          <MapPin className="h-5 w-5 text-blue-600" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-700">
          <Briefcase className="h-5 w-5 text-blue-600" />
          <span>{job.type}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-700">
          <DollarSign className="h-5 w-5 text-blue-600" />
          <span className="font-semibold text-green-600">{job.salary}</span>
        </div>
      </div>
      
      {job.matchScore && (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">Match Score:</span>
          <div className={`px-3 py-1 rounded-full text-sm font-bold ${
            job.matchScore >= 90 ? 'bg-green-100 text-green-800' : 
            job.matchScore >= 80 ? 'bg-blue-100 text-blue-800' : 
            job.matchScore >= 70 ? 'bg-yellow-100 text-yellow-800' : 
            'bg-orange-100 text-orange-800'
          }`}>
            {job.matchScore}%
          </div>
        </div>
      )}
    </div>
  );
};
