// src/pages/cofounder/CofounderDashboard.tsx
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Heart,
  MessageSquare,
  UserPlus,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { MatchesFeed } from "@/components/founder-matching/MatchesFeed";
import { ConnectionsList } from "@/components/founder-matching/ConnectionsList";
import { cofounderMatchingService } from "@/services/founder-matching.service";
import { toast } from "sonner";

const CofounderDashboard = () => {
  const [activeTab, setActiveTab] = useState("discover");
  const [stats, setStats] = useState({
    total_matches: 0,
    mutual_interests: 0,
    profile_views: 0,
    average_match_score: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const statistics = await cofounderMatchingService.getStatistics();
      setStats({
        total_matches: statistics.total_matches,
        mutual_interests: statistics.mutual_interests,
        profile_views: statistics.profile_views,
        average_match_score: statistics.average_match_score,
      });
    } catch (error) {
      console.error("Failed to load stats:", error);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto p-4">
          {/* Simple header like social apps */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="h-5 w-5 text-blue-500" />
              <h1 className="text-2xl font-bold">Co-Founder Matching</h1>
            </div>
            <p className="text-sm text-muted-foreground">
              Find your perfect startup partner through our smart algorithm
            </p>
          </div>

          {/* Stats cards - minimal like LinkedIn */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <Card className="bg-white">
              <CardContent className="p-3">
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-600">
                    {stats.total_matches}
                  </div>
                  <div className="text-xs text-muted-foreground">Matches</div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="p-3">
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600">
                    {stats.mutual_interests}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Connections
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="p-3">
                <div className="text-center">
                  <div className="text-xl font-bold text-purple-600">
                    {stats.profile_views}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Profile Views
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="p-3">
                <div className="text-center">
                  <div className="text-xl font-bold text-amber-600">
                    {Math.round(stats.average_match_score * 100)}%
                  </div>
                  <div className="text-xs text-muted-foreground">Avg Match</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Simple tabs - Instagram/LinkedIn style */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="sticky top-0 bg-gray-50 z-10 pb-2">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger
                  value="discover"
                  className="flex items-center gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Discover</span>
                </TabsTrigger>
                <TabsTrigger
                  value="connections"
                  className="flex items-center gap-2"
                >
                  <Users className="h-4 w-4" />
                  <span>Connections</span>
                </TabsTrigger>
                <TabsTrigger
                  value="following"
                  className="flex items-center gap-2"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Following</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="mt-4">
              <TabsContent value="discover">
                <MatchesFeed />
              </TabsContent>

              <TabsContent value="connections">
                <ConnectionsList />
              </TabsContent>

              <TabsContent value="following">
                <div className="text-center py-12">
                  <UserPlus className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Following</h3>
                  <p className="text-muted-foreground">
                    People you follow will appear here
                  </p>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default CofounderDashboard;
