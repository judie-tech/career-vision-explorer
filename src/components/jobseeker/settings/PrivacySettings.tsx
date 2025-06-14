
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export const PrivacySettings = () => {
  const { toast } = useToast();
  
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [contactInfo, setContactInfo] = useState(true);
  const [anonymousApplications, setAnonymousApplications] = useState(false);

  const handleSavePrivacy = () => {
    toast({
      title: "Privacy Settings Updated",
      description: "Your privacy settings have been updated successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Privacy Settings</CardTitle>
        <CardDescription>
          Control who can see your profile and information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Profile Visibility</Label>
            <p className="text-sm text-muted-foreground">
              Make your profile visible to employers
            </p>
          </div>
          <Switch
            checked={profileVisibility}
            onCheckedChange={setProfileVisibility}
          />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Contact Information</Label>
            <p className="text-sm text-muted-foreground">
              Allow employers to contact you directly
            </p>
          </div>
          <Switch
            checked={contactInfo}
            onCheckedChange={setContactInfo}
          />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Anonymous Applications</Label>
            <p className="text-sm text-muted-foreground">
              Hide your identity until you're selected for interview
            </p>
          </div>
          <Switch
            checked={anonymousApplications}
            onCheckedChange={setAnonymousApplications}
          />
        </div>
        <Button onClick={handleSavePrivacy}>
          Save Privacy Settings
        </Button>
      </CardContent>
    </Card>
  );
};
