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
import { CofounderPhotos } from "@/components/founder-matching/CofounderPhotos";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  cofounderMatchingService,
  MatchProfile,
} from "@/services/founder-matching.service";
import { MessagingInterface } from "@/components/founder-matching/MessagingInterface";

const FounderDashboard = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "discover";
  const initialMatchId = searchParams.get("match_id") || undefined;
  
  const [activeTab, setActiveTab] = useState(initialTab);

  // Sync tab with URL
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [potentialCofounders, setPotentialCofounders] = useState<MatchProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [pendingCount, setPendingCount] = useState(0);

  const currentMatch = potentialCofounders[currentProfileIndex];
  const matchedProfile = currentMatch?.matched_profile;

  // Load potential cofounders from API
  useEffect(() => {
    loadDiscoverMatches();
    loadPendingCount();
  }, []);

  const loadDiscoverMatches = async () => {
    try {
      setLoading(true);
      const response = await cofounderMatchingService.discoverMatches({
        limit: 20,
        min_score: 0.5,
      });
      setPotentialCofounders(response.matches);
    } catch (error) {
      console.error("Failed to load matches:", error);
      toast.error("Failed to load matches");
    } finally {
      setLoading(false);
    }
  };

  const loadPendingCount = async () => {
    try {
      const response = await cofounderMatchingService.getPendingInterests();
      setPendingCount(response.total || response.pending_matches?.length || 0);
    } catch {
      // Silently handle - endpoint might not have data yet
    }
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProfileIndex, activeTab, currentMatch]);

  const handleSwipeLeft = useCallback(async () => {
    if (!currentMatch) return;
    
    try {
      await cofounderMatchingService.swipeLeft(currentMatch.match_id);
      toast.info("Passed", {
        description: `You passed on ${matchedProfile?.name || matchedProfile?.current_role}`,
      });
    } catch {
      toast.error("Failed to record action");
    }

    if (currentProfileIndex < potentialCofounders.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
    } else {
      loadDiscoverMatches();
      setCurrentProfileIndex(0);
      toast("✨ Loading more profiles!");
    }
  }, [currentProfileIndex, matchedProfile, potentialCofounders.length, currentMatch]);

  const handleSwipeRight = useCallback(async () => {
    if (!currentMatch) return;
    
    try {
      const response = await cofounderMatchingService.swipeRight(currentMatch.match_id);
      if (response.is_mutual) {
        toast.success("🎉 It's a match!", {
          description: `You and ${matchedProfile?.name || matchedProfile?.current_role} are now connected!`,
        });
      } else {
        toast.success("Interest sent!", {
          description: `${matchedProfile?.name || matchedProfile?.current_role} will be notified`,
        });
      }
    } catch {
      toast.error("Failed to send interest");
    }

    if (currentProfileIndex < potentialCofounders.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
    } else {
      loadDiscoverMatches();
      setCurrentProfileIndex(0);
      toast("✨ Loading more profiles!");
    }
  }, [currentProfileIndex, matchedProfile, potentialCofounders.length, currentMatch]);

  const handleSuperLike = useCallback(async () => {
    if (!currentMatch) return;
    
    try {
      const response = await cofounderMatchingService.swipeRight(currentMatch.match_id);
      if (response.is_mutual) {
        toast.success("🎉 Super match!", {
          description: `You and ${matchedProfile?.name || matchedProfile?.current_role} are connected!`,
        });
      } else {
        toast.success("⭐ Super Like sent!", {
          description: `${matchedProfile?.name || matchedProfile?.current_role} will get a special notification`,
        });
      }
    } catch {
      toast.error("Failed to send super like");
    }

    if (currentProfileIndex < potentialCofounders.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
    } else {
      loadDiscoverMatches();
      setCurrentProfileIndex(0);
      toast("✨ Loading more profiles!");
    }
  }, [currentProfileIndex, matchedProfile, potentialCofounders.length, currentMatch]);

  const handleEditProfile = () => {
    navigate("/profile");
  };

  const renderMainProfileView = () => {
    if (loading) {
      return (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-4 animate-pulse">
            <Users className="h-12 w-12 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Finding co-founders...</h3>
          <p className="text-slate-600">Our algorithm is discovering matches for you</p>
        </div>
      );
    }

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

    // Get display name from profile
    const displayName = matchedProfile.name || matchedProfile.current_role;
    const profilePhoto = matchedProfile.photo_urls?.[0] || "";

    return (
      <div className="space-y-6">
        {/* Main Profile Card */}
        <Card className="overflow-hidden border border-slate-200 shadow-lg">
          <div className="relative h-80 bg-gradient-to-br from-blue-50 to-indigo-50">
            {/* Profile photo or placeholder */}
            {profilePhoto ? (
              <img
                src={profilePhoto}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="h-40 w-40 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-20 w-20 text-blue-400" />
                  </div>
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
                {displayName}
                {matchedProfile.years_experience !== undefined && matchedProfile.years_experience > 0 && (
                  <span className="text-slate-600">
                    , {matchedProfile.years_experience} years
                  </span>
                )}
              </h2>
              {matchedProfile.current_role && (
                <div className="flex items-center gap-2 mt-2">
                  <Briefcase className="h-6 w-6 text-blue-500" />
                  <span className="text-xl font-medium text-slate-700">
                    {matchedProfile.current_role}
                  </span>
                </div>
              )}
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

            {/* Key Details Grid - only show sections with data */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                {(matchedProfile.location_preference || (matchedProfile.preferred_locations && matchedProfile.preferred_locations.length > 0)) && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Location</p>
                      <p className="font-medium text-slate-900">
                        {matchedProfile.location_preference || matchedProfile.preferred_locations?.join(", ") || "Flexible"}
                      </p>
                    </div>
                  </div>
                )}

                {matchedProfile.industries && matchedProfile.industries.length > 0 && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                    <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                      <Building className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Industry</p>
                      <p className="font-medium text-slate-900">
                        {matchedProfile.industries.slice(0, 2).join(", ")}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {matchedProfile.commitment_level && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <Award className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Commitment</p>
                      <p className="font-medium text-slate-900">
                        {matchedProfile.commitment_level}
                      </p>
                    </div>
                  </div>
                )}

                {matchedProfile.years_experience !== undefined && matchedProfile.years_experience > 0 && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                    <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Experience</p>
                      <p className="font-medium text-slate-900">
                        {matchedProfile.years_experience} years
                      </p>
                    </div>
                  </div>
                )}
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

            {/* Seeking - REMOVED per request */}
            {/* {matchedProfile.seeking_roles && ... } */ }

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
              <TabsList className="w-full md:w-auto grid grid-cols-4 md:grid-cols-4 md:inline-flex">
                <TabsTrigger
                  value="discover"
                  className="flex flex-col md:flex-row items-center gap-1 md:gap-2 py-3 md:py-2 data-[state=active]:text-blue-600"
                >
                  <Sparkles className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="text-xs md:text-sm">Discover</span>
                </TabsTrigger>
                <TabsTrigger
                  value="connections"
                  className="flex flex-col md:flex-row items-center gap-1 md:gap-2 py-3 md:py-2 data-[state=active]:text-blue-600"
                >
                  <Users className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="text-xs md:text-sm">Matches</span>
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="flex flex-col md:flex-row items-center gap-1 md:gap-2 py-3 md:py-2 relative data-[state=active]:text-blue-600"
                >
                  <Bell className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="text-xs md:text-sm">Pending</span>
                  {pendingCount > 0 && (
                    <span className="absolute top-2 md:top-1 right-8 md:right-1 h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="messages"
                  className="flex flex-col md:flex-row items-center gap-1 md:gap-2 py-3 md:py-2 data-[state=active]:text-blue-600"
                >
                  <MessageCircle className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="text-xs md:text-sm">Messages</span>
                </TabsTrigger>
                <TabsTrigger
                  value="photos"
                  className="flex flex-col md:flex-row items-center gap-1 md:gap-2 py-3 md:py-2 data-[state=active]:text-blue-600"
                >
                  <Eye className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="text-xs md:text-sm">My Photos</span>
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

              <TabsContent value="messages" className="mt-0">
                 <MessagingInterface initialMatchId={initialMatchId} />
              </TabsContent>

              <TabsContent value="photos" className="mt-0">
                <CofounderPhotos />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default FounderDashboard;
