
import { useState, createContext, useContext, ReactNode, useEffect } from 'react';
import { useAuth } from './use-auth';
import { toast } from "@/components/ui/sonner";
import { Profile, ProfileUpdate } from '../types/api';
import { profileService } from '../services/profile.service';

export type UserProfile = Profile;

type UserProfileContextType = {
  userProfile: UserProfile | null;
  updateProfile: (profileData: ProfileUpdate) => Promise<boolean>;
  isLoading: boolean;
  refreshProfile: () => Promise<void>;
};

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

const mockUserProfile: UserProfile = {
  user_id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
  password_hash: "",
  account_type: "job_seeker",
  skills: ["JavaScript", "React", "Node.js"],
  created_at: "2024-01-15T00:00:00Z",
  updated_at: "2024-01-15T00:00:00Z",
  bio: "Passionate software engineer with expertise in React, Node.js, and cloud technologies.",
  location: "Nairobi, Kenya",
  experience_years: 5,
  education: "BSc Computer Science, University of Nairobi",
  phone: "+254 700 123 456",
  profile_completion_percentage: 85,
  availability: "Available",
  preferred_job_type: "Full-time",
  languages: ["English", "Swahili"],
  certifications: [],
  work_experience: [],
  projects: []
};

export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const refreshProfile = async () => {
    setIsLoading(true);
    try {
      const profile = await profileService.getProfile();
      setUserProfile(profile);
    } catch (error) {
      console.error("Failed to load profile:", error);
      // Fallback to mock profile if API is not available
      setUserProfile(mockUserProfile);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (profileData: ProfileUpdate): Promise<boolean> => {
    setIsLoading(true);
    try {
      console.log("Updating profile with:", profileData);
      
      const updatedProfile = await profileService.updateProfile(profileData);
      setUserProfile(updatedProfile);
      
      toast.success("Profile updated successfully");
      return true;
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile");
      
      // Update local state on API failure for better UX
      if (userProfile) {
        const localUpdate = { ...userProfile, ...profileData };
        setUserProfile(localUpdate);
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Load profile on mount
  useEffect(() => {
    if (isAuthenticated) {
      refreshProfile();
    }
  }, [isAuthenticated]);

  return (
    <UserProfileContext.Provider value={{
      userProfile,
      updateProfile,
      isLoading,
      refreshProfile,
    }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
};
