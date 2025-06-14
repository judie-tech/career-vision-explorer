
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useApplicants } from "@/hooks/use-applicants";
import { ApplicantProfileDialog } from "./ApplicantProfileDialog";
import { useNavigate } from "react-router-dom";

export const RecentApplicantsTable = () => {
  const { applicants, updateApplicantStatus } = useApplicants();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  const recentApplicants = applicants
    .filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      // Sort by most recent first (this is simplified)
      const aTime = a.appliedTime.includes("day") ? parseInt(a.appliedTime) : 10;
      const bTime = b.appliedTime.includes("day") ? parseInt(b.appliedTime) : 10;
      return aTime - bTime;
    })
    .slice(0, 5); // Only show 5 most recent

  const getScoreBadgeColor = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-800";
    if (score >= 80) return "bg-green-100 text-green-800";
    if (score >= 70) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Review":
        return "bg-yellow-100 text-yellow-800";
      case "Interview":
        return "bg-blue-100 text-blue-800";
      case "Accepted":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  const handleScheduleInterview = (applicantId: string) => {
    updateApplicantStatus(applicantId, "Interview");
    // Navigate to interview scheduling page
    navigate("/employer/interviews/schedule");
  };
  
  const handleViewAllApplicants = () => {
    navigate("/employer/applicants");
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Applicants</CardTitle>
          <CardDescription>View and manage candidate applications</CardDescription>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search applicants..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" onClick={handleViewAllApplicants}>View All</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidate</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Applied</TableHead>
              <TableHead>Match Score</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentApplicants.map((applicant) => (
              <ApplicantProfileDialog
                key={applicant.id}
                applicant={applicant}
                onStatusChange={updateApplicantStatus}
                onScheduleInterview={handleScheduleInterview}
              >
                <TableRow className="cursor-pointer hover:bg-gray-50">
                  <TableCell className="font-medium">{applicant.name}</TableCell>
                  <TableCell>{applicant.position}</TableCell>
                  <TableCell>{applicant.appliedTime}</TableCell>
                  <TableCell>
                    <span className={`${getScoreBadgeColor(applicant.matchScore)} text-xs px-2 py-1 rounded`}>
                      {applicant.matchScore}%
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`${getStatusBadgeColor(applicant.status)} text-xs px-2 py-1 rounded`}>
                      {applicant.status}
                    </span>
                  </TableCell>
                </TableRow>
              </ApplicantProfileDialog>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
