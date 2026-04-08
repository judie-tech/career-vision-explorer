
import { Save } from "lucide-react";
import { AdminButton } from "@/components/ui/custom-button";
import { Badge } from "@/components/ui/badge";

interface SettingsHeaderProps {
  onSave: () => void;
  isLoading?: boolean;
  hasUnsavedChanges?: boolean;
}

export const SettingsHeader = ({ 
  onSave, 
  isLoading = false, 
  hasUnsavedChanges = false 
}: SettingsHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-bold">Visiondrill Settings</h1>
        {hasUnsavedChanges && (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
            Unsaved Changes
          </Badge>
        )}
      </div>
      <AdminButton 
        variant="primary"
        icon={<Save className="h-4 w-4" />}
        onClick={onSave}
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Save All Settings"}
      </AdminButton>
    </div>
  );
};
