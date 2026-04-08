
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminLayout from "@/components/admin/AdminLayout";
import { SettingsHeader } from "@/components/admin/settings/SettingsHeader";
import { GeneralSettings } from "@/components/admin/settings/GeneralSettings";
import { AppearanceSettings } from "@/components/admin/settings/AppearanceSettings";
import { NotificationSettings } from "@/components/admin/settings/NotificationSettings";
import { FeatureManagement } from "@/components/admin/settings/FeatureManagement";
import { AdminSettingsProvider, useAdminSettings } from "@/hooks/use-admin-settings";

const AdminSettingsContent = () => {
  const {
    generalSettings,
    appearance,
    notifications,
    updateGeneralSettings,
    updateAppearance,
    updateNotifications,
    saveAllSettings,
    isLoading,
    hasUnsavedChanges
  } = useAdminSettings();

  return (
    <div className="p-6">
      <SettingsHeader 
        onSave={saveAllSettings} 
        isLoading={isLoading}
        hasUnsavedChanges={hasUnsavedChanges}
      />

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <Tabs defaultValue="general" className="w-full">
          <div className="border-b">
            <TabsList className="p-0 bg-transparent border-b">
              <TabsTrigger value="general" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-career-blue">
                General
              </TabsTrigger>
              <TabsTrigger value="appearance" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-career-blue">
                Appearance
              </TabsTrigger>
              <TabsTrigger value="notifications" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-career-blue">
                Notifications
              </TabsTrigger>
              <TabsTrigger value="features" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-career-blue">
                Features
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="general" className="p-6">
            <GeneralSettings 
              initialSettings={generalSettings} 
              onSettingsChange={updateGeneralSettings} 
            />
          </TabsContent>

          <TabsContent value="appearance" className="p-6">
            <AppearanceSettings 
              initialAppearance={appearance} 
              onAppearanceChange={updateAppearance} 
            />
          </TabsContent>

          <TabsContent value="notifications" className="p-6">
            <NotificationSettings 
              initialNotifications={notifications} 
              onNotificationsChange={updateNotifications} 
            />
          </TabsContent>

          <TabsContent value="features" className="p-6">
            <FeatureManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const AdminSettings = () => {
  return (
    <AdminLayout>
      <AdminSettingsProvider>
        <AdminSettingsContent />
      </AdminSettingsProvider>
    </AdminLayout>
  );
};

export default AdminSettings;
