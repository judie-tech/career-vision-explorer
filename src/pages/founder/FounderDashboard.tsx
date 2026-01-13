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
  Filter,
  Search,
  Award,
  Target,
  Code,
  DollarSign,
} from "lucide-react";
import { NotificationsFeed } from "@/components/founder-matching/NotificationsFeed";
import { ConnectionsList } from "@/components/founder-matching/ConnectionsList";
import { toast } from "sonner";

// Mock data only - no API integration yet
const mockProfiles = [
  {
    id: "1",
    match_id: "match-1",
    overall_score: 0.94,
    matched_profile: {
      profile_id: "profile-1",
      current_role: "Technical Co-Founder",
      years_experience: 8,
      technical_skills: [
        "React/Next.js",
        "Node.js",
        "AWS",
        "TypeScript",
        "PostgreSQL",
      ],
      soft_skills: ["Leadership", "Product Strategy", "Team Building"],
      seeking_roles: ["CEO", "CMO", "Sales Lead"],
      industries: ["SaaS", "AI", "Productivity Tools"],
      commitment_level: "Full-time",
      location_preference: "Remote",
      preferred_locations: ["San Francisco", "Remote"],
      achievements: [
        "Built 2 startups from 0 to 1M users",
        "Raised $2M in seed funding",
      ],
      education: ["Stanford CS"],
      certifications: ["AWS Solutions Architect"],
      bio: "Looking for a business-focused co-founder with sales experience to build an AI-powered SaaS platform in the productivity space. I've built and scaled two previous startups.",
      photos: [],
    },
  },
  {
    id: "2",
    match_id: "match-2",
    overall_score: 0.88,
    matched_profile: {
      profile_id: "profile-2",
      current_role: "Growth & Marketing Lead",
      years_experience: 6,
      technical_skills: ["Analytics", "SEO", "Automation"],
      soft_skills: ["Marketing Strategy", "Growth Hacking", "Brand Building"],
      seeking_roles: ["CTO", "Full-Stack Developer", "AI Engineer"],
      industries: ["Marketing Tech", "SaaS", "AI"],
      commitment_level: "Full-time",
      location_preference: "Hybrid",
      preferred_locations: ["New York", "Remote"],
      achievements: [
        "Grew previous startup to $5M ARR",
        "Built marketing team from 1 to 20",
      ],
      education: ["Harvard Business School"],
      certifications: ["Google Analytics Expert"],
      bio: "Seeking a technical co-founder to build an AI-powered marketing automation tool. I handle customers, marketing, and growth while you build the product.",
      photos: [],
    },
  },
  {
    id: "3",
    match_id: "match-3",
    overall_score: 0.85,
    matched_profile: {
      profile_id: "profile-3",
      current_role: "Product Design Lead",
      years_experience: 10,
      technical_skills: ["Figma", "Sketch", "Prototyping", "Design Systems"],
      soft_skills: ["UI/UX Design", "User Research", "Design Thinking"],
      seeking_roles: ["CEO", "Frontend Engineer", "Product Manager"],
      industries: ["Design Tools", "SaaS", "Developer Tools"],
      commitment_level: "Part-time",
      location_preference: "On-site",
      preferred_locations: ["Austin", "Remote"],
      achievements: [
        "Ex-Apple designer",
        "Built design system used by 100K+ users",
      ],
      education: ["Rhode Island School of Design"],
      certifications: [],
      bio: "I'm passionate about creating clean interfaces that solve real user problems. Looking for a tech + biz co-founder team to build the next great design tool.",
      photos: [],
    },
  },
];

const FounderDashboard = () => {
  const [activeTab, setActiveTab] = useState("discover");
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [profiles] = useState(mockProfiles);
  const [pendingCount] = useState(3);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  const currentProfile = profiles[currentProfileIndex];
  const profile = currentProfile?.matched_profile;

  // Handle responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeTab !== "discover" || !currentProfile) return;

      if (e.key === "ArrowLeft") handleSwipeLeft();
      if (e.key === "ArrowRight") handleSwipeRight();
      if (e.key === " ") handleSuperLike();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentProfileIndex, activeTab, currentProfile]);

  const handleSwipeLeft = useCallback(() => {
    toast.info("Passed", {
      description: `You passed on ${profile?.current_role}`,
    });

    if (currentProfileIndex < profiles.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
    } else {
      setCurrentProfileIndex(0);
      toast("✨ Back to first profile!");
    }
  }, [currentProfileIndex, profile, profiles.length]);

  const handleSwipeRight = useCallback(() => {
    toast.success("Interest sent!", {
      description: `${profile?.current_role} will be notified`,
    });

    if (currentProfileIndex < profiles.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
    } else {
      setCurrentProfileIndex(0);
      toast("✨ Back to first profile!");
    }
  }, [currentProfileIndex, profile, profiles.length]);

  const handleSuperLike = useCallback(() => {
    toast.success("Super Like!", {
      description: `${profile?.current_role} will get a special notification`,
    });

    if (currentProfileIndex < profiles.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
    } else {
      setCurrentProfileIndex(0);
      toast("✨ Back to first profile!");
    }
  }, [currentProfileIndex, profile, profiles.length]);

  const handleViewProfile = () => {
    toast.info("Viewing profile", {
      description: "Full profile view would open here",
    });
  };

  const renderMainProfileView = () => {
    if (!currentProfile || !profile) {
      return (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-4">
            <Users className="h-12 w-12 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No profiles available</h3>
          <p className="text-slate-600 mb-6">
            Please check back later for more co-founder matches
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Desktop Header for Main Profile */}
        {isDesktop && <div className="flex items-center justify-between"></div>}

        {/* Main Profile Card */}
        <Card className="overflow-hidden border border-slate-200 shadow-lg">
          <div className="relative h-80 bg-gradient-to-br from-blue-50 to-indigo-50">
            {/* Profile photos or placeholder */}
            {profile.photos && profile.photos.length > 0 ? (
              <img
                src={profile.photos[0]}
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
                    Add profile photos for better matches
                  </p>
                </div>
              </div>
            )}

            {/* Match Score Badge */}
            <Badge className="absolute top-4 right-4 px-4 py-2 font-semibold shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-base">
              {Math.round(currentProfile.overall_score * 100)}% Match
            </Badge>
          </div>

          <CardContent className="p-6">
            {/* Name and Role */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-slate-900">
                {profile.current_role},{" "}
                <span className="text-slate-600">
                  {profile.years_experience} years
                </span>
              </h2>
              {profile.bio && (
                <div className="flex items-center gap-2 mt-2">
                  <Briefcase className="h-6 w-6 text-blue-500" />
                  <span className="text-xl font-medium text-slate-700">
                    {profile.bio.substring(0, 50)}...
                  </span>
                </div>
              )}
            </div>

            {/* Key Achievement */}
            {profile.achievements && profile.achievements.length > 0 && (
              <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                <div className="flex items-start gap-3">
                  <Zap className="h-6 w-6 text-blue-500 flex-shrink-0 mt-0.5" />
                  <p className="text-lg text-blue-800 font-medium leading-relaxed">
                    {profile.achievements[0]}
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
                    <p className="text-sm text-slate-500">
                      Location Preference
                    </p>
                    <p className="font-medium text-slate-900">
                      {profile.location_preference}
                    </p>
                    {profile.preferred_locations && (
                      <p className="text-xs text-slate-500 mt-1">
                        {profile.preferred_locations.join(", ")}
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
                      {profile.industries?.slice(0, 2).join(", ")}
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
                      {profile.commitment_level}
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
                      {profile.years_experience} years
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            {profile.bio && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  About
                </h3>
                <p className="text-slate-700 leading-relaxed text-lg">
                  {profile.bio}
                </p>
              </div>
            )}

            {/* Skills */}
            {profile.technical_skills &&
              profile.technical_skills.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    Technical Skills
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {profile.technical_skills
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
            {profile.soft_skills && profile.soft_skills.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  Soft Skills
                </h3>
                <div className="flex flex-wrap gap-3">
                  {profile.soft_skills
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
            {profile.seeking_roles && profile.seeking_roles.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  Looking for a co-founder who is
                </h3>
                <div className="flex flex-wrap gap-3">
                  {profile.seeking_roles.map((role: string, index: number) => (
                    <Badge
                      key={index}
                      className="px-4 py-2 text-base bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100"
                    >
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Education & Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t">
              {profile.education && profile.education.length > 0 && (
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-slate-400" />
                  <span className="text-slate-700">{profile.education[0]}</span>
                </div>
              )}

              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={handleViewProfile}
                  className="flex items-center gap-2 border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                  <Eye className="h-4 w-4" />
                  View Full Profile
                </Button>

                <Button
                  variant="outline"
                  onClick={() => toast.info("Profile saved for later")}
                  className="border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                >
                  Save for later
                </Button>
              </div>
            </div>
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
        {/* Mobile View */}
        {!isDesktop ? (
          <div className="max-w-md mx-auto p-4 pb-24">
            {/* Mobile Header with Title */}
            <div className="flex items-center justify-between mb-6 pt-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  CoFounder Match
                </h1>
                <p className="text-sm text-slate-600">
                  Find your perfect co-founder
                </p>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setActiveTab("notifications")}
              >
                <Bell className="h-6 w-6 text-slate-700" />
                {pendingCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                    {pendingCount}
                  </span>
                )}
              </Button>
            </div>

            {/* Mobile Tabs */}
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              {/* Mobile Bottom Navigation */}
              <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50 max-w-md mx-auto">
                <TabsList className="grid grid-cols-3 w-full h-16">
                  <TabsTrigger
                    value="discover"
                    className="flex flex-col items-center gap-1 py-3 data-[state=active]:text-blue-600"
                  >
                    <Sparkles className="h-5 w-5" />
                    <span className="text-xs">Discover</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="notifications"
                    className="flex flex-col items-center gap-1 py-3 relative data-[state=active]:text-blue-600"
                  >
                    <Bell className="h-5 w-5" />
                    <span className="text-xs">Matches</span>
                    {pendingCount > 0 && (
                      <span className="absolute top-2 right-8 h-2 w-2 rounded-full bg-blue-600" />
                    )}
                  </TabsTrigger>
                  <TabsTrigger
                    value="connections"
                    className="flex flex-col items-center gap-1 py-3 data-[state=active]:text-blue-600"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span className="text-xs">Messages</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Mobile Tab Content */}
              <div className="pb-20">
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
        ) : (
          /* Desktop View */
          <div className="max-w-4xl mx-auto p-6">
            {/* Desktop Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  CoFounder Match
                </h1>
                <p className="text-lg text-slate-600">
                  Find your perfect co-founder
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => toast.info("Search profiles")}
                  className="flex items-center gap-2"
                >
                  <Search className="h-4 w-4" />
                  Search Profiles
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  onClick={() => setActiveTab("notifications")}
                >
                  <Bell className="h-6 w-6 text-slate-700" />
                  {pendingCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center">
                      {pendingCount}
                    </span>
                  )}
                </Button>
              </div>
            </div>

            {/* Desktop Content */}
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              {/* Desktop Top Navigation */}
              <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
                <TabsTrigger
                  value="discover"
                  className="data-[state=active]:text-blue-600"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Discover
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="relative data-[state=active]:text-blue-600"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Matches
                  {pendingCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-blue-600" />
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="connections"
                  className="data-[state=active]:text-blue-600"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Messages
                </TabsTrigger>
              </TabsList>

              <TabsContent value="discover" className="mt-0">
                {renderMainProfileView()}
              </TabsContent>

              <TabsContent value="notifications" className="mt-0">
                <NotificationsFeed />
              </TabsContent>

              <TabsContent value="connections" className="mt-0">
                <ConnectionsList />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FounderDashboard;
