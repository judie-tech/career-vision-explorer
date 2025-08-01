import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Globe, Users, Smile, Building, Image } from "lucide-react";

interface EmployerStepRendererProps {
  currentStep: number;
  data: any;
  updateField: (field: string, value: any) => void;
  handleNext: () => void;
  handleLogoUpload: (file: File) => void;
}

export const EmployerStepRenderer = ({
  currentStep,
  data,
  updateField,
  handleNext,
  handleLogoUpload,
}: EmployerStepRendererProps) => {
  const steps = [
    // Step 1: Company Information
    {
      icon: <Building className="w-8 h-8 text-blue-500" />,
      title: "Company Information",
      content: (
        <div className="space-y-4">
          <Label>Company Name</Label>
          <Input
            placeholder="e.g., Tech Innovators Inc."
            value={data.companyName || ""}
            onChange={(e) => updateField("companyName", e.target.value)}
          />
          <Label>Website</Label>
          <Input
            type="url"
            placeholder="https://yourcompany.com"
            value={data.website || ""}
            onChange={(e) => updateField("website", e.target.value)}
          />
          <Label>Industry</Label>
          <Input
            placeholder="e.g., Software Development"
            value={data.industry || ""}
            onChange={(e) => updateField("industry", e.target.value)}
          />
          <Label>Company Size</Label>
          <Input
            placeholder="e.g., 50-100"
            value={data.companySize || ""}
            onChange={(e) => updateField("companySize", e.target.value)}
          />
        </div>
      )
    },
    // Step 2: Hiring Needs
    {
      icon: <Users className="w-8 h-8 text-green-500" />,
      title: "Hiring Needs",
      content: (
        <div className="space-y-4">
          <Label>Positions to Fill</Label>
          <Textarea
            placeholder="e.g., Backend Developer, UX Designer"
            value={data.positions || ""}
            onChange={(e) => updateField("positions", e.target.value)}
            rows={3}
          />
          <Label>Team Size</Label>
          <Input
            placeholder="e.g., 5-10"
            value={data.teamSize || ""}
            onChange={(e) => updateField("teamSize", e.target.value)}
          />
          <Label>Hiring Timeline</Label>
          <Input
            placeholder="e.g., Q3 2023"
            value={data.hiringTimeline || ""}
            onChange={(e) => updateField("hiringTimeline", e.target.value)}
          />
        </div>
      )
    },
    // Step 3: Company Culture and Values
    {
      icon: <Smile className="w-8 h-8 text-yellow-500" />,
      title: "Company Culture and Values",
      content: (
        <div className="space-y-4">
          <Label>Describe Your Culture and Values</Label>
          <Textarea
            placeholder="e.g., Innovation-driven, open communication..."
            value={data.culture || ""}
            onChange={(e) => updateField("culture", e.target.value)}
            rows={4}
          />
        </div>
      )
    },
    // Step 4: Work Arrangements
    {
      icon: <Globe className="w-8 h-8 text-purple-500" />,
      title: "Work Arrangements",
      content: (
        <div className="space-y-4">
          <Label>Work Arrangements</Label>
          <RadioGroup value={data.workArrangement || "remote"} onValueChange={(value) => updateField("workArrangement", value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="remote" id="arrangement1" />
              <Label htmlFor="arrangement1">Remote</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="hybrid" id="arrangement2" />
              <Label htmlFor="arrangement2">Hybrid</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="onsite" id="arrangement3" />
              <Label htmlFor="arrangement3">On-site</Label>
            </div>
          </RadioGroup>
        </div>
      )
    },
    // Step 5: Benefits and Perks Offered
    {
      icon: <Smile className="w-8 h-8 text-pink-500" />,
      title: "Benefits and Perks",
      content: (
        <div className="space-y-4">
          <Label>Benefits and Perks</Label>
          <Textarea
            placeholder="e.g., Health insurance, flexible hours, gym membership..."
            value={data.benefits || ""}
            onChange={(e) => updateField("benefits", e.target.value)}
            rows={4}
          />
        </div>
      )
    },
    // Step 6: Company Logo Upload
    {
      icon: <Image className="w-8 h-8 text-indigo-500" />,
      title: "Upload Your Company Logo",
      content: (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            A company logo helps give your job postings a professional appearance.
          </p>

          {!data.companyLogo && (
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <label>
                  Upload Logo
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleLogoUpload(file);
                    }}
                  />
                </label>
              </Button>
            </div>
          )}

          {data.companyLogo && (
            <div className="text-center py-4">
              <img src={data.companyLogo} alt="Company Logo" className="h-20 mx-auto" />
              <Button variant="link" onClick={() => updateField("companyLogo", null)}>
                Upload a different logo
              </Button>
            </div>
          )}
        </div>
      )
    }
  ];

  const currentStepData = steps[currentStep];

  // Safety check to prevent out of bounds access
  if (!currentStepData) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center mb-4">
        {currentStepData.icon}
      </div>
      <h3 className="text-lg font-semibold text-center">{currentStepData.title}</h3>
      {currentStepData.content}
    </div>
  );
};

