
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Building, 
  Briefcase, 
  Clock, 
  BarChart3, 
  Heart,
  ArrowLeft,
  Share2,
  Users,
  Calendar
} from "lucide-react";
import { toast } from "sonner";
import { JobApplicationDialog } from "@/components/jobseeker/JobApplicationDialog";
import { useJobApplications } from "@/hooks/use-job-applications";

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
        <div className="container py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
          <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/jobs')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Jobs
          </Button>
        </div>
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
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Job link copied to clipboard");
  };
  
  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate('/jobs')} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Jobs
          </Button>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <div className={`h-1 ${
                job.matchScore >= 90 ? 'bg-green-500' : 
                job.matchScore >= 80 ? 'bg-green-400' : 
                job.matchScore >= 70 ? 'bg-yellow-500' : 
                'bg-orange-500'
              }`} style={{ width: `${job.matchScore}%` }}></div>
              
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl mb-2">{job.title}</CardTitle>
                    <CardDescription className="text-lg">{job.company}</CardDescription>
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="mr-1 h-4 w-4" />
                        {job.type}
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        {job.posted}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-lg px-3 py-1">
                      {job.matchScore}% Match
                    </Badge>
                    <BarChart3 className="h-8 w-8 text-gray-300" />
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">About this role</h3>
                    <p className="text-gray-700 leading-relaxed">{job.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map(skill => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-semibold mb-3">Requirements</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {job.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Responsibilities</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {job.responsibilities.map((resp, index) => (
                        <li key={index}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Benefits</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {job.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Apply for this job</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {job.salary}
                  </div>
                  <div className="text-sm text-gray-500">Salary Range</div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    className="flex-1" 
                    onClick={handleApply}
                    disabled={isApplied}
                  >
                    {isApplied ? 'Applied' : 'Apply Now'}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleSave}
                    className={isSaved ? "text-red-500" : ""}
                  >
                    <Heart className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleShare}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
                
                {isApplied && (
                  <div className="bg-green-50 border border-green-200 rounded-md p-3 text-center">
                    <p className="text-sm text-green-800">
                      ✓ Application submitted successfully
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Company Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center">
                  <Building className="mr-2 h-4 w-4 text-gray-500" />
                  <span className="text-sm">{job.company}</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-gray-500" />
                  <span className="text-sm">{job.companyInfo.size}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                  <span className="text-sm">Founded {job.companyInfo.founded}</span>
                </div>
                <div className="text-sm text-gray-600">
                  Industry: {job.companyInfo.industry}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <JobApplicationDialog
        job={job}
        open={applicationDialogOpen}
        onOpenChange={setApplicationDialogOpen}
      />
    </Layout>
  );
};

export default JobDetails;
