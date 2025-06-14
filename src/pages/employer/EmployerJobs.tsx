
import React from "react";
import DashboardLayout from "@/components/admin/DashboardLayout";
import { JobPostHeader } from "@/components/employer/JobPostHeader";
import { JobListingsTable } from "@/components/employer/JobListingsTable";

const EmployerJobs = () => {
  return (
    <DashboardLayout title="Job Listings" role="employer">
      <div className="space-y-6">
        <JobPostHeader />
        <JobListingsTable />
      </div>
    </DashboardLayout>
  );
};

export default EmployerJobs;
