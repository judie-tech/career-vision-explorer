import { apiClient } from '../lib/api-client';
import { 
  AIAnalysisRequest, 
  AIAnalysisResponse, 
  InterviewResponse, 
  InterviewQuestion 
} from '../types/api';

class AIService {
  // Resume analysis
  async analyzeResume(resumeText: string): Promise<AIAnalysisResponse> {
    const request: AIAnalysisRequest = { resume_text: resumeText };
    return await apiClient.post<AIAnalysisResponse>('/ai/analyze-resume', request);
  }

  // Job matching
  async analyzeJobMatch(jobDescription: string, userSkills?: string[]): Promise<AIAnalysisResponse> {
    const request: AIAnalysisRequest = { 
      job_description: jobDescription,
      user_skills: userSkills 
    };
    return await apiClient.post<AIAnalysisResponse>('/ai/job-match', request);
  }

  // Skill gap analysis
  async analyzeSkillGap(jobDescription: string): Promise<{
    skill_gaps: string[];
    recommendations: string[];
    learning_resources: Array<{
      skill: string;
      resources: string[];
      priority: 'high' | 'medium' | 'low';
    }>;
  }> {
    return await apiClient.post('/ai/skill-gap', { job_description: jobDescription });
  }

  // Career path recommendations
  async getCareerPathRecommendations(): Promise<{
    recommended_paths: Array<{
      title: string;
      description: string;
      required_skills: string[];
      salary_range: string;
      growth_potential: number;
    }>;
    reasoning: string;
  }> {
    return await apiClient.get('/ai/career-paths');
  }

  // Interview preparation
  async generateInterviewQuestions(role: string, experience_level?: string): Promise<InterviewResponse> {
    return await apiClient.post<InterviewResponse>('/ai/interview-questions', {
      role,
      experience_level: experience_level || 'mid'
    });
  }

  async generateRoleBasedQuestions(role: string): Promise<InterviewResponse> {
    return await apiClient.post<InterviewResponse>('/interview/generate-questions', { role });
  }

  // Cover letter generation
  async generateCoverLetter(jobDescription: string, userProfile?: any): Promise<{
    cover_letter: string;
    tips: string[];
  }> {
    return await apiClient.post('/ai/cover-letter', {
      job_description: jobDescription,
      user_profile: userProfile
    });
  }

  // Skills analysis from text
  async extractSkillsFromText(text: string): Promise<{
    skills: string[];
    categories: { [skill: string]: string };
    confidence_scores: { [skill: string]: number };
  }> {
    return await apiClient.post('/ai/extract-skills', { text });
  }

  // Job description analysis
  async analyzeJobDescription(jobDescription: string): Promise<{
    required_skills: string[];
    preferred_skills: string[];
    experience_level: string;
    role_type: string;
    salary_estimate?: string;
    company_insights?: string[];
  }> {
    return await apiClient.post('/ai/analyze-job-description', {
      job_description: jobDescription
    });
  }

  // Personalized recommendations
  async getPersonalizedRecommendations(): Promise<{
    job_recommendations: Array<{
      job_id: string;
      match_score: number;
      reasons: string[];
    }>;
    skill_recommendations: string[];
    learning_recommendations: Array<{
      skill: string;
      resources: string[];
      priority: number;
    }>;
  }> {
    return await apiClient.get('/ai/recommendations');
  }

  // Gemini-powered features
  async geminiSkillAnalysis(skills: string[]): Promise<{
    analysis: string;
    strengths: string[];
    improvement_areas: string[];
    market_insights: string[];
  }> {
    return await apiClient.post('/gemini/analyze-skills', { skills });
  }

  async geminiCareerAdvice(profile: any): Promise<{
    advice: string;
    action_items: string[];
    resources: string[];
  }> {
    return await apiClient.post('/gemini/career-advice', { profile });
  }

  // Chat with AI assistant
  async chatWithAI(message: string, context?: any): Promise<{
    response: string;
    suggestions: string[];
    context: any;
  }> {
    return await apiClient.post('/ai/chat', {
      message,
      context
    });
  }

  // CV upload and parsing
  async uploadAndParseCV(file: File): Promise<{
    status: string;
    parsed_data: {
      name?: string;
      email?: string;
      phone?: string;
      skills?: string[];
      experience?: any[];
      education?: any[];
      summary?: string;
      [key: string]: any;
    };
    profile_updated?: boolean;
    message?: string;
  }> {
    const formData = new FormData();
    formData.append('file', file);
    
    return await apiClient.post('/ai/upload-and-parse-cv', formData);
  }

  // Check if user has uploaded CV
  async checkIfCVParsed(): Promise<boolean> {
    try {
      const profile = await apiClient.get<any>('/profile/');
      return !!profile.resume_link || !!profile.resume_analysis;
    } catch (error) {
      console.error('Error checking CV status:', error);
      return false;
    }
  }
}

export const aiService = new AIService();
