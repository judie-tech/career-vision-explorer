
import { TabsContent } from "@/components/ui/tabs";
import ResumeAnalysis from "@/components/profile/ResumeAnalysis";
import SkillsAssessment from "@/components/assessments/SkillsAssessment";
import SkillsOverviewCard from "@/components/profile/SkillsOverviewCard";
import RecentAssessmentsCard from "@/components/profile/RecentAssessmentsCard";
import UpcomingInterviewsCard from "@/components/profile/UpcomingInterviewsCard";
import CareerProgressCard from "@/components/profile/CareerProgressCard";
import SkillManagementCard from "@/components/profile/SkillManagementCard";
import LearningPathsCard from "@/components/profile/LearningPathsCard";
import RecommendedCoursesCard from "@/components/profile/RecommendedCoursesCard";

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

interface LearningPath {
  title: string;
  progress: number;
  modules: number;
  modulesCompleted: number;
}

interface ProfileTabsContentProps {
  skills: Skill[];
  recentAssessments: Assessment[];
  upcomingInterviews: Interview[];
  learningPaths: LearningPath[];
  onShowSkillsDialog: () => void;
  onShowInterviewDialog: () => void;
  onUpdateSkill: (skillId: string, level: number) => void;
  onVerifySkill: (skillId: string) => void;
}

const ProfileTabsContent = ({
  skills,
  recentAssessments,
  upcomingInterviews,
  learningPaths,
  onShowSkillsDialog,
  onShowInterviewDialog,
  onUpdateSkill,
  onVerifySkill,
}: ProfileTabsContentProps) => {
  return (
    <>
      <TabsContent value="overview" className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SkillsOverviewCard
            skills={skills}
            onShowSkillsDialog={onShowSkillsDialog}
          />
          
          <RecentAssessmentsCard
            assessments={recentAssessments}
            onShowSkillsDialog={onShowSkillsDialog}
          />
        </div>

        <UpcomingInterviewsCard
          interviews={upcomingInterviews}
          onShowInterviewDialog={onShowInterviewDialog}
        />
        
        <CareerProgressCard />
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
        <LearningPathsCard learningPaths={learningPaths} />
        <RecommendedCoursesCard />
      </TabsContent>
    </>
  );
};

export default ProfileTabsContent;
