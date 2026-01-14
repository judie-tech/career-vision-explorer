// src/pages/cofounder/founderDashboard.tsx
import React, { useState, useEffect, useCallback } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  MessageCircle,
  Bell,
  Sparkles,
  X,
  MapPin,
  Briefcase,
  GraduationCap,
  Clock,
  Star,
  Zap,
  Building,
  Users,
  Eye,
  Award,
  Edit3,
  Settings,
} from "lucide-react";
import { NotificationsFeed } from "@/components/founder-matching/NotificationsFeed";
import { ConnectionsList } from "@/components/founder-matching/ConnectionsList";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// Mock potential cofounder matches
const mockPotentialCofounders = [
  {
    id: "match-1",
    overall_score: 0.94,
    matched_profile: {
      profile_id: "profile-2",
      name: "Sarah Johnson",
      current_role: "Growth & Marketing Lead",
      years_experience: 6,
      technical_skills: ["Analytics", "SEO", "Automation", "Digital Marketing"],
      soft_skills: [
        "Marketing Strategy",
        "Growth Hacking",
        "Brand Building",
        "Leadership",
      ],
      seeking_roles: ["CTO", "Technical Co-Founder", "AI Engineer"],
      industries: ["Marketing Tech", "SaaS", "AI"],
      commitment_level: "Full-time",
      location_preference: "Hybrid",
      preferred_locations: ["New York", "Remote"],
      achievements: [
        "Grew startup to $5M ARR",
        "Built marketing team from 1 to 20",
      ],
      education: ["Harvard Business School"],
      certifications: ["Google Analytics Expert"],
      bio: "Seeking a technical co-founder to build an AI-powered marketing automation tool. I handle customers, marketing, and growth while you build the product.",
      profile_image_url: "",
      location: "New York, NY",
      experience_years: 6,
      active_role: "marketing_lead",
    },
  },
  {
    id: "match-2",
    overall_score: 0.88,
    matched_profile: {
      profile_id: "profile-3",
      name: "Marcus Rivera",
      current_role: "Product Design Lead",
      years_experience: 10,
      technical_skills: [
        "Figma",
        "Sketch",
        "Prototyping",
        "Design Systems",
        "UI/UX",
      ],
      soft_skills: ["User Research", "Design Thinking", "Product Strategy"],
      seeking_roles: ["CEO", "Business Co-Founder", "Product Manager"],
      industries: ["Design Tools", "SaaS", "Developer Tools"],
      commitment_level: "Part-time",
      location_preference: "Remote",
      preferred_locations: ["Austin", "Remote"],
      achievements: [
        "Ex-Apple designer",
        "Built design system for 100K+ users",
      ],
      education: ["Rhode Island School of Design"],
      certifications: [],
      bio: "I'm passionate about creating clean interfaces that solve real user problems. Looking for a business co-founder to build the next great design tool.",
      profile_image_url: "",
      location: "Austin, TX",
      experience_years: 10,
      active_role: "product_designer",
    },
  },
];

const FounderDashboard = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("discover");
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [potentialCofounders] = useState(mockPotentialCofounders);
  const [pendingCount] = useState(3);

  const currentMatch = potentialCofounders[currentProfileIndex];
  const matchedProfile = currentMatch?.matched_profile;

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeTab !== "discover" || !currentMatch) return;

      if (e.key === "ArrowLeft") handleSwipeLeft();
      if (e.key === "ArrowRight") handleSwipeRight();
      if (e.key === " ") handleSuperLike();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentProfileIndex, activeTab, currentMatch]);

  const handleSwipeLeft = useCallback(() => {
    toast.info("Passed", {
      description: `You passed on ${matchedProfile?.name}`,
    });

    if (currentProfileIndex < potentialCofounders.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
    } else {
      setCurrentProfileIndex(0);
      toast("✨ Back to first profile!");
    }
  }, [currentProfileIndex, matchedProfile, potentialCofounders.length]);

  const handleSwipeRight = useCallback(() => {
    toast.success("Interest sent!", {
      description: `${matchedProfile?.name} will be notified of your interest`,
    });

    if (currentProfileIndex < potentialCofounders.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
    } else {
      setCurrentProfileIndex(0);
      toast("✨ Back to first profile!");
    }
  }, [currentProfileIndex, matchedProfile, potentialCofounders.length]);

  const handleSuperLike = useCallback(() => {
    toast.success("Super Like!", {
      description: `${matchedProfile?.name} will get a special notification`,
    });

    if (currentProfileIndex < potentialCofounders.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
    } else {
      setCurrentProfileIndex(0);
      toast("✨ Back to first profile!");
    }
  }, [currentProfileIndex, matchedProfile, potentialCofounders.length]);

  const handleViewProfile = () => {
    toast.info("Viewing profile", {
      description: "Full profile view would open here",
    });
  };

  const handleEditProfile = () => {
    navigate("/profile");
  };

  const renderMainProfileView = () => {
    if (!currentMatch || !matchedProfile) {
      return (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-4">
            <Users className="h-12 w-12 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">
            No potential co-founders found
          </h3>
          <p className="text-slate-600 mb-6">
            Update your profile to get better matches
          </p>
          <Button onClick={handleEditProfile}>Update Your Profile</Button>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Main Profile Card */}
        <Card className="overflow-hidden border border-slate-200 shadow-lg">
          <div className="relative h-80 bg-gradient-to-br from-blue-50 to-indigo-50">
            {/* Profile photo or placeholder */}
            {matchedProfile.profile_image_url ? (
              <img
                src={matchedProfile.profile_image_url}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="h-40 w-40 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-20 w-20 text-blue-400" />
                  </div>
                  <p className="text-blue-600 font-medium text-lg">
                    Profile photo not available
                  </p>
                </div>
              </div>
            )}

            {/* Match Score Badge */}
            <Badge className="absolute top-4 right-4 px-4 py-2 font-semibold shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-base">
              {Math.round(currentMatch.overall_score * 100)}% Match
            </Badge>
          </div>

          <CardContent className="p-6">
            {/* Name and Role */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-slate-900">
                {matchedProfile.name},{" "}
                <span className="text-slate-600">
                  {matchedProfile.experience_years ||
                    matchedProfile.years_experience}{" "}
                  years
                </span>
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <Briefcase className="h-6 w-6 text-blue-500" />
                <span className="text-xl font-medium text-slate-700">
                  {matchedProfile.current_role}
                </span>
              </div>
            </div>

            {/* Key Achievement */}
            {matchedProfile.achievements &&
              matchedProfile.achievements.length > 0 && (
                <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                  <div className="flex items-start gap-3">
                    <Zap className="h-6 w-6 text-blue-500 flex-shrink-0 mt-0.5" />
                    <p className="text-lg text-blue-800 font-medium leading-relaxed">
                      {matchedProfile.achievements[0]}
                    </p>
                  </div>
                </div>
              )}

            {/* Key Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Location</p>
                    <p className="font-medium text-slate-900">
                      {matchedProfile.location ||
                        matchedProfile.location_preference}
                    </p>
                    {matchedProfile.preferred_locations && (
                      <p className="text-xs text-slate-500 mt-1">
                        Prefers: {matchedProfile.preferred_locations.join(", ")}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                  <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                    <Building className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Industry</p>
                    <p className="font-medium text-slate-900">
                      {matchedProfile.industries?.slice(0, 2).join(", ") ||
                        "Not specified"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Award className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Commitment</p>
                    <p className="font-medium text-slate-900">
                      {matchedProfile.commitment_level || "Flexible"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                  <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Experience</p>
                    <p className="font-medium text-slate-900">
                      {matchedProfile.experience_years ||
                        matchedProfile.years_experience}{" "}
                      years
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            {matchedProfile.bio && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  About
                </h3>
                <p className="text-slate-700 leading-relaxed text-lg">
                  {matchedProfile.bio}
                </p>
              </div>
            )}

            {/* Skills */}
            {matchedProfile.technical_skills &&
              matchedProfile.technical_skills.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {matchedProfile.technical_skills
                      .slice(0, 6)
                      .map((skill: string, index: number) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="px-4 py-2 text-base border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                        >
                          {skill}
                        </Badge>
                      ))}
                  </div>
                </div>
              )}

            {/* Soft Skills */}
            {matchedProfile.soft_skills &&
              matchedProfile.soft_skills.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    Expertise
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {matchedProfile.soft_skills
                      .slice(0, 4)
                      .map((skill: string, index: number) => (
                        <Badge
                          key={index}
                          className="px-4 py-2 text-base bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100"
                        >
                          {skill}
                        </Badge>
                      ))}
                  </div>
                </div>
              )}

            {/* Seeking */}
            {matchedProfile.seeking_roles &&
              matchedProfile.seeking_roles.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    Looking for a co-founder who is
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {matchedProfile.seeking_roles.map(
                      (role: string, index: number) => (
                        <Badge
                          key={index}
                          className="px-4 py-2 text-base bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100"
                        >
                          {role}
                        </Badge>
                      )
                    )}
                  </div>
                </div>
              )}

            {/* Education */}
            {matchedProfile.education &&
              matchedProfile.education.length > 0 && (
                <div className="flex items-center gap-2 pt-6 border-t">
                  <GraduationCap className="h-5 w-5 text-slate-400" />
                  <span className="text-slate-700">
                    {matchedProfile.education[0]}
                  </span>
                </div>
              )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center items-center gap-8">
          <Button
            size="lg"
            variant="outline"
            className="h-16 w-16 rounded-full border-2 border-slate-300 hover:bg-slate-50 shadow-lg"
            onClick={handleSwipeLeft}
          >
            <X className="h-8 w-8 text-slate-500" />
          </Button>

          <Button
            size="lg"
            className="h-16 w-16 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            onClick={handleSuperLike}
          >
            <Star className="h-8 w-8" />
          </Button>

          <Button
            size="lg"
            className="h-16 w-16 rounded-full shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            onClick={handleSwipeRight}
          >
            <Heart className="h-8 w-8" />
          </Button>
        </div>

        {/* Quick Tips */}
        <div className="text-center pt-4 space-y-2">
          <p className="text-sm text-slate-500">
            <span className="font-medium text-blue-600">← Pass</span> •{" "}
            <span className="font-medium text-indigo-600">⭐ Super Like</span> •{" "}
            <span className="font-medium text-purple-600">❤️ Connect</span>
          </p>
          <p className="text-xs text-slate-400">
            Press arrow keys for quick navigation • Space for Super Like
          </p>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto p-4 md:p-6">
          {/* Header with Edit Button in Settings Menu */}
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                CoFounder Match
              </h1>
              <p className="text-sm md:text-lg text-slate-600">
                Find your perfect co-founder
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Edit Profile Button - Clean Settings Style */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEditProfile}
                className="flex items-center gap-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50"
              >
                <Settings className="h-5 w-5" />
                <span className="hidden md:inline">Edit Profile</span>
              </Button>

              {/* Notification Bell */}
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setActiveTab("notifications")}
              >
                <Bell className="h-5 w-5 md:h-6 md:w-6 text-slate-700" />
                {pendingCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 md:h-5 md:w-5 rounded-full bg-blue-600 text-white text-[10px] md:text-xs flex items-center justify-center">
                    {pendingCount}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            {/* Desktop/Mobile Navigation */}
            <div className="md:mb-6">
              <TabsList className="w-full md:w-auto grid grid-cols-3 md:grid-cols-3 md:inline-flex">
                <TabsTrigger
                  value="discover"
                  className="flex flex-col md:flex-row items-center gap-1 md:gap-2 py-3 md:py-2 data-[state=active]:text-blue-600"
                >
                  <Sparkles className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="text-xs md:text-sm">Discover</span>
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="flex flex-col md:flex-row items-center gap-1 md:gap-2 py-3 md:py-2 relative data-[state=active]:text-blue-600"
                >
                  <Bell className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="text-xs md:text-sm">Matches</span>
                  {pendingCount > 0 && (
                    <span className="absolute top-2 md:top-1 right-8 md:right-1 h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="connections"
                  className="flex flex-col md:flex-row items-center gap-1 md:gap-2 py-3 md:py-2 data-[state=active]:text-blue-600"
                >
                  <MessageCircle className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="text-xs md:text-sm">Messages</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Tab Content */}
            <div className="pb-20 md:pb-0">
              <TabsContent value="discover" className="mt-0">
                {renderMainProfileView()}
              </TabsContent>

              <TabsContent value="notifications" className="mt-0">
                <NotificationsFeed />
              </TabsContent>

              <TabsContent value="connections" className="mt-0">
                <ConnectionsList />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default FounderDashboard;
