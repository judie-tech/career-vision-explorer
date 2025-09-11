import { apiClient } from "../lib/api-client";
import { Profile, ProfileUpdate } from "../types/api";
import { trackDbOperation } from "../utils/performance";

class ProfileService {
  async getProfile(): Promise<Profile> {
    return trackDbOperation("Load Profile", async () => {
      try {
        return await apiClient.getFast<Profile>("/profile/");
      } catch (error: any) {
        if (error.message?.includes("timed out")) {
          return await apiClient.get<Profile>("/profile/", { timeout: 45000 });
        }
        throw error;
      }
    });
  }

  async updateProfile(profileData: ProfileUpdate): Promise<Profile> {
    return await apiClient.put<Profile>("/profile/", profileData);
  }

  async getPublicProfile(userId: string) {
    return await apiClient.get(`/profile/${userId}`);
  }

  async updateCompanyProfile(companyData: any): Promise<void> {
    await apiClient.put("/company/", companyData);
  }

  async getProfileStats(): Promise<{
    total_jobs_posted: number;
    profile_completeness: number;
    recommendations_count: number;
  }> {
    return await apiClient.get("/profile/stats");
  }

  async addSkill(skill: string) {
    return await apiClient.post(`/profile/skills`, { skill });
  }

  async removeSkill(skill: string) {
    return await apiClient.delete(
      `/profile/skills/${encodeURIComponent(skill)}`
    );
  }

  async updateSkills(skills: string[]) {
    return await apiClient.put("/profile/skills", { skills });
  }

  async searchProfiles(params: {
    skills?: string[];
    account_type?: "job_seeker" | "employer" | "admin";
    limit?: number;
    offset?: number;
  }): Promise<Profile[]> {
    const queryParams = new URLSearchParams();
    if (params.skills)
      params.skills.forEach((s) => queryParams.append("skills", s));
    if (params.account_type)
      queryParams.append("account_type", params.account_type);
    if (params.limit) queryParams.append("limit", params.limit.toString());
    if (params.offset) queryParams.append("offset", params.offset.toString());

    const queryString = queryParams.toString();
    return await apiClient.get<Profile[]>(
      `/profile/search/profiles${queryString ? `?${queryString}` : ""}`
    );
  }

  async parseResume(file: File) {
    const response = await apiClient.uploadFile<any>(
      "/ai/upload-and-parse-cv",
      file
    );
    return response?.data || response;
  }
}

export const profileService = new ProfileService();
