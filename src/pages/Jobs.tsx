import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Building, Briefcase, Clock, BarChart3, Filter, X, Heart } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import { JobApplicationDialog } from "@/components/jobseeker/JobApplicationDialog";
import { useJobApplications } from "@/hooks/use-job-applications";

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

const mockJobs: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "Tech Solutions Ltd",
    location: "Nairobi, Kenya",
    type: "Full-time",
    salary: "50K-80K KES/month",
    posted: "2 days ago",
    matchScore: 92,
    experienceLevel: "Mid Level",
    skills: ["React", "JavaScript", "CSS", "UI/UX"],
    description: "We're looking for a Frontend Developer to join our team and help build responsive web applications using modern technologies like React, TypeScript, and Tailwind CSS."
  },
  {
    id: "2",
    title: "Software Engineer",
    company: "Innovative Systems",
    location: "Nairobi, Kenya",
    type: "Full-time",
    salary: "70K-100K KES/month",
    posted: "1 week ago",
    matchScore: 85,
    experienceLevel: "Senior",
    skills: ["Python", "Django", "REST APIs", "PostgreSQL"],
    description: "Seeking a Software Engineer to develop and maintain backend services and APIs for our growing platform. Experience with Python and Django required."
  },
  {
    id: "3",
    title: "UX Designer",
    company: "Creative Digital Agency",
    location: "Remote",
    type: "Contract",
    salary: "60K-90K KES/month",
    posted: "3 days ago",
    matchScore: 78,
    experienceLevel: "Mid Level",
    skills: ["Figma", "User Research", "Prototyping", "UI Design"],
    description: "Looking for a UX Designer to create user-centered designs for web and mobile applications. Strong portfolio and Figma skills required."
  },
  {
    id: "4",
    title: "Data Analyst",
    company: "Data Insights Co",
    location: "Mombasa, Kenya",
    type: "Full-time",
    salary: "45K-70K KES/month",
    posted: "Just now",
    matchScore: 65,
    experienceLevel: "Entry Level",
    skills: ["SQL", "Excel", "Data Visualization", "Statistics"],
    description: "Join our team as a Data Analyst to help extract insights from our growing datasets. Experience with SQL and data visualization tools preferred."
  },
  {
    id: "5",
    title: "Senior Product Manager",
    company: "TechCorp Inc.",
    location: "Hybrid - Nairobi",
    type: "Full-time",
    salary: "150K-200K KES/month",
    posted: "4 days ago",
    matchScore: 89,
    experienceLevel: "Executive",
    skills: ["Product Strategy", "Agile", "User Research", "Roadmapping"],
    description: "We're looking for an experienced Product Manager to lead our flagship product development and work with cross-functional teams."
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
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applicationDialogOpen, setApplicationDialogOpen] = useState(false);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  
  const { getApplicationForJob } = useJobApplications();
  
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
  
  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setApplicationDialogOpen(true);
  };

  const handleSaveJob = (jobId: string) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
      toast.success("Job removed from saved jobs");
    } else {
      setSavedJobs([...savedJobs, jobId]);
      toast.success("Job saved successfully");
    }
  };

  const isJobApplied = (jobId: string) => {
    return !!getApplicationForJob(jobId);
  };

  const isJobSaved = (jobId: string) => {
    return savedJobs.includes(jobId);
  };
  
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
        <div className="container py-8">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Find Your Dream Job
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered job matcher finds the perfect opportunities for your skills and career goals.
            </p>
          </div>
          
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-3 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search jobs, companies, or skills..."
                  className="pl-10 career-card border-0 shadow-md"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button 
                variant="outline" 
                className="flex items-center gap-2 career-card border-0 shadow-md"
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
              <Card className="mb-4 career-card border-0 shadow-lg">
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
                const isApplied = isJobApplied(job.id);
                const isSaved = isJobSaved(job.id);
                
                return (
                  <Card key={job.id} className="career-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
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
                            onClick={() => handleSaveJob(job.id)}
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
                          onClick={() => handleApply(job)}
                          disabled={isApplied}
                          className={`modern-btn-primary ${isApplied ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          {isApplied ? 'Applied ✓' : 'Apply Now'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </div>

        <JobApplicationDialog
          job={selectedJob}
          open={applicationDialogOpen}
          onOpenChange={setApplicationDialogOpen}
        />
      </div>
    </Layout>
  );
};

export default Jobs;
