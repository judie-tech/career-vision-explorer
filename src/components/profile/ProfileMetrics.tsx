
import ProfileInfoCard from "@/components/profile/ProfileInfoCard";
import ProfileCompletionCard from "@/components/profile/ProfileCompletionCard";
import ApplicationStatsCard from "@/components/profile/ApplicationStatsCard";
import { UserProfile } from "@/hooks/use-user-profile";

interface ApplicationStats {
  total: number;
  active: number;
  interviews: number;
  offers: number;
}

interface ProfileMetricsProps {
  userProfile: UserProfile;
  verifiedSkills: number;
  totalSkills: number;
  applicationStats: ApplicationStats;
}

const ProfileMetrics = ({
  userProfile,
  verifiedSkills,
  totalSkills,
  applicationStats,
}: ProfileMetricsProps) => {
  return (
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
  );
};

export default ProfileMetrics;
