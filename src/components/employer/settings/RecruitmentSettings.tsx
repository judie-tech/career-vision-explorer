
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface RecruitmentSettingsProps {
  initialSettings: {
    autoScreening: boolean;
    requireCoverLetter: boolean;
    allowRemote: boolean;
    sendApplicationUpdates: boolean;
  };
  onSettingsChange: (settings: any) => void;
}

export const RecruitmentSettings = ({
  initialSettings,
  onSettingsChange
}: RecruitmentSettingsProps) => {
  const { toast } = useToast();
  const [settings, setSettings] = useState(initialSettings);

  useEffect(() => {
    setSettings(initialSettings);
  }, [initialSettings]);

  const handleChange = (key: string, value: boolean) => {
    const updatedSettings = { ...settings, [key]: value };
    setSettings(updatedSettings);
    onSettingsChange({ [key]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">Auto-Screening</p>
          <p className="text-sm text-gray-500">Automatically screen applications based on criteria</p>
        </div>
        <Switch 
          checked={settings.autoScreening} 
          onCheckedChange={(checked) => {
            handleChange('autoScreening', checked);
            toast({
              title: "Auto-Screening " + (checked ? "Enabled" : "Disabled"),
              description: checked ? "Applications will be automatically screened" : "Manual screening required"
            });
          }}
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">Require Cover Letter</p>
          <p className="text-sm text-gray-500">Make cover letters mandatory for applications</p>
        </div>
        <Switch 
          checked={settings.requireCoverLetter} 
          onCheckedChange={(checked) => handleChange('requireCoverLetter', checked)}
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">Allow Remote Work</p>
          <p className="text-sm text-gray-500">Include remote work options in job postings</p>
        </div>
        <Switch 
          checked={settings.allowRemote} 
          onCheckedChange={(checked) => handleChange('allowRemote', checked)}
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">Application Updates</p>
          <p className="text-sm text-gray-500">Send email updates to applicants about their status</p>
        </div>
        <Switch 
          checked={settings.sendApplicationUpdates} 
          onCheckedChange={(checked) => handleChange('sendApplicationUpdates', checked)}
        />
      </div>
    </div>
  );
};
