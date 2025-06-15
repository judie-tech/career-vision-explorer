
import SkillsOverviewCard from "@/components/profile/SkillsOverviewCard";
import RecentAssessmentsCard from "@/components/profile/RecentAssessmentsCard";
import UpcomingInterviewsCard from "@/components/profile/UpcomingInterviewsCard";
import CareerProgressCard from "@/components/profile/CareerProgressCard";

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

interface ProfileOverviewProps {
  skills: Skill[];
  recentAssessments: Assessment[];
  upcomingInterviews: Interview[];
  onShowSkillsDialog: () => void;
  onShowInterviewDialog: () => void;
}

const ProfileOverview = ({
  skills,
  recentAssessments,
  upcomingInterviews,
  onShowSkillsDialog,
  onShowInterviewDialog,
}: ProfileOverviewProps) => {
  return (
    <div className="space-y-8">
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
    </div>
  );
};

export default ProfileOverview;
