
import React from "react";
import DashboardLayout from "@/components/admin/DashboardLayout";
import { JobPostHeader } from "@/components/employer/JobPostHeader";
import { StatisticsCards } from "@/components/employer/StatisticsCards";
import { RecentApplicantsTable } from "@/components/employer/RecentApplicantsTable";

const EmployerDashboard = () => {
  return (
    <DashboardLayout title="Employer Dashboard" role="employer">
      <JobPostHeader />
      <StatisticsCards />
      <RecentApplicantsTable />
    </DashboardLayout>
  );
};

export default EmployerDashboard;
