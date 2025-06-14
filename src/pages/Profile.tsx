
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { 
  Tabs, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { useJobApplications } from "@/hooks/use-job-applications";
import { useSkillsAssessment } from "@/hooks/use-skills-assessment";
import { useInterviewSchedule } from "@/hooks/use-interview-schedule";
import { useUserProfile } from "@/hooks/use-user-profile";

// Profile components
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileMetrics from "@/components/profile/ProfileMetrics";
import ProfileTabsContent from "@/components/profile/ProfileTabsContent";
import ProfileDialogs from "@/components/profile/ProfileDialogs";

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
  
  // Provide fallback data if hooks return undefined
  const safeApplications = applications || [];
  const safeSkills = skills || [];
  const safeVerifiedSkills = verifiedSkills || 0;
  const safeTotalSkills = totalSkills || 0;
  
  const upcomingInterviews = getUpcomingInterviews() || [];
  
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
    total: safeApplications.length,
    active: (getApplicationsByStatus ? getApplicationsByStatus("Applied").length + getApplicationsByStatus("Reviewing").length : 0),
    interviews: (getApplicationsByStatus ? getApplicationsByStatus("Interview").length : 0),
    offers: (getApplicationsByStatus ? getApplicationsByStatus("Hired").length : 0)
  };

  const handleUpdateSkill = (skillId: string, level: number) => {
    if (updateSkillProficiency) {
      updateSkillProficiency(skillId, level);
    }
  };

  const handleVerifySkill = (skillId: string) => {
    if (verifySkill) {
      verifySkill(skillId);
    }
  };

  const handleProfileSave = async (profileData: any) => {
    if (updateProfile) {
      await updateProfile(profileData);
    }
  };

  // Provide default user profile if not loaded
  const defaultProfile = {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Software Developer",
    education: "Bachelor's in Computer Science",
    experience: "3 years",
    location: "Nairobi, Kenya",
    bio: "Passionate software developer with experience in React and Node.js",
    profileComplete: 85,
    avatar: "/placeholder.svg"
  };

  const currentProfile = userProfile || defaultProfile;
  
  return (
    <Layout>
      <div className="container py-8">
        <ProfileHeader
          userName={currentProfile.name}
          userRole={currentProfile.role}
          userEducation={currentProfile.education}
          userExperience={currentProfile.experience}
          onEditProfile={() => setShowEditProfileDialog(true)}
        />
        
        <ProfileMetrics
          userProfile={currentProfile}
          verifiedSkills={safeVerifiedSkills}
          totalSkills={safeTotalSkills}
          applicationStats={applicationStats}
        />
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="resume">Resume & Skills</TabsTrigger>
            <TabsTrigger value="assessments">Assessments</TabsTrigger>
            <TabsTrigger value="learning">Learning Paths</TabsTrigger>
          </TabsList>
          
          <ProfileTabsContent
            skills={safeSkills}
            recentAssessments={recentAssessments}
            upcomingInterviews={upcomingInterviews}
            onShowSkillsDialog={() => setShowSkillsDialog(true)}
            onShowInterviewDialog={() => setShowInterviewDialog(true)}
            onUpdateSkill={handleUpdateSkill}
            onVerifySkill={handleVerifySkill}
          />
        </Tabs>

        <ProfileDialogs
          showApplicationDialog={showApplicationDialog}
          setShowApplicationDialog={setShowApplicationDialog}
          showSkillsDialog={showSkillsDialog}
          setShowSkillsDialog={setShowSkillsDialog}
          showInterviewDialog={showInterviewDialog}
          setShowInterviewDialog={setShowInterviewDialog}
          showEditProfileDialog={showEditProfileDialog}
          setShowEditProfileDialog={setShowEditProfileDialog}
          userProfile={currentProfile}
          onProfileSave={handleProfileSave}
        />
      </div>
    </Layout>
  );
};

export default Profile;
