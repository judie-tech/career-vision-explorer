
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
  Calendar,
  Zap,
  Target,
  Award
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
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
          <div className="container py-20 text-center">
            <div className="max-w-md mx-auto space-y-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-full blur-xl opacity-20"></div>
                <div className="relative bg-slate-800/50 border border-red-500/20 rounded-2xl p-8">
                  <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                    Job Not Found
                  </h1>
                  <p className="text-slate-400 mb-8">The job you're looking for doesn't exist or has been removed.</p>
                  <Button 
                    onClick={() => navigate('/jobs')}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Back to Jobs
                  </Button>
                </div>
              </div>
            </div>
          </div>
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
              {/* Header Card */}
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

              {/* Job Details Card */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                <Card className="relative bg-slate-800/50 border border-slate-700/50 rounded-2xl backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="space-y-8">
                      {/* About Section */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Target className="h-6 w-6 text-blue-400" />
                          <h3 className="text-xl font-bold text-white">About this role</h3>
                        </div>
                        <p className="text-slate-300 leading-relaxed text-lg pl-9">{job.description}</p>
                      </div>
                      
                      {/* Skills Section */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Zap className="h-6 w-6 text-purple-400" />
                          <h3 className="text-xl font-bold text-white">Required Skills</h3>
                        </div>
                        <div className="flex flex-wrap gap-3 pl-9">
                          {job.skills.map(skill => (
                            <Badge 
                              key={skill} 
                              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 px-4 py-2 text-sm font-semibold rounded-lg hover:scale-105 transition-transform duration-200"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <Separator className="bg-slate-700/50" />
                      
                      {/* Requirements Section */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Award className="h-6 w-6 text-emerald-400" />
                          <h3 className="text-xl font-bold text-white">Requirements</h3>
                        </div>
                        <ul className="space-y-3 pl-9">
                          {job.requirements.map((req, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-3 flex-shrink-0"></div>
                              <span className="text-slate-300 leading-relaxed">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Responsibilities Section */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Briefcase className="h-6 w-6 text-cyan-400" />
                          <h3 className="text-xl font-bold text-white">Responsibilities</h3>
                        </div>
                        <ul className="space-y-3 pl-9">
                          {job.responsibilities.map((resp, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mt-3 flex-shrink-0"></div>
                              <span className="text-slate-300 leading-relaxed">{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Benefits Section */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Heart className="h-6 w-6 text-pink-400" />
                          <h3 className="text-xl font-bold text-white">Benefits</h3>
                        </div>
                        <ul className="space-y-3 pl-9">
                          {job.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full mt-3 flex-shrink-0"></div>
                              <span className="text-slate-300 leading-relaxed">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-8">
              {/* Apply Card */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <Card className="relative bg-slate-800/50 border border-slate-700/50 rounded-2xl backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Apply for this job</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center p-6 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-xl border border-emerald-500/20">
                      <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-2">
                        {job.salary}
                      </div>
                      <div className="text-sm text-slate-400">Salary Range</div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button 
                        className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:transform-none" 
                        onClick={handleApply}
                        disabled={isApplied}
                      >
                        {isApplied ? 'Applied ✓' : 'Apply Now'}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleSave}
                        className={`border-slate-600 hover:border-slate-500 rounded-xl transition-all duration-300 transform hover:scale-110 ${
                          isSaved ? "text-red-400 border-red-400 bg-red-400/10" : "text-slate-400 hover:text-white"
                        }`}
                      >
                        <Heart className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`} />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={handleShare}
                        className="border-slate-600 hover:border-slate-500 text-slate-400 hover:text-white rounded-xl transition-all duration-300 transform hover:scale-110"
                      >
                        <Share2 className="h-5 w-5" />
                      </Button>
                    </div>
                    
                    {isApplied && (
                      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-4 text-center">
                        <p className="text-sm text-green-400 font-medium">
                          ✓ Application submitted successfully
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              {/* Company Info Card */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-xl opacity-15 group-hover:opacity-25 transition-opacity duration-300"></div>
                <Card className="relative bg-slate-800/50 border border-slate-700/50 rounded-2xl backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl text-white flex items-center gap-3">
                      <Building className="h-6 w-6 text-indigo-400" />
                      Company Info
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
                      <Building className="h-5 w-5 text-indigo-400" />
                      <span className="text-slate-300 font-medium">{job.company}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
                      <Users className="h-5 w-5 text-blue-400" />
                      <span className="text-slate-300">{job.companyInfo.size}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
                      <Calendar className="h-5 w-5 text-purple-400" />
                      <span className="text-slate-300">Founded {job.companyInfo.founded}</span>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-slate-800/40 to-slate-700/40 rounded-lg border border-slate-600/30">
                      <div className="text-sm text-slate-400 mb-1">Industry</div>
                      <div className="text-slate-300 font-medium">{job.companyInfo.industry}</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
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
