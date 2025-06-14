
import { JobApplicationDialog } from "@/components/jobseeker/JobApplicationDialog";
import { SkillAssessmentDialog } from "@/components/jobseeker/SkillAssessmentDialog";
import { InterviewScheduleDialog } from "@/components/jobseeker/InterviewScheduleDialog";
import EditProfileDialog from "@/components/profile/EditProfileDialog";
import { UserProfile } from "@/hooks/use-user-profile";

interface ProfileDialogsProps {
  showApplicationDialog: boolean;
  setShowApplicationDialog: (show: boolean) => void;
  showSkillsDialog: boolean;
  setShowSkillsDialog: (show: boolean) => void;
  showInterviewDialog: boolean;
  setShowInterviewDialog: (show: boolean) => void;
  showEditProfileDialog: boolean;
  setShowEditProfileDialog: (show: boolean) => void;
  userProfile: UserProfile;
  onProfileSave: (profileData: any) => Promise<void>;
}

const ProfileDialogs = ({
  showApplicationDialog,
  setShowApplicationDialog,
  showSkillsDialog,
  setShowSkillsDialog,
  showInterviewDialog,
  setShowInterviewDialog,
  showEditProfileDialog,
  setShowEditProfileDialog,
  userProfile,
  onProfileSave,
}: ProfileDialogsProps) => {
  return (
    <>
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
        onSave={onProfileSave}
      />
    </>
  );
};

export default ProfileDialogs;
