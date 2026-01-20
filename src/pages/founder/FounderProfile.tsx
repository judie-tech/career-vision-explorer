// src/pages/founder/FounderProfile.tsx
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Briefcase,
  MapPin,
  Target,
  Code,
  Users,
  GraduationCap,
  Award,
  Building,
  Calendar,
  Edit3,
  Globe,
  Linkedin,
  ExternalLink,
  ArrowLeft,
  Save,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { apiClient } from "@/lib/api-client";

// Define the profile type
interface FounderProfileData {
  id: string;
  user_id: string;
  current_role: string;
  years_experience: number;
  technical_skills: string[];
  soft_skills: string[];
  seeking_roles: string[];
  industries: string[];
  commitment_level: string;
  location_preference: string;
  preferred_locations: string[];
  achievements: string[];
  education: string[];
  certifications: string[];
  bio: string;
  linkedin_url: string;
  portfolio_url: string;
  created_at: string;
  updated_at: string;
  views_count: number;
  matches_count: number;
  interested_count: number;
  is_public: boolean;
}

const FounderProfile = () => {
  const navigate = useNavigate();
  const { profileId } = useParams(); // Get profileId from URL if present
  const { user } = useAuth(); // Get current user

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [profileData, setProfileData] = useState<FounderProfileData | null>(
    null
  );
  const [editFormData, setEditFormData] = useState<Partial<FounderProfileData>>(
    {}
  );
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      setFetching(true);
      setApiError(null);

      try {
        let data;
        let endpoint;

        if (profileId) {
          // Fetch another user's profile by ID
          endpoint = `/api/founder/profiles/${profileId}`;
          console.log(`Fetching profile by ID: ${endpoint}`);
          data = await apiClient.get<FounderProfileData>(endpoint);

          // Check if this is the current user's profile
          const currentUserId = user?.id || user?.user_id || user?.sub;
          console.log(
            "Current user ID:",
            currentUserId,
            "Profile user ID:",
            data.user_id
          );
          setIsOwnProfile(data.user_id === currentUserId);
        } else {
          // Fetch current user's own profile
          endpoint = "/api/founder/profiles/me";
          console.log(`Fetching current user's profile: ${endpoint}`);
          data = await apiClient.get<FounderProfileData>(endpoint);
          setIsOwnProfile(true);
        }

        console.log("Profile data received:", data);
        setProfileData(data);
        setEditFormData(data);
      } catch (error: any) {
        console.error("Failed to fetch profile:", error);

        // Check if it's a 404 (profile not found)
        if (error.status === 404) {
          if (!profileId) {
            // It's the current user's profile and it doesn't exist yet
            setProfileData(null);
            setIsOwnProfile(true);
            toast.info("You haven't created a founder profile yet");
          } else {
            setApiError("The profile you're looking for doesn't exist");
            toast.error("Profile not found");
          }
        } else if (error.status === 401) {
          setApiError("Please log in to view this profile");
          toast.error("Authentication required");
        } else {
          setApiError("Failed to load profile data");
          toast.error("Failed to load profile data");
        }

        // If it's your own profile and not found, set isOwnProfile to true
        if (!profileId) {
          setIsOwnProfile(true);
        }
      } finally {
        setFetching(false);
      }
    };

    fetchProfileData();
  }, [profileId, user]);

  const handleSave = async () => {
    if (!profileData) return;

    setLoading(true);
    try {
      const endpoint = isOwnProfile
        ? `/api/founder/profiles/${profileData.id}`
        : `/api/founder/profiles/${profileId}`;

      console.log("Saving profile to:", endpoint, editFormData);
      const response = await apiClient.put<FounderProfileData>(
        endpoint,
        editFormData
      );

      setProfileData(response);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // If still fetching, show loader
  if (fetching) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-slate-600">Loading profile...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // If it's your own profile but doesn't exist yet, show create profile screen
  if (isOwnProfile && !profileData) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white">
          <div className="max-w-4xl mx-auto p-4 py-8">
            <div className="text-center py-12">
              <div className="h-20 w-20 mx-auto bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-6">
                <Briefcase className="h-10 w-10 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                No Founder Profile Yet
              </h2>
              <p className="text-slate-600 mb-6 max-w-md mx-auto">
                You haven't created a founder profile yet. Create one to start
                finding co-founders and building your dream startup team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate("/founder/onboarding")}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  Create Founder Profile
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/founder/dashboard")}
                  size="lg"
                >
                  Back to Dashboard
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // If it's another user's profile but doesn't exist
  if (!isOwnProfile && !profileData) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white">
          <div className="max-w-4xl mx-auto p-4 py-8">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Profile Not Found
              </h2>
              <p className="text-slate-600 mb-6">
                {apiError ||
                  "The profile you're looking for doesn't exist or has been removed."}
              </p>
              <Button onClick={() => navigate("/founder/dashboard")}>
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Rest of the component remains the same...
  const handleEditFieldChange = (
    field: keyof FounderProfileData,
    value: any
  ) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddSkill = (type: "technical" | "soft", skill: string) => {
    if (!skill.trim()) return;

    const field = type === "technical" ? "technical_skills" : "soft_skills";
    const currentSkills = editFormData[field] || [];

    if (!currentSkills.includes(skill)) {
      handleEditFieldChange(field, [...currentSkills, skill]);
    }
  };

  const handleRemoveSkill = (type: "technical" | "soft", index: number) => {
    const field = type === "technical" ? "technical_skills" : "soft_skills";
    const currentSkills = [...(editFormData[field] || [])];
    currentSkills.splice(index, 1);
    handleEditFieldChange(field, currentSkills);
  };

  const displayData = isEditing ? editFormData : profileData!;

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white">
        <div className="max-w-4xl mx-auto p-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate("/founder/dashboard")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>

            {/* Only show edit button for own profile */}
            {isOwnProfile && !isEditing && (
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2"
                >
                  <Edit3 className="h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            )}

            {isEditing && (
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setEditFormData(profileData!);
                  }}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* Profile Stats */}
          <Card className="mb-6 border-blue-200">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {profileData!.views_count || 0}
                  </div>
                  <div className="text-sm text-slate-600">Profile Views</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">
                    {profileData!.matches_count || 0}
                  </div>
                  <div className="text-sm text-slate-600">Matches</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {profileData!.interested_count || 0}
                  </div>
                  <div className="text-sm text-slate-600">Interests</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-600">
                    {profileData!.years_experience || 0}+
                  </div>
                  <div className="text-sm text-slate-600">Years Experience</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Left Column - Basic Info */}
            <div className="md:col-span-2 space-y-6">
              {/* Role & Bio */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                    About
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={displayData.current_role || ""}
                        onChange={(e) =>
                          handleEditFieldChange("current_role", e.target.value)
                        }
                        className="text-2xl font-bold text-slate-900 w-full p-2 border rounded"
                        placeholder="Enter your current role"
                      />
                    ) : (
                      <h2 className="text-2xl font-bold text-slate-900">
                        {displayData.current_role}
                      </h2>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-600">
                        {displayData.years_experience || 0} years experience
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-2">
                      Bio
                    </h3>
                    {isEditing ? (
                      <textarea
                        value={displayData.bio || ""}
                        onChange={(e) =>
                          handleEditFieldChange("bio", e.target.value)
                        }
                        className="w-full p-2 border rounded min-h-[120px]"
                        placeholder="Tell us about yourself..."
                      />
                    ) : (
                      <p className="text-slate-700 leading-relaxed">
                        {displayData.bio || "No bio provided"}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Skills */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-blue-600" />
                    Skills & Expertise
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-2">
                      Technical Skills
                    </h3>
                    {isEditing ? (
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Add a technical skill"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleAddSkill(
                                  "technical",
                                  e.currentTarget.value
                                );
                                e.currentTarget.value = "";
                              }
                            }}
                            className="flex-1 p-2 border rounded"
                          />
                          <Button
                            type="button"
                            size="sm"
                            onClick={(e) => {
                              const input = e.currentTarget
                                .previousElementSibling as HTMLInputElement;
                              handleAddSkill("technical", input.value);
                              input.value = "";
                            }}
                          >
                            Add
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {displayData.technical_skills?.map((skill, index) => (
                            <Badge key={index} className="px-3 py-1">
                              {skill}
                              <button
                                onClick={() =>
                                  handleRemoveSkill("technical", index)
                                }
                                className="ml-2 hover:text-red-500"
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {displayData.technical_skills?.map((skill, index) => (
                          <Badge key={index} className="px-3 py-1">
                            {skill}
                          </Badge>
                        )) || (
                          <p className="text-slate-500">
                            No technical skills listed
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-2">
                      Soft Skills
                    </h3>
                    {isEditing ? (
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Add a soft skill"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleAddSkill("soft", e.currentTarget.value);
                                e.currentTarget.value = "";
                              }
                            }}
                            className="flex-1 p-2 border rounded"
                          />
                          <Button
                            type="button"
                            size="sm"
                            onClick={(e) => {
                              const input = e.currentTarget
                                .previousElementSibling as HTMLInputElement;
                              handleAddSkill("soft", input.value);
                              input.value = "";
                            }}
                          >
                            Add
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {displayData.soft_skills?.map((skill, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="px-3 py-1"
                            >
                              {skill}
                              <button
                                onClick={() => handleRemoveSkill("soft", index)}
                                className="ml-2 hover:text-red-500"
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {displayData.soft_skills?.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="px-3 py-1"
                          >
                            {skill}
                          </Badge>
                        )) || (
                          <p className="text-slate-500">
                            No soft skills listed
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Looking For */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    Looking For
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-2">
                      Co-founder Roles
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {displayData.seeking_roles?.map((role, index) => (
                        <Badge
                          key={index}
                          className="px-3 py-1 bg-purple-100 text-purple-700"
                        >
                          {role}
                        </Badge>
                      )) || (
                        <p className="text-slate-500">
                          No specific roles sought
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-2">
                      Industries
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {displayData.industries?.map((industry, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="px-3 py-1"
                        >
                          {industry}
                        </Badge>
                      )) || (
                        <p className="text-slate-500">
                          No industries specified
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Details */}
            <div className="space-y-6">
              {/* Quick Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">
                        Location Preference
                      </p>
                      <p className="font-medium">
                        {displayData.location_preference || "Not specified"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Commitment</p>
                      <p className="font-medium">
                        {displayData.commitment_level || "Not specified"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Building className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">
                        Preferred Locations
                      </p>
                      <p className="font-medium">
                        {displayData.preferred_locations?.join(", ") ||
                          "Not specified"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-blue-600" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {displayData.achievements?.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                      <p className="text-sm text-slate-700">{achievement}</p>
                    </div>
                  )) || (
                    <p className="text-slate-500 text-sm">
                      No achievements listed
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Education & Links */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-blue-600" />
                    Background
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-2">
                      Education
                    </h3>
                    <div className="space-y-2">
                      {displayData.education?.map((edu, index) => (
                        <p key={index} className="text-sm text-slate-700">
                          {edu}
                        </p>
                      )) || (
                        <p className="text-slate-500 text-sm">
                          No education listed
                        </p>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-2">
                      Links
                    </h3>
                    <div className="space-y-2">
                      {displayData.linkedin_url && (
                        <a
                          href={displayData.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                        >
                          <Linkedin className="h-4 w-4" />
                          LinkedIn Profile
                          <ExternalLink className="h-3 w-3 ml-auto" />
                        </a>
                      )}
                      {displayData.portfolio_url && (
                        <a
                          href={displayData.portfolio_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                        >
                          <Globe className="h-4 w-4" />
                          Portfolio
                          <ExternalLink className="h-3 w-3 ml-auto" />
                        </a>
                      )}
                      {!displayData.linkedin_url &&
                        !displayData.portfolio_url && (
                          <p className="text-slate-500 text-sm">
                            No links provided
                          </p>
                        )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-semibold">
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {displayData.certifications?.map((cert, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="px-3 py-1"
                      >
                        {cert}
                      </Badge>
                    )) || (
                      <p className="text-slate-500 text-sm">
                        No certifications listed
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FounderProfile;
