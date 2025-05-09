
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SalaryRange } from "../types";

interface SalaryExpectationsStepProps {
  value: SalaryRange;
  onChange: (value: SalaryRange) => void;
}

export const SalaryExpectationsStep = ({ value, onChange }: SalaryExpectationsStepProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">What are your salary expectations?</h3>
      <Select
        value={value || "entry"} // Provide a default value to prevent empty string
        onValueChange={(value) => onChange(value as SalaryRange)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select salary range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="entry">Entry Level (30K-50K KES/month)</SelectItem>
          <SelectItem value="mid">Mid Level (50K-100K KES/month)</SelectItem>
          <SelectItem value="senior">Senior Level (100K-200K KES/month)</SelectItem>
          <SelectItem value="executive">Executive Level (200K+ KES/month)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
