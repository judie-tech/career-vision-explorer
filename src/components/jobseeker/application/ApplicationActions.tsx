
import { Button } from "@/components/ui/button";

interface ApplicationActionsProps {
  isSubmitting: boolean;
  onCancel: () => void;
}

export const ApplicationActions = ({ isSubmitting, onCancel }: ApplicationActionsProps) => {
  return (
    <div className="flex gap-3 pt-6 border-t">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel} 
        className="flex-1"
        disabled={isSubmitting}
      >
        Cancel
      </Button>
      <Button 
        type="submit" 
        disabled={isSubmitting} 
        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Submitting...
          </div>
        ) : (
          "Submit Application"
        )}
      </Button>
    </div>
  );
};
