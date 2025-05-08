
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
