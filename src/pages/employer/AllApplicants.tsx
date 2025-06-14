
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/admin/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ArrowLeft, Calendar, Download, Mail, Phone } from "lucide-react";
import { useApplicants } from "@/hooks/use-applicants";
import { ApplicantProfileDialog } from "@/components/employer/ApplicantProfileDialog";

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

  const getScoreBadgeColor = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-800";
    if (score >= 80) return "bg-green-100 text-green-800";
    if (score >= 70) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Reviewing":
        return "bg-yellow-100 text-yellow-800";
      case "Interview":
        return "bg-blue-100 text-blue-800";
      case "Hired":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleScheduleInterview = (applicantId: string) => {
    updateApplicantStatus(applicantId, "Interview");
    navigate("/employer/interviews/schedule");
  };

  const statusCounts = {
    total: allApplicants.length,
    review: allApplicants.filter(a => a.status === "Reviewing").length,
    interview: allApplicants.filter(a => a.status === "Interview").length,
    accepted: allApplicants.filter(a => a.status === "Hired").length,
    rejected: allApplicants.filter(a => a.status === "Rejected").length,
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{statusCounts.total}</div>
              <p className="text-sm text-gray-500">Total Applicants</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-yellow-600">{statusCounts.review}</div>
              <p className="text-sm text-gray-500">In Review</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{statusCounts.interview}</div>
              <p className="text-sm text-gray-500">Interview</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{statusCounts.accepted}</div>
              <p className="text-sm text-gray-500">Accepted</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-600">{statusCounts.rejected}</div>
              <p className="text-sm text-gray-500">Rejected</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Applicants</CardTitle>
                <CardDescription>View and manage all candidate applications</CardDescription>
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
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Applied">Applied</SelectItem>
                    <SelectItem value="Reviewing">Reviewing</SelectItem>
                    <SelectItem value="Interview">Interview</SelectItem>
                    <SelectItem value="Hired">Hired</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredApplicants.length === 0 ? (
              <div className="text-center py-8">
                <h3 className="text-lg font-medium text-gray-900">No applicants found</h3>
                <p className="text-gray-500 mt-2">
                  {searchQuery || statusFilter !== "all" ? "Try adjusting your search criteria." : "No applications received yet."}
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidate</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Applied</TableHead>
                    <TableHead>Match Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplicants.map((applicant) => (
                    <TableRow key={applicant.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{applicant.name}</div>
                          {applicant.notes && (
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {applicant.notes}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{applicant.position}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="h-3 w-3 mr-1" />
                            {applicant.email}
                          </div>
                          {applicant.phone && (
                            <div className="flex items-center text-sm">
                              <Phone className="h-3 w-3 mr-1" />
                              {applicant.phone}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{applicant.appliedTime}</TableCell>
                      <TableCell>
                        <Badge className={getScoreBadgeColor(applicant.matchScore)}>
                          {applicant.matchScore}%
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeColor(applicant.status)}>
                          {applicant.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <ApplicantProfileDialog
                            applicant={applicant}
                            onStatusChange={updateApplicantStatus}
                            onScheduleInterview={handleScheduleInterview}
                          >
                            <Button variant="outline" size="sm">
                              View Profile
                            </Button>
                          </ApplicantProfileDialog>
                          {applicant.resumeUrl && (
                            <Button variant="outline" size="sm">
                              <Download className="h-3 w-3 mr-1" />
                              Resume
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AllApplicants;
