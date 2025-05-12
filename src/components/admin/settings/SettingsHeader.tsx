
import { Save } from "lucide-react";
import { AdminButton } from "@/components/ui/custom-button";

interface SettingsHeaderProps {
  onSave: () => void;
}

export const SettingsHeader = ({ onSave }: SettingsHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Visiondrill Settings</h1>
      <AdminButton 
        variant="primary"
        icon={<Save className="h-4 w-4" />}
        onClick={onSave}
      >
        Save Settings
      </AdminButton>
    </div>
  );
};
