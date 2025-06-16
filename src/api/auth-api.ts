
import { getCurrentUser } from '@/lib/auth';

export interface AuthResponse {
  success: boolean;
  user?: any;
  token?: string;
  message?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'jobseeker' | 'employer' | 'subadmin';
  phoneNumber?: string;
  countryCode?: string;
  profileImage?: string;
}

export class AuthApi {
  private static baseUrl = '/api/auth';

  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simulate authentication check
    const user = getCurrentUser();
    if (user) {
      return {
        success: true,
        user,
        token: `auth_token_${Date.now()}`,
        message: 'Login successful'
      };
    }
    
    return {
      success: false,
      message: 'Invalid credentials'
    };
  }

  static async signup(userData: SignupRequest): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    try {
      // This would integrate with the auth system
      return {
        success: true,
        user: {
          id: Date.now().toString(),
          name: userData.name,
          email: userData.email,
          role: userData.role
        },
        token: `auth_token_${Date.now()}`,
        message: 'Account created successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create account'
      };
    }
  }

  static async logout(): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      success: true,
      message: 'Logged out successfully'
    };
  }

  static async refreshToken(): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const user = getCurrentUser();
    if (user) {
      return {
        success: true,
        token: `auth_token_${Date.now()}`,
        user
      };
    }
    
    return {
      success: false,
      message: 'Session expired'
    };
  }
}
