
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

interface ProfileHeaderProps {
  currentProfile: UserProfile;
  verifiedSkills: number;
  totalSkills: number;
  applicationStats: ApplicationStats;
  onEditProfile: () => void;
  onImageUpload: (imageUrl: string) => void;
}

const ProfileHeader = ({
  currentProfile,
  verifiedSkills,
  totalSkills,
  applicationStats,
  onEditProfile,
  onImageUpload,
}: ProfileHeaderProps) => {
  return (
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
          onEditProfile={onEditProfile}
          onImageUpload={onImageUpload}
        />
      </div>
      
      <div className="space-y-8">
        <ProfileCompletionCard
          profileCompletionScore={currentProfile.profileComplete}
          verifiedSkills={verifiedSkills}
          totalSkills={totalSkills}
        />
        
        <ApplicationStatsCard
          applicationStats={applicationStats}
        />
      </div>
    </div>
  );
};

export default ProfileHeader;
