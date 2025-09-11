import { apiClient } from "../lib/api-client";
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
    localStorage.setItem("user", JSON.stringify(user));
  }
}

export const authService = new AuthService();
