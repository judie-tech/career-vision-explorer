import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { toast } from "sonner";
import { founderMatchingService } from "@/services/founder-matching.service";

const profileSchema = z.object({
  business_vision: z
    .string()
    .min(100, "Vision must be at least 100 characters")
    .max(2000),
  problem_statement: z
    .string()
    .min(50, "Problem statement must be at least 50 characters")
    .max(1000),
  required_skills: z.array(z.string()).max(20, "Maximum 20 skills allowed"),
  location: z.string().optional(),
  time_commitment: z.enum(["Part-time", "Full-time", "Flexible"]).optional(),
  funding_status: z
    .enum(["Bootstrapped", "Seed", "Series A", "Series B+", "Seeking"])
    .optional(),
  industry: z.string().optional(),
  stage: z.enum(["Idea", "Prototype", "MVP", "Revenue", "Scaling"]).optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const steps = [
  {
    id: 1,
    title: "Vision & Problem",
    description: "Describe your business idea",
  },
  {
    id: 2,
    title: "Skills & Requirements",
    description: "What skills do you need?",
  },
  { id: 3, title: "Preferences", description: "Set your preferences" },
];

interface ProfileCreationWizardProps {
  onComplete?: () => void;
  initialData?: Partial<ProfileFormData>;
}

export const ProfileCreationWizard: React.FC<ProfileCreationWizardProps> = ({
  onComplete,
  initialData,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [skillInput, setSkillInput] = useState("");

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      business_vision: initialData?.business_vision || "",
      problem_statement: initialData?.problem_statement || "",
      required_skills: initialData?.required_skills || [],
      location: initialData?.location || "",
      time_commitment: initialData?.time_commitment || "Full-time",
      funding_status: initialData?.funding_status || "Seeking",
      industry: initialData?.industry || "",
      stage: initialData?.stage || "Idea",
    },
  });

  const requiredSkills = form.watch("required_skills") || [];

  const handleAddSkill = () => {
    if (skillInput.trim() && !requiredSkills.includes(skillInput.trim())) {
      form.setValue("required_skills", [...requiredSkills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    form.setValue(
      "required_skills",
      requiredSkills.filter((s) => s !== skill)
    );
  };

  const onSubmit = async (data: ProfileFormData) => {
    try {
      // Ensure required fields are present
      const profileData = {
        business_vision: data.business_vision,
        problem_statement: data.problem_statement,
        required_skills: data.required_skills,
        location: data.location || undefined,
        time_commitment: data.time_commitment || undefined,
        funding_status: data.funding_status || undefined,
        industry: data.industry || undefined,
        stage: data.stage || undefined,
      };

      await founderMatchingService.createProfile(profileData);
      toast.success("Profile created successfully!");
      onComplete?.();
    } catch (error) {
      toast.error("Failed to create profile");
      console.error(error);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="business_vision"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Vision</FormLabel>
                  <FormDescription>
                    Describe your long-term vision (100-2000 characters)
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="What problem are you solving and what's your vision for the future?"
                      className="min-h-[200px]"
                    />
                  </FormControl>
                  <div className="text-xs text-muted-foreground">
                    {field.value?.length || 0}/2000 characters
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="problem_statement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Problem Statement</FormLabel>
                  <FormDescription>
                    Clearly define the problem you're solving (50-1000
                    characters)
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="What specific problem are you addressing?"
                      className="min-h-[150px]"
                    />
                  </FormControl>
                  <div className="text-xs text-muted-foreground">
                    {field.value?.length || 0}/1000 characters
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <FormLabel>Required Skills</FormLabel>
              <FormDescription>
                Add up to 20 skills you're looking for in a co-founder
              </FormDescription>
              <div className="flex gap-2 mt-2">
                <Input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder="Add a skill..."
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), handleAddSkill())
                  }
                />
                <Button type="button" onClick={handleAddSkill} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {requiredSkills.map((skill) => (
                <Badge key={skill} variant="secondary" className="gap-1">
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="text-xs text-muted-foreground">
              {requiredSkills.length}/20 skills added
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location Preference</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="City, Country" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time_commitment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time Commitment</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time commitment" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="funding_status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Funding Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select funding status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Bootstrapped">Bootstrapped</SelectItem>
                      <SelectItem value="Seed">Seed Stage</SelectItem>
                      <SelectItem value="Series A">Series A</SelectItem>
                      <SelectItem value="Series B+">Series B+</SelectItem>
                      <SelectItem value="Seeking">Seeking Funding</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Stage</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select stage" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Idea">Idea Phase</SelectItem>
                      <SelectItem value="Prototype">Prototype</SelectItem>
                      <SelectItem value="MVP">MVP</SelectItem>
                      <SelectItem value="Revenue">
                        Generating Revenue
                      </SelectItem>
                      <SelectItem value="Scaling">Scaling</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Create Founder Profile</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Step Indicator */}
        <div className="flex justify-between mb-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex flex-col items-center flex-1 ${
                step.id < steps.length ? "pr-4" : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  currentStep >= step.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step.id}
              </div>
              <div className="text-center">
                <div className="text-sm font-medium">{step.title}</div>
                <div className="text-xs text-muted-foreground">
                  {step.description}
                </div>
              </div>
              {step.id < steps.length && (
                <div
                  className={`absolute left-1/2 top-4 w-full h-0.5 -z-10 ${
                    currentStep > step.id ? "bg-primary" : "bg-muted"
                  }`}
                  style={{ left: `${(step.id / steps.length) * 100}%` }}
                />
              )}
            </div>
          ))}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {renderStepContent()}

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                disabled={currentStep === 1}
              >
                Previous
              </Button>

              {currentStep < steps.length ? (
                <Button
                  type="button"
                  onClick={() =>
                    setCurrentStep((prev) => Math.min(steps.length, prev + 1))
                  }
                >
                  Next
                </Button>
              ) : (
                <Button type="submit">Complete Profile</Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
