
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/admin/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useApplicants } from "@/hooks/use-applicants";
import { ApplicantStatsCards } from "@/components/employer/ApplicantStatsCards";
import { ApplicantFilters } from "@/components/employer/ApplicantFilters";
import { ApplicantTable } from "@/components/employer/ApplicantTable";

const AllApplicants = () => {
  const navigate = useNavigate();
  const { getAllApplicants, updateApplicantStatus } = useApplicants();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const allApplicants = getAllApplicants();
  
  const filteredApplicants = allApplicants.filter(applicant => {
    const matchesSearch = applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         applicant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         applicant.position.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || applicant.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleScheduleInterview = (applicantId: string) => {
    updateApplicantStatus(applicantId, "Interview");
    navigate("/employer/interviews/schedule");
  };

  return (
    <DashboardLayout title="All Applicants" role="employer">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Button variant="outline" onClick={() => navigate("/employer/dashboard")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold mt-4">All Applicants</h1>
            <p className="text-gray-500">Manage all candidate applications across all positions</p>
          </div>
        </div>

        <ApplicantStatsCards applicants={allApplicants} />

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Applicants</CardTitle>
                <CardDescription>View and manage all candidate applications</CardDescription>
              </div>
              <ApplicantFilters
                searchQuery={searchQuery}
                statusFilter={statusFilter}
                onSearchChange={setSearchQuery}
                onStatusFilterChange={setStatusFilter}
              />
            </div>
          </CardHeader>
          <CardContent>
            <ApplicantTable
              applicants={filteredApplicants}
              onStatusChange={updateApplicantStatus}
              onScheduleInterview={handleScheduleInterview}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AllApplicants;
