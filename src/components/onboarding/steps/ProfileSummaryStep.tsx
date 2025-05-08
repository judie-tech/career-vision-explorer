
import { OnboardingData } from "../types";

interface ProfileSummaryStepProps {
  data: OnboardingData;
}

export const ProfileSummaryStep = ({ data }: ProfileSummaryStepProps) => {
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
    </div>
  );
};
