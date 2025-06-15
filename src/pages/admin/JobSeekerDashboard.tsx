
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { ApplicationDetailsDialog } from "@/components/jobseeker/ApplicationDetailsDialog";
import { DashboardBackground } from "@/components/jobseeker/dashboard/DashboardBackground";
import { DashboardHeader } from "@/components/jobseeker/dashboard/DashboardHeader";
import { QuickStatsCards } from "@/components/jobseeker/dashboard/QuickStatsCards";
import { DashboardTabs } from "@/components/jobseeker/dashboard/DashboardTabs";

const JobSeekerDashboard = () => {
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [showApplicationDialog, setShowApplicationDialog] = useState(false);

  const handleViewApplication = (application: any) => {
    setSelectedApplication(application);
    setShowApplicationDialog(true);
  };

  return (
    <Layout>
      <div className="min-h-screen relative overflow-hidden">
        <DashboardBackground />
        
        <div className="relative container py-12">
          <DashboardHeader />
          <QuickStatsCards />
          <DashboardTabs onViewApplication={handleViewApplication} />
        </div>

        <ApplicationDetailsDialog
          application={selectedApplication}
          open={showApplicationDialog}
          onOpenChange={setShowApplicationDialog}
        />
      </div>
    </Layout>
  );
};

export default JobSeekerDashboard;
