
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Building, Briefcase, Clock, BarChart3, Filter, X } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";

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
  experienceLevel?: string;
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
    experienceLevel: "Mid Level",
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
    experienceLevel: "Senior",
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
    experienceLevel: "Mid Level",
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
    experienceLevel: "Entry Level",
    skills: ["SQL", "Excel", "Data Visualization", "Statistics"],
    description: "Join our team as a Data Analyst to help extract insights from our growing datasets..."
  },
  {
    id: 5,
    title: "Senior Product Manager",
    company: "TechCorp Inc.",
    location: "Hybrid - Nairobi",
    type: "Full-time",
    salary: "150K-200K KES/month",
    posted: "4 days ago",
    matchScore: 89,
    experienceLevel: "Executive",
    skills: ["Product Strategy", "Agile", "User Research", "Roadmapping"],
    description: "We're looking for an experienced Product Manager to lead our flagship product development..."
  }
];

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({
    remote: false,
    hybrid: false,
    inPerson: false,
    fullTime: false,
    contract: false,
    highMatch: false,
    entryLevel: false,
    midLevel: false,
    senior: false,
    executive: false
  });
  const [salaryRange, setSalaryRange] = useState<string>("all");
  const [selectedSkills, setSelectedSkills] = useState({
    javascript: false,
    react: false,
  });
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);
  const [filtersVisible, setFiltersVisible] = useState(false);
  
  const resetFilters = () => {
    setFilter({
      remote: false,
      hybrid: false,
      inPerson: false,
      fullTime: false,
      contract: false,
      highMatch: false,
      entryLevel: false,
      midLevel: false,
      senior: false,
      executive: false
    });
    setSalaryRange("all");
    setSelectedSkills({
      javascript: false,
      react: false,
    });
  };
  
  const filteredJobs = mockJobs.filter(job => {
    // Search filter
    if (searchTerm && !job.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !job.company.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))) {
      return false;
    }
    
    // Work Style filters
    if (filter.remote && !job.location.toLowerCase().includes("remote")) {
      return false;
    }
    
    if (filter.hybrid && !job.location.toLowerCase().includes("hybrid")) {
      return false;
    }
    
    if (filter.inPerson && (job.location.toLowerCase().includes("remote") || job.location.toLowerCase().includes("hybrid"))) {
      return false;
    }
    
    // Job Type filters
    if (filter.fullTime && !job.type.toLowerCase().includes("full-time")) {
      return false;
    }
    
    if (filter.contract && !job.type.toLowerCase().includes("contract")) {
      return false;
    }
    
    // Experience Level filters
    if (filter.entryLevel && job.experienceLevel !== "Entry Level") {
      return false;
    }
    
    if (filter.midLevel && job.experienceLevel !== "Mid Level") {
      return false;
    }
    
    if (filter.senior && job.experienceLevel !== "Senior") {
      return false;
    }
    
    if (filter.executive && job.experienceLevel !== "Executive") {
      return false;
    }
    
    // High match filter
    if (filter.highMatch && job.matchScore < 80) {
      return false;
    }
    
    // Salary range filter
    if (salaryRange !== "all") {
      const minSalary = parseInt(job.salary.match(/\d+/g)?.[0] || "0");
      const maxSalary = parseInt(job.salary.match(/\d+/g)?.[1] || "0");
      
      if (salaryRange === "0-50" && minSalary > 50) {
        return false;
      } else if (salaryRange === "50-100" && (minSalary > 100 || maxSalary < 50)) {
        return false;
      } else if (salaryRange === "100-150" && (minSalary > 150 || maxSalary < 100)) {
        return false;
      } else if (salaryRange === "150+" && maxSalary < 150) {
        return false;
      }
    }
    
    // Skills filters
    if (selectedSkills.javascript && !job.skills.some(skill => skill.toLowerCase() === "javascript")) {
      return false;
    }
    
    if (selectedSkills.react && !job.skills.some(skill => skill.toLowerCase() === "react")) {
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
          <div className="flex flex-col md:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search jobs, companies, or skills..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => setFiltersVisible(!filtersVisible)}
            >
              <Filter className="h-4 w-4" />
              Filters
              {Object.values(filter).some(Boolean) || salaryRange !== "all" || Object.values(selectedSkills).some(Boolean) ? (
                <Badge className="ml-1 bg-primary">{
                  Object.values(filter).filter(Boolean).length + 
                  (salaryRange !== "all" ? 1 : 0) + 
                  Object.values(selectedSkills).filter(Boolean).length
                }</Badge>
              ) : null}
            </Button>
          </div>
          
          {filtersVisible && (
            <Card className="mb-4 border border-gray-200">
              <CardContent className="py-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <Button variant="ghost" size="sm" onClick={resetFilters} className="text-sm">
                    <X className="h-4 w-4 mr-1" />
                    Reset Filters
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Work Style</h4>
                    <div className="space-y-2">
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
                          id="hybrid"
                          checked={filter.hybrid}
                          onCheckedChange={(checked) => setFilter({...filter, hybrid: checked === true})}
                        />
                        <label htmlFor="hybrid" className="text-sm font-medium">Hybrid</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="inPerson"
                          checked={filter.inPerson}
                          onCheckedChange={(checked) => setFilter({...filter, inPerson: checked === true})}
                        />
                        <label htmlFor="inPerson" className="text-sm font-medium">In-Person</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Experience Level</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="entryLevel"
                          checked={filter.entryLevel}
                          onCheckedChange={(checked) => setFilter({...filter, entryLevel: checked === true})}
                        />
                        <label htmlFor="entryLevel" className="text-sm font-medium">Entry Level</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="midLevel"
                          checked={filter.midLevel}
                          onCheckedChange={(checked) => setFilter({...filter, midLevel: checked === true})}
                        />
                        <label htmlFor="midLevel" className="text-sm font-medium">Mid Level</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="senior"
                          checked={filter.senior}
                          onCheckedChange={(checked) => setFilter({...filter, senior: checked === true})}
                        />
                        <label htmlFor="senior" className="text-sm font-medium">Senior</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="executive"
                          checked={filter.executive}
                          onCheckedChange={(checked) => setFilter({...filter, executive: checked === true})}
                        />
                        <label htmlFor="executive" className="text-sm font-medium">Executive</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Salary Range</h4>
                    <Select
                      value={salaryRange}
                      onValueChange={(value) => setSalaryRange(value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Ranges</SelectItem>
                        <SelectItem value="0-50">0 - 50K KES</SelectItem>
                        <SelectItem value="50-100">50K - 100K KES</SelectItem>
                        <SelectItem value="100-150">100K - 150K KES</SelectItem>
                        <SelectItem value="150+">150K+ KES</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Skills</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="javascript"
                          checked={selectedSkills.javascript}
                          onCheckedChange={(checked) => setSelectedSkills({...selectedSkills, javascript: checked === true})}
                        />
                        <label htmlFor="javascript" className="text-sm font-medium">JavaScript</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="react"
                          checked={selectedSkills.react}
                          onCheckedChange={(checked) => setSelectedSkills({...selectedSkills, react: checked === true})}
                        />
                        <label htmlFor="react" className="text-sm font-medium">React</label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="highMatch"
                      checked={filter.highMatch}
                      onCheckedChange={(checked) => setFilter({...filter, highMatch: checked === true})}
                    />
                    <label htmlFor="highMatch" className="text-sm font-medium">High Match (80%+)</label>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
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
                        <Link to={`/jobs/${job.id}`}>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </Link>
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
