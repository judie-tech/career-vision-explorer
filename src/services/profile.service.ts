import { apiClient } from '../lib/api-client';
import { Profile, ProfileUpdate } from '../types/api';
import { trackDbOperation } from '../utils/performance';

class ProfileService {
  async getProfile(): Promise<Profile> {
    return trackDbOperation('Load Profile', async () => {
      // Try fast timeout first
      try {
        return await apiClient.getFast<Profile>('/profile/');
      } catch (error) {
        if (error.message?.includes('timed out')) {
          console.log('Fast profile request timed out, trying with longer timeout...');
          return await apiClient.get<Profile>('/profile/', { timeout: 45000 }); // Fixed timeout syntax
        }
        throw error;
      }
    });
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

  async updateSkills(skills: string[]): Promise<{ message: string }> {
    return await apiClient.put('/profile/skills', { skills });
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

  async uploadAndParseCv(file: File): Promise<any> {
    const response = await apiClient.uploadFile<any>('/ai/upload-and-parse-cv', file);
    return response.data;
  }

  async parseResume(file: File): Promise<{
    updated_profile: Profile;
    parsed_data: any;
    cv_file_url: string;
  }> {
    const response = await apiClient.uploadFile<any>('/ai/upload-and-parse-cv', file);
    // The backend wraps the actual data in a 'data' field
    if (response && response.data) {
      return response.data;
    }
    // Fallback if response structure is different
    return response;
  }
}

export const profileService = new ProfileService();