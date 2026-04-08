import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmployerSettingsHeader } from "./EmployerSettingsHeader";
import { CompanySettings } from "./CompanySettings";
import { RecruitmentSettings } from "./RecruitmentSettings";
import { useEmployerSettingsContext } from "@/contexts/EmployerSettingsContext";

export const EmployerSettingsContent = () => {
  const {
    companySettings,
    recruitmentSettings,
    updateCompanySettings,
    updateRecruitmentSettings,
    saveAllSettings,
    isLoading,
    hasUnsavedChanges
  } = useEmployerSettingsContext();

  return (
    <div className="p-6">
      <EmployerSettingsHeader 
        onSave={saveAllSettings} 
        isLoading={isLoading}
        hasUnsavedChanges={hasUnsavedChanges}
      />

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <Tabs defaultValue="company" className="w-full">
          <div className="border-b">
            <TabsList className="p-0 bg-transparent border-b">
              <TabsTrigger value="company" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-career-blue">
                Company Profile
              </TabsTrigger>
              <TabsTrigger value="recruitment" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-career-blue">
                Recruitment Settings
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="company" className="p-6">
            <CompanySettings 
              initialSettings={companySettings} 
              onSettingsChange={updateCompanySettings} 
            />
          </TabsContent>

          <TabsContent value="recruitment" className="p-6">
            <RecruitmentSettings 
              initialSettings={recruitmentSettings} 
              onSettingsChange={updateRecruitmentSettings} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
