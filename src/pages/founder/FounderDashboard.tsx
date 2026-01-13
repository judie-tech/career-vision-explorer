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
  Calendar,
  Award,
} from "lucide-react";
import { NotificationsFeed } from "@/components/founder-matching/NotificationsFeed";
import { ConnectionsList } from "@/components/founder-matching/ConnectionsList";
import { cofounderMatchingService } from "@/services/founder-matching.service";
import { toast } from "sonner";

const FounderDashboard = () => {
  const [activeTab, setActiveTab] = useState("discover");
  const [currentProfile, setCurrentProfile] = useState<any>(null);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  // Handle responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Load profiles
  useEffect(() => {
    if (activeTab === "discover") {
      loadProfiles();
    }
    if (activeTab === "notifications") {
      loadPendingCount();
    }
  }, [activeTab]);

  const loadProfiles = async () => {
    try {
      setLoading(true);
      // This will call your actual API service
      const response = await cofounderMatchingService.discoverMatches({
        limit: 10,
        min_score: 0.6,
      });

      if (response.matches && response.matches.length > 0) {
        setProfiles(response.matches);
        setCurrentProfile(response.matches[0]);
      }
    } catch (error) {
      console.error("Failed to load profiles:", error);
      toast.error("Failed to load profiles");
    } finally {
      setLoading(false);
    }
  };

  const loadPendingCount = async () => {
    try {
      const response = await cofounderMatchingService.getPendingInterests();
      setPendingCount(response.pending_matches?.length || 0);
    } catch (error) {
      console.error("Failed to load pending count:", error);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeTab !== "discover" || !currentProfile) return;

      if (e.key === "ArrowLeft") handleSwipeLeft();
      if (e.key === "ArrowRight") handleSwipeRight();
      if (e.key === " ") handleSuperLike(); // Space for Super Like
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentProfile, activeTab]);

  const handleSwipeLeft = useCallback(async () => {
    if (!currentProfile) return;

    try {
      await cofounderMatchingService.swipeLeft(currentProfile.match_id);
      toast.info("Passed", {
        description: `You passed on ${currentProfile.matched_profile?.current_role}`,
      });

      // Move to next profile
      const currentIndex = profiles.findIndex(
        (p) => p.match_id === currentProfile.match_id
      );
      if (currentIndex < profiles.length - 1) {
        setCurrentProfile(profiles[currentIndex + 1]);
      } else {
        // Load more profiles when we reach the end
        loadProfiles();
      }
    } catch (error) {
      toast.error("Failed to pass on profile");
    }
  }, [currentProfile, profiles]);

  const handleSwipeRight = useCallback(async () => {
    if (!currentProfile) return;

    try {
      const response = await cofounderMatchingService.swipeRight(
        currentProfile.match_id
      );
      toast.success("Interest sent!", {
        description: `${currentProfile.matched_profile?.current_role} will be notified`,
      });

      // Move to next profile
      const currentIndex = profiles.findIndex(
        (p) => p.match_id === currentProfile.match_id
      );
      if (currentIndex < profiles.length - 1) {
        setCurrentProfile(profiles[currentIndex + 1]);
      } else {
        loadProfiles();
      }
    } catch (error) {
      toast.error("Failed to send interest");
    }
  }, [currentProfile, profiles]);

  const handleSuperLike = useCallback(async () => {
    if (!currentProfile) return;

    try {
      // You might need to add a superLike method to your service
      toast.success("Super Like!", {
        description: `${currentProfile.matched_profile?.current_role} will get a special notification`,
      });

      const currentIndex = profiles.findIndex(
        (p) => p.match_id === currentProfile.match_id
      );
      if (currentIndex < profiles.length - 1) {
        setCurrentProfile(profiles[currentIndex + 1]);
      } else {
        loadProfiles();
      }
    } catch (error) {
      toast.error("Failed to send Super Like");
    }
  }, [currentProfile, profiles]);

  const handleViewProfile = () => {
    if (!currentProfile) return;
    toast.info("Viewing profile", {
      description: "Full profile view would open here",
    });
  };

  const renderMainProfileView = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[600px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4" />
          <p className="text-slate-600">Finding potential co-founders...</p>
        </div>
      );
    }

    if (!currentProfile) {
      return (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-4">
            <Users className="h-12 w-12 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No profiles found</h3>
          <p className="text-slate-600 mb-6 max-w-md mx-auto">
            Check back later for more co-founder matches
          </p>
          <Button onClick={loadProfiles}>Find More Matches</Button>
        </div>
      );
    }

    const profile = currentProfile.matched_profile;

    return (
      <div className="space-y-6">
        {/* Desktop Header for Main Profile */}
        {isDesktop && (
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Discover Co-Founders
              </h2>
              <p className="text-slate-600">
                Connect with potential co-founders
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => toast.info("Search filters")}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toast.info("Search profiles")}
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        )}

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

            {/* Tagline or Key Achievement */}
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
                {profile.location_preference && (
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
                    </div>
                  </div>
                )}

                {profile.industries && profile.industries.length > 0 && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                    <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                      <Building className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Industry</p>
                      <p className="font-medium text-slate-900">
                        {profile.industries[0]}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {profile.commitment_level && (
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
                )}

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
                    Skills & Expertise
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
                      className="px-4 py-2 text-base bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100"
                    >
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Actions */}
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
                  onClick={() => toast.info("Profile saved")}
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
