import { apiClient } from '../lib/api-client';
import { Profile, ProfileUpdate } from '../types/api';

class ProfileService {
  async getProfile(): Promise<Profile> {
    return await apiClient.get<Profile>('/profile/');
  }

  async updateProfile(profileData: ProfileUpdate): Promise<Profile> {
    return await apiClient.put<Profile>('/profile/', profileData);
  }

  async getPublicProfile(userId: string): Promise<{
    user_id: string;
    name: string;
    skills: string[];
    account_type: string;
    created_at: string;
  }> {
    return await apiClient.get(`/profile/${userId}`);
  }

  // Get profile statistics
  async getProfileStats(): Promise<{
    total_applications: number;
    total_jobs_posted: number;
    profile_completeness: number;
    recommendations_count: number;
  }> {
    return await apiClient.get('/profile/stats');
  }

  // Skills management
  async addSkill(skill: string): Promise<{ message: string }> {
    return await apiClient.post(`/profile/skills`, { skill });
  }

  async removeSkill(skill: string): Promise<{ message: string }> {
    return await apiClient.delete(`/profile/skills/${encodeURIComponent(skill)}`);
  }

  // Search profiles with filters
  async searchProfiles(params: {
    skills?: string[];
    account_type?: 'job_seeker' | 'employer' | 'admin';
    limit?: number;
    offset?: number;
  }): Promise<Profile[]> {
    const queryParams = new URLSearchParams();
    
    if (params.skills) {
      params.skills.forEach(skill => queryParams.append('skills', skill));
    }
    if (params.account_type) {
      queryParams.append('account_type', params.account_type);
    }
    if (params.limit) {
      queryParams.append('limit', params.limit.toString());
    }
    if (params.offset) {
      queryParams.append('offset', params.offset.toString());
    }
    
    const queryString = queryParams.toString();
    const endpoint = queryString ? `/profile/search/profiles?${queryString}` : '/profile/search/profiles';
    
    return await apiClient.get<Profile[]>(endpoint);
  }

}

export const profileService = new ProfileService();