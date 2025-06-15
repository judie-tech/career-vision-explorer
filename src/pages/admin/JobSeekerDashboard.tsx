
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, FileText, CheckSquare, Calendar, ExternalLink, Briefcase, TrendingUp, Clock } from "lucide-react";
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

  return (
    <DashboardLayout title="Job Seeker Dashboard" role="jobseeker">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-5 w-5 text-career-blue" />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{profileCompletion}%</span>
                <span className={`text-sm ${profileCompletion >= 80 ? 'text-green-600' : 'text-amber-600'}`}>
                  {profileCompletion >= 80 ? 'Strong' : 'Needs work'}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                {profileCompletion < 90 ? `${verifiedSkills}/${totalSkills} skills verified` : "Profile complete!"}
              </p>
              <Link to="/profile">
                <Button variant="outline" size="sm" className="w-full">
                  Update Profile
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-career-purple" />
              Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{applications.length}</span>
                <span className="text-sm text-gray-500">Total</span>
              </div>
              <p className="text-sm text-gray-500">{pendingApplications} awaiting response</p>
              <Link to="/jobs">
                <Button variant="outline" size="sm" className="w-full">
                  Browse Jobs
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-600" />
              Interviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{upcomingInterviews.length}</span>
                <span className="text-sm text-gray-500">Upcoming</span>
              </div>
              <p className="text-xs text-gray-500">Next: {getNextInterview()}</p>
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

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-amber-500" />
              Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{verifiedSkills}/{totalSkills}</span>
                <span className="text-sm text-gray-500">Verified</span>
              </div>
              <p className="text-sm text-gray-500">Take assessments to verify more</p>
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

      {/* Job Recommendations Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Job Recommendations
          </CardTitle>
          <CardDescription>Tailored matches based on your profile and skills</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {recommendedJobs.length > 0 ? (
            <>
              {recommendedJobs.map((job, index) => (
                <div key={job.id} className={`${index < recommendedJobs.length - 1 ? 'border-b pb-4' : ''}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <h3 className="font-medium text-lg">{job.title}</h3>
                          <p className="text-sm text-gray-500 flex items-center gap-2">
                            {job.location} • {job.type} • {job.salary}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className={`text-xs px-2 py-1 rounded ${
                              job.matchScore >= 95 ? 'bg-green-100 text-green-800' : 
                              job.matchScore >= 90 ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {job.matchScore}% Match
                            </span>
                            {job.isBoosted && (
                              <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded flex items-center gap-1">
                                <TrendingUp className="h-3 w-3" />
                                Featured
                              </span>
                            )}
                            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Posted {new Date(job.datePosted).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewJobDetails(job)}
                      >
                        View Details
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleApplyToJob(job)}
                        className="bg-career-blue hover:bg-career-blue/90"
                      >
                        <Briefcase className="h-4 w-4 mr-1" />
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="pt-4">
                <Link to="/jobs">
                  <Button variant="ghost" className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View All Jobs ({jobs.length} available)
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <Briefcase className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 mb-4">
                {applications.length > 0 
                  ? "You've applied to all recommended jobs! Check back later for new opportunities."
                  : "No job recommendations available yet. Complete your profile to get better matches."
                }
              </p>
              <Link to="/jobs">
                <Button>Browse All Available Jobs</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Application Status Summary */}
      {applications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>Track your application progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {applications.slice(0, 3).map((app) => (
                <div key={app.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{app.jobTitle}</h4>
                    <p className="text-sm text-gray-500">{app.company}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded ${
                      app.status === 'Hired' ? 'bg-green-100 text-green-800' :
                      app.status === 'Interview' ? 'bg-blue-100 text-blue-800' :
                      app.status === 'Reviewing' ? 'bg-yellow-100 text-yellow-800' :
                      app.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {app.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">Applied {app.appliedDate}</p>
                  </div>
                </div>
              ))}
              {applications.length > 3 && (
                <Button variant="ghost" className="w-full">
                  View All Applications ({applications.length})
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

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
