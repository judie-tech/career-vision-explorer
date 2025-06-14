
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export const NotificationSettings = () => {
  const { toast } = useToast();
  
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [jobAlerts, setJobAlerts] = useState(true);
  const [applicationUpdates, setApplicationUpdates] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const handleSaveNotifications = () => {
    // Here you would normally save to backend
    console.log("Saving notification settings:", {
      emailNotifications,
      jobAlerts,
      applicationUpdates,
      marketingEmails,
      smsNotifications,
    });

    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been saved successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>
          Choose how you want to be notified about job opportunities and updates
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Email Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive email updates about new job matches and opportunities
            </p>
          </div>
          <Switch
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
          />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Job Alerts</Label>
            <p className="text-sm text-muted-foreground">
              Get notified when new jobs match your criteria and preferences
            </p>
          </div>
          <Switch
            checked={jobAlerts}
            onCheckedChange={setJobAlerts}
          />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Application Updates</Label>
            <p className="text-sm text-muted-foreground">
              Receive updates on your job applications and interview invitations
            </p>
          </div>
          <Switch
            checked={applicationUpdates}
            onCheckedChange={setApplicationUpdates}
          />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Marketing Emails</Label>
            <p className="text-sm text-muted-foreground">
              Receive tips, career advice, and platform updates
            </p>
          </div>
          <Switch
            checked={marketingEmails}
            onCheckedChange={setMarketingEmails}
          />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>SMS Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive urgent notifications via text message
            </p>
          </div>
          <Switch
            checked={smsNotifications}
            onCheckedChange={setSmsNotifications}
          />
        </div>
        <Button onClick={handleSaveNotifications} className="w-full">
          Save Notification Settings
        </Button>
      </CardContent>
    </Card>
  );
};
