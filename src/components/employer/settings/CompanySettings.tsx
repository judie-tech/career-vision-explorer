
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CompanySettingsProps {
  initialSettings: {
    companyName: string;
    companyDescription: string;
    website: string;
    industry: string;
    companySize: string;
    location: string;
  };
  onSettingsChange: (settings: any) => void;
}

export const CompanySettings = ({ 
  initialSettings, 
  onSettingsChange 
}: CompanySettingsProps) => {
  const [settings, setSettings] = useState(initialSettings);

  useEffect(() => {
    setSettings(initialSettings);
  }, [initialSettings]);

  const handleChange = (key: string, value: string) => {
    const updatedSettings = { ...settings, [key]: value };
    setSettings(updatedSettings);
    onSettingsChange({ [key]: value });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Company Name</label>
          <Input 
            value={settings.companyName} 
            onChange={(e) => handleChange('companyName', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Website</label>
          <Input 
            type="url"
            value={settings.website} 
            onChange={(e) => handleChange('website', e.target.value)}
            placeholder="https://yourcompany.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Company Description</label>
        <Textarea 
          value={settings.companyDescription} 
          onChange={(e) => handleChange('companyDescription', e.target.value)}
          rows={3}
          placeholder="Describe your company..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Industry</label>
          <Select value={settings.industry} onValueChange={(value) => handleChange('industry', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Healthcare">Healthcare</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="Education">Education</SelectItem>
              <SelectItem value="Manufacturing">Manufacturing</SelectItem>
              <SelectItem value="Retail">Retail</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Company Size</label>
          <Select value={settings.companySize} onValueChange={(value) => handleChange('companySize', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-10">1-10 employees</SelectItem>
              <SelectItem value="11-50">11-50 employees</SelectItem>
              <SelectItem value="51-100">51-100 employees</SelectItem>
              <SelectItem value="101-500">101-500 employees</SelectItem>
              <SelectItem value="500+">500+ employees</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Location</label>
          <Input 
            value={settings.location} 
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="City, State/Country"
          />
        </div>
      </div>
    </div>
  );
};
