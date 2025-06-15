
import React from "react";
import { Label } from "@/components/ui/label";
import { Users } from "lucide-react";
import { Applicant } from "@/hooks/use-applicants";

interface ApplicantSelectionSectionProps {
  applicants: Applicant[];
  selectedApplicantId: string;
  onApplicantSelect: (applicantId: string) => void;
}

export const ApplicantSelectionSection = ({
  applicants,
  selectedApplicantId,
  onApplicantSelect,
}: ApplicantSelectionSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-3">
        <Users className="h-5 w-5 text-blue-600" />
        <Label className="text-base font-medium">Select Existing Applicant (Optional)</Label>
      </div>
      <select
        value={selectedApplicantId}
        onChange={(e) => onApplicantSelect(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">Select an applicant or enter manually below</option>
        {applicants.map((applicant) => (
          <option key={applicant.id} value={applicant.id}>
            {applicant.name} - {applicant.position}
          </option>
        ))}
      </select>
    </div>
  );
};
