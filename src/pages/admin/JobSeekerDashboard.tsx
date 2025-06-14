
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, FileText, CheckSquare, Calendar, ExternalLink, Briefcase } from "lucide-react";
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
  const { applications, getApplicationsByStatus } = useJobApplications();
  const { verifiedSkills, totalSkills } = useSkillsAssessment();
  const { getUpcomingInterviews, getTodaysInterviews } = useInterviewSchedule();
  
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationDialog, setShowApplicationDialog] = useState(false);
  const [showSkillsDialog, setShowSkillsDialog] = useState(false);
  const [showInterviewDialog, setShowInterviewDialog] = useState(false);
  
  // Calculate profile completion based on various factors
  const profileCompletion = Math.round(
    ((verifiedSkills / totalSkills) * 40) + // 40% for skills
    (applications.length > 0 ? 30 : 0) + // 30% for having applications
    25 // 25% base for basic profile info
  );

  // Get application stats
  const pendingApplications = getApplicationsByStatus("Applied").length + getApplicationsByStatus("Reviewing").length;
  const upcomingInterviews = getUpcomingInterviews();
  const todaysInterviews = getTodaysInterviews();

  // Get top 3 jobs as recommendations (in a real app, this would be based on user profile matching)
  const recommendedJobs = jobs.slice(0, 3).map(job => {
    // Simulate match scores based on skills and job requirements
    const matchScore = Math.floor(Math.random() * 15) + 85; // 85-100% match
    return { ...job, matchScore };
  });

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
    return "No interviews scheduled";
  };

  return (
    <DashboardLayout title="Job Seeker Dashboard" role="jobseeker">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Profile Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <User className="h-8 w-8 text-career-blue mr-2" />
              <div>
                <p className="text-2xl font-bold">{profileCompletion}%</p>
                <p className="text-sm text-gray-500">
                  {profileCompletion < 90 ? "Add missing skills to complete" : "Profile complete!"}
                </p>
              </div>
            </div>
            <div className="mt-3">
              <Link to="/profile">
                <Button variant="outline" size="sm" className="w-full">
                  Update Profile
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-career-purple mr-2" />
              <div>
                <p className="text-2xl font-bold">{applications.length}</p>
                <p className="text-sm text-gray-500">{pendingApplications} awaiting response</p>
              </div>
            </div>
            <div className="mt-3">
              <Link to="/jobs">
                <Button variant="outline" size="sm" className="w-full">
                  Browse Jobs
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-green-600 mr-2" />
              <div>
                <p className="text-2xl font-bold">{upcomingInterviews.length}</p>
                <p className="text-sm text-gray-500">Next: {getNextInterview()}</p>
              </div>
            </div>
            <div className="mt-3">
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

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Skills Verified</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CheckSquare className="h-8 w-8 text-amber-500 mr-2" />
              <div>
                <p className="text-2xl font-bold">{verifiedSkills}/{totalSkills}</p>
                <p className="text-sm text-gray-500">Complete assessments</p>
              </div>
            </div>
            <div className="mt-3">
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

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Job Recommendations</CardTitle>
            <CardDescription>Tailored matches based on your profile</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendedJobs.length > 0 ? (
              <>
                {recommendedJobs.map((job, index) => (
                  <div key={job.id} className={`${index < recommendedJobs.length - 1 ? 'border-b pb-4' : ''}`}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium text-lg">{job.title}</h3>
                        <p className="text-sm text-gray-500">{job.location} • {job.type} • {job.salary}</p>
                        <div className="flex mt-2">
                          <span className={`text-xs px-2 py-1 rounded mr-2 ${
                            job.matchScore >= 95 ? 'bg-green-100 text-green-800' : 
                            job.matchScore >= 90 ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {job.matchScore}% Match
                          </span>
                          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                            {job.isBoosted ? 'Featured' : `Posted ${new Date(job.datePosted).toLocaleDateString()}`}
                          </span>
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
                      View All Jobs
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No job recommendations available yet.</p>
                <Link to="/jobs">
                  <Button>Browse Available Jobs</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
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
