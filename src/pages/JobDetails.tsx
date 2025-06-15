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
      website: "https://techsolutions.co.ke",
      logoUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&crop=center"
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
      website: "https://innovativesystems.co.ke",
      logoUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop&crop=center"
    }
  },
  "3": {
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
    description: "Looking for a UX Designer to create user-centered designs for web and mobile applications. Strong portfolio and Figma skills required.",
    requirements: [
      "3+ years of UX/UI design experience",
      "Proficiency in Figma and design systems",
      "Experience with user research methodologies",
      "Strong portfolio demonstrating design process",
      "Understanding of accessibility and usability principles"
    ],
    responsibilities: [
      "Conduct user research and usability testing",
      "Create wireframes, prototypes, and user flows",
      "Design intuitive user interfaces for web and mobile",
      "Collaborate with development teams on implementation",
      "Maintain and evolve design systems"
    ],
    benefits: [
      "Flexible remote work arrangement",
      "Competitive contract rates",
      "Creative project variety",
      "Professional portfolio development",
      "Networking opportunities"
    ],
    companyInfo: {
      size: "20-50 employees",
      industry: "Digital Agency",
      founded: "2019",
      website: "https://creativedigital.co.ke",
      logoUrl: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=400&h=400&fit=crop&crop=center"
    }
  },
  "4": {
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
    description: "Join our team as a Data Analyst to help extract insights from our growing datasets. Experience with SQL and data visualization tools preferred.",
    requirements: [
      "Bachelor's degree in Statistics, Mathematics, or related field",
      "Proficiency in SQL and Excel",
      "Experience with data visualization tools (Tableau, Power BI)",
      "Strong analytical and problem-solving skills",
      "Basic understanding of statistical concepts"
    ],
    responsibilities: [
      "Analyze large datasets to identify trends and patterns",
      "Create reports and dashboards for stakeholders",
      "Perform statistical analysis and data modeling",
      "Collaborate with teams to define data requirements",
      "Maintain data quality and integrity standards"
    ],
    benefits: [
      "Entry-level friendly environment",
      "Comprehensive training program",
      "Health insurance and benefits",
      "Career advancement opportunities",
      "Modern data tools and technologies"
    ],
    companyInfo: {
      size: "30-70 employees",
      industry: "Data Analytics",
      founded: "2020",
      website: "https://datainsights.co.ke",
      logoUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=400&fit=crop&crop=center"
    }
  },
  "5": {
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
    description: "We're looking for an experienced Product Manager to lead our flagship product development and work with cross-functional teams.",
    requirements: [
      "7+ years of product management experience",
      "Experience with Agile development methodologies",
      "Strong analytical and problem-solving skills",
      "Excellent communication and leadership abilities",
      "Experience with user research and data analysis"
    ],
    responsibilities: [
      "Define product strategy and roadmap",
      "Lead cross-functional product teams",
      "Conduct user research and market analysis",
      "Collaborate with engineering and design teams",
      "Monitor product performance and metrics"
    ],
    benefits: [
      "Competitive executive compensation",
      "Equity participation",
      "Comprehensive health benefits",
      "Professional development budget",
      "Flexible hybrid work arrangement"
    ],
    companyInfo: {
      size: "200-500 employees",
      industry: "Technology",
      founded: "2012",
      website: "https://techcorp.co.ke",
      logoUrl: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=400&h=400&fit=crop&crop=center"
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
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          {/* Back Button */}
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/jobs')} 
              className="mb-4"
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
