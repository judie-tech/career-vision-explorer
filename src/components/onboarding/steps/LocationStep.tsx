
import { Input } from "@/components/ui/input";

interface LocationStepProps {
  value: string;
  onChange: (value: string) => void;
}

export const LocationStep = ({ value, onChange }: LocationStepProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">What's your preferred location?</h3>
      <Input
        placeholder="Nairobi, Kenya"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
