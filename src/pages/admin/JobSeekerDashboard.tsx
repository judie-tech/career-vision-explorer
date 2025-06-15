
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, FileText, CheckSquare, Calendar, ExternalLink, Briefcase, TrendingUp, Clock, Star, Award, Target } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/admin/DashboardLayout";
import { useJobPosts } from "@/hooks/use-job-posts";
import { useJobApplications } from "@/hooks/use-job-applications";
import { useSkillsAssessment } from "@/hooks/use-skills-assessment";
import { useInterviewSchedule } from "@/hooks/use-interview-schedule";
import { useState } from "react";
import { JobApplicationDialog } from "@/components/jobseeker/JobApplicationDialog";
import { SkillAssessmentDialog } from "@/components/jobseeker/SkillAssessmentDialog";
import { InterviewScheduleDialog } from "@/components/jobseeker/InterviewScheduleDialog";

const JobSeekerDashboard = () => {
  const { jobs } = useJobPosts();
  const { applications, getApplicationsByStatus, getApplicationForJob } = useJobApplications();
  const { verifiedSkills, totalSkills } = useSkillsAssessment();
  const { getUpcomingInterviews, getTodaysInterviews } = useInterviewSchedule();
  
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationDialog, setShowApplicationDialog] = useState(false);
  const [showSkillsDialog, setShowSkillsDialog] = useState(false);
  const [showInterviewDialog, setShowInterviewDialog] = useState(false);
  
  // Calculate profile completion based on various factors
  const profileCompletion = Math.min(Math.round(
    ((verifiedSkills / Math.max(totalSkills, 1)) * 40) + // 40% for skills
    (applications.length > 0 ? 30 : 0) + // 30% for having applications
    25 // 25% base for basic profile info
  ), 100);

  // Get application stats
  const pendingApplications = getApplicationsByStatus("Applied").length + getApplicationsByStatus("Reviewing").length;
  const upcomingInterviews = getUpcomingInterviews();
  const todaysInterviews = getTodaysInterviews();

  // Get top 3 jobs as recommendations (filter out already applied jobs)
  const recommendedJobs = jobs.slice(0, 6).map(job => {
    const hasApplied = getApplicationForJob(job.id);
    const matchScore = Math.floor(Math.random() * 15) + 85; // 85-100% match
    return { ...job, matchScore, hasApplied: !!hasApplied };
  }).filter(job => !job.hasApplied).slice(0, 3);

  const handleApplyToJob = (job) => {
    setSelectedJob(job);
    setShowApplicationDialog(true);
  };

  const handleViewJobDetails = (job) => {
    console.log("Viewing job details:", job);
    // In a real app, this would navigate to job details page
  };

  const getNextInterview = () => {
    if (todaysInterviews.length > 0) {
      const interview = todaysInterviews[0];
      return `Today, ${interview.time}`;
    }
    if (upcomingInterviews.length > 0) {
      const interview = upcomingInterviews[0];
      const date = new Date(interview.date);
      const isTomorrow = date.toDateString() === new Date(Date.now() + 24 * 60 * 60 * 1000).toDateString();
      return isTomorrow ? `Tomorrow, ${interview.time}` : `${date.toLocaleDateString()}, ${interview.time}`;
    }
    return "None scheduled";
  };

  const getProfileStatusColor = (completion) => {
    if (completion >= 90) return "text-emerald-600 bg-emerald-50 border-emerald-200";
    if (completion >= 70) return "text-blue-600 bg-blue-50 border-blue-200";
    if (completion >= 50) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const getProfileStatusText = (completion) => {
    if (completion >= 90) return "Excellent";
    if (completion >= 70) return "Good";
    if (completion >= 50) return "Fair";
    return "Needs Work";
  };

  return (
    <DashboardLayout title="Job Seeker Dashboard" role="jobseeker">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
        {/* Welcome Header */}
        <div className="mb-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back! 👋</h1>
              <p className="text-gray-600 text-lg">Let's continue your career journey</p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Profile Strength</p>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getProfileStatusColor(profileCompletion)}`}>
                  <Star className="h-4 w-4" />
                  {getProfileStatusText(profileCompletion)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Key Metrics Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-blue-50/30 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                Profile Strength
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-blue-600">{profileCompletion}%</span>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getProfileStatusColor(profileCompletion)}`}>
                    {getProfileStatusText(profileCompletion)}
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${profileCompletion}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">
                  {verifiedSkills}/{totalSkills} skills verified
                </p>
                <Link to="/profile">
                  <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                    Improve Profile
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-purple-50/30 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors">
                  <FileText className="h-5 w-5 text-purple-600" />
                </div>
                Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-purple-600">{applications.length}</span>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Total</p>
                    <p className="text-sm font-medium text-gray-700">{pendingApplications} pending</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-green-50 p-2 rounded-lg text-center">
                    <p className="font-semibold text-green-700">{getApplicationsByStatus("Interview").length}</p>
                    <p className="text-green-600">Interviews</p>
                  </div>
                  <div className="bg-blue-50 p-2 rounded-lg text-center">
                    <p className="font-semibold text-blue-700">{getApplicationsByStatus("Hired").length}</p>
                    <p className="text-blue-600">Offers</p>
                  </div>
                </div>
                <Link to="/jobs">
                  <Button variant="outline" size="sm" className="w-full">
                    Find More Jobs
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-green-50/30 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors">
                  <Calendar className="h-5 w-5 text-green-600" />
                </div>
                Interviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-green-600">{upcomingInterviews.length}</span>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Scheduled</p>
                    {todaysInterviews.length > 0 && (
                      <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                        {todaysInterviews.length} Today
                      </div>
                    )}
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Next Interview:</p>
                  <p className="text-sm font-medium text-gray-700">{getNextInterview()}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => setShowInterviewDialog(true)}
                >
                  View Schedule
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-amber-50/30 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded-xl group-hover:bg-amber-200 transition-colors">
                  <Award className="h-5 w-5 text-amber-600" />
                </div>
                Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-amber-600">{verifiedSkills}</span>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Verified</p>
                    <p className="text-sm font-medium text-gray-700">of {totalSkills}</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-amber-500 to-amber-600 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${(verifiedSkills / Math.max(totalSkills, 1)) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600">Take assessments to verify more skills</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => setShowSkillsDialog(true)}
                >
                  Take Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Job Recommendations Section */}
        <Card className="mb-8 border-0 bg-white/80 backdrop-blur-sm shadow-xl">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl flex items-center gap-3 mb-2">
                  <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl">
                    <Target className="h-6 w-6 text-blue-600" />
                  </div>
                  Recommended for You
                </CardTitle>
                <CardDescription className="text-lg">Jobs tailored to your skills and preferences</CardDescription>
              </div>
              <Link to="/jobs">
                <Button variant="outline" className="hidden md:flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  View All Jobs
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {recommendedJobs.length > 0 ? (
              <>
                {recommendedJobs.map((job, index) => (
                  <div 
                    key={job.id} 
                    className={`group p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-white to-gray-50/50 ${index < recommendedJobs.length - 1 ? 'mb-4' : ''}`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors">{job.title}</h3>
                              <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                                job.matchScore >= 95 ? 'bg-green-100 text-green-800' : 
                                job.matchScore >= 90 ? 'bg-blue-100 text-blue-800' : 
                                'bg-amber-100 text-amber-800'
                              }`}>
                                <Star className="h-3 w-3 fill-current" />
                                {job.matchScore}% Match
                              </div>
                            </div>
                            <p className="text-gray-600 mb-3 flex items-center gap-2">
                              <span className="font-medium">{job.company}</span>
                              <span>•</span>
                              <span>{job.location}</span>
                              <span>•</span>
                              <span className="font-semibold text-green-600">{job.salary}</span>
                            </p>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                                job.type === 'Full-time' ? 'bg-blue-100 text-blue-800' :
                                job.type === 'Part-time' ? 'bg-purple-100 text-purple-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {job.type}
                              </span>
                              {job.isBoosted && (
                                <span className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 text-xs px-3 py-1 rounded-full flex items-center gap-1 font-medium">
                                  <TrendingUp className="h-3 w-3" />
                                  Featured
                                </span>
                              )}
                              <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {new Date(job.datePosted).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="ml-6 flex gap-3">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewJobDetails(job)}
                          className="hover:bg-blue-50 hover:border-blue-200"
                        >
                          View Details
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleApplyToJob(job)}
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
                        >
                          <Briefcase className="h-4 w-4 mr-2" />
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t border-gray-100">
                  <Link to="/jobs" className="block md:hidden">
                    <Button variant="ghost" className="w-full">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View All Jobs ({jobs.length} available)
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="mb-6">
                  <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                    <Briefcase className="h-12 w-12 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No recommendations yet</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  {applications.length > 0 
                    ? "You've applied to all recommended jobs! Check back later for new opportunities."
                    : "Complete your profile to get personalized job recommendations."
                  }
                </p>
                <Link to="/jobs">
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    Browse All Available Jobs
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Enhanced Application Status Summary */}
        {applications.length > 0 && (
          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl">
                  <FileText className="h-5 w-5 text-green-600" />
                </div>
                Recent Applications
              </CardTitle>
              <CardDescription>Track your application progress and status updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {applications.slice(0, 3).map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:shadow-md transition-all duration-300 bg-gradient-to-r from-white to-gray-50/30">
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg text-gray-900">{app.jobTitle}</h4>
                      <p className="text-gray-600">{app.company}</p>
                      <p className="text-sm text-gray-500">Applied {app.appliedDate}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        app.status === 'Hired' ? 'bg-green-100 text-green-800' :
                        app.status === 'Interview' ? 'bg-blue-100 text-blue-800' :
                        app.status === 'Reviewing' ? 'bg-amber-100 text-amber-800' :
                        app.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                  </div>
                ))}
                {applications.length > 3 && (
                  <Button variant="ghost" className="w-full mt-4">
                    View All Applications ({applications.length})
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Dialogs */}
      <JobApplicationDialog
        job={selectedJob}
        open={showApplicationDialog}
        onOpenChange={setShowApplicationDialog}
      />
      
      <SkillAssessmentDialog
        open={showSkillsDialog}
        onOpenChange={setShowSkillsDialog}
      />
      
      <InterviewScheduleDialog
        open={showInterviewDialog}
        onOpenChange={setShowInterviewDialog}
      />
    </DashboardLayout>
  );
};

export default JobSeekerDashboard;
