
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Eye, Calendar, ExternalLink, Users } from "lucide-react";
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
    if (score >= 90) return "bg-emerald-100 text-emerald-700 border-emerald-200";
    if (score >= 80) return "bg-green-100 text-green-700 border-green-200";
    if (score >= 70) return "bg-yellow-100 text-yellow-700 border-yellow-200";
    return "bg-red-100 text-red-700 border-red-200";
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Reviewing":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "Interview":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Hired":
        return "bg-green-100 text-green-700 border-green-200";
      case "Rejected":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
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
    <div className="space-y-4">
      {/* Search and Actions Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Recent Applications</h3>
          <p className="text-sm text-gray-500 mt-1">
            View and manage the latest candidate applications
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search applicants..."
              className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            variant="outline" 
            onClick={handleViewAllApplicants}
            className="whitespace-nowrap hover:bg-blue-50 border-blue-200 text-blue-700"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View All
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow className="border-gray-200">
              <TableHead className="font-semibold text-gray-900">Candidate</TableHead>
              <TableHead className="font-semibold text-gray-900">Position</TableHead>
              <TableHead className="font-semibold text-gray-900">Applied</TableHead>
              <TableHead className="font-semibold text-gray-900">Match Score</TableHead>
              <TableHead className="font-semibold text-gray-900">Status</TableHead>
              <TableHead className="font-semibold text-gray-900 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentApplicants.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  <div className="flex flex-col items-center">
                    <Users className="h-12 w-12 text-gray-300 mb-2" />
                    <p>No recent applicants found</p>
                    <p className="text-sm">Applications will appear here as they come in</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              recentApplicants.map((applicant) => (
                <ApplicantProfileDialog
                  key={applicant.id}
                  applicant={applicant}
                  onStatusChange={updateApplicantStatus}
                  onScheduleInterview={handleScheduleInterview}
                >
                  <TableRow className="cursor-pointer hover:bg-blue-50/50 transition-colors border-gray-100">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                          {applicant.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{applicant.name}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-700">{applicant.position}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-600 text-sm">{applicant.appliedTime}</span>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getScoreBadgeColor(applicant.matchScore)}`}>
                        {applicant.matchScore}% match
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(applicant.status)}`}>
                        {applicant.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="h-8 w-8 p-0 hover:bg-blue-50 border-blue-200"
                        >
                          <Eye className="h-3 w-3 text-blue-600" />
                        </Button>
                        {applicant.status === "Reviewing" && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleScheduleInterview(applicant.id);
                            }}
                            className="h-8 px-3 text-xs hover:bg-green-50 border-green-200 text-green-700"
                          >
                            <Calendar className="h-3 w-3 mr-1" />
                            Interview
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                </ApplicantProfileDialog>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
