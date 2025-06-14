
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import ResumeAnalysis from "@/components/profile/ResumeAnalysis";
import SkillsAssessment from "@/components/assessments/SkillsAssessment";
import { useJobApplications } from "@/hooks/use-job-applications";
import { useSkillsAssessment } from "@/hooks/use-skills-assessment";
import { useInterviewSchedule } from "@/hooks/use-interview-schedule";
import { useUserProfile } from "@/hooks/use-user-profile";
import { JobApplicationDialog } from "@/components/jobseeker/JobApplicationDialog";
import { SkillAssessmentDialog } from "@/components/jobseeker/SkillAssessmentDialog";
import { InterviewScheduleDialog } from "@/components/jobseeker/InterviewScheduleDialog";
import EditProfileDialog from "@/components/profile/EditProfileDialog";

// Profile components
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileInfoCard from "@/components/profile/ProfileInfoCard";
import ProfileCompletionCard from "@/components/profile/ProfileCompletionCard";
import ApplicationStatsCard from "@/components/profile/ApplicationStatsCard";
import SkillsOverviewCard from "@/components/profile/SkillsOverviewCard";
import RecentAssessmentsCard from "@/components/profile/RecentAssessmentsCard";
import UpcomingInterviewsCard from "@/components/profile/UpcomingInterviewsCard";
import CareerProgressCard from "@/components/profile/CareerProgressCard";
import SkillManagementCard from "@/components/profile/SkillManagementCard";
import LearningPathsCard from "@/components/profile/LearningPathsCard";
import RecommendedCoursesCard from "@/components/profile/RecommendedCoursesCard";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showApplicationDialog, setShowApplicationDialog] = useState(false);
  const [showSkillsDialog, setShowSkillsDialog] = useState(false);
  const [showInterviewDialog, setShowInterviewDialog] = useState(false);
  const [showEditProfileDialog, setShowEditProfileDialog] = useState(false);
  
  // Get data from hooks
  const { applications, getApplicationsByStatus } = useJobApplications();
  const { skills, verifiedSkills, totalSkills, updateSkillProficiency, verifySkill } = useSkillsAssessment();
  const { getUpcomingInterviews } = useInterviewSchedule();
  const { userProfile, updateProfile } = useUserProfile();
  
  const upcomingInterviews = getUpcomingInterviews();
  
  const recentAssessments = [
    {
      title: "Front-End Development",
      score: 85,
      date: "3 days ago",
      badgeEarned: true
    },
    {
      title: "Communication Skills",
      score: 92,
      date: "1 week ago",
      badgeEarned: true
    },
    {
      title: "Agile Methodology",
      score: 78,
      date: "2 weeks ago",
      badgeEarned: false
    }
  ];
  
  const applicationStats = {
    total: applications.length,
    active: getApplicationsByStatus("Applied").length + getApplicationsByStatus("Reviewing").length,
    interviews: getApplicationsByStatus("Interview").length,
    offers: getApplicationsByStatus("Hired").length
  };
  
  const learningPaths = [
    {
      title: "Full Stack Web Development",
      progress: 68,
      modules: 15,
      modulesCompleted: 10
    },
    {
      title: "UI/UX Design Fundamentals",
      progress: 45,
      modules: 12,
      modulesCompleted: 5
    }
  ];

  const handleUpdateSkill = (skillId: string, level: number) => {
    updateSkillProficiency(skillId, level);
  };

  const handleVerifySkill = (skillId: string) => {
    verifySkill(skillId);
  };

  const handleProfileSave = async (profileData: any) => {
    await updateProfile(profileData);
  };

  if (!userProfile) {
    return <div>Loading...</div>;
  }
  
  return (
    <Layout>
      <div className="container py-8">
        <ProfileHeader
          userName={userProfile.name}
          userRole={userProfile.role}
          userEducation={userProfile.education}
          userExperience={userProfile.experience}
          onEditProfile={() => setShowEditProfileDialog(true)}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <ProfileInfoCard
            userName={userProfile.name}
            userRole={userProfile.role}
            userEducation={userProfile.education}
            userExperience={userProfile.experience}
            userLocation={userProfile.location}
            userBio={userProfile.bio}
          />
          
          <ProfileCompletionCard
            profileCompletionScore={userProfile.profileComplete}
            verifiedSkills={verifiedSkills}
            totalSkills={totalSkills}
          />
          
          <ApplicationStatsCard
            applicationStats={applicationStats}
          />
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="resume">Resume & Skills</TabsTrigger>
            <TabsTrigger value="assessments">Assessments</TabsTrigger>
            <TabsTrigger value="learning">Learning Paths</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SkillsOverviewCard
                skills={skills}
                onShowSkillsDialog={() => setShowSkillsDialog(true)}
              />
              
              <RecentAssessmentsCard
                assessments={recentAssessments}
                onShowSkillsDialog={() => setShowSkillsDialog(true)}
              />
            </div>

            <UpcomingInterviewsCard
              interviews={upcomingInterviews}
              onShowInterviewDialog={() => setShowInterviewDialog(true)}
            />
            
            <CareerProgressCard />
          </TabsContent>
          
          <TabsContent value="resume" className="space-y-8">
            <ResumeAnalysis />
            
            <SkillManagementCard
              skills={skills}
              onUpdateSkill={handleUpdateSkill}
              onVerifySkill={handleVerifySkill}
            />
          </TabsContent>
          
          <TabsContent value="assessments">
            <SkillsAssessment />
          </TabsContent>
          
          <TabsContent value="learning" className="space-y-8">
            <LearningPathsCard learningPaths={learningPaths} />
            <RecommendedCoursesCard />
          </TabsContent>
        </Tabs>

        {/* Dialogs */}
        <JobApplicationDialog
          job={null}
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

        <EditProfileDialog
          open={showEditProfileDialog}
          onOpenChange={setShowEditProfileDialog}
          userData={userProfile}
          onSave={handleProfileSave}
        />
      </div>
    </Layout>
  );
};

export default Profile;
