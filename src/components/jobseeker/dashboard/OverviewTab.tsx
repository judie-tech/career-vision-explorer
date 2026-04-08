
import React from "react";
import { ProfileCompletionCard } from "./ProfileCompletionCard";
import { RecentActivityCard } from "./RecentActivityCard";
import { InterviewsCard } from "./InterviewsCard";
import { ApplicationsCard } from "./ApplicationsCard";
import { ProfileViewsCard } from "./ProfileViewsCard";
import { MessagesCard } from "./MessagesCard";

export const OverviewTab = () => {
  return (
    <div className="space-y-8">
      {/* Quick Stats Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        <ProfileCompletionCard />
        <RecentActivityCard />
      </div>
      
      {/* Main Dashboard Cards */}
      <div className="grid lg:grid-cols-2 gap-6">
        <ApplicationsCard />
        <InterviewsCard />
      </div>
      
      <div className="grid lg:grid-cols-2 gap-6">
        <ProfileViewsCard />
        <MessagesCard />
      </div>
    </div>
  );
};
