import { getCurrentUser } from "@/lib/auth";
import { AIJobMatchRequest } from "@/services/ai-job-matching.service";
import { apiClient } from "@/lib/api-client";

export interface AIMatchRequest {
    skills: string[];
    location_preference?: string;
    salary_expectation?: string;
}

export interface AIJobMatch {
job_id: string;
title: string;
company: string;
location: string;
salary_range?: string;
match_score?: number;
matched_skills?: string[] | null;
created_at: string;

}

export interface JobMatchResponse {
    jobs: AIJobMatch[];
    total: number;
    page?: number;
    limit?: number;
}

export class JobMatchService {
    
    private static baseUrl = '/api/jobs/ai-match';

    static async getAiJobMatches(request: AIMatchRequest): Promise<AIJobMatch[]> {
        if (!getCurrentUser()) {
            throw new Error("Authentication required");
        } 
       // const query = skills.map((s) => `skills=${encodeURIComponent(s)}`).join("&");
        const query = new URLSearchParams();
        request.skills.forEach((s) => query.append("skills", s));
        if (request.location_preference) query.append("location_preference", request.location_preference)
        if (request.salary_expectation) query.append("salary_expectation", request.salary_expectation)
      
      // Fetching without Bearer token
            {/*

            const response = await fetch(`${this.baseUrl}?${query}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch AI Job matches");
        }

        const data = await response.json();
        return data as JobMatchResponse;
        */}
        // Attach auth automatically
        const endpoint = `${this.baseUrl}?${query.toString()}`;
        return await apiClient.post<AIJobMatch[]>(endpoint);
      

    }

    static async getAiJobMatchesWrapped(req: AIMatchRequest) {
        const jobs = await this.getAiJobMatches(req);
        return {jobs, total: jobs.length, page: 1, limit: jobs.length};
    }

}

