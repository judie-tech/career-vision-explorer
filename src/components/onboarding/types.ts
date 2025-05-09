
export type WorkPreference = "remote" | "in-person" | "hybrid" | "";
export type SalaryRange = "entry" | "mid" | "senior" | "executive" | "";

export interface OnboardingData {
  careerGoals: string;
  workPreference: WorkPreference;
  salaryExpectations: SalaryRange;
  location: string;
  skills: string;
  videoIntroduction: File | null;
}

export interface LinkedInProfile {
  name: string;
  title: string;
  skills: string[];
  education: string[];
  experience: {
    company: string;
    role: string;
    duration: string;
  }[];
}

export interface AssessmentResult {
  id: string;
  type: string;
  score: number;
  completedAt: Date;
  recommendedSkills: string[];
}
