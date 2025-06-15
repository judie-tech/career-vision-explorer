import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApplicationDetailsDialog } from "@/components/jobseeker/ApplicationDetailsDialog";
import { 
  Calendar, 
  MapPin, 
  DollarSign, 
  Clock, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Target,
  Briefcase,
  Star,
  ChevronRight,
  Building,
  Eye,
  ExternalLink
} from "lucide-react";

const JobSeekerDashboard = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("overview");
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [applicationDialogOpen, setApplicationDialogOpen] = useState(false);

  // Mock data for job recommendations
  const jobRecommendations = [
    {
      id: "4", // This matches the DevOps Engineer job in JobDetails
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

  const handleViewApplication = (application: any) => {
    setSelectedApplication(application);
    setApplicationDialogOpen(true);
  };

  // Mock data for other sections
  const learningPaths = [
    {
      id: 1,
      title: "Full-Stack Web Development",
      progress: 60,
      modules: 8,
      completed: 5,
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      progress: 35,
      modules: 10,
      completed: 3,
    },
    {
      id: 3,
      title: "UX/UI Design Principles",
      progress: 90,
      modules: 6,
      completed: 6,
    },
  ];

  const applicationUpdates = [
    {
      id: 1,
      company: "TechCorp Inc.",
      position: "Senior Frontend Developer",
      status: "Interview Scheduled",
      date: "May 15, 2023",
    },
    {
      id: 2,
      company: "Innovate Solutions",
      position: "Backend Engineer",
      status: "Application Received",
      date: "May 10, 2023",
    },
    {
      id: 3,
      company: "Creative Digital Agency",
      position: "UX Designer",
      status: "Rejected",
      date: "May 5, 2023",
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-green-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
        
        <div className="relative container py-8 space-y-8">
          {/* Header */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Welcome back, Sarah! 👋
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Your personalized dashboard to track your career journey and discover new opportunities.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                    <p className="text-sm text-gray-600">Applications</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    <Eye className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">3</p>
                    <p className="text-sm text-gray-600">Profile Views</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">2</p>
                    <p className="text-sm text-gray-600">Interviews</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    <Star className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">85%</p>
                    <p className="text-sm text-gray-600">Profile Score</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Content */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm rounded-xl p-1 shadow-lg">
              <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg transition-all duration-300">
                Overview
              </TabsTrigger>
              <TabsTrigger value="applications" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg transition-all duration-300">
                Applications
              </TabsTrigger>
              <TabsTrigger value="recommendations" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg transition-all duration-300">
                Recommendations
              </TabsTrigger>
              <TabsTrigger value="learning" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg transition-all duration-300">
                Learning
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Profile Completion */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900">
                      <Target className="h-5 w-5 text-blue-600" />
                      Profile Completion
                    </CardTitle>
                    <CardDescription>Complete your profile to attract more employers</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700">Overall Progress</span>
                        <span className="font-medium text-gray-900">85%</span>
                      </div>
                      <Progress value={85} className="h-3" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">Add Work Experience</span>
                        <Badge className="bg-green-100 text-green-800 border-green-200">Complete</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">Upload Resume</span>
                        <Badge className="bg-orange-100 text-orange-800 border-orange-200">Pending</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900">
                      <Clock className="h-5 w-5 text-green-600" />
                      Recent Activity
                    </CardTitle>
                    <CardDescription>Your latest actions and updates</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">Applied to DevOps Engineer position</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">Profile viewed by 2 employers</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                        <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">Completed skills assessment</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-6">
              {/* Job Recommendations Section */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    Job Recommendations
                  </CardTitle>
                  <CardDescription>Tailored matches based on your profile and skills</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {jobRecommendations.map((job, index) => (
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
            </TabsContent>

            <TabsContent value="applications" className="space-y-6">
              {/* Application Updates Section */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <Users className="h-5 w-5 text-blue-600" />
                    Application Updates
                  </CardTitle>
                  <CardDescription>Track the status of your recent job applications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {applicationUpdates.map((update, index) => (
                    <div
                      key={update.id}
                      className="p-6 bg-gradient-to-r from-white to-gray-50/50 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {update.position}
                          </h3>
                          <div className="text-sm text-gray-600">
                            {update.company}
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-3 py-1">
                            {update.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                          Updated on {update.date}
                        </div>
                        <Button 
                          variant="outline" 
                          className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-all duration-200"
                          onClick={() => handleViewApplication(update)}
                        >
                          View Application
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="learning" className="space-y-6">
              {/* Learning Paths Section */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    Learning Paths
                  </CardTitle>
                  <CardDescription>Continue your learning journey with these recommended paths</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {learningPaths.map((path, index) => (
                    <div
                      key={path.id}
                      className="p-6 bg-gradient-to-r from-white to-gray-50/50 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {path.title}
                          </h3>
                          <div className="text-sm text-gray-600">
                            {path.completed} / {path.modules} Modules Completed
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-purple-100 text-purple-800 border-purple-200 px-3 py-1">
                            {path.progress}% Complete
                          </Badge>
                        </div>
                      </div>
                      <Progress value={path.progress} className="h-3 mb-4" />
                      <div className="flex justify-end">
                        <Button variant="outline" className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-all duration-200">
                          Continue Learning
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <ApplicationDetailsDialog
        application={selectedApplication}
        open={applicationDialogOpen}
        onOpenChange={setApplicationDialogOpen}
      />
    </Layout>
  );
};

export default JobSeekerDashboard;
