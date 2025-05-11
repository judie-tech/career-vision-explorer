
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminLayout from "@/components/admin/AdminLayout";
import { Save } from "lucide-react";

const AdminSettings = () => {
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

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Site Settings</h1>
          <Button className="bg-career-blue text-white hover:bg-career-blue/90">
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </Button>
        </div>

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
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Site Name</label>
                    <Input 
                      value={generalSettings.siteName} 
                      onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Contact Email</label>
                    <Input 
                      type="email"
                      value={generalSettings.contactEmail} 
                      onChange={(e) => setGeneralSettings({...generalSettings, contactEmail: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Site Description</label>
                  <Textarea 
                    value={generalSettings.siteDescription} 
                    onChange={(e) => setGeneralSettings({...generalSettings, siteDescription: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Enable User Registrations</p>
                      <p className="text-sm text-gray-500">Allow new users to register on the site</p>
                    </div>
                    <Switch 
                      checked={generalSettings.registrationsEnabled} 
                      onCheckedChange={(checked) => setGeneralSettings({...generalSettings, registrationsEnabled: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Maintenance Mode</p>
                      <p className="text-sm text-gray-500">Put the site in maintenance mode (only admins can access)</p>
                    </div>
                    <Switch 
                      checked={generalSettings.maintenanceMode} 
                      onCheckedChange={(checked) => setGeneralSettings({...generalSettings, maintenanceMode: checked})}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="appearance" className="p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Primary Color</label>
                    <div className="flex items-center gap-2">
                      <Input 
                        type="color"
                        value={appearance.primaryColor} 
                        onChange={(e) => setAppearance({...appearance, primaryColor: e.target.value})}
                        className="w-16 h-10" 
                      />
                      <Input 
                        value={appearance.primaryColor} 
                        onChange={(e) => setAppearance({...appearance, primaryColor: e.target.value})}
                        className="flex-1" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Secondary Color</label>
                    <div className="flex items-center gap-2">
                      <Input 
                        type="color"
                        value={appearance.secondaryColor} 
                        onChange={(e) => setAppearance({...appearance, secondaryColor: e.target.value})}
                        className="w-16 h-10" 
                      />
                      <Input 
                        value={appearance.secondaryColor} 
                        onChange={(e) => setAppearance({...appearance, secondaryColor: e.target.value})}
                        className="flex-1" 
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Logo URL</label>
                    <Input 
                      value={appearance.logoUrl} 
                      onChange={(e) => setAppearance({...appearance, logoUrl: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Favicon URL</label>
                    <Input 
                      value={appearance.faviconUrl} 
                      onChange={(e) => setAppearance({...appearance, faviconUrl: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Preview</label>
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded bg-gray-200 flex items-center justify-center text-xs">Logo</div>
                      <div>
                        <div className="h-4 w-32 rounded" style={{backgroundColor: appearance.primaryColor}}></div>
                        <div className="h-4 w-24 rounded mt-2" style={{backgroundColor: appearance.secondaryColor}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-500">Enable all email notifications</p>
                  </div>
                  <Switch 
                    checked={notifications.emailNotifications} 
                    onCheckedChange={(checked) => setNotifications({...notifications, emailNotifications: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Welcome Emails</p>
                    <p className="text-sm text-gray-500">Send welcome email to new users</p>
                  </div>
                  <Switch 
                    checked={notifications.welcomeEmail} 
                    onCheckedChange={(checked) => setNotifications({...notifications, welcomeEmail: checked})}
                    disabled={!notifications.emailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Job Alerts</p>
                    <p className="text-sm text-gray-500">Send job match notifications to users</p>
                  </div>
                  <Switch 
                    checked={notifications.jobAlerts} 
                    onCheckedChange={(checked) => setNotifications({...notifications, jobAlerts: checked})}
                    disabled={!notifications.emailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Newsletter</p>
                    <p className="text-sm text-gray-500">Enable newsletter subscription</p>
                  </div>
                  <Switch 
                    checked={notifications.newsletterEnabled} 
                    onCheckedChange={(checked) => setNotifications({...notifications, newsletterEnabled: checked})}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
