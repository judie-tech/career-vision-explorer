
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
}

export class ProfileApi {
  private static baseUrl = '/api/profile';

  static async getProfile(): Promise<UserProfile> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Senior Software Engineer",
      education: "BSc Computer Science, University of Nairobi",
      experience: "5+ years experience",
      location: "Nairobi, Kenya",
      phone: "+254 700 123 456",
      bio: "Passionate software engineer with expertise in React, Node.js, and cloud technologies.",
      joinDate: "2024-01-15",
      profileComplete: 85,
      skills: ["React", "JavaScript", "TypeScript", "Node.js"],
    };
  }

  static async updateProfile(data: ProfileUpdateData): Promise<UserProfile> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Mock updated profile
    return {
      id: "1",
      name: data.name || "John Doe",
      email: data.email || "john.doe@example.com",
      role: data.role || "Senior Software Engineer",
      education: data.education || "BSc Computer Science",
      experience: data.experience || "5+ years experience",
      location: data.location || "Nairobi, Kenya",
      phone: data.phone || "+254 700 123 456",
      bio: data.bio || "Passionate software engineer",
      joinDate: "2024-01-15",
      profileComplete: 90,
      skills: data.skills || ["React", "JavaScript"],
    };
  }

  static async uploadProfileImage(imageFile: File): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock image URL
    return URL.createObjectURL(imageFile);
  }

  static async uploadResume(resumeFile: File): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return `resume_${Date.now()}.pdf`;
  }
}
