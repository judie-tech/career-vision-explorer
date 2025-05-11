
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface AppearanceSettingsProps {
  initialAppearance: {
    primaryColor: string;
    secondaryColor: string;
    logoUrl: string;
    faviconUrl: string;
  };
  onAppearanceChange: (appearance: any) => void;
}

export const AppearanceSettings = ({
  initialAppearance,
  onAppearanceChange
}: AppearanceSettingsProps) => {
  const { toast } = useToast();
  const [appearance, setAppearance] = useState(initialAppearance);

  const handleChange = (key: string, value: string) => {
    const updatedAppearance = { ...appearance, [key]: value };
    setAppearance(updatedAppearance);
    onAppearanceChange(updatedAppearance);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Primary Color</label>
          <div className="flex items-center gap-2">
            <Input 
              type="color"
              value={appearance.primaryColor} 
              onChange={(e) => handleChange('primaryColor', e.target.value)}
              className="w-16 h-10" 
            />
            <Input 
              value={appearance.primaryColor} 
              onChange={(e) => handleChange('primaryColor', e.target.value)}
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
              onChange={(e) => handleChange('secondaryColor', e.target.value)}
              className="w-16 h-10" 
            />
            <Input 
              value={appearance.secondaryColor} 
              onChange={(e) => handleChange('secondaryColor', e.target.value)}
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
            onChange={(e) => handleChange('logoUrl', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Favicon URL</label>
          <Input 
            value={appearance.faviconUrl} 
            onChange={(e) => handleChange('faviconUrl', e.target.value)}
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

      <Button 
        onClick={() => {
          toast({
            title: "Theme Updated",
            description: "The appearance settings have been applied"
          });
        }}
      >
        Apply Theme Changes
      </Button>
    </div>
  );
};
