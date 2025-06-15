
import { TabsContent } from "@/components/ui/tabs";
import ResumeAnalysis from "@/components/profile/ResumeAnalysis";
import SkillsAssessment from "@/components/assessments/SkillsAssessment";
import SkillManagementCard from "@/components/profile/SkillManagementCard";
import LearningPathsCard from "@/components/profile/LearningPathsCard";
import RecommendedCoursesCard from "@/components/profile/RecommendedCoursesCard";
import ProfileOverview from "@/components/profile/ProfileOverview";

interface Skill {
  id: string;
  name: string;
  category: string;
  isVerified: boolean;
  proficiencyLevel: number;
}

interface Assessment {
  title: string;
  score: number;
  date: string;
  badgeEarned: boolean;
}

interface Interview {
  id: string;
  jobTitle: string;
  company: string;
  date: string;
  time: string;
  type: string;
}

interface ProfileTabsContentProps {
  skills: Skill[];
  recentAssessments: Assessment[];
  upcomingInterviews: Interview[];
  onShowSkillsDialog: () => void;
  onShowInterviewDialog: () => void;
  onUpdateSkill: (skillId: string, level: number) => void;
  onVerifySkill: (skillId: string) => void;
}

const ProfileTabsContent = ({
  skills,
  recentAssessments,
  upcomingInterviews,
  onShowSkillsDialog,
  onShowInterviewDialog,
  onUpdateSkill,
  onVerifySkill,
}: ProfileTabsContentProps) => {
  return (
    <>
      <TabsContent value="overview">
        <ProfileOverview
          skills={skills}
          recentAssessments={recentAssessments}
          upcomingInterviews={upcomingInterviews}
          onShowSkillsDialog={onShowSkillsDialog}
          onShowInterviewDialog={onShowInterviewDialog}
        />
      </TabsContent>
      
      <TabsContent value="resume" className="space-y-8">
        <ResumeAnalysis />
        
        <SkillManagementCard
          skills={skills}
          onUpdateSkill={onUpdateSkill}
          onVerifySkill={onVerifySkill}
        />
      </TabsContent>
      
      <TabsContent value="assessments">
        <SkillsAssessment />
      </TabsContent>
      
      <TabsContent value="learning" className="space-y-8">
        <LearningPathsCard />
        <RecommendedCoursesCard />
      </TabsContent>
    </>
  );
};

export default ProfileTabsContent;
