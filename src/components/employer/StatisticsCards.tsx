
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users, Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useJobPosts } from "@/hooks/use-job-posts";
import { useApplicants } from "@/hooks/use-applicants";
import { useInterviews } from "@/hooks/use-interviews";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  iconColor: string;
  onClick: () => void;
}

const StatCard = ({ title, value, subtitle, icon, iconColor, onClick }: StatCardProps) => (
  <Card onClick={onClick} className="cursor-pointer hover:shadow-md transition-shadow">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex items-center">
        <div className={`h-8 w-8 ${iconColor} mr-2`}>{icon}</div>
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export const StatisticsCards = () => {
  const navigate = useNavigate();
  const { jobs } = useJobPosts();
  const { applicants } = useApplicants();
  const { interviews } = useInterviews();
  
  // Calculate boosted listings
  const boostedListings = jobs.filter(job => job.isBoosted).length;
  
  // Calculate weekly new applicants
  const weeklyNewApplicants = applicants.filter(app => 
    app.appliedTime.includes("day") && parseInt(app.appliedTime) <= 7
  ).length;
  
  // Calculate weekly interviews
  const weeklyInterviews = interviews.filter(int => 
    new Date(int.scheduledDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  ).length;
  
  // Calculate total views
  const totalViews = jobs.reduce((total, job) => total + job.views, 0);
  const viewsIncrease = "+18%"; // This would typically be calculated from historical data

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
      <StatCard
        title="Active Listings"
        value={jobs.length}
        subtitle={`${boostedListings} boosted listings`}
        icon={<Briefcase className="h-8 w-8" />}
        iconColor="text-career-blue"
        onClick={() => navigate("/employer/jobs")}
      />
      <StatCard
        title="Total Applicants"
        value={applicants.length}
        subtitle={`+${weeklyNewApplicants} this week`}
        icon={<Users className="h-8 w-8" />}
        iconColor="text-career-purple"
        onClick={() => navigate("/employer/applicants")}
      />
      <StatCard
        title="Interviews Scheduled"
        value={interviews.filter(i => i.status === "Scheduled").length}
        subtitle={`${weeklyInterviews} this week`}
        icon={<Calendar className="h-8 w-8" />}
        iconColor="text-green-600"
        onClick={() => navigate("/employer/interviews")}
      />
      <StatCard
        title="Listing Views"
        value={totalViews.toLocaleString()}
        subtitle={`${viewsIncrease} from last month`}
        icon={<Clock className="h-8 w-8" />}
        iconColor="text-amber-500"
        onClick={() => navigate("/employer/jobs")}
      />
    </div>
  );
};
