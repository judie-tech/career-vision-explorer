// src/components/cofounder-matching/MatchesFeed.tsx
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Heart,
  MessageCircle,
  UserPlus,
  UserMinus,
  Linkedin,
  MapPin,
  Briefcase,
  Award,
  ChevronRight,
} from "lucide-react";
import {
  cofounderMatchingService,
  MatchProfile,
} from "@/services/founder-matching.service";
import { toast } from "sonner";

export const MatchesFeed: React.FC = () => {
  const [matches, setMatches] = useState<MatchProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    try {
      setLoading(true);
      // Let algorithm suggest matches (no filters, let backend decide)
      const response = await cofounderMatchingService.discoverMatches({
        limit: 10,
        min_score: 0.6, // Accept reasonable matches
      });
      setMatches(response.matches);
    } catch (error) {
      toast.error("Failed to load matches");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async (matchId: string) => {
    try {
      const response = await cofounderMatchingService.connect(matchId);

      if (response.mutual_interest) {
        toast.success("🎉 Mutual connection!", {
          description: response.message,
        });
      } else {
        toast.success("Connection request sent");
      }

      // Update match status
      setMatches(
        matches.map((match) =>
          match.match_id === matchId
            ? { ...match, status: response.status as any }
            : match
        )
      );
    } catch (error) {
      toast.error("Failed to connect");
    }
  };

  const handleFollow = async (profileId: string) => {
    try {
      if (following.has(profileId)) {
        await cofounderMatchingService.unfollowProfile(profileId);
        setFollowing((prev) => {
          const newSet = new Set(prev);
          newSet.delete(profileId);
          return newSet;
        });
        toast.success("Unfollowed");
      } else {
        await cofounderMatchingService.followProfile(profileId);
        setFollowing((prev) => new Set(prev).add(profileId));
        toast.success("Following");
      }
    } catch (error) {
      toast.error("Failed to update follow status");
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-muted rounded-full"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-muted rounded w-1/4"></div>
                  <div className="h-3 bg-muted rounded w-1/3"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <UserPlus className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No matches yet</h3>
        <p className="text-muted-foreground">
          Our algorithm is finding the best co-founders for you
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {matches.map((match) => {
        const profile = match.matched_profile;
        const initials = getInitials(profile.current_role);
        const isFollowing = following.has(profile.profile_id);
        const isConnected =
          match.status === "mutual_interest" || match.status === "interested";

        return (
          <Card
            key={match.match_id}
            className="overflow-hidden hover:shadow-sm transition-shadow"
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                {/* Left: Profile info */}
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  {/* Avatar with match score */}
                  <div className="relative">
                    <Avatar className="h-14 w-14">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-gradient-to-br from-blue-100 to-purple-100 text-blue-700 font-semibold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    {/* Match percentage badge - small, subtle */}
                    <div className="absolute -bottom-2 -right-2">
                      <Badge className="text-xs bg-white border shadow-sm">
                        {Math.round(match.overall_score * 100)}%
                      </Badge>
                    </div>
                  </div>

                  {/* Profile details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg leading-tight">
                          {profile.current_role}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-3 w-3" />
                            <span>{profile.years_experience} yrs</span>
                          </div>
                          {profile.location_preference && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span>{profile.location_preference}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Follow button - Instagram style */}
                      <Button
                        variant={isFollowing ? "outline" : "default"}
                        size="sm"
                        className="h-8 px-3 rounded-full"
                        onClick={() => handleFollow(profile.profile_id)}
                      >
                        {isFollowing ? (
                          <>
                            <UserMinus className="h-3 w-3 mr-1" />
                            Following
                          </>
                        ) : (
                          <>
                            <UserPlus className="h-3 w-3 mr-1" />
                            Follow
                          </>
                        )}
                      </Button>
                    </div>

                    {/* Short bio - LinkedIn style */}
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {profile.bio}
                    </p>

                    {/* Skills/Interests - LinkedIn chips style */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {profile.technical_skills.slice(0, 3).map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="text-xs px-2 py-0"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {profile.industries.slice(0, 2).map((industry) => (
                        <Badge
                          key={industry}
                          variant="secondary"
                          className="text-xs px-2 py-0 bg-blue-50"
                        >
                          {industry}
                        </Badge>
                      ))}
                    </div>

                    {/* Seeking roles */}
                    <div className="mt-3">
                      <span className="text-xs text-muted-foreground">
                        Looking for:{" "}
                      </span>
                      <span className="text-sm font-medium">
                        {profile.seeking_roles.join(", ")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Action buttons */}
                <div className="flex flex-col gap-2">
                  {/* Connect button */}
                  <Button
                    variant={isConnected ? "outline" : "default"}
                    size="sm"
                    className="whitespace-nowrap"
                    onClick={() => handleConnect(match.match_id)}
                    disabled={isConnected}
                  >
                    <Heart
                      className={`h-4 w-4 mr-2 ${
                        isConnected ? "fill-red-500" : ""
                      }`}
                    />
                    {isConnected ? "Connected" : "Connect"}
                  </Button>

                  {/* Message button (if connected) */}
                  {isConnected && (
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                  )}

                  {/* LinkedIn link */}
                  {profile.linkedin_url && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() =>
                        window.open(profile.linkedin_url, "_blank")
                      }
                    >
                      <Linkedin className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Key achievement (if available) - LinkedIn style */}
              {profile.achievements && profile.achievements.length > 0 && (
                <div className="mt-3 pt-3 border-t">
                  <div className="flex items-start gap-2">
                    <Award className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{profile.achievements[0]}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}

      {/* Load more button */}
      <div className="text-center pt-4">
        <Button variant="outline" onClick={loadMatches}>
          Load more matches
        </Button>
      </div>
    </div>
  );
};
