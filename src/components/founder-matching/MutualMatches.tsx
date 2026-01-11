// src/components/founder-matching/MutualMatches.tsx
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Mail,
  Phone,
  MessageCircle,
  Calendar,
  Linkedin,
  MapPin,
  Briefcase,
  Star,
  ExternalLink,
  CheckCircle,
} from "lucide-react";
import {
  cofounderMatchingService,
  MatchProfile,
} from "@/services/founder-matching.service";

import { toast } from "sonner";

export const MutualMatches: React.FC = () => {
  const [mutualMatches, setMutualMatches] = useState<MatchProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMutualMatches();
  }, []);

  const loadMutualMatches = async () => {
    try {
      setLoading(true);
      const response = await cofounderMatchingService.getMutualMatches();
      setMutualMatches(response.mutual_matches);
    } catch (error) {
      toast.error("Failed to load mutual matches");
      console.error(error);
    } finally {
      setLoading(false);
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
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-muted rounded-full"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-muted rounded w-1/4"></div>
                  <div className="h-3 bg-muted rounded w-1/3"></div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-3 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (mutualMatches.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <div className="mx-auto w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">
            No Mutual Connections Yet
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Express interest in potential co-founders to create mutual
            connections. When both of you are interested, you can connect and
            start collaborating.
          </p>
          <Button
            onClick={() => (window.location.href = "/cofounder/discover")}
          >
            Discover Potential Co-Founders
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Your Connections</h2>
          <p className="text-muted-foreground">
            {mutualMatches.length} mutual connection
            {mutualMatches.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button variant="outline" onClick={loadMutualMatches}>
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mutualMatches.map((match) => {
          const profile = match.matched_profile;
          const initials = getInitials(
            profile.current_role.split(" ")[0] +
              " " +
              (profile.current_role.split(" ")[1] || "")
          );

          return (
            <Card
              key={match.match_id}
              className="border-green-200 hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-green-100">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-green-100 text-green-800 text-lg font-semibold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-xl">
                        {profile.current_role}
                      </CardTitle>
                      <div className="flex items-center gap-3 mt-1">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Connected
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {profile.years_experience}+ years experience
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      {Math.round(match.overall_score * 100)}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Match Score
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Seeking: {profile.seeking_roles.join(", ")}
                    </span>
                  </div>
                  {profile.location_preference && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        Location: {profile.location_preference}
                      </span>
                    </div>
                  )}
                  {profile.education.length > 0 && (
                    <div className="flex items-start gap-2">
                      <Star className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <span className="text-sm">
                        Education: {profile.education[0]}
                      </span>
                    </div>
                  )}
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {profile.bio}
                </p>

                <div className="flex flex-wrap gap-2">
                  {profile.technical_skills.slice(0, 6).map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                {/* Contact Actions */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t">
                  {profile.linkedin_url && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start"
                      onClick={() =>
                        window.open(profile.linkedin_url, "_blank")
                      }
                    >
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Call
                  </Button>
                </div>

                {profile.portfolio_url && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={() => window.open(profile.portfolio_url, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Portfolio
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
