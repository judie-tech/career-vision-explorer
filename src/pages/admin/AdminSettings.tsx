
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminLayout from "@/components/admin/AdminLayout";
import { useToast } from "@/hooks/use-toast";
import { SettingsHeader } from "@/components/admin/settings/SettingsHeader";
import { GeneralSettings } from "@/components/admin/settings/GeneralSettings";
import { AppearanceSettings } from "@/components/admin/settings/AppearanceSettings";
import { NotificationSettings } from "@/components/admin/settings/NotificationSettings";

const AdminSettings = () => {
  const { toast } = useToast();
  
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Visiondrill Careers",
    siteDescription: "AI-Driven career navigator helping professionals find their perfect job match",
    contactEmail: "support@visiondrill.com",
    registrationsEnabled: true,
    maintenanceMode: false
  });

  const [appearance, setAppearance] = useState({
    primaryColor: "#3b82f6",
    secondaryColor: "#8b5cf6",
    logoUrl: "/images/logo.png",
    faviconUrl: "/images/favicon.ico"
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    welcomeEmail: true,
    jobAlerts: true,
    newsletterEnabled: true
  });

  const saveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your changes have been successfully applied"
    });
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <SettingsHeader onSave={saveSettings} />

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
              </TabsList>
            </div>

            <TabsContent value="general" className="p-6">
              <GeneralSettings 
                initialSettings={generalSettings} 
                onSettingsChange={setGeneralSettings} 
              />
            </TabsContent>

            <TabsContent value="appearance" className="p-6">
              <AppearanceSettings 
                initialAppearance={appearance} 
                onAppearanceChange={setAppearance} 
              />
            </TabsContent>

            <TabsContent value="notifications" className="p-6">
              <NotificationSettings 
                initialNotifications={notifications} 
                onNotificationsChange={setNotifications} 
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
