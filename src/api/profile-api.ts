
import { getCurrentUser } from '@/lib/auth';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  education: string;
  experience: string;
  location?: string;
  phone?: string;
  bio?: string;
  profileImage?: string;
  joinDate: string;
  profileComplete: number;
  skills?: string[];
  resume?: string;
  portfolio?: string;
  linkedIn?: string;
  github?: string;
  website?: string;
  lastActive: string;
  isVerified: boolean;
  preferences?: {
    jobTypes: string[];
    salaryRange: { min: number; max: number };
    remoteWork: boolean;
    willingToRelocate: boolean;
  };
}

export interface ProfileUpdateData {
  name?: string;
  email?: string;
  role?: string;
  education?: string;
  experience?: string;
  location?: string;
  phone?: string;
  bio?: string;
  profileImage?: string;
  skills?: string[];
  portfolio?: string;
  linkedIn?: string;
  github?: string;
  website?: string;
  preferences?: UserProfile['preferences'];
}

export class ProfileApi {
  private static baseUrl = '/api/profile';

  static async getProfile(): Promise<UserProfile> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const currentUser = getCurrentUser();
    if (!currentUser) {
      throw new Error('Authentication required');
    }
    
    // Get additional profile data from localStorage
    const profileData = localStorage.getItem(`visiondrillProfile_${currentUser.id}`);
    const additionalData = profileData ? JSON.parse(profileData) : {};
    
    return {
      id: currentUser.id,
      name: currentUser.name,
      email: currentUser.email,
      role: currentUser.role,
      education: "BSc Computer Science, University of Nairobi",
      experience: "5+ years experience in software development",
      location: "Nairobi, Kenya",
      phone: additionalData.phoneNumber || "+254 700 123 456",
      bio: "Passionate software engineer with expertise in React, Node.js, and cloud technologies. Always eager to learn and tackle new challenges.",
      profileImage: additionalData.profileImage || "/placeholder.svg",
      joinDate: "2024-01-15",
      profileComplete: 85,
      skills: ["React", "JavaScript", "TypeScript", "Node.js", "Python", "AWS"],
      resume: "resume_john_doe.pdf",
      portfolio: "https://johndoe.dev",
      linkedIn: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
      website: "https://johndoe.dev",
      lastActive: new Date().toISOString(),
      isVerified: true,
      preferences: {
        jobTypes: ["Full-time", "Contract"],
        salaryRange: { min: 100000, max: 200000 },
        remoteWork: true,
        willingToRelocate: false
      }
    };
  }

  static async updateProfile(data: ProfileUpdateData): Promise<UserProfile> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const currentUser = getCurrentUser();
    if (!currentUser) {
      throw new Error('Authentication required');
    }
    
    // Update additional profile data in localStorage
    const profileData = localStorage.getItem(`visiondrillProfile_${currentUser.id}`);
    const existingData = profileData ? JSON.parse(profileData) : {};
    const updatedData = { ...existingData, ...data };
    localStorage.setItem(`visiondrillProfile_${currentUser.id}`, JSON.stringify(updatedData));
    
    console.log('Profile updated:', data);
    
    // Return updated profile
    return this.getProfile();
  }

  static async uploadProfileImage(imageFile: File): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const currentUser = getCurrentUser();
    if (!currentUser) {
      throw new Error('Authentication required');
    }
    
    // Mock image upload - in real app would upload to cloud storage
    const imageUrl = URL.createObjectURL(imageFile);
    console.log('Profile image uploaded:', imageUrl);
    
    return imageUrl;
  }

  static async uploadResume(resumeFile: File): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 1800));
    
    const currentUser = getCurrentUser();
    if (!currentUser) {
      throw new Error('Authentication required');
    }
    
    const resumeId = `resume_${currentUser.id}_${Date.now()}.pdf`;
    console.log('Resume uploaded:', resumeId);
    
    return resumeId;
  }

  static async deleteProfile(): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const currentUser = getCurrentUser();
    if (!currentUser) {
      throw new Error('Authentication required');
    }
    
    // In real app, would delete all user data
    localStorage.removeItem(`visiondrillProfile_${currentUser.id}`);
    console.log('Profile deleted for user:', currentUser.id);
    
    return true;
  }
}
