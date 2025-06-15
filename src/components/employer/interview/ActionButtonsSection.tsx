
import React from "react";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock } from "lucide-react";

interface ActionButtonsSectionProps {
  isSubmitting: boolean;
  onCancel: () => void;
}

export const ActionButtonsSection = ({
  isSubmitting,
  onCancel,
}: ActionButtonsSectionProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
      <Button 
        type="submit" 
        className="flex-1 bg-blue-600 hover:bg-blue-700"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Clock className="h-4 w-4 mr-2 animate-spin" />
            Scheduling...
          </>
        ) : (
          <>
            <CalendarIcon className="h-4 w-4 mr-2" />
            Schedule Interview
          </>
        )}
      </Button>
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel}
        disabled={isSubmitting}
        className="flex-1"
      >
        Cancel
      </Button>
    </div>
  );
};
