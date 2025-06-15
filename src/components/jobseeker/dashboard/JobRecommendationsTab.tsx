
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, MapPin, Briefcase, DollarSign, Clock, Eye, ExternalLink, TrendingUp } from "lucide-react";

export const JobRecommendationsTab = () => {
  const navigate = useNavigate();

  const jobRecommendations = [
    {
      id: "4",
      title: "DevOps Engineer",
      company: "Tech Solutions",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$115,000 - $140,000",
      matchScore: 87,
      posted: "5/7/2023",
      description: "Manage cloud infrastructure and CI/CD pipelines for optimal performance."
    },
    {
      id: "2",
      title: "Software Engineer",
      company: "Innovative Systems",
      location: "Nairobi, Kenya",
      type: "Full-time",
      salary: "$70,000 - $100,000",
      matchScore: 85,
      posted: "5/5/2023",
      description: "Develop and maintain backend services and APIs for our growing platform."
    },
    {
      id: "1",
      title: "Frontend Developer",
      company: "Creative Agency",
      location: "Remote",
      type: "Full-time",
      salary: "$60,000 - $85,000",
      matchScore: 78,
      posted: "5/3/2023",
      description: "Build responsive web applications using modern frontend technologies."
    }
  ];

  const handleViewDetails = (jobId: string) => {
    navigate(`/jobs/${jobId}`);
  };

  const handleApplyNow = (jobId: string) => {
    navigate(`/jobs/${jobId}`);
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          Job Recommendations
        </CardTitle>
        <CardDescription>Tailored matches based on your profile and skills</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {jobRecommendations.map((job) => (
          <div 
            key={job.id} 
            className="p-6 bg-gradient-to-r from-white to-gray-50/50 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {job.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Building className="h-4 w-4 text-blue-500" />
                    {job.company}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-green-500" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4 text-purple-500" />
                    {job.type}
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-orange-500" />
                    {job.salary}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge className={`px-3 py-1 font-semibold ${
                  job.matchScore >= 85 ? 'bg-green-100 text-green-800 border-green-200' : 
                  job.matchScore >= 75 ? 'bg-blue-100 text-blue-800 border-blue-200' : 
                  'bg-yellow-100 text-yellow-800 border-yellow-200'
                }`}>
                  {job.matchScore}% Match
                </Badge>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  Posted {job.posted}
                </div>
              </div>
            </div>
            
            <p className="text-gray-700 mb-4 leading-relaxed">
              {job.description}
            </p>
            
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Great match for your DevOps skills
              </div>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => handleViewDetails(job.id)}
                  className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-all duration-200"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                <Button 
                  onClick={() => handleApplyNow(job.id)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Apply Now
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
