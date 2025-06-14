import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import { JobApplicationDialog } from "@/components/jobseeker/JobApplicationDialog";
import { useJobApplications } from "@/hooks/use-job-applications";
import { JobsHeader } from "@/components/jobs/JobsHeader";
import { JobsSearchBar } from "@/components/jobs/JobsSearchBar";
import { JobsFilters } from "@/components/jobs/JobsFilters";
import { JobsList } from "@/components/jobs/JobsList";

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

  const activeFiltersCount = Object.values(filter).filter(Boolean).length + 
    (salaryRange !== "all" ? 1 : 0) + 
    Object.values(selectedSkills).filter(Boolean).length;
  
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
        
        <div className="relative container py-12">
          <JobsHeader />
          
          <JobsSearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filtersVisible={filtersVisible}
            setFiltersVisible={setFiltersVisible}
            activeFiltersCount={activeFiltersCount}
          />
          
          {filtersVisible && (
            <div className="animate-fade-in">
              <JobsFilters
                filter={filter}
                setFilter={setFilter}
                salaryRange={salaryRange}
                setSalaryRange={setSalaryRange}
                selectedSkills={selectedSkills}
                setSelectedSkills={setSelectedSkills}
                resetFilters={resetFilters}
              />
            </div>
          )}
          
          <JobsList
            jobs={filteredJobs}
            isJobApplied={isJobApplied}
            isJobSaved={isJobSaved}
            onApply={handleApply}
            onSave={handleSaveJob}
          />
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
