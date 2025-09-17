import { apiClient } from '../lib/api-client';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { 
  User, 
  UserLogin, 
  UserRegister, 
  TokenResponse, 
  RefreshTokenRequest,
  PasswordChangeRequest,
  PasswordResetRequest,
  PasswordResetConfirm,
} from "../types/auth";
import { trackDbOperation } from "../utils/performance";

class AuthService {
  private setSession(tokenResponse: TokenResponse): User {
    if (!tokenResponse.access_token) throw new Error("Missing access_token");

    apiClient.setToken(tokenResponse.access_token);
    localStorage.setItem("refresh_token", tokenResponse.refresh_token);

    const user: User = {
      user_id: tokenResponse.user_id,
      name: tokenResponse.user?.name || "",
      email: tokenResponse.email,
      account_type: tokenResponse.account_type,
      skills: tokenResponse.user?.skills,
      resume_link: tokenResponse.user?.resume_link,
    };

    localStorage.setItem("user", JSON.stringify(user));
    return user;
  }

  async register(userData: UserRegister): Promise<TokenResponse> {
    const response = await apiClient.post<TokenResponse>(
      "/auth/register",
      userData
    );
    this.setSession(response);
    return response;
  }

  async login(credentials: UserLogin): Promise<TokenResponse> {
    return trackDbOperation("User Login", async () => {
      const response = await apiClient.post<TokenResponse>(
        "/auth/login",
        credentials
      );
      this.setSession(response);
      return response;
    });
  }

  async logout(): Promise<void> {
    apiClient.setToken(null);
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    localStorage.removeItem("visiondrillImpersonation");
  }

  async refreshToken(): Promise<TokenResponse> {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) throw new Error("No refresh token available");

    const request: RefreshTokenRequest = { refresh_token: refreshToken };
    const response = await apiClient.post<TokenResponse>(
      "/auth/refresh",
      request
    );
    this.setSession(response);
    return response;
  }

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<{
      user_id: string;
      email: string;
      account_type: string;
    }>("/auth/me");
    return {
      user_id: response.user_id,
      name: "",
      email: response.email,
      account_type: response.account_type as User["account_type"],
    };
  }

  isAuthenticated(): boolean {
    return !!(apiClient.getToken() && this.getStoredUser());
  }

  getStoredUser(): User | null {
    const userStr = localStorage.getItem("user");
    if (userStr && userStr !== "undefined") {
      try {
        return JSON.parse(userStr);
      } catch {
        localStorage.removeItem("user");
      }
    }
    return null;
  }

  setStoredUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  setStoredTokens(accessToken: string, refreshToken: string): void {
    apiClient.setToken(accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }

  hasRole(role: 'job_seeker' | 'employer' | 'admin' | 'freelancer'): boolean {
    const user = this.getStoredUser();
    return user?.account_type === role;
  }

  isAdmin(): boolean {
    return this.hasRole('admin');
  }

  isEmployer(): boolean {
    return this.hasRole('employer');
  }

  isJobSeeker(): boolean {
    return this.hasRole('job_seeker');
  }

  isFreelancer(): boolean {
    return this.hasRole('freelancer');
  }

  // LinkedIn OAuth authentication using Supabase
async signInWithLinkedIn(): Promise<void> {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error('Supabase is not configured. Please check your environment variables.');
  }

  try {
    // Specify the callback URL to ensure proper redirect
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'linkedin_oidc',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) {
      throw new Error(`LinkedIn authentication failed: ${error.message}`);
    }

    console.log('LinkedIn OAuth initiated:', data);
  } catch (error: any) {
    console.error('LinkedIn OAuth error:', error);
    throw new Error(error.message || 'Failed to initiate LinkedIn authentication');
  }
}

  // Handle OAuth callback and exchange Supabase session for our backend tokens
  async handleOAuthCallback(): Promise<TokenResponse> {
    if (!isSupabaseConfigured() || !supabase) {
      throw new Error('Supabase is not configured. Please check your environment variables.');
    }

    try {
      // Get the session from Supabase
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        throw new Error(`Failed to get session: ${error.message}`);
      }

      if (!session) {
        throw new Error('No active session found. Please try logging in again.');
      }

      // Extract user information from Supabase session
      const supabaseUser = session.user;
      const linkedinProfile = supabaseUser.user_metadata;

      // Create or get user in our backend system
      const userData = {
        email: supabaseUser.email!,
        name: linkedinProfile?.full_name || linkedinProfile?.name || 'LinkedIn User',
        linkedin_id: supabaseUser.id,
        account_type: 'job_seeker' as const, // Default to job_seeker, can be changed later
      };

      // Exchange Supabase session for our backend tokens
      const response = await apiClient.post<TokenResponse>('/auth/oauth/linkedin', {
        supabase_user_id: supabaseUser.id,
        email: supabaseUser.email,
        name: userData.name,
        linkedin_data: linkedinProfile,
      });

      // Store tokens and user data
      if (response.access_token) {
        apiClient.setToken(response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        
        const user: User = {
          user_id: response.user_id,
          name: userData.name,
          email: response.email,
          account_type: response.account_type as 'job_seeker' | 'employer' | 'admin' | 'freelancer'
        };
        localStorage.setItem('user', JSON.stringify(user));
      }

      // Sign out from Supabase to clean up
      await supabase.auth.signOut();

      return response;
    } catch (error: any) {
      console.error('OAuth callback error:', error);
      throw new Error(error.message || 'Failed to complete LinkedIn authentication');
    }
  }

  // Check if we're in an OAuth callback flow
  isOAuthCallback(): boolean {
    return window.location.pathname === '/auth/callback';
  }
}

export const authService = new AuthService();
