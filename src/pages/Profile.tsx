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
import ProfileInfoCard from "@/components/profile/ProfileInfoCard";
import ProfileCompletionCard from "@/components/profile/ProfileCompletionCard";
import ApplicationStatsCard from "@/components/profile/ApplicationStatsCard";
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

  const handleImageUpload = async (imageUrl: string) => {
    if (updateProfile) {
      await updateProfile({ profileImage: imageUrl });
    }
  };

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
    joinDate: "2024-01-15",
    profileImage: "/placeholder.svg"
  };

  const currentProfile = userProfile || defaultProfile;
  
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        <div className="container py-8 max-w-7xl mx-auto px-4 sm:px-6">
          {/* Enhanced profile section with better spacing */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <ProfileInfoCard
                userName={currentProfile.name}
                userRole={currentProfile.role}
                userEducation={currentProfile.education}
                userExperience={currentProfile.experience}
                userLocation={currentProfile.location}
                userBio={currentProfile.bio}
                profileImage={currentProfile.profileImage}
                onEditProfile={() => setShowEditProfileDialog(true)}
                onImageUpload={handleImageUpload}
              />
            </div>
            
            <div className="space-y-8">
              <ProfileCompletionCard
                profileCompletionScore={currentProfile.profileComplete}
                verifiedSkills={safeVerifiedSkills}
                totalSkills={safeTotalSkills}
              />
              
              <ApplicationStatsCard
                applicationStats={applicationStats}
              />
            </div>
          </div>
          
          {/* Enhanced tabs section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden backdrop-blur-sm">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50/80 to-blue-50/30">
                <TabsList className="w-full justify-start h-auto p-0 bg-transparent rounded-none">
                  <TabsTrigger 
                    value="overview" 
                    className="px-8 py-5 rounded-none data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none font-medium text-gray-600 data-[state=active]:text-blue-600 hover:bg-white/50 transition-all duration-200"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger 
                    value="resume" 
                    className="px-8 py-5 rounded-none data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none font-medium text-gray-600 data-[state=active]:text-blue-600 hover:bg-white/50 transition-all duration-200"
                  >
                    Resume & Skills
                  </TabsTrigger>
                  <TabsTrigger 
                    value="assessments" 
                    className="px-8 py-5 rounded-none data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none font-medium text-gray-600 data-[state=active]:text-blue-600 hover:bg-white/50 transition-all duration-200"
                  >
                    Assessments
                  </TabsTrigger>
                  <TabsTrigger 
                    value="learning" 
                    className="px-8 py-5 rounded-none data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none font-medium text-gray-600 data-[state=active]:text-blue-600 hover:bg-white/50 transition-all duration-200"
                  >
                    Learning Paths
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <div className="p-8">
                <ProfileTabsContent
                  skills={safeSkills}
                  recentAssessments={recentAssessments}
                  upcomingInterviews={upcomingInterviews}
                  onShowSkillsDialog={() => setShowSkillsDialog(true)}
                  onShowInterviewDialog={() => setShowInterviewDialog(true)}
                  onUpdateSkill={handleUpdateSkill}
                  onVerifySkill={handleVerifySkill}
                />
              </div>
            </Tabs>
          </div>

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
      </div>
    </Layout>
  );
};

export default Profile;
