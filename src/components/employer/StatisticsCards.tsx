
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users, Calendar, Clock, TrendingUp, ArrowUpRight } from "lucide-react";
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
  bgColor: string;
  trend?: string;
  onClick: () => void;
}

const StatCard = ({ title, value, subtitle, icon, iconColor, bgColor, trend, onClick }: StatCardProps) => (
  <Card 
    onClick={onClick} 
    className="cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-md bg-gradient-to-br from-white to-gray-50"
  >
    <CardContent className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
          <p className="text-sm text-gray-500">{subtitle}</p>
          {trend && (
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm font-medium text-green-600">{trend}</span>
            </div>
          )}
        </div>
        <div className={`${bgColor} p-3 rounded-xl`}>
          <div className={iconColor}>{icon}</div>
        </div>
      </div>
      <div className="flex items-center justify-end mt-4 opacity-60">
        <ArrowUpRight className="h-4 w-4" />
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
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Active Job Listings"
        value={jobs.length}
        subtitle={`${boostedListings} boosted listings`}
        icon={<Briefcase className="h-6 w-6" />}
        iconColor="text-blue-600"
        bgColor="bg-blue-50"
        trend="+12% this month"
        onClick={() => navigate("/employer/jobs")}
      />
      <StatCard
        title="Total Applicants"
        value={applicants.length}
        subtitle={`+${weeklyNewApplicants} this week`}
        icon={<Users className="h-6 w-6" />}
        iconColor="text-purple-600"
        bgColor="bg-purple-50"
        trend="+23% this month"
        onClick={() => navigate("/employer/applicants")}
      />
      <StatCard
        title="Interviews Scheduled"
        value={interviews.filter(i => i.status === "Scheduled").length}
        subtitle={`${weeklyInterviews} this week`}
        icon={<Calendar className="h-6 w-6" />}
        iconColor="text-green-600"
        bgColor="bg-green-50"
        trend="+8% this month"
        onClick={() => navigate("/employer/interviews")}
      />
      <StatCard
        title="Total Views"
        value={totalViews.toLocaleString()}
        subtitle={`${viewsIncrease} from last month`}
        icon={<Clock className="h-6 w-6" />}
        iconColor="text-amber-600"
        bgColor="bg-amber-50"
        trend="+18% this month"
        onClick={() => navigate("/employer/jobs")}
      />
    </div>
  );
};
