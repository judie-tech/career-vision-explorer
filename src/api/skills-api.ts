
export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number; // 1-100
  verified: boolean;
  endorsements: number;
  lastAssessed?: string;
}

export interface SkillAssessment {
  id: string;
  skillId: string;
  skillName: string;
  score: number;
  completedAt: string;
  certificate?: string;
  questions: AssessmentQuestion[];
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  userAnswer?: number;
}

export class SkillsApi {
  private static baseUrl = '/api/skills';

  static async getUserSkills(): Promise<Skill[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return [
      {
        id: "1",
        name: "React",
        category: "Frontend",
        level: 85,
        verified: true,
        endorsements: 12,
        lastAssessed: "2024-06-01",
      },
      {
        id: "2",
        name: "TypeScript",
        category: "Programming",
        level: 78,
        verified: false,
        endorsements: 8,
        lastAssessed: "2024-05-15",
      }
    ];
  }

  static async getSkillAssessments(): Promise<SkillAssessment[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return [
      {
        id: "1",
        skillId: "1",
        skillName: "React",
        score: 85,
        completedAt: "2024-06-01",
        questions: [],
      }
    ];
  }

  static async startSkillAssessment(skillId: string): Promise<AssessmentQuestion[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        id: "1",
        question: "What is JSX in React?",
        options: [
          "A JavaScript extension",
          "A CSS framework",
          "A database",
          "A testing library"
        ],
        correctAnswer: 0,
      }
    ];
  }

  static async submitSkillAssessment(skillId: string, answers: number[]): Promise<SkillAssessment> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      id: Date.now().toString(),
      skillId,
      skillName: "React",
      score: 85,
      completedAt: new Date().toISOString(),
      questions: [],
    };
  }

  static async addSkill(skillName: string, category: string): Promise<Skill> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      id: Date.now().toString(),
      name: skillName,
      category,
      level: 0,
      verified: false,
      endorsements: 0,
    };
  }
}
