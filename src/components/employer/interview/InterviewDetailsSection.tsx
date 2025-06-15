
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Video } from "lucide-react";

interface InterviewDetailsSectionProps {
  interviewType: string;
  interviewer: string;
  onInterviewTypeChange: (type: string) => void;
  onInterviewerChange: (interviewer: string) => void;
}

export const InterviewDetailsSection = ({
  interviewType,
  interviewer,
  onInterviewTypeChange,
  onInterviewerChange,
}: InterviewDetailsSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-3">
        <Video className="h-5 w-5 text-blue-600" />
        <Label className="text-base font-medium">Interview Details</Label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium text-gray-700">Interview Type</Label>
          <select
            value={interviewType}
            onChange={(e) => onInterviewTypeChange(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Video">🎥 Video Call</option>
            <option value="Phone">📞 Phone Call</option>
            <option value="In-Person">🏢 In Person</option>
          </select>
        </div>
        <div>
          <Label htmlFor="interviewer" className="text-sm font-medium text-gray-700">
            Interviewer *
          </Label>
          <Input
            id="interviewer"
            value={interviewer}
            onChange={(e) => onInterviewerChange(e.target.value)}
            placeholder="Enter interviewer name"
            className="mt-1"
            required
          />
        </div>
      </div>
    </div>
  );
};
