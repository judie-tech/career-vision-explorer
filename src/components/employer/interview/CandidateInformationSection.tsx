
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";

interface CandidateInformationSectionProps {
  candidateName: string;
  candidateEmail: string;
  onNameChange: (name: string) => void;
  onEmailChange: (email: string) => void;
}

export const CandidateInformationSection = ({
  candidateName,
  candidateEmail,
  onNameChange,
  onEmailChange,
}: CandidateInformationSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-3">
        <User className="h-5 w-5 text-blue-600" />
        <Label className="text-base font-medium">Candidate Information</Label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="candidateName" className="text-sm font-medium text-gray-700">
            Candidate Name *
          </Label>
          <Input
            id="candidateName"
            value={candidateName}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Enter candidate name"
            className="mt-1"
            required
          />
        </div>
        <div>
          <Label htmlFor="candidateEmail" className="text-sm font-medium text-gray-700">
            Candidate Email *
          </Label>
          <Input
            id="candidateEmail"
            type="email"
            value={candidateEmail}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="candidate@example.com"
            className="mt-1"
            required
          />
        </div>
      </div>
    </div>
  );
};
