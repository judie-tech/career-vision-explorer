
import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface NotesSectionProps {
  notes: string;
  onNotesChange: (notes: string) => void;
}

export const NotesSection = ({
  notes,
  onNotesChange,
}: NotesSectionProps) => {
  return (
    <div className="space-y-4">
      <Label htmlFor="notes" className="text-base font-medium text-gray-700">
        Additional Notes
      </Label>
      <Textarea
        id="notes"
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        placeholder="Any additional information or instructions for the interview..."
        className="min-h-[100px]"
      />
    </div>
  );
};
