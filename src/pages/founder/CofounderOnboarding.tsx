// src/pages/founder/CofounderOnboarding.tsx
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Briefcase,
  MapPin,
  Target,
  Code,
  Users,
  GraduationCap,
  Award,
  Building,
  Calendar,
  Sparkles,
  Plus,
  X,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { MultiSelect } from "@/components/ui/multi-select";

const CofounderOnboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    // Step 1: Basic Info
    current_role: "",
    years_experience: "",

    // Step 2: Skills
    technical_skills: [] as string[],
    soft_skills: [] as string[],
    newTechnicalSkill: "",
    newSoftSkill: "",

    // Step 3: Seeking
    seeking_roles: [] as string[],
    industries: [] as string[],
    newSeekingRole: "",
    newIndustry: "",

    // Step 4: Details
    commitment_level: "",
    location_preference: "",
    preferred_locations: [] as string[],
    newLocation: "",

    // Step 5: Achievements
    achievements: [] as string[],
    education: [] as string[],
    certifications: [] as string[],
    newAchievement: "",
    newEducation: "",
    newCertification: "",

    // Step 6: Bio & Links
    bio: "",
    linkedin_url: "",
    portfolio_url: "",
  });

  const commitmentOptions = [
    { value: "Full-time", label: "Full-time" },
    { value: "Part-time", label: "Part-time" },
    { value: "Flexible", label: "Flexible" },
    { value: "Contract", label: "Contract" },
  ];

  const locationOptions = [
    { value: "Remote", label: "Remote" },
    { value: "Hybrid", label: "Hybrid" },
    { value: "On-site", label: "On-site" },
  ];

  const industryOptions = [
    "SaaS",
    "AI/ML",
    "FinTech",
    "Healthcare",
    "EdTech",
    "E-commerce",
    "Marketing Tech",
    "Developer Tools",
    "Design Tools",
    "Gaming",
    "Climate Tech",
    "Biotech",
    "Web3",
    "IoT",
    "Robotics",
  ];

  const roleOptions = [
    "CEO",
    "CTO",
    "CPO",
    "CMO",
    "Technical Co-Founder",
    "Business Co-Founder",
    "Product Lead",
    "Engineering Lead",
    "Design Lead",
    "Marketing Lead",
    "Sales Lead",
    "Operations Lead",
    "Data Science Lead",
  ];

  const skillOptions = [
    "React/Next.js",
    "Node.js",
    "Python",
    "TypeScript",
    "AWS",
    "PostgreSQL",
    "Machine Learning",
    "Data Science",
    "DevOps",
    "iOS/Android",
    "UI/UX Design",
    "Product Management",
    "Growth Hacking",
    "Digital Marketing",
    "Sales",
    "Fundraising",
    "Business Development",
    "Operations",
    "Finance",
  ];

  const handleAddItem = (field: string, value: string, arrayField: string) => {
    if (!value.trim()) return;

    setProfileData((prev) => ({
      ...prev,
      [arrayField]: [
        ...(prev[arrayField as keyof typeof prev] as string[]),
        value,
      ],
      [field]: "",
    }));
  };

  const handleRemoveItem = (arrayField: string, index: number) => {
    setProfileData((prev) => ({
      ...prev,
      [arrayField]: (prev[arrayField as keyof typeof prev] as string[]).filter(
        (_, i) => i !== index
      ),
    }));
  };

  const handleNext = () => {
    if (
      step === 1 &&
      (!profileData.current_role || !profileData.years_experience)
    ) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (step === 2 && profileData.technical_skills.length === 0) {
      toast.error("Please add at least one technical skill");
      return;
    }
    if (
      step === 3 &&
      (profileData.seeking_roles.length === 0 ||
        profileData.industries.length === 0)
    ) {
      toast.error("Please specify what you're looking for");
      return;
    }
    if (
      step === 4 &&
      (!profileData.commitment_level || !profileData.location_preference)
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!profileData.bio) {
      toast.error("Please add a bio");
      return;
    }

    setLoading(true);
    try {
      // TODO: Save to your backend
      const finalData = {
        current_role: profileData.current_role,
        years_experience: parseInt(profileData.years_experience),
        technical_skills: profileData.technical_skills,
        soft_skills: profileData.soft_skills,
        seeking_roles: profileData.seeking_roles,
        industries: profileData.industries,
        commitment_level: profileData.commitment_level,
        location_preference: profileData.location_preference,
        preferred_locations: profileData.preferred_locations,
        achievements: profileData.achievements,
        education: profileData.education,
        certifications: profileData.certifications,
        bio: profileData.bio,
        linkedin_url: profileData.linkedin_url,
        portfolio_url: profileData.portfolio_url,
      };

      console.log("Submitting cofounder profile:", finalData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Cofounder profile created!");
      navigate("/founder/dashboard");
    } catch (error) {
      toast.error("Failed to create profile");
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="h-16 w-16 mx-auto bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-4">
                <Briefcase className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold">Tell us about yourself</h2>
              <p className="text-slate-600 mt-2">
                Basic information to get started
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="current_role">Current/Most Recent Role *</Label>
                <Input
                  id="current_role"
                  placeholder="e.g., Senior Software Engineer, Product Manager, CEO"
                  value={profileData.current_role}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      current_role: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label htmlFor="years_experience">Years of Experience *</Label>
                <Select
                  value={profileData.years_experience}
                  onValueChange={(value) =>
                    setProfileData({ ...profileData, years_experience: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select years of experience" />
                  </SelectTrigger>
                  <SelectContent>
                    {["1-3", "3-5", "5-7", "7-10", "10+"].map((years) => (
                      <SelectItem key={years} value={years}>
                        {years} years
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="h-16 w-16 mx-auto bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-4">
                <Code className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold">Your Skills & Expertise</h2>
              <p className="text-slate-600 mt-2">What are you good at?</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label>Technical Skills *</Label>
                <p className="text-sm text-slate-500 mb-2">
                  Add at least 3 skills
                </p>
                <div className="flex gap-2 mb-3">
                  <Input
                    placeholder="e.g., React, Python, AWS"
                    value={profileData.newTechnicalSkill}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        newTechnicalSkill: e.target.value,
                      })
                    }
                    onKeyDown={(e) => {
                      if (
                        e.key === "Enter" &&
                        profileData.newTechnicalSkill.trim()
                      ) {
                        handleAddItem(
                          "newTechnicalSkill",
                          profileData.newTechnicalSkill,
                          "technical_skills"
                        );
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() =>
                      handleAddItem(
                        "newTechnicalSkill",
                        profileData.newTechnicalSkill,
                        "technical_skills"
                      )
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profileData.technical_skills.map((skill, index) => (
                    <Badge key={index} className="px-3 py-1">
                      {skill}
                      <button
                        onClick={() =>
                          handleRemoveItem("technical_skills", index)
                        }
                        className="ml-2 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label>Soft Skills</Label>
                <p className="text-sm text-slate-500 mb-2">
                  Add your non-technical strengths
                </p>
                <div className="flex gap-2 mb-3">
                  <Input
                    placeholder="e.g., Leadership, Communication, Product Strategy"
                    value={profileData.newSoftSkill}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        newSoftSkill: e.target.value,
                      })
                    }
                    onKeyDown={(e) => {
                      if (
                        e.key === "Enter" &&
                        profileData.newSoftSkill.trim()
                      ) {
                        handleAddItem(
                          "newSoftSkill",
                          profileData.newSoftSkill,
                          "soft_skills"
                        );
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() =>
                      handleAddItem(
                        "newSoftSkill",
                        profileData.newSoftSkill,
                        "soft_skills"
                      )
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profileData.soft_skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="px-3 py-1">
                      {skill}
                      <button
                        onClick={() => handleRemoveItem("soft_skills", index)}
                        className="ml-2 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="h-16 w-16 mx-auto bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-4">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold">What are you looking for?</h2>
              <p className="text-slate-600 mt-2">
                Help us find your perfect match
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <Label>Roles you're looking for in a co-founder *</Label>
                <p className="text-sm text-slate-500 mb-2">
                  What skills should they have?
                </p>
                <div className="flex gap-2 mb-3">
                  <Input
                    placeholder="e.g., CEO, CTO, Marketing Expert"
                    value={profileData.newSeekingRole}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        newSeekingRole: e.target.value,
                      })
                    }
                    onKeyDown={(e) => {
                      if (
                        e.key === "Enter" &&
                        profileData.newSeekingRole.trim()
                      ) {
                        handleAddItem(
                          "newSeekingRole",
                          profileData.newSeekingRole,
                          "seeking_roles"
                        );
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() =>
                      handleAddItem(
                        "newSeekingRole",
                        profileData.newSeekingRole,
                        "seeking_roles"
                      )
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profileData.seeking_roles.map((role, index) => (
                    <Badge
                      key={index}
                      className="px-3 py-1 bg-purple-100 text-purple-700"
                    >
                      {role}
                      <button
                        onClick={() => handleRemoveItem("seeking_roles", index)}
                        className="ml-2 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label>Industries you're interested in *</Label>
                <p className="text-sm text-slate-500 mb-2">
                  What sectors excite you?
                </p>
                <div className="flex gap-2 mb-3">
                  <Input
                    placeholder="e.g., SaaS, AI, Healthcare"
                    value={profileData.newIndustry}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        newIndustry: e.target.value,
                      })
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && profileData.newIndustry.trim()) {
                        handleAddItem(
                          "newIndustry",
                          profileData.newIndustry,
                          "industries"
                        );
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() =>
                      handleAddItem(
                        "newIndustry",
                        profileData.newIndustry,
                        "industries"
                      )
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profileData.industries.map((industry, index) => (
                    <Badge key={index} variant="outline" className="px-3 py-1">
                      {industry}
                      <button
                        onClick={() => handleRemoveItem("industries", index)}
                        className="ml-2 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="h-16 w-16 mx-auto bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold">Logistics & Availability</h2>
              <p className="text-slate-600 mt-2">
                How and where do you want to work?
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="commitment_level">Time Commitment *</Label>
                <Select
                  value={profileData.commitment_level}
                  onValueChange={(value) =>
                    setProfileData({ ...profileData, commitment_level: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select commitment level" />
                  </SelectTrigger>
                  <SelectContent>
                    {commitmentOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="location_preference">Work Preference *</Label>
                <Select
                  value={profileData.location_preference}
                  onValueChange={(value) =>
                    setProfileData({
                      ...profileData,
                      location_preference: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select work preference" />
                  </SelectTrigger>
                  <SelectContent>
                    {locationOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Preferred Locations</Label>
                <p className="text-sm text-slate-500 mb-2">
                  Cities or regions you prefer
                </p>
                <div className="flex gap-2 mb-3">
                  <Input
                    placeholder="e.g., San Francisco, Remote, Europe"
                    value={profileData.newLocation}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        newLocation: e.target.value,
                      })
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && profileData.newLocation.trim()) {
                        handleAddItem(
                          "newLocation",
                          profileData.newLocation,
                          "preferred_locations"
                        );
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() =>
                      handleAddItem(
                        "newLocation",
                        profileData.newLocation,
                        "preferred_locations"
                      )
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profileData.preferred_locations.map((location, index) => (
                    <Badge key={index} variant="outline" className="px-3 py-1">
                      {location}
                      <button
                        onClick={() =>
                          handleRemoveItem("preferred_locations", index)
                        }
                        className="ml-2 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="h-16 w-16 mx-auto bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold">Achievements & Background</h2>
              <p className="text-slate-600 mt-2">What makes you stand out?</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label>Key Achievements</Label>
                <p className="text-sm text-slate-500 mb-2">
                  Notable accomplishments or milestones
                </p>
                <div className="flex gap-2 mb-3">
                  <Input
                    placeholder="e.g., Grew startup to $1M ARR, Built product used by 10K+ users"
                    value={profileData.newAchievement}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        newAchievement: e.target.value,
                      })
                    }
                    onKeyDown={(e) => {
                      if (
                        e.key === "Enter" &&
                        profileData.newAchievement.trim()
                      ) {
                        handleAddItem(
                          "newAchievement",
                          profileData.newAchievement,
                          "achievements"
                        );
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() =>
                      handleAddItem(
                        "newAchievement",
                        profileData.newAchievement,
                        "achievements"
                      )
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {profileData.achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-start justify-between p-3 border rounded-lg"
                    >
                      <span>{achievement}</span>
                      <button
                        onClick={() => handleRemoveItem("achievements", index)}
                        className="text-slate-400 hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Education</Label>
                <p className="text-sm text-slate-500 mb-2">
                  Degrees, courses, or certifications
                </p>
                <div className="flex gap-2 mb-3">
                  <Input
                    placeholder="e.g., Stanford CS, MBA, AWS Certified"
                    value={profileData.newEducation}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        newEducation: e.target.value,
                      })
                    }
                    onKeyDown={(e) => {
                      if (
                        e.key === "Enter" &&
                        profileData.newEducation.trim()
                      ) {
                        handleAddItem(
                          "newEducation",
                          profileData.newEducation,
                          "education"
                        );
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() =>
                      handleAddItem(
                        "newEducation",
                        profileData.newEducation,
                        "education"
                      )
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profileData.education.map((edu, index) => (
                    <Badge key={index} className="px-3 py-1">
                      {edu}
                      <button
                        onClick={() => handleRemoveItem("education", index)}
                        className="ml-2 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="h-16 w-16 mx-auto bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold">Final Touches</h2>
              <p className="text-slate-600 mt-2">
                Tell your story and add links
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="bio">Your Bio *</Label>
                <p className="text-sm text-slate-500 mb-2">
                  Introduce yourself to potential co-founders
                </p>
                <Textarea
                  id="bio"
                  placeholder="Tell us about your background, what you're passionate about, and what kind of startup you want to build..."
                  value={profileData.bio}
                  onChange={(e) =>
                    setProfileData({ ...profileData, bio: e.target.value })
                  }
                  rows={6}
                  className="resize-none"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="linkedin_url">LinkedIn Profile URL</Label>
                  <Input
                    id="linkedin_url"
                    type="url"
                    placeholder="https://linkedin.com/in/yourname"
                    value={profileData.linkedin_url}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        linkedin_url: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="portfolio_url">Portfolio/Website URL</Label>
                  <Input
                    id="portfolio_url"
                    type="url"
                    placeholder="https://yourwebsite.com"
                    value={profileData.portfolio_url}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        portfolio_url: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getStepTitle = () => {
    const titles = [
      "Basic Information",
      "Skills & Expertise",
      "Looking For",
      "Availability",
      "Achievements",
      "Final Touches",
    ];
    return titles[step - 1] || "";
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white">
        <div className="max-w-2xl mx-auto p-4 py-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-slate-600">
                Step {step} of 6 • {getStepTitle()}
              </div>
              <div className="text-sm font-medium">
                {Math.round((step / 6) * 100)}%
              </div>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-300"
                style={{ width: `${(step / 6) * 100}%` }}
              />
            </div>
          </div>

          {/* Form Card */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-center text-2xl">
                Create Your Cofounder Profile
              </CardTitle>
              <CardDescription className="text-center">
                Build a profile to find your perfect startup partner
              </CardDescription>
            </CardHeader>

            <CardContent>
              {renderStep()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={step === 1}
                >
                  Back
                </Button>

                {step < 6 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-2"
                  >
                    Continue
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    {loading ? "Creating Profile..." : "Complete Profile"}
                    <Sparkles className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Skip for now option */}
          {step === 1 && (
            <div className="text-center mt-6">
              <Button
                variant="ghost"
                onClick={() => navigate("/founder/dashboard")}
                className="text-slate-500 hover:text-slate-700"
              >
                Skip and browse matches first
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CofounderOnboarding;
