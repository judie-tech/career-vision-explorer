// src/components/cofounder-matching/ProfileCreationWizard.tsx
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
import { Slider } from "@/components/ui/slider";
import {
  X,
  Plus,
  Briefcase,
  GraduationCap,
  Award,
  Globe,
  Link,
  User,
} from "lucide-react";
import { toast } from "sonner";
import {
  cofounderMatchingService,
  CofounderProfile,
} from "@/services/founder-matching.service";

const profileSchema = z.object({
  current_role: z.string().min(2, "Current role is required"),
  years_experience: z.number().min(0).max(50),
  technical_skills: z
    .array(z.string())
    .min(1, "Add at least 1 technical skill"),
  soft_skills: z.array(z.string()).min(1, "Add at least 1 soft skill"),
  seeking_roles: z
    .array(z.string())
    .min(1, "Add at least 1 role you're seeking"),
  industries: z.array(z.string()).min(1, "Add at least 1 industry"),
  commitment_level: z.enum(["Full-time", "Part-time", "Flexible", "Contract"]),
  location_preference: z.enum(["Remote", "Hybrid", "On-site"]),
  preferred_locations: z.array(z.string()),
  achievements: z.array(z.string()),
  education: z.array(z.string()),
  certifications: z.array(z.string()),
  linkedin_url: z.string().url().optional().or(z.literal("")),
  portfolio_url: z.string().url().optional().or(z.literal("")),
  bio: z.string().min(100, "Bio should be at least 100 characters").max(1000),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const steps = [
  { id: 1, title: "Basic Info", description: "Your role and experience" },
  { id: 2, title: "Skills & Roles", description: "What you offer and seek" },
  { id: 3, title: "Preferences", description: "Location and commitment" },
  { id: 4, title: "Background", description: "Education and achievements" },
  { id: 5, title: "Summary", description: "Your bio and links" },
];

interface ProfileCreationWizardProps {
  onComplete?: (profile: CofounderProfile) => void;
  initialData?: Partial<CofounderProfile>;
}

export const ProfileCreationWizard: React.FC<ProfileCreationWizardProps> = ({
  onComplete,
  initialData,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [skillInput, setSkillInput] = useState("");
  const [softSkillInput, setSoftSkillInput] = useState("");
  const [roleInput, setRoleInput] = useState("");
  const [industryInput, setIndustryInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [achievementInput, setAchievementInput] = useState("");
  const [educationInput, setEducationInput] = useState("");
  const [certificationInput, setCertificationInput] = useState("");

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      current_role: initialData?.current_role || "",
      years_experience: initialData?.years_experience || 3,
      technical_skills: initialData?.technical_skills || [],
      soft_skills: initialData?.soft_skills || [],
      seeking_roles: initialData?.seeking_roles || [],
      industries: initialData?.industries || [],
      commitment_level: initialData?.commitment_level || "Full-time",
      location_preference: initialData?.location_preference || "Hybrid",
      preferred_locations: initialData?.preferred_locations || [],
      achievements: initialData?.achievements || [],
      education: initialData?.education || [],
      certifications: initialData?.certifications || [],
      linkedin_url: initialData?.linkedin_url || "",
      portfolio_url: initialData?.portfolio_url || "",
      bio: initialData?.bio || "",
    },
  });

  const technicalSkills = form.watch("technical_skills") || [];
  const softSkills = form.watch("soft_skills") || [];
  const seekingRoles = form.watch("seeking_roles") || [];
  const industries = form.watch("industries") || [];
  const preferredLocations = form.watch("preferred_locations") || [];
  const achievements = form.watch("achievements") || [];
  const education = form.watch("education") || [];
  const certifications = form.watch("certifications") || [];

  const handleAddItem = (
    field: keyof ProfileFormData,
    value: string,
    setInput: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (value.trim()) {
      const current = form.getValues()[field] as string[];
      if (!current.includes(value.trim())) {
        form.setValue(field, [...current, value.trim()]);
        setInput("");
      }
    }
  };

  const handleRemoveItem = (field: keyof ProfileFormData, item: string) => {
    const current = form.getValues()[field] as string[];
    form.setValue(
      field,
      current.filter((i) => i !== item)
    );
  };

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const profileData: Omit<CofounderProfile, "profile_id" | "user_id"> = {
        current_role: data.current_role,
        years_experience: data.years_experience,
        technical_skills: data.technical_skills,
        soft_skills: data.soft_skills,
        seeking_roles: data.seeking_roles,
        industries: data.industries,
        commitment_level: data.commitment_level,
        location_preference: data.location_preference,
        preferred_locations: data.preferred_locations,
        achievements: data.achievements,
        education: data.education,
        certifications: data.certifications,
        linkedin_url: data.linkedin_url,
        portfolio_url: data.portfolio_url,
        bio: data.bio,
      };

      const createdProfile = await cofounderMatchingService.createProfile(
        profileData
      );
      toast.success("Profile created successfully!");
      onComplete?.(createdProfile);
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
              name="current_role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    Current Role
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g., Senior Software Engineer"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="years_experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Years of Experience</FormLabel>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {field.value} years
                      </span>
                    </div>
                    <Slider
                      value={[field.value]}
                      onValueChange={([value]) => field.onChange(value)}
                      min={0}
                      max={30}
                      step={1}
                    />
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
              <FormLabel>Technical Skills</FormLabel>
              <FormDescription>
                Add your technical skills (Python, React, AWS, etc.)
              </FormDescription>
              <div className="flex gap-2 mt-2">
                <Input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder="Add a skill..."
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(),
                    handleAddItem(
                      "technical_skills",
                      skillInput,
                      setSkillInput
                    ))
                  }
                />
                <Button
                  type="button"
                  onClick={() =>
                    handleAddItem("technical_skills", skillInput, setSkillInput)
                  }
                  size="sm"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {technicalSkills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="gap-1">
                    {skill}
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveItem("technical_skills", skill)
                      }
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <FormLabel>Soft Skills</FormLabel>
              <FormDescription>
                Add your soft skills (Leadership, Communication, etc.)
              </FormDescription>
              <div className="flex gap-2 mt-2">
                <Input
                  value={softSkillInput}
                  onChange={(e) => setSoftSkillInput(e.target.value)}
                  placeholder="Add a soft skill..."
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(),
                    handleAddItem(
                      "soft_skills",
                      softSkillInput,
                      setSoftSkillInput
                    ))
                  }
                />
                <Button
                  type="button"
                  onClick={() =>
                    handleAddItem(
                      "soft_skills",
                      softSkillInput,
                      setSoftSkillInput
                    )
                  }
                  size="sm"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {softSkills.map((skill) => (
                  <Badge key={skill} variant="outline" className="gap-1">
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveItem("soft_skills", skill)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <FormLabel>Roles You're Seeking</FormLabel>
              <FormDescription>
                What co-founder roles are you looking for?
              </FormDescription>
              <div className="flex gap-2 mt-2">
                <Input
                  value={roleInput}
                  onChange={(e) => setRoleInput(e.target.value)}
                  placeholder="e.g., CTO, Product Lead, Marketing Co-founder"
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(),
                    handleAddItem("seeking_roles", roleInput, setRoleInput))
                  }
                />
                <Button
                  type="button"
                  onClick={() =>
                    handleAddItem("seeking_roles", roleInput, setRoleInput)
                  }
                  size="sm"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {seekingRoles.map((role) => (
                  <Badge key={role} className="gap-1">
                    {role}
                    <button
                      type="button"
                      onClick={() => handleRemoveItem("seeking_roles", role)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="commitment_level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Commitment Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select commitment level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Flexible">Flexible</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location_preference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location Preference</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location preference" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Remote">Remote</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                      <SelectItem value="On-site">On-site</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Preferred Locations</FormLabel>
              <FormDescription>
                Add locations where you'd like to work or find co-founders
              </FormDescription>
              <div className="flex gap-2 mt-2">
                <Input
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  placeholder="e.g., Nairobi, Remote, Silicon Valley"
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(),
                    handleAddItem(
                      "preferred_locations",
                      locationInput,
                      setLocationInput
                    ))
                  }
                />
                <Button
                  type="button"
                  onClick={() =>
                    handleAddItem(
                      "preferred_locations",
                      locationInput,
                      setLocationInput
                    )
                  }
                  size="sm"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {preferredLocations.map((location) => (
                  <Badge key={location} variant="secondary" className="gap-1">
                    <Globe className="h-3 w-3" />
                    {location}
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveItem("preferred_locations", location)
                      }
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <FormLabel>Target Industries</FormLabel>
              <FormDescription>
                What industries are you interested in?
              </FormDescription>
              <div className="flex gap-2 mt-2">
                <Input
                  value={industryInput}
                  onChange={(e) => setIndustryInput(e.target.value)}
                  placeholder="e.g., FinTech, AgriTech, HealthTech"
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(),
                    handleAddItem(
                      "industries",
                      industryInput,
                      setIndustryInput
                    ))
                  }
                />
                <Button
                  type="button"
                  onClick={() =>
                    handleAddItem("industries", industryInput, setIndustryInput)
                  }
                  size="sm"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {industries.map((industry) => (
                  <Badge key={industry} variant="outline" className="gap-1">
                    {industry}
                    <button
                      type="button"
                      onClick={() => handleRemoveItem("industries", industry)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <FormLabel className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Education
              </FormLabel>
              <FormDescription>Add your educational background</FormDescription>
              <div className="flex gap-2 mt-2">
                <Input
                  value={educationInput}
                  onChange={(e) => setEducationInput(e.target.value)}
                  placeholder="e.g., BSc Computer Science - University of Nairobi"
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(),
                    handleAddItem(
                      "education",
                      educationInput,
                      setEducationInput
                    ))
                  }
                />
                <Button
                  type="button"
                  onClick={() =>
                    handleAddItem(
                      "education",
                      educationInput,
                      setEducationInput
                    )
                  }
                  size="sm"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {education.map((edu) => (
                  <Badge key={edu} variant="secondary" className="gap-1">
                    {edu}
                    <button
                      type="button"
                      onClick={() => handleRemoveItem("education", edu)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <FormLabel className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                Certifications
              </FormLabel>
              <FormDescription>Add relevant certifications</FormDescription>
              <div className="flex gap-2 mt-2">
                <Input
                  value={certificationInput}
                  onChange={(e) => setCertificationInput(e.target.value)}
                  placeholder="e.g., AWS Certified Solutions Architect"
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(),
                    handleAddItem(
                      "certifications",
                      certificationInput,
                      setCertificationInput
                    ))
                  }
                />
                <Button
                  type="button"
                  onClick={() =>
                    handleAddItem(
                      "certifications",
                      certificationInput,
                      setCertificationInput
                    )
                  }
                  size="sm"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {certifications.map((cert) => (
                  <Badge key={cert} variant="outline" className="gap-1">
                    {cert}
                    <button
                      type="button"
                      onClick={() => handleRemoveItem("certifications", cert)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <FormLabel>Key Achievements</FormLabel>
              <FormDescription>
                Add your notable achievements and accomplishments
              </FormDescription>
              <div className="flex gap-2 mt-2">
                <Input
                  value={achievementInput}
                  onChange={(e) => setAchievementInput(e.target.value)}
                  placeholder="e.g., Led team that scaled product to 100k users"
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(),
                    handleAddItem(
                      "achievements",
                      achievementInput,
                      setAchievementInput
                    ))
                  }
                />
                <Button
                  type="button"
                  onClick={() =>
                    handleAddItem(
                      "achievements",
                      achievementInput,
                      setAchievementInput
                    )
                  }
                  size="sm"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-col gap-2 mt-3">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 p-2 border rounded-lg"
                  >
                    <Award className="h-4 w-4 mt-1 text-muted-foreground" />
                    <span className="flex-1 text-sm">{achievement}</span>
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveItem("achievements", achievement)
                      }
                      className="hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Professional Bio</FormLabel>
                  <FormDescription>
                    Tell potential co-founders about yourself, your experience,
                    and what you're looking for (100-1000 characters)
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="I'm a passionate developer with 6+ years of experience in FinTech. I've built scalable payment systems and led engineering teams. Looking for a technical or business co-founder to build the next unicorn in Africa..."
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

            <FormField
              control={form.control}
              name="linkedin_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Link className="h-4 w-4" />
                    LinkedIn Profile
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="portfolio_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Portfolio/Website
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="https://yourwebsite.com" />
                  </FormControl>
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
        <CardTitle>Create Your Co-Founder Profile</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">
              Step {currentStep} of {steps.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round((currentStep / steps.length) * 100)}% Complete
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
        </div>

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
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 border-2 ${
                  currentStep >= step.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-muted"
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
            </div>
          ))}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {renderStepContent()}

            <div className="flex justify-between pt-4 border-t">
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
                  onClick={() => {
                    // Validate current step before proceeding
                    const fieldsToValidate: Record<
                      number,
                      (keyof ProfileFormData)[]
                    > = {
                      1: ["current_role", "years_experience"],
                      2: ["technical_skills", "soft_skills", "seeking_roles"],
                      3: [
                        "commitment_level",
                        "location_preference",
                        "preferred_locations",
                        "industries",
                      ],
                      4: ["education"],
                      5: ["bio"],
                    };

                    const currentFields = fieldsToValidate[currentStep];
                    if (currentFields) {
                      const isValid = currentFields.every((field) => {
                        const value = form.getValues()[field];
                        if (Array.isArray(value)) {
                          return value.length > 0;
                        }
                        return value && value.toString().trim().length > 0;
                      });

                      if (isValid) {
                        setCurrentStep((prev) =>
                          Math.min(steps.length, prev + 1)
                        );
                      } else {
                        toast.error(
                          "Please complete all required fields before proceeding"
                        );
                      }
                    } else {
                      setCurrentStep((prev) =>
                        Math.min(steps.length, prev + 1)
                      );
                    }
                  }}
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
