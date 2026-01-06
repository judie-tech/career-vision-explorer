import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Eye, Heart, X } from "lucide-react";
import { MatchProfile } from "@/services/founder-matching.service";
import { founderMatchingService } from "@/services/founder-matching.service";
import { MatchDetailModal } from "./MatchDetailModal";
import { toast } from "sonner";

interface MatchDiscoveryProps {
  initialFilters?: {
    min_score?: number;
    location_preference?: string;
    time_commitment?: string;
    funding_status?: string;
  };
}

export const MatchDiscovery: React.FC<MatchDiscoveryProps> = ({
  initialFilters,
}) => {
  const [matches, setMatches] = useState<MatchProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState<MatchProfile | null>(null);
  const [filters, setFilters] = useState({
    min_score: initialFilters?.min_score || 0.6,
    location_preference: initialFilters?.location_preference || "",
    time_commitment: initialFilters?.time_commitment || "",
    funding_status: initialFilters?.funding_status || "",
  });

  useEffect(() => {
    loadMatches();
  }, [filters]);

  const loadMatches = async () => {
    try {
      setLoading(true);
      const data = await founderMatchingService.findMatches(filters);
      setMatches(data);
    } catch (error) {
      toast.error("Failed to load matches");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleMatchAction = async (
    targetUserId: string,
    action: "view" | "interest" | "decline"
  ) => {
    try {
      const response = await founderMatchingService.handleMatchAction({
        target_user_id: targetUserId,
        action,
      });

      if (action === "interest" && response.is_mutual) {
        toast.success("Mutual match! You can now contact this founder.");
      }

      // Update local state with proper type conversion
      setMatches((prev) =>
        prev.map((match) =>
          match.user_id === targetUserId
            ? {
                ...match,
                match_status:
                  action === "interest"
                    ? "interest"
                    : action === "decline"
                    ? "declined"
                    : "pending",
              }
            : match
        )
      );
    } catch (error) {
      toast.error("Failed to process action");
      console.error(error);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return "bg-green-500";
    if (score >= 0.6) return "bg-yellow-500";
    return "bg-red-500";
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2 mt-2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-3 bg-muted rounded"></div>
                <div className="h-3 bg-muted rounded w-5/6"></div>
                <div className="h-3 bg-muted rounded w-4/6"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Minimum Match Score</label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[filters.min_score * 100]}
                  onValueChange={([value]) =>
                    setFilters({ ...filters, min_score: value / 100 })
                  }
                  min={60}
                  max={100}
                  step={5}
                  className="flex-1"
                />
                <span className="text-sm font-medium">
                  {Math.round(filters.min_score * 100)}%
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Input
                placeholder="Enter location..."
                value={filters.location_preference}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    location_preference: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Time Commitment</label>
              <Select
                value={filters.time_commitment}
                onValueChange={(value) =>
                  setFilters({ ...filters, time_commitment: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Funding Status</label>
              <Select
                value={filters.funding_status}
                onValueChange={(value) =>
                  setFilters({ ...filters, funding_status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bootstrapped">Bootstrapped</SelectItem>
                  <SelectItem value="Seed">Seed</SelectItem>
                  <SelectItem value="Series A">Series A</SelectItem>
                  <SelectItem value="Series B+">Series B+</SelectItem>
                  <SelectItem value="Seeking">Seeking Funding</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Match Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((match) => (
          <Card
            key={match.user_id}
            className="hover:shadow-lg transition-shadow"
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">
                    {match.location || "Remote"}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{match.time_commitment}</Badge>
                    <Badge variant="secondary">{match.stage}</Badge>
                  </div>
                </div>
                <div className="relative">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold ${getScoreColor(
                        match.match_score
                      )}`}
                    >
                      {Math.round(match.match_score * 100)}%
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {match.business_vision}
                </p>
                <div className="flex flex-wrap gap-1">
                  {match.required_skills.slice(0, 5).map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {match.required_skills.length > 5 && (
                    <Badge variant="outline" className="text-xs">
                      +{match.required_skills.length - 5}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <div className="text-xs text-muted-foreground">
                      Vision Match
                    </div>
                    <div className="font-medium">
                      {Math.round(match.vision_similarity * 100)}%
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">
                      Skills Match
                    </div>
                    <div className="font-medium">
                      {Math.round(match.skills_compatibility * 100)}%
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => setSelectedMatch(match)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
                {match.match_status === "interest" ? (
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1"
                    disabled={match.match_status === "interest"}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Interested
                  </Button>
                ) : (
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleMatchAction(match.user_id, "interest")}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Interest
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleMatchAction(match.user_id, "decline")}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedMatch && (
        <MatchDetailModal
          match={selectedMatch}
          open={!!selectedMatch}
          onOpenChange={() => setSelectedMatch(null)}
          onAction={handleMatchAction}
        />
      )}
    </div>
  );
};
