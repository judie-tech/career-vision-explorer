
export interface CompanySettings {
  companyName: string;
  companyDescription: string;
  website: string;
  industry: string;
  companySize: string;
  location: string;
}

export interface RecruitmentSettings {
  autoScreening: boolean;
  requireCoverLetter: boolean;
  allowRemote: boolean;
  sendApplicationUpdates: boolean;
}

export interface EmployerSettingsState {
  company: CompanySettings;
  recruitment: RecruitmentSettings;
}

export interface EmployerSettingsContextType {
  companySettings: CompanySettings;
  recruitmentSettings: RecruitmentSettings;
  updateCompanySettings: (settings: Partial<CompanySettings>) => void;
  updateRecruitmentSettings: (settings: Partial<RecruitmentSettings>) => void;
  saveAllSettings: () => void;
  isLoading: boolean;
  hasUnsavedChanges: boolean;
}
