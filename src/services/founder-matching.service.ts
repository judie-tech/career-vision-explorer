import { apiClient } from "../lib/api-client";
import { trackDbOperation } from "../utils/performance";

export interface FounderProfile {
  profile_id?: string;
  user_id: string;
  business_vision: string;
  problem_statement: string;
  required_skills: string[];
  location?: string;
  time_commitment?: "Part-time" | "Full-time" | "Flexible";
  funding_status?:
    | "Bootstrapped"
    | "Seed"
    | "Series A"
    | "Series B+"
    | "Seeking";
  industry?: string;
  stage?: "Idea" | "Prototype" | "MVP" | "Revenue" | "Scaling";
  verification_status?: "unverified" | "pending" | "verified" | "rejected";
  created_at?: string;
  updated_at?: string;
}

export interface MatchProfile extends FounderProfile {
  match_score: number;
  vision_similarity: number;
  skills_compatibility: number;
  is_viewed?: boolean;
  match_status?: "pending" | "interest" | "declined" | "mutual_interest";
}

export interface MatchActionRequest {
  target_user_id: string;
  action: "view" | "interest" | "decline";
}

export interface MatchActionResponse {
  is_mutual: boolean;
  match_status: "pending" | "interest" | "declined" | "mutual_interest";
  message: string;
}

export interface MatchActionRequest {
  target_user_id: string;
  action: "view" | "interest" | "decline";
}

export interface FindMatchesRequest {
  min_score?: number;
  location_preference?: string;
  time_commitment?: string;
  funding_status?: string;
  limit?: number;
  offset?: number;
}

export interface VerificationRequest {
  additional_notes?: string;
  documents?: string[];
}

export interface VerificationResponse {
  status: "unverified" | "pending" | "verified" | "rejected";
  notes?: string;
  reviewed_at?: string;
}

class FounderMatchingService {
  // Profile Management
  async createProfile(
    profileData: Omit<FounderProfile, "user_id" | "profile_id">
  ): Promise<FounderProfile> {
    return trackDbOperation("Create Founder Profile", async () => {
      return await apiClient.post<FounderProfile>(
        "/founder-matching/profile",
        profileData
      );
    });
  }

  async getProfile(): Promise<FounderProfile> {
    return trackDbOperation("Get Founder Profile", async () => {
      return await apiClient.get<FounderProfile>("/founder-matching/profile");
    });
  }

  async updateProfile(
    profileData: Partial<FounderProfile>
  ): Promise<FounderProfile> {
    return await apiClient.put<FounderProfile>(
      "/founder-matching/profile",
      profileData
    );
  }

  // Match Discovery
  async findMatches(filters?: FindMatchesRequest): Promise<MatchProfile[]> {
    return trackDbOperation("Find Matches", async () => {
      return await apiClient.post<MatchProfile[]>(
        "/founder-matching/find-matches",
        filters || {}
      );
    });
  }

  async getMutualMatches(): Promise<MatchProfile[]> {
    return await apiClient.get<MatchProfile[]>(
      "/founder-matching/matches/mutual"
    );
  }

  // Match Actions
  async handleMatchAction(
    request: MatchActionRequest
  ): Promise<MatchActionResponse> {
    return await apiClient.post<MatchActionResponse>(
      "/founder-matching/matches/action",
      request
    );
  }

  // Verification
  async submitVerification(
    request?: VerificationRequest
  ): Promise<VerificationResponse> {
    return await apiClient.post<VerificationResponse>(
      "/founder-matching/verification/submit",
      request || {}
    );
  }

  async getVerificationStatus(): Promise<VerificationResponse> {
    return await apiClient.get<VerificationResponse>(
      "/founder-matching/verification/status"
    );
  }

  // Stats
  async getMatchStats(): Promise<{
    total_views: number;
    total_matches: number;
    mutual_interests: number;
    profile_completeness: number;
  }> {
    return await apiClient.get("/founder-matching/stats");
  }
}

export const founderMatchingService = new FounderMatchingService();
