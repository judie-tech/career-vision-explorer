import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useJobApplications } from "@/hooks/use-job-applications";
import { useSkillsAssessment } from "@/hooks/use-skills-assessment";
import { useInterviewSchedule } from "@/hooks/use-interview-schedule";
import { useUserProfile } from "@/hooks/use-user-profile";

import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";
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
    console.log("Uploading image:", imageUrl.substring(0, 50) + "...");
    if (updateProfile) {
      const success = await updateProfile({ profileImage: imageUrl });
      console.log("Image upload success:", success);
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

  // Transform database profile to match UI format
  const currentProfile = userProfile ? {
    id: userProfile.user_id,
    name: userProfile.name,
    email: userProfile.email,
    role: userProfile.account_type === 'job_seeker' ? 'Job Seeker' :
          userProfile.account_type === 'employer' ? 'Employer' : 'Admin',
    education: userProfile.education || "Not specified",
    experience: userProfile.experience_years ? `${userProfile.experience_years} years` : "Not specified",
    location: userProfile.location || "Not specified",
    bio: userProfile.bio || "No bio available",
    profileComplete: userProfile.profile_completion_percentage || 20,
    joinDate: new Date(userProfile.created_at).toLocaleDateString(),
    profileImage: userProfile.profile_image_url || "/placeholder.svg",
    skills: userProfile.skills || [],
    resume_link: userProfile.resume_link,
    account_type: userProfile.account_type,
    // Additional fields from enhanced schema
    phone: userProfile.phone,
    linkedin_url: userProfile.linkedin_url,
    github_url: userProfile.github_url,
    portfolio_url: userProfile.portfolio_url,
    salary_expectation: userProfile.salary_expectation,
    availability: userProfile.availability,
    preferred_job_type: userProfile.preferred_job_type,
    work_authorization: userProfile.work_authorization,
    languages: userProfile.languages || [],
    certifications: userProfile.certifications || [],
    work_experience: userProfile.work_experience || [],
    projects: userProfile.projects || []
  } : defaultProfile;
  console.log("Current profile image:", currentProfile.profileImage?.substring(0, 50));
  
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        <div className="container py-8 max-w-7xl mx-auto px-4 sm:px-6">
          <ProfileHeader
            currentProfile={currentProfile}
            verifiedSkills={safeVerifiedSkills}
            totalSkills={safeTotalSkills}
            applicationStats={applicationStats}
            onEditProfile={() => setShowEditProfileDialog(true)}
            onImageUpload={handleImageUpload}
          />
          
          <ProfileTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            skills={safeSkills}
            recentAssessments={recentAssessments}
            upcomingInterviews={upcomingInterviews}
            onShowSkillsDialog={() => setShowSkillsDialog(true)}
            onShowInterviewDialog={() => setShowInterviewDialog(true)}
            onUpdateSkill={handleUpdateSkill}
            onVerifySkill={handleVerifySkill}
          />

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
