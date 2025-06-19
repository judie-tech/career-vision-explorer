// Complete API types matching FastAPI backend schemas

export interface Job {
  job_id: string;
  title: string;
  company: string;
  requirements: string;
  location: string;
  salary_range?: string;
  posted_by: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  application_count?: number;
  posted_by_company?: string;
  // Enhanced fields
  job_type?: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Remote';
  experience_level?: 'Entry Level' | 'Mid Level' | 'Senior Level' | 'Executive';
  skills_required?: string[];
  description?: string;
  benefits?: string[];
  application_deadline?: string;
  remote_friendly?: boolean;
  // Profile information (from view)
  posted_by_name?: string;
  posted_by_email?: string;
  posted_by_account_type?: string;
}

export interface JobCreate {
  title: string;
  company: string;
  requirements: string[];
  location: string;
  salary_range?: string;
  job_type?: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Remote';
  experience_level?: 'Entry Level' | 'Mid Level' | 'Senior Level' | 'Executive';
  skills_required?: string[];
  description?: string;
  benefits?: string[];
  application_deadline?: string;
  remote_friendly?: boolean;
}

export interface JobUpdate {
  title?: string;
  company?: string;
  requirements?: string;
  location?: string;
  salary_range?: string;
  is_active?: boolean;
  job_type?: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Remote';
  experience_level?: 'Entry Level' | 'Mid Level' | 'Senior Level' | 'Executive';
  skills_required?: string[];
  description?: string;
  benefits?: string[];
  application_deadline?: string;
  remote_friendly?: boolean;
}

export interface Application {
  application_id: string;
  user_id: string;
  job_id: string;
  status: 'Pending' | 'Reviewed' | 'Accepted' | 'Rejected';
  applied_at: string;
  cover_letter?: string;
  notes?: string;
}

export interface ApplicationCreate {
  job_id: string;
  cover_letter?: string;
}

export interface ApplicationUpdate {
  status?: 'Pending' | 'Reviewed' | 'Accepted' | 'Rejected';
  notes?: string;
}

export interface Profile {
  user_id: string;
  name: string;
  email: string;
  password_hash: string;
  skills: string[];
  resume_link?: string;
  account_type: 'job_seeker' | 'employer' | 'admin';
  created_at: string;
  updated_at: string;
  // Enhanced fields
  bio?: string;
  location?: string;
  experience_years?: number;
  education?: string;
  phone?: string;
  linkedin_url?: string;
  github_url?: string;
  portfolio_url?: string;
  profile_image_url?: string;
  date_of_birth?: string;
  salary_expectation?: string;
  availability?: 'Available' | 'Not Available' | 'Available in 2 weeks' | 'Available in 1 month';
  preferred_job_type?: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Remote';
  work_authorization?: string;
  languages?: string[];
  certifications?: string[];
  work_experience?: Array<{
    company: string;
    position: string;
    duration: string;
    description: string;
  }>;
  projects?: Array<{
    name: string;
    description: string;
    tech_stack: string[];
    url?: string;
  }>;
  preferences?: Record<string, any>;
  profile_completion_percentage?: number;
}

export interface ProfileUpdate {
  name?: string;
  skills?: string[];
  resume_link?: string;
  bio?: string;
  location?: string;
  experience_years?: number;
  education?: string;
  phone?: string;
  linkedin_url?: string;
  github_url?: string;
  portfolio_url?: string;
  profile_image_url?: string;
  date_of_birth?: string;
  salary_expectation?: string;
  availability?: 'Available' | 'Not Available' | 'Available in 2 weeks' | 'Available in 1 month';
  preferred_job_type?: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Remote';
  work_authorization?: string;
  languages?: string[];
  certifications?: string[];
  work_experience?: Array<{
    company: string;
    position: string;
    duration: string;
    description: string;
  }>;
  projects?: Array<{
    name: string;
    description: string;
    tech_stack: string[];
    url?: string;
  }>;
  preferences?: Record<string, any>;
}

export interface Skill {
  skill_id: string;
  name: string;
  category: string;
  associated_jobs: string[];
  demand_level: 'High' | 'Medium' | 'Low';
  created_at: string;
  updated_at: string;
}

export interface SkillCreate {
  name: string;
  category: string;
  demand_level: 'High' | 'Medium' | 'Low';
  associated_jobs?: string[];
}

export interface Recommendation {
  recommendation_id: string;
  user_id: string;
  suggested_skill: string;
  rationale: string;
  is_read: boolean;
  created_at: string;
}

export interface InterviewQuestion {
  question: string;
  type: 'technical' | 'behavioral' | 'situational';
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface InterviewResponse {
  questions: InterviewQuestion[];
  session_id: string;
}

export interface SkillAssessment {
  skill_name: string;
  questions: string[];
  answers: number[];
}

export interface SkillAssessmentResult {
  skill_name: string;
  score: number;
  level: string;
  recommendations: string[];
}

export interface AIAnalysisRequest {
  resume_text?: string;
  job_description?: string;
  user_skills?: string[];
}

export interface AIAnalysisResponse {
  analysis: string;
  recommendations: string[];
  skill_gaps: string[];
  match_score?: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  jobs: T[];
  total: number;
  page: number;
  limit: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface ApiError {
  detail: string;
  status_code: number;
  type?: string;
}