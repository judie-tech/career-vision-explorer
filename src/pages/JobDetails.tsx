
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { JobApplicationDialog } from "@/components/jobseeker/JobApplicationDialog";
import { useJobApplications } from "@/hooks/use-job-applications";
import { JobHeader } from "@/components/jobs/JobHeader";
import { JobActions } from "@/components/jobs/JobActions";
import { JobDetailsContent } from "@/components/jobs/JobDetailsContent";
import { CompanyInfoCard } from "@/components/jobs/CompanyInfoCard";
import { JobNotFound } from "@/components/jobs/JobNotFound";

// Mock job data - in a real app this would come from an API
const mockJobDetails = {
  "1": {
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
    description: "We're looking for a Frontend Developer to join our team and help build responsive web applications using modern technologies like React, TypeScript, and Tailwind CSS.",
    requirements: [
      "3+ years of experience with React and JavaScript",
      "Strong understanding of HTML, CSS, and responsive design",
      "Experience with state management libraries (Redux, Zustand)",
      "Familiarity with TypeScript and modern JavaScript features",
      "Understanding of version control systems (Git)"
    ],
    responsibilities: [
      "Develop and maintain responsive web applications",
      "Collaborate with design team to implement UI/UX designs",
      "Write clean, maintainable, and well-documented code",
      "Participate in code reviews and technical discussions",
      "Stay updated with latest frontend technologies and best practices"
    ],
    benefits: [
      "Competitive salary and performance bonuses",
      "Health insurance coverage",
      "Flexible working hours",
      "Professional development opportunities",
      "Modern office environment"
    ],
    companyInfo: {
      size: "50-100 employees",
      industry: "Technology",
      founded: "2018",
      website: "https://techsolutions.co.ke"
    }
  },
  "2": {
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
    description: "Seeking a Software Engineer to develop and maintain backend services and APIs for our growing platform. Experience with Python and Django required.",
    requirements: [
      "5+ years of experience with Python and Django",
      "Strong knowledge of REST API design and development",
      "Experience with PostgreSQL and database optimization",
      "Understanding of software architecture and design patterns",
      "Experience with cloud platforms (AWS, GCP, or Azure)"
    ],
    responsibilities: [
      "Design and develop scalable backend services",
      "Build and maintain REST APIs",
      "Optimize database queries and performance",
      "Implement security best practices",
      "Mentor junior developers"
    ],
    benefits: [
      "Competitive salary package",
      "Stock options",
      "Health and life insurance",
      "Annual training budget",
      "Remote work flexibility"
    ],
    companyInfo: {
      size: "100-200 employees",
      industry: "Software Development",
      founded: "2015",
      website: "https://innovativesystems.co.ke"
    }
  }
};

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [applicationDialogOpen, setApplicationDialogOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  const { getApplicationForJob } = useJobApplications();
  
  const job = id ? mockJobDetails[id as keyof typeof mockJobDetails] : null;
  
  if (!job) {
    return (
      <Layout>
        <JobNotFound />
      </Layout>
    );
  }
  
  const isApplied = !!getApplicationForJob(job.id);
  
  const handleApply = () => {
    setApplicationDialogOpen(true);
  };
  
  const handleSave = () => {
    setIsSaved(!isSaved);
    toast.success(isSaved ? "Job removed from saved jobs" : "Job saved successfully");
  };
  
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="container py-8">
          {/* Back Button */}
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/jobs')} 
              className="mb-4 text-slate-300 hover:text-white hover:bg-slate-800/50 border border-slate-700/50 rounded-xl transition-all duration-300"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Jobs
            </Button>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <JobHeader job={job} />
              <JobDetailsContent job={job} />
            </div>
            
            {/* Sidebar */}
            <div className="space-y-8">
              <JobActions 
                job={job}
                isApplied={isApplied}
                isSaved={isSaved}
                onApply={handleApply}
                onSave={handleSave}
              />
              <CompanyInfoCard 
                company={{
                  name: job.company,
                  size: job.companyInfo.size,
                  industry: job.companyInfo.industry,
                  founded: job.companyInfo.founded,
                  website: job.companyInfo.website
                }}
              />
            </div>
          </div>
        </div>
        
        <JobApplicationDialog
          job={job}
          open={applicationDialogOpen}
          onOpenChange={setApplicationDialogOpen}
        />
      </div>
    </Layout>
  );
};

export default JobDetails;
