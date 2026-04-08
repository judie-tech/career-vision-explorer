
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  CompanySettings, 
  RecruitmentSettings, 
  EmployerSettingsContextType 
} from "@/types/employer-settings";
import {
  globalEmployerSettingsState,
  updateGlobalEmployerSettings,
  employerSettingsListeners,
  notifyEmployerSettingsListeners,
  saveEmployerSettingsToStorage
} from "@/utils/employer-settings-storage";

const EmployerSettingsContext = createContext<EmployerSettingsContextType | undefined>(undefined);

export const EmployerSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [companySettings, setCompanySettings] = useState<CompanySettings>(globalEmployerSettingsState.company);
  const [recruitmentSettings, setRecruitmentSettings] = useState<RecruitmentSettings>(globalEmployerSettingsState.recruitment);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const syncState = () => {
      setCompanySettings({ ...globalEmployerSettingsState.company });
      setRecruitmentSettings({ ...globalEmployerSettingsState.recruitment });
      setHasUnsavedChanges(false);
    };
    
    employerSettingsListeners.add(syncState);
    return () => {
      employerSettingsListeners.delete(syncState);
    };
  }, []);

  const updateCompanySettings = (newSettings: Partial<CompanySettings>) => {
    const updated = { ...globalEmployerSettingsState.company, ...newSettings };
    updateGlobalEmployerSettings({ company: updated });
    setCompanySettings(updated);
    setHasUnsavedChanges(true);
    notifyEmployerSettingsListeners();
    
    toast({
      title: "Company Settings Updated",
      description: "Company information has been updated in real-time"
    });
  };

  const updateRecruitmentSettings = (newSettings: Partial<RecruitmentSettings>) => {
    const updated = { ...globalEmployerSettingsState.recruitment, ...newSettings };
    updateGlobalEmployerSettings({ recruitment: updated });
    setRecruitmentSettings(updated);
    setHasUnsavedChanges(true);
    notifyEmployerSettingsListeners();
    
    toast({
      title: "Recruitment Settings Updated",
      description: "Recruitment preferences have been updated in real-time"
    });
  };

  const saveAllSettings = () => {
    setIsLoading(true);
    try {
      setTimeout(() => {
        saveEmployerSettingsToStorage();
        setHasUnsavedChanges(false);
        setIsLoading(false);
        
        toast({
          title: "Settings Saved",
          description: "All employer settings have been saved successfully"
        });
      }, 500);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Save Failed",
        description: "Failed to save settings. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <EmployerSettingsContext.Provider value={{
      companySettings,
      recruitmentSettings,
      updateCompanySettings,
      updateRecruitmentSettings,
      saveAllSettings,
      isLoading,
      hasUnsavedChanges
    }}>
      {children}
    </EmployerSettingsContext.Provider>
  );
};

export const useEmployerSettingsContext = () => {
  const context = useContext(EmployerSettingsContext);
  if (context === undefined) {
    throw new Error("useEmployerSettingsContext must be used within an EmployerSettingsProvider");
  }
  return context;
};
