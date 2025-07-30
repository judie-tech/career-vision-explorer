export interface FreelancerPortfolioItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  project_url?: string;
  tags: string[];
  created_at: string;
}

export interface FreelancerPricingPackage {
  name: string;
  price: number;
  description: string;
  features: string[];
  delivery_days: number;
  revisions: number;
}

export interface FreelancerPricing {
  basic_package?: FreelancerPricingPackage;
  standard_package?: FreelancerPricingPackage;
  premium_package?: FreelancerPricingPackage;
}

export interface FreelancerBase {
  title: string;
  bio: string;
  hourly_rate?: number;
  skills: string[];
  experience_years: number;
  portfolio_url?: string;
  available_for_hire: boolean;
  location?: string;
  languages: string[];
}

export interface FreelancerCreate extends FreelancerBase {}

export interface FreelancerUpdate extends Partial<FreelancerBase> {}

export interface Freelancer extends FreelancerBase {
  freelancer_id: string;
  user_id: string;
  name: string;
  email: string;
  profile_image_url?: string;
  rating: number;
  total_reviews: number;
  total_projects: number;
  member_since: string;
  last_active?: string;
  portfolio_items?: FreelancerPortfolioItem[];
  pricing?: FreelancerPricing;
  created_at: string;
  updated_at: string;
}

export interface FreelancerListItem {
  freelancer_id: string;
  user_id: string;
  name: string;
  title: string;
  bio: string;
  profile_image_url?: string;
  hourly_rate?: number;
  skills: string[];
  rating: number;
  total_reviews: number;
  available_for_hire: boolean;
  location?: string;
}

export interface FreelancerFilter {
  skills?: string[];
  min_rate?: number;
  max_rate?: number;
  min_experience?: number;
  available_only?: boolean;
  location?: string;
  search?: string;
}

export interface FreelancerListResponse {
  freelancers: FreelancerListItem[];
  total: number;
  limit: number;
  offset: number;
}
