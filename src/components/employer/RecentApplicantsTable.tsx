
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Eye, Calendar, ExternalLink, Users, Loader2, CheckCircle, XCircle, Clock } from "lucide-react";
import { useEmployerApplications } from "@/hooks/use-employer-applications";
import { ApplicantProfileDialog } from "./ApplicantProfileDialog";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export const RecentApplicantsTable = () => {
const {
    filteredApplications,
    isLoading,
    error,
    statusFilter,
    setStatusFilter,
    jobFilter,
    setJobFilter,
    searchQuery,
    setSearchQuery,
    reviewApplication,
    stats,
    uniqueJobs
  } = useEmployerApplications();
  const navigate = useNavigate();

  const getScoreBadgeColor = (score: number) => {
    if (score >= 90) return "bg-emerald-100 text-emerald-700 border-emerald-200";
    if (score >= 80) return "bg-green-100 text-green-700 border-green-200";
    if (score >= 70) return "bg-yellow-100 text-yellow-700 border-yellow-200";
    return "bg-red-100 text-red-700 border-red-200";
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "reviewed":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "accepted":
        return "bg-green-100 text-green-700 border-green-200";
      case "rejected":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };
  
  const handleScheduleInterview = (applicantId: string) => {
    reviewApplication(applicantId, 'Reviewed');
    // Navigate to interview scheduling page
    navigate("/employer/interviews/schedule");
  };
  
  const handleViewAllApplicants = () => {
    navigate("/employer/applicants");
  };

  // Show only 5 most recent applications
  const recentApplications = filteredApplications.slice(0, 5);

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
          
          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px] bg-gray-50 border-gray-200">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1 text-yellow-600" />
                  Pending ({stats.pending})
                </div>
              </SelectItem>
              <SelectItem value="reviewed">
                <div className="flex items-center">
                  <Eye className="h-3 w-3 mr-1 text-blue-600" />
                  Reviewed ({stats.reviewed})
                </div>
              </SelectItem>
              <SelectItem value="accepted">
                <div className="flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1 text-green-600" />
                  Accepted ({stats.accepted})
                </div>
              </SelectItem>
              <SelectItem value="rejected">
                <div className="flex items-center">
                  <XCircle className="h-3 w-3 mr-1 text-gray-600" />
                  Rejected ({stats.rejected})
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Job Filter */}
          {uniqueJobs.length > 0 && (
            <Select value={jobFilter} onValueChange={setJobFilter}>
              <SelectTrigger className="w-[180px] bg-gray-50 border-gray-200">
                <SelectValue placeholder="Filter by job" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jobs</SelectItem>
                {uniqueJobs.map(job => (
                  <SelectItem key={job.id} value={job.id}>
                    {job.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          
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
{isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  <Loader2 className="animate-spin h-8 w-8 mx-auto text-gray-600" />
                  <p>Loading applications...</p>
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-red-500">
                  <XCircle className="h-8 w-8 mx-auto mb-2" />
                  <p>Failed to load applications</p>
                </TableCell>
              </TableRow>
            ) : recentApplications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  <Users className="h-12 w-12 text-gray-300 mb-2" />
                  <p>No recent applicants found</p>
                  <p className="text-sm">Applications will appear here as they come in</p>
                </TableCell>
              </TableRow>
            ) : (
              recentApplications.map((applicant) => (
                <ApplicantProfileDialog
                  key={applicant.id}
                  applicant={applicant}
                  onStatusChange={reviewApplication}
                  onScheduleInterview={handleScheduleInterview}
                >
                  <TableRow className="cursor-pointer hover:bg-blue-50/50 transition-colors border-gray-100">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                          {applicant.applicantInfo.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{applicant.applicantInfo.name}</p>
                          <p className="text-xs text-gray-500">{applicant.applicantInfo.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-gray-700 font-medium">{applicant.jobInfo.title}</p>
                        <p className="text-xs text-gray-500">{applicant.jobInfo.company}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-600 text-sm">{applicant.appliedDate}</span>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getScoreBadgeColor(applicant.match_score || 0)}`}>
                        {applicant.match_score || 0}% match
                      </span>
                    </TableCell>
<TableCell>
                      <Badge className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(applicant.status)}`}>
                        {applicant.status}
                      </Badge>
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
                        {applicant.status === "Pending" && (
                          <>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                reviewApplication(applicant.id, 'Reviewed');
                              }}
                              className="h-8 px-3 text-xs hover:bg-blue-50 border-blue-200 text-blue-700"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Review
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                reviewApplication(applicant.id, 'Accepted');
                              }}
                              className="h-8 px-3 text-xs hover:bg-green-50 border-green-200 text-green-700"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Accept
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                reviewApplication(applicant.id, 'Rejected');
                              }}
                              className="h-8 px-3 text-xs hover:bg-red-50 border-red-200 text-red-700"
                            >
                              <XCircle className="h-3 w-3 mr-1" />
                              Reject
                            </Button>
                          </>
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
