
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Applicant } from "@/hooks/use-applicants";

interface ApplicantStatsCardsProps {
  applicants: Applicant[];
}

export const ApplicantStatsCards = ({ applicants }: ApplicantStatsCardsProps) => {
  const statusCounts = {
    total: applicants.length,
    review: applicants.filter(a => a.status === "Reviewing").length,
    interview: applicants.filter(a => a.status === "Interview").length,
    accepted: applicants.filter(a => a.status === "Hired").length,
    rejected: applicants.filter(a => a.status === "Rejected").length,
  };

  return (
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
  );
};
