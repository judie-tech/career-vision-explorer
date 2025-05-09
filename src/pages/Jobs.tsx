
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Building, Briefcase, Clock, BarChart3 } from "lucide-react";
import { toast } from "sonner";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  matchScore: number;
  skills: string[];
  description: string;
  applied?: boolean;
}

const mockJobs: Job[] = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Solutions Ltd",
    location: "Nairobi, Kenya",
    type: "Full-time",
    salary: "50K-80K KES/month",
    posted: "2 days ago",
    matchScore: 92,
    skills: ["React", "JavaScript", "CSS", "UI/UX"],
    description: "We're looking for a Frontend Developer to join our team and help build responsive web applications..."
  },
  {
    id: 2,
    title: "Software Engineer",
    company: "Innovative Systems",
    location: "Nairobi, Kenya",
    type: "Full-time",
    salary: "70K-100K KES/month",
    posted: "1 week ago",
    matchScore: 85,
    skills: ["Python", "Django", "REST APIs", "PostgreSQL"],
    description: "Seeking a Software Engineer to develop and maintain backend services and APIs..."
  },
  {
    id: 3,
    title: "UX Designer",
    company: "Creative Digital Agency",
    location: "Remote",
    type: "Contract",
    salary: "60K-90K KES/month",
    posted: "3 days ago",
    matchScore: 78,
    skills: ["Figma", "User Research", "Prototyping", "UI Design"],
    description: "Looking for a UX Designer to create user-centered designs for web and mobile applications..."
  },
  {
    id: 4,
    title: "Data Analyst",
    company: "Data Insights Co",
    location: "Mombasa, Kenya",
    type: "Full-time",
    salary: "45K-70K KES/month",
    posted: "Just now",
    matchScore: 65,
    skills: ["SQL", "Excel", "Data Visualization", "Statistics"],
    description: "Join our team as a Data Analyst to help extract insights from our growing datasets..."
  }
];

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({
    remote: false,
    fullTime: false,
    contract: false,
    highMatch: false
  });
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);
  
  const filteredJobs = mockJobs.filter(job => {
    // Search filter
    if (searchTerm && !job.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !job.company.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))) {
      return false;
    }
    
    // Remote filter
    if (filter.remote && !job.location.toLowerCase().includes("remote")) {
      return false;
    }
    
    // Full-time filter
    if (filter.fullTime && !job.type.toLowerCase().includes("full-time")) {
      return false;
    }
    
    // Contract filter
    if (filter.contract && !job.type.toLowerCase().includes("contract")) {
      return false;
    }
    
    // High match filter
    if (filter.highMatch && job.matchScore < 80) {
      return false;
    }
    
    return true;
  });
  
  const handleApply = (jobId: number) => {
    if (!appliedJobs.includes(jobId)) {
      setAppliedJobs([...appliedJobs, jobId]);
      toast.success("Application submitted", {
        description: "Your application has been successfully submitted"
      });
    }
  };
  
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-2">Find Your Dream Job</h1>
        <p className="text-gray-500 mb-8">
          Our AI-powered job matcher finds the perfect opportunities for your skills and career goals.
        </p>
        
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search jobs, companies, or skills..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="remote"
                checked={filter.remote}
                onCheckedChange={(checked) => setFilter({...filter, remote: checked === true})}
              />
              <label htmlFor="remote" className="text-sm font-medium">Remote</label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="fullTime"
                checked={filter.fullTime}
                onCheckedChange={(checked) => setFilter({...filter, fullTime: checked === true})}
              />
              <label htmlFor="fullTime" className="text-sm font-medium">Full-time</label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="contract"
                checked={filter.contract}
                onCheckedChange={(checked) => setFilter({...filter, contract: checked === true})}
              />
              <label htmlFor="contract" className="text-sm font-medium">Contract</label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="highMatch"
                checked={filter.highMatch}
                onCheckedChange={(checked) => setFilter({...filter, highMatch: checked === true})}
              />
              <label htmlFor="highMatch" className="text-sm font-medium">High Match (80%+)</label>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-10">
              <h3 className="text-lg font-medium mb-2">No jobs found</h3>
              <p className="text-gray-500">Try adjusting your filters or search term</p>
            </div>
          ) : (
            filteredJobs.map(job => {
              const isApplied = appliedJobs.includes(job.id);
              
              return (
                <Card key={job.id} className="overflow-hidden">
                  <div className={`h-1 ${
                    job.matchScore >= 90 ? 'bg-green-500' : 
                    job.matchScore >= 80 ? 'bg-green-400' : 
                    job.matchScore >= 70 ? 'bg-yellow-500' : 
                    'bg-orange-500'
                  }`} style={{ width: `${job.matchScore}%` }}></div>
                  
                  <CardHeader>
                    <div className="flex justify-between">
                      <div>
                        <CardTitle className="flex items-center">
                          {job.title}
                          <Badge variant="outline" className="ml-2">
                            {job.matchScore}% Match
                          </Badge>
                        </CardTitle>
                        <CardDescription>{job.company}</CardDescription>
                      </div>
                      <BarChart3 className="h-10 w-10 text-gray-300" />
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="flex flex-wrap gap-y-2">
                        <div className="flex items-center text-sm text-gray-500 mr-4">
                          <MapPin className="mr-1 h-4 w-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mr-4">
                          <Briefcase className="mr-1 h-4 w-4" />
                          {job.type}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mr-4">
                          <Building className="mr-1 h-4 w-4" />
                          {job.salary}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="mr-1 h-4 w-4" />
                          {job.posted}
                        </div>
                      </div>
                      
                      <p className="text-sm">{job.description}</p>
                      
                      <div className="flex flex-wrap gap-2 my-2">
                        {job.skills.map(skill => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center pt-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button 
                          onClick={() => handleApply(job.id)}
                          disabled={isApplied}
                        >
                          {isApplied ? 'Applied' : 'Apply Now'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Jobs;
