import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Target,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  Edit,
  Search,
  MessageSquare,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { founderMatchingService } from "@/services/founder-matching.service";
import { FounderProfile } from "@/types/founder-matching";
import { ProfileCreationWizard } from "@/components/founder-matching/ProfileCreationWizard";
import { MatchDiscovery } from "@/components/founder-matching/MatchDiscovery";
import { MutualMatches } from "@/components/founder-matching/MutualMatches";
import { VerificationFlow } from "@/components/founder-matching/VerificationFlow";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const FounderDashboard = () => {
  const { user, hasRole } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<FounderProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showProfileWizard, setShowProfileWizard] = useState(false);
  const [stats, setStats] = useState({
    total_views: 0,
    total_matches: 0,
    mutual_interests: 0,
    profile_completeness: 0,
  });

  useEffect(() => {
    if (!hasRole("job_seeker")) {
      toast.error("Access Denied", {
        description: "Founder matching is only available for job seekers",
      });
      navigate("/jobseeker/dashboard");
      return;
    }
    loadProfileAndStats();
  }, [hasRole, navigate]);

  const loadProfileAndStats = async () => {
    try {
      setLoading(true);
      const [profileData, statsData] = await Promise.all([
        founderMatchingService.getProfile().catch(() => null),
        founderMatchingService.getMatchStats(),
      ]);
      setProfile(profileData);
      setStats(statsData);
      if (!profileData) {
        setShowProfileWizard(true);
      }
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getVerificationBadge = () => {
    if (!profile) return null;

    const status = profile.verification_status;
    const icons = {
      verified: <CheckCircle className="h-4 w-4 text-green-500" />,
      pending: <Clock className="h-4 w-4 text-yellow-500" />,
      rejected: <AlertCircle className="h-4 w-4 text-red-500" />,
      unverified: <AlertCircle className="h-4 w-4 text-gray-500" />,
    };

    const colors = {
      verified: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      rejected: "bg-red-100 text-red-800 border-red-200",
      unverified: "bg-gray-100 text-gray-800 border-gray-200",
    };

    return (
      <Badge
        variant="outline"
        className={`gap-1 ${colors[status || "unverified"]}`}
      >
        {icons[status || "unverified"]}
        {status?.toUpperCase() || "UNVERIFIED"}
      </Badge>
    );
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        </div>
      </Layout>
    );
  }

  if (showProfileWizard) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
          <div className="container max-w-4xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">
                Find Your Perfect Co-Founder
              </h1>
              <p className="text-muted-foreground">
                Create your founder profile to start matching with like-minded
                entrepreneurs
              </p>
            </div>
            <ProfileCreationWizard
              onComplete={() => {
                setShowProfileWizard(false);
                loadProfileAndStats();
              }}
            />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="container py-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
            <div>
              <h1 className="text-3xl font-bold">Co-Founder Matching</h1>
              <p className="text-muted-foreground mt-1">
                Connect with potential co-founders who share your vision
              </p>
            </div>
            <div className="flex items-center gap-4">
              {getVerificationBadge()}
              <Button
                variant="outline"
                onClick={() => setShowProfileWizard(true)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
              <Button onClick={() => navigate("/founder/matches")}>
                <Search className="h-4 w-4 mr-2" />
                Find Matches
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Profile Views
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{stats.total_views}</div>
                  <Target className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Matches
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">
                    {stats.total_matches}
                  </div>
                  <Users className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Mutual Interests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">
                    {stats.mutual_interests}
                  </div>
                  <MessageSquare className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Profile Completeness
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">
                      {stats.profile_completeness}%
                    </div>
                    <TrendingUp className="h-8 w-8 text-orange-500" />
                  </div>
                  <Progress
                    value={stats.profile_completeness}
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="matches" className="space-y-6">
            <TabsList>
              <TabsTrigger value="matches">Find Matches</TabsTrigger>
              <TabsTrigger value="mutual">Mutual Matches</TabsTrigger>
              <TabsTrigger value="verification">Verification</TabsTrigger>
            </TabsList>

            <TabsContent value="matches" className="space-y-6">
              <MatchDiscovery />
            </TabsContent>

            <TabsContent value="mutual" className="space-y-6">
              <MutualMatches />
            </TabsContent>

            <TabsContent value="verification" className="space-y-6">
              <VerificationFlow
                profile={profile}
                onUpdate={loadProfileAndStats}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default FounderDashboard;
