
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
}

export const StepNavigation = ({
  currentStep,
  totalSteps,
  onBack,
  onNext
}: StepNavigationProps) => {
  return (
    <div className="flex justify-between">
      <Button 
        variant="outline" 
        onClick={onBack}
        disabled={currentStep === 0}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        <span className="button-text-visible">Back</span>
      </Button>
      <Button onClick={onNext} className="button-primary-gradient">
        <span className="white-text button-text-visible">
          {currentStep < totalSteps ? (
            <>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          ) : (
            'Complete'
          )}
        </span>
      </Button>
    </div>
  );
};
