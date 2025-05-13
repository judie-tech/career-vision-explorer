
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface ApplicantData {
  name: string;
  position: string;
  appliedTime: string;
  matchScore: number;
  status: "Review" | "Interview" | "Accepted" | "Rejected";
}

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

export const RecentApplicantsTable = () => {
  const applicants: ApplicantData[] = [
    {
      name: "Sarah Johnson",
      position: "Senior Frontend Developer",
      appliedTime: "2 days ago",
      matchScore: 95,
      status: "Review",
    },
    {
      name: "Michael Chen",
      position: "Full Stack Engineer",
      appliedTime: "3 days ago",
      matchScore: 92,
      status: "Interview",
    },
    {
      name: "Alex Rodriguez",
      position: "UX Designer",
      appliedTime: "1 week ago",
      matchScore: 86,
      status: "Accepted",
    },
    {
      name: "Jamie Smith",
      position: "DevOps Engineer",
      appliedTime: "1 week ago",
      matchScore: 71,
      status: "Rejected",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Applicants</CardTitle>
        <CardDescription>View and manage candidate applications</CardDescription>
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
            {applicants.map((applicant) => (
              <TableRow key={applicant.name}>
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
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
