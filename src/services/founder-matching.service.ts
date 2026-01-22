// src/services/founder-matching.service.ts
import { apiClient } from "../lib/api-client";

export interface CofounderProfile {
  profile_id?: string;
  user_id?: string;
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
  photos?: string[]; // Added for profile photos
}

export interface MatchProfile {
  match_id: string;
  matched_profile: {
    profile_id: string;
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
    photos?: string[];
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

export interface Statistics {
  total_matches: number;
  mutual_interests: number;
  profile_views: number;
  average_match_score: number;
  top_matching_industries: Array<{ industry: string; count: number }>;
  engagement_score: number;
}

export interface PhotoUploadResponse {
  photo_url: string;
  photo_count: number;
}

export interface PhotoUploadStatus {
  uploaded: boolean;
  photos: string[];
}

export interface ConversationListResponse {
  conversations: Array<{
    conversation_id: string;
    match_profile: CofounderProfile;
    last_message: string;
    unread_count: number;
  }>;
}

export interface Message {
  message_id: string;
  sender_id: string;
  text: string;
  timestamp: string;
}

class CofounderMatchingService {
  // ==================== Profile Management ====================
  async createProfile(
    profileData: Omit<CofounderProfile, "profile_id" | "user_id">,
  ): Promise<CofounderProfile> {
    return await apiClient.post<CofounderProfile>(
      "/api/v1/cofounder-matching/profile",
      profileData,
    );
  }

  async getProfile(): Promise<CofounderProfile> {
    return await apiClient.get<CofounderProfile>(
      "/api/v1/cofounder-matching/profile",
    );
  }

  async updateProfile(
    profileData: Partial<CofounderProfile>,
  ): Promise<CofounderProfile> {
    return await apiClient.put<CofounderProfile>(
      "/api/v1/cofounder-matching/profile",
      profileData,
    );
  }

  // ==================== Photo Management ====================
  async uploadPhoto(file: File): Promise<PhotoUploadResponse> {
    return await apiClient.uploadFile<PhotoUploadResponse>(
      "/cofounder-matching/profile/photos",
      file,
    );
  }

  async getPhotoStatus(): Promise<PhotoUploadStatus> {
    return await apiClient.get<PhotoUploadStatus>(
      "/cofounder-matching/profile/photos",
    );
  }

  async deletePhoto(
    photoUrl: string,
  ): Promise<{ status: string; photo_count: number }> {
    return await apiClient.delete<{ status: string; photo_count: number }>(
      `/cofounder-matching/profile/photos?photoUrl=${encodeURIComponent(photoUrl)}`,
    );
  }

  // ==================== Match Discovery ====================
  async discoverMatches(
    request: DiscoverMatchesRequest,
  ): Promise<{ matches_found: number; matches: MatchProfile[] }> {
    return await apiClient.post<{
      matches_found: number;
      matches: MatchProfile[];
    }>("/api/v1/cofounder-matching/discover", request);
  }

  // ==================== Swipe Actions ====================
  async swipeRight(matchId: string): Promise<MatchActionResponse> {
    return await apiClient.post<MatchActionResponse>(
      `/api/v1/cofounder-matching/matches/${matchId}/action`,
      { action: "interested" },
    );
  }

  async swipeLeft(matchId: string): Promise<MatchActionResponse> {
    return await apiClient.post<MatchActionResponse>(
      `/api/v1/cofounder-matching/matches/${matchId}/action`,
      { action: "declined" },
    );
  }

  // ==================== Matches ====================
  async getMutualMatches(): Promise<{ mutual_matches: MatchProfile[] }> {
    return await apiClient.get<{ mutual_matches: MatchProfile[] }>(
      "/api/v1/cofounder-matching/matches/mutual",
    );
  }

  async getPendingInterests(): Promise<{ pending_matches: MatchProfile[] }> {
    return await apiClient.get<{ pending_matches: MatchProfile[] }>(
      "/api/v1/cofounder-matching/pending-interests",
    );
  }

  // ==================== Messaging ====================
  async getConversations(
    limit = 20,
    offset = 0,
  ): Promise<ConversationListResponse> {
    const params = new URLSearchParams({
      limit: limit.toString(),
      offset: offset.toString(),
    });
    return await apiClient.get<ConversationListResponse>(
      `/cofounder-matching/conversations?${params.toString()}`,
    );
  }

  async getMessages(conversationId: string, limit = 50): Promise<Message[]> {
    const params = new URLSearchParams({ limit: limit.toString() });
    return await apiClient.get<Message[]>(
      `/cofounder-matching/conversations/${conversationId}/messages?${params.toString()}`,
    );
  }

  async sendMessage(matchId: string, messageText: string): Promise<Message> {
    return await apiClient.post<Message>(
      `/cofounder-matching/conversations/${matchId}/messages`,
      { text: messageText },
    );
  }

  // ==================== Statistics ====================
  async getStatistics(): Promise<Statistics> {
    return await apiClient.get<Statistics>(
      "/api/v1/cofounder-matching/statistics",
    );
  }
}

export const cofounderMatchingService = new CofounderMatchingService();
