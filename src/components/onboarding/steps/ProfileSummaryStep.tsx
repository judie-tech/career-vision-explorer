
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { OnboardingData } from "../types";

interface ProfileSummaryStepProps {
  data: OnboardingData;
}

export const ProfileSummaryStep = ({ data }: ProfileSummaryStepProps) => {
  const handleDownloadResume = () => {
    // In a real app, this would generate a formatted resume
    alert("Your profile data would be downloaded as a resume");
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Your Profile Summary</h3>
      <div className="bg-gray-50 rounded-md p-4 space-y-3">
        <div>
          <p className="text-sm font-medium">Career Goals</p>
          <p className="text-sm text-gray-600">{data.careerGoals || "Not specified"}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Work Preference</p>
          <p className="text-sm text-gray-600">
            {data.workPreference ? data.workPreference.charAt(0).toUpperCase() + data.workPreference.slice(1) : "Not specified"}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium">Salary Expectations</p>
          <p className="text-sm text-gray-600">
            {data.salaryExpectations === "entry" && "Entry Level (30K-50K KES/month)"}
            {data.salaryExpectations === "mid" && "Mid Level (50K-100K KES/month)"}
            {data.salaryExpectations === "senior" && "Senior Level (100K-200K KES/month)"}
            {data.salaryExpectations === "executive" && "Executive Level (200K+ KES/month)"}
            {!data.salaryExpectations && "Not specified"}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium">Location</p>
          <p className="text-sm text-gray-600">{data.location || "Not specified"}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Video Introduction</p>
          <p className="text-sm text-gray-600">
            {data.videoIntroduction ? "Provided" : "Not provided"}
          </p>
        </div>
      </div>
      
      <div className="mt-6">
        <h4 className="text-sm font-medium mb-2">AI-Generated Career Recommendations</h4>
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
          <p className="text-sm">
            Based on your profile, we recommend the following career paths:
          </p>
          <ul className="mt-2 text-sm list-disc list-inside">
            <li>Software Development Engineer</li>
            <li>Frontend Developer</li>
            <li>UX Engineer</li>
          </ul>
        </div>
        
        <h4 className="text-sm font-medium mb-2">Skills Assessment</h4>
        <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-4">
          <p className="text-sm">
            Complete a skills assessment to improve your job match accuracy by up to 45%.
          </p>
          <Button variant="outline" size="sm" className="mt-2">
            Take Assessment
          </Button>
        </div>
        
        <Button onClick={handleDownloadResume} variant="outline" className="w-full mt-4">
          <FileText className="mr-2 h-4 w-4" />
          Download as Resume
        </Button>
      </div>
    </div>
  );
};
