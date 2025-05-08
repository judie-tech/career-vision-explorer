
import { Textarea } from "@/components/ui/textarea";

interface CareerGoalsStepProps {
  value: string;
  onChange: (value: string) => void;
}

export const CareerGoalsStep = ({ value, onChange }: CareerGoalsStepProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">What are your career goals?</h3>
      <Textarea
        placeholder="I'm looking to advance my career in software development with a focus on machine learning and AI..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[120px]"
      />
    </div>
  );
};
