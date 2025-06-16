import { apiClient } from '../lib/api-client';

export interface InterviewQuestion {
  question: string;
  type: 'technical' | 'behavioral' | 'situational';
  difficulty: 'easy' | 'medium' | 'hard';
  category?: string;
  expected_answer?: string;
  tips?: string[];
  job_seeker_guidance?: string;
  employer_guidance?: string;
}

export interface InterviewQuestionRequest {
  job_id: string;
  question_type: 'technical' | 'behavioral' | 'both';
}

export interface InterviewStats {
  total_questions: number;
  questions_by_category: { [category: string]: number };
  questions_by_difficulty: { [difficulty: string]: number };
  average_preparation_time: number;
}

class InterviewService {
  // Get role-based interview questions
  async getInterviewQuestions(request: InterviewQuestionRequest): Promise<{
    categorized_questions: {
      Technical: Array<{
        question: string;
        guidance: string;
      }>;
    };
    company_name: string;
    job_title: string;
    user_role: string;
  }> {
    return apiClient.post('/interview/questions', request);
  }

  // Admin endpoint - get interview questions with both employer and candidate perspectives
  async getAdminInterviewQuestions(request: InterviewQuestionRequest): Promise<{
    job_title: string;
    company_name: string;
    categorized_questions: {
      [category: string]: Array<{
        question: string;
        employer_guidance: string;
        candidate_advice: string;
      }>;
    };
  }> {
    return apiClient.post('/interview/questions/admin', request);
  }

  // Get available question categories
  async getQuestionCategories(): Promise<string> {
    return apiClient.get('/interview/categories');
  }

  // Get interview statistics for a specific job (admin and employer only)
  async getInterviewStats(jobId: string): Promise<string> {
    return apiClient.get(`/interview/stats/${jobId}`);
  }

  // Enhanced AI-powered interview questions with detailed guidance
  async generateEnhancedInterviewQuestions(request: {
    job_id: string;
    question_type: 'technical' | 'behavioral' | 'both';
  }): Promise<{
    categorized_questions: {
      Behavioral: Array<{
        candidate_advice: string;
        employer_guidance: string;
        question: string;
      }>;
      Technical: Array<{
        candidate_advice: string;
        employer_guidance: string;
        question: string;
      }>;
    };
    company_name: string;
    job_title: string;
  }> {
    return apiClient.post('/ai/interview-questions', request);
  }

}

export const interviewService = new InterviewService();