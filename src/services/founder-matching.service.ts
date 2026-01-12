// src/services/founder-matching.service.ts
import { apiClient } from "../lib/api-client";
import { trackDbOperation } from "../utils/performance";

export interface CofounderProfile {
  profile_id?: string;
  user_id: string; // Change from optional to required
  name?: string;
  current_role: string;
  years_experience: number;
  technical_skills: string[];
  soft_skills: string[];
  seeking_roles: string[];
  industries: string[];
  commitment_level: "Full-time" | "Part-time" | "Flexible" | "Contract";
  location_preference: "Remote" | "Hybrid" | "On-site";
  preferred_locations: string[];
  achievements: string[];
  education: string[];
  certifications: string[];
  linkedin_url?: string;
  portfolio_url?: string;
  bio: string;
  is_active?: boolean;
  created_at?: string;
  views_count?: number;
  matches_count?: number;
  interested_count?: number;
  mutual_interest_count?: number;
  // Verification properties
  business_vision?: string;
  problem_statement?: string;
  required_skills?: string[];
  verification_status?: "verified" | "pending" | "rejected" | "unverified";
  verification_documents?: Array<{
    type: string;
    url: string;
    status: string;
  }>;
  verification_submitted_at?: string;
  verification_reviewed_at?: string;
}

export interface MatchProfile {
  match_id: string;
  matched_profile: {
    profile_id: string;
    user_id?: string;
    name?: string;
    current_role: string;
    years_experience: number;
    technical_skills: string[];
    seeking_roles: string[];
    education: string[];
    bio: string;
    linkedin_url?: string;
    portfolio_url?: string;
    achievements?: string[];
    soft_skills?: string[];
    industries?: string[];
    commitment_level?: string;
    location_preference?: string;
  };
  overall_score: number;
  score_breakdown: {
    skill_compatibility: number;
    experience_match: number;
    role_alignment: number;
  };
  status:
    | "suggested"
    | "interested"
    | "declined"
    | "mutual_interest"
    | "skipped";
  mutual_interest_at?: string;
}

export interface DiscoverMatchesRequest {
  limit?: number;
  min_score?: number;
  filters?: {
    industries?: string[];
    location_preferences?: string[];
    commitment_level?: string[];
    min_experience?: number;
    max_experience?: number;
  };
}

export interface MatchActionRequest {
  action: "interested" | "declined" | "skipped";
}

export interface MatchActionResponse {
  match_id: string;
  status: string;
  user_action: string;
  mutual_interest: boolean;
  message: string;
}

export interface MatchingPreferences {
  preferred_industries: string[];
  preferred_roles: string[];
  min_experience: number;
  max_experience: number;
  preferred_locations: string[];
  min_match_score: number;
  notification_frequency: "realtime" | "daily" | "weekly";
  auto_match: boolean;
}

export interface Statistics {
  total_matches: number;
  mutual_interests: number;
  profile_views: number;
  average_match_score: number;
  top_matching_industries: Array<{ industry: string; count: number }>;
  engagement_score: number;
}

class CofounderMatchingService {
  // Profile Management
  async createProfile(
    profileData: Omit<CofounderProfile, "profile_id" | "user_id">
  ): Promise<CofounderProfile> {
    return trackDbOperation("Create Cofounder Profile", async () => {
      return await apiClient.post<CofounderProfile>(
        "/cofounder-matching/profile",
        profileData
      );
    });
  }

  async getProfile(): Promise<CofounderProfile> {
    return trackDbOperation("Get Cofounder Profile", async () => {
      return await apiClient.get<CofounderProfile>(
        "/cofounder-matching/profile"
      );
    });
  }

  async updateProfile(
    profileData: Partial<CofounderProfile>
  ): Promise<CofounderProfile> {
    return await apiClient.put<CofounderProfile>(
      "/cofounder-matching/profile",
      profileData
    );
  }

  async deleteProfile(): Promise<void> {
    return await apiClient.delete("/cofounder-matching/profile");
  }

  // Match Discovery
  async discoverMatches(
    request: DiscoverMatchesRequest
  ): Promise<{ matches_found: number; matches: MatchProfile[] }> {
    return trackDbOperation("Discover Matches", async () => {
      return await apiClient.post<{
        matches_found: number;
        matches: MatchProfile[];
      }>("/cofounder-matching/discover", request);
    });
  }

  async getAllMatches(
    limit: number = 20,
    offset: number = 0
  ): Promise<{ matches: MatchProfile[]; total: number }> {
    return await apiClient.get<{ matches: MatchProfile[]; total: number }>(
      `/cofounder-matching/matches?limit=${limit}&offset=${offset}`
    );
  }

  async getMatchDetails(matchId: string): Promise<MatchProfile> {
    return await apiClient.get<MatchProfile>(
      `/cofounder-matching/matches/${matchId}`
    );
  }

  async getMutualMatches(): Promise<{ mutual_matches: MatchProfile[] }> {
    return await apiClient.get<{ mutual_matches: MatchProfile[] }>(
      "/cofounder-matching/matches/mutual"
    );
  }

  // Match Actions
  async handleMatchAction(
    matchId: string,
    action: MatchActionRequest
  ): Promise<MatchActionResponse> {
    return await apiClient.post<MatchActionResponse>(
      `/cofounder-matching/matches/${matchId}/action`,
      { action: action.action }
    );
  }

  // Preferences Management
  async setPreferences(
    preferences: MatchingPreferences
  ): Promise<MatchingPreferences> {
    return await apiClient.post<MatchingPreferences>(
      "/cofounder-matching/preferences",
      preferences
    );
  }

  async getPreferences(): Promise<MatchingPreferences> {
    return await apiClient.get<MatchingPreferences>(
      "/cofounder-matching/preferences"
    );
  }

  async updatePreferences(
    preferences: Partial<MatchingPreferences>
  ): Promise<MatchingPreferences> {
    return await apiClient.put<MatchingPreferences>(
      "/cofounder-matching/preferences",
      preferences
    );
  }

  // Statistics
  async getStatistics(): Promise<Statistics> {
    return await apiClient.get<Statistics>(
      "/cofounder-matching/statistics"
    );
  }

  // Quick stats for dashboard
  async getQuickStats(): Promise<{
    total_matches: number;
    mutual_interests: number;
    profile_views: number;
    profile_completeness: number;
  }> {
    const stats = await this.getStatistics();
    const profile = await this.getProfile().catch(() => null);

    // Calculate profile completeness
    let profileCompleteness = 0;
    if (profile) {
      const requiredFields: (keyof CofounderProfile)[] = [
        "current_role",
        "years_experience",
        "technical_skills",
        "soft_skills",
        "seeking_roles",
        "industries",
        "commitment_level",
        "location_preference",
        "preferred_locations",
        "bio",
      ];

      const filledFields = requiredFields.filter((field) => {
        const value = profile[field];
        return (
          value !== undefined &&
          value !== null &&
          (Array.isArray(value)
            ? value.length > 0
            : value.toString().trim().length > 0)
        );
      }).length;

      profileCompleteness = Math.round(
        (filledFields / requiredFields.length) * 100
      );
    }

    return {
      total_matches: stats.total_matches,
      mutual_interests: stats.mutual_interests,
      profile_views: stats.profile_views,
      profile_completeness: profileCompleteness,
    };
  }

  // Connect with a match (alias for interested action)
  async connect(matchId: string): Promise<MatchActionResponse> {
    return await apiClient.post<MatchActionResponse>(
      `/cofounder-matching/matches/${matchId}/connect`,
      {}
    );
  }

  // Follow/Unfollow Profile
  async followProfile(profileId: string): Promise<void> {
    return await apiClient.post(
      `/cofounder-matching/profiles/${profileId}/follow`,
      {}
    );
  }

  async unfollowProfile(profileId: string): Promise<void> {
    return await apiClient.delete(
      `/cofounder-matching/profiles/${profileId}/follow`
    );
  }

  async getFollowStats(profileId: string): Promise<{
    follower_count: number;
    following_count: number;
    is_following: boolean;
  }> {
    return await apiClient.get(
      `/cofounder-matching/profiles/${profileId}/follow-stats`
    );
  }

  async getMatchProfile(profileId: string): Promise<CofounderProfile> {
    return await apiClient.get(
      `/cofounder-matching/profiles/${profileId}`
    );
  }

  async getFollowing(): Promise<CofounderProfile[]> {
    return await apiClient.get(`/cofounder-matching/profiles/following`);
  }

  // Messaging
  async getConversations(
    limit: number = 20,
    offset: number = 0
  ): Promise<{
    conversations: Array<{
      conversation_id: string;
      match_id: string;
      last_message_at: string;
      unread_count: number;
      messages: Array<{
        message_id: string;
        sender_profile_id: string;
        message_text: string;
        is_read: boolean;
        created_at: string;
      }>;
      other_profile: CofounderProfile;
    }>;
    total: number;
    total_unread: number;
  }> {
    return await apiClient.get(
      `/cofounder-matching/conversations?limit=${limit}&offset=${offset}`
    );
  }

  async sendMessage(
    matchId: string,
    messageText: string
  ): Promise<{
    message_id: string;
    conversation_id: string;
    message_text: string;
    created_at: string;
  }> {
    return await apiClient.post(
      `/cofounder-matching/conversations/${matchId}/messages`,
      { message_text: messageText }
    );
  }

  async getMessages(
    conversationId: string,
    limit: number = 50,
    beforeId?: string
  ): Promise<
    Array<{
      message_id: string;
      sender_profile_id: string;
      message_text: string;
      is_read: boolean;
      created_at: string;
    }>
  > {
    let url = `/cofounder-matching/conversations/${conversationId}/messages?limit=${limit}`;
    if (beforeId) {
      url += `&before_id=${beforeId}`;
    }
    return await apiClient.get(url);
  }

  async markMessagesAsRead(conversationId: string): Promise<void> {
    return await apiClient.put(
      `/cofounder-matching/conversations/${conversationId}/read`,
      {}
    );
  }
}

export const cofounderMatchingService = new CofounderMatchingService();
