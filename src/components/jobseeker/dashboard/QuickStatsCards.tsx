import React from "react";
import { Briefcase, Eye, Calendar, Star } from "lucide-react";
import { StatCard } from "./StatCard";
import { useJobApplications } from "@/hooks/use-job-applications";
import { useAuth } from "@/hooks/use-auth";

export const QuickStatsCards = () => {
  const {
    isJobSeeker,
    isFreelancer,
    profile,
    isLoading: authLoading,
  } = useAuth();
  const canApplyForJobs = isJobSeeker() || isFreelancer();

  const { applications, isLoading: applicationsLoading } = canApplyForJobs
    ? useJobApplications()
    : { applications: [], isLoading: false };

  // Debug: Check what data we're getting
  React.useEffect(() => {
    console.log("QuickStatsCards Debug:", {
      profile,
      authLoading,
      profileCompletion: profile?.profile_completion_percentage,
      applicationsCount: applications.length,
    });
  }, [profile, authLoading, applications]);

  // Get profile score value
  const getProfileScore = () => {
    if (authLoading) return "...";
    if (!profile) return "0%";
    return `${profile.profile_completion_percentage ?? 0}%`;
  };

  // Get applications value
  const getApplicationsValue = () => {
    if (applicationsLoading) return "...";
    return applications.length.toString();
  };

  const stats = [
    {
      icon: Briefcase,
      value: getApplicationsValue(),
      label: "Applications",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: Eye,
      value: "0", // can be replaced with backend data later
      label: "Profile Views",
      gradient: "from-green-500 to-green-600",
    },
    {
      icon: Calendar,
      value: "0", // can be replaced with interviews data later
      label: "Interviews",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      icon: Star,
      value: getProfileScore(),
      label: "Profile Score",
      gradient: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          icon={stat.icon}
          value={stat.value}
          label={stat.label}
          gradient={stat.gradient}
        />
      ))}
    </div>
  );
};
