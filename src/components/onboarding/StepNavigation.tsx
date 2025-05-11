
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
        className="hover:bg-gray-100 text-gray-800 border-gray-300"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      <Button 
        onClick={onNext} 
        variant="default"
        className="bg-career-blue hover:bg-career-blue/90 text-white font-semibold"
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
