
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
    <div className="flex justify-between w-full">
      <Button 
        variant="outline" 
        onClick={onBack}
        disabled={currentStep === 0}
        className="hover:bg-gray-100"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      <Button 
        onClick={onNext} 
        variant="gradient"
        className="text-white shadow-md"
      >
        {currentStep < totalSteps ? (
          <>
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        ) : (
          'Complete'
        )}
      </Button>
    </div>
  );
};
