
import React from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";

interface LinkedInImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConnect: () => void;
  isLoading: boolean;
}

const LinkedInImportDialog: React.FC<LinkedInImportDialogProps> = ({
  open,
  onOpenChange,
  onConnect,
  isLoading,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Import LinkedIn Profile</DialogTitle>
          <DialogDescription>
            We'll use your LinkedIn profile data to automatically create your Visiondrill profile.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Authorize Visiondrill to access your LinkedIn profile data:
          </p>
          <Button 
            className="w-full bg-[#0077B5] hover:bg-[#0077B5]/90 transition-colors"
            onClick={onConnect}
            disabled={isLoading}
          >
            <Linkedin className="mr-2 h-4 w-4" /> 
            {isLoading ? "Connecting..." : "Connect with LinkedIn"}
          </Button>
          <Button 
            variant="outline" 
            className="w-full transition-colors" 
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LinkedInImportDialog;
