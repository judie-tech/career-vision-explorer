// Auth types matching FastAPI backend schemas

export interface User {
  user_id: string;
  name: string;
  email: string;
  account_type: 'job_seeker' | 'employer' | 'admin' | 'freelancer';
  skills?: string[];
  resume_link?: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserRegister {
  name: string;
  email: string;
  password: string;
  account_type: 'job_seeker' | 'employer' | 'admin' | 'freelancer';
  // Optional fields for job seekers and freelancers
  career_goals?: string;
  skills?: string[];
  location?: string;
  experience_years?: number;
  bio?: string;
  // Generic preferences object that can hold role-specific data
  preferences?: Record<string, any>;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user_id: string;
  email: string;
  account_type: string;
  // Legacy support - will be removed in future versions
  expires_in?: number;
  user?: User;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface PasswordChangeRequest {
  current_password: string;
  new_password: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  new_password: string;
}

export interface AuthError {
  detail: string;
  status_code: number;
}