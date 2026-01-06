import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Mail,
  Phone,
  MessageCircle,
  Calendar,
  Linkedin,
  MapPin,
  Clock,
} from "lucide-react";
import { founderMatchingService } from "@/services/founder-matching.service";
import { MatchProfile } from "@/services/founder-matching.service";
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
      const data = await founderMatchingService.getMutualMatches();
      setMutualMatches(data);
    } catch (error) {
      toast.error("Failed to load mutual matches");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-muted rounded w-1/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-3 bg-muted rounded w-3/4"></div>
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
          <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Mutual Matches Yet</h3>
          <p className="text-muted-foreground">
            Express interest in potential co-founders to create mutual matches
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mutualMatches.map((match) => (
          <Card
            key={match.user_id}
            className="hover:shadow-lg transition-shadow"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="" />
                    <AvatarFallback>
                      {match.location?.[0]?.toUpperCase() || "CF"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{match.location || "Remote"}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{match.time_commitment}</Badge>
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800"
                      >
                        Mutual Match
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    {Math.round(match.match_score * 100)}%
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Match Score
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>{match.location || "Remote"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>{match.time_commitment}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {match.required_skills.slice(0, 8).map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>

              {/* Contact Actions */}
              <div className="grid grid-cols-2 gap-2 pt-4 border-t">
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
                <Button variant="outline" size="sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat
                </Button>
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Meet
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
