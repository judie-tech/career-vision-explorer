import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, ArrowLeft } from "lucide-react";
import {
  cofounderMatchingService,
  CofounderProfile,
} from "@/services/founder-matching.service";
import { toast } from "sonner";

const FounderProfile: React.FC = () => {
  const { profileId } = useParams<{ profileId: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<CofounderProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profileId) {
      loadProfile(profileId);
    }
  }, [profileId]);

  const loadProfile = async (id: string) => {
    try {
      setLoading(true);
      const data = await cofounderMatchingService.getMatchProfile(id);
      setProfile(data);
    } catch (error) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name?: string, fallback?: string) => {
    const source = name || fallback || "";
    if (!source) return "";
    return source
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto p-6">
          <div className="h-10 w-24 bg-muted rounded animate-pulse mb-6" />
          <Card className="animate-pulse">
            <CardContent className="p-6 space-y-4">
              <div className="flex gap-4 items-center">
                <div className="h-16 w-16 bg-muted rounded-full" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-muted rounded w-1/3" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              </div>
              <div className="h-3 bg-muted rounded w-full" />
              <div className="h-3 bg-muted rounded w-2/3" />
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  if (!profile) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto p-6 text-center">
          <p className="text-muted-foreground">Profile not found.</p>
          <Button variant="outline" className="mt-4" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Go back
          </Button>
        </div>
      </Layout>
    );
  }

  const initials = getInitials(profile.name, profile.current_role);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6 space-y-4">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to matches
        </Button>

        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="" />
                <AvatarFallback className="bg-blue-50 text-blue-700 font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-2">
                <div>
                  <h1 className="text-2xl font-bold">
                    {profile.name || profile.current_role}
                  </h1>
                  <p className="text-muted-foreground">{profile.current_role}</p>
                </div>
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" /> {profile.years_experience} yrs
                  </span>
                  {profile.location_preference && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" /> {profile.location_preference}
                    </span>
                  )}
                  {profile.commitment_level && (
                    <Badge variant="secondary">{profile.commitment_level}</Badge>
                  )}
                </div>
              </div>
            </div>

            {profile.bio && (
              <div className="pt-2">
                <h3 className="text-sm font-semibold mb-1">About</h3>
                <p className="text-muted-foreground whitespace-pre-line">{profile.bio}</p>
              </div>
            )}

            {(profile.technical_skills?.length || 0) > 0 && (
              <div className="pt-2">
                <h3 className="text-sm font-semibold mb-1">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.technical_skills.slice(0, 12).map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {(profile.seeking_roles?.length || 0) > 0 && (
              <div className="pt-2">
                <h3 className="text-sm font-semibold mb-1">Looking for</h3>
                <p className="text-sm text-muted-foreground">
                  {profile.seeking_roles.join(", ")}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default FounderProfile;
