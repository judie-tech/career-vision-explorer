import { OnboardingData } from "@/components/onboarding/types";
import { profileService } from "./profile.service";

export async function submitOnboardingData(data: OnboardingData, signupData?: any) {
  try {
    // Map the onboarding data to the profile update format
    const profileData: any = {
      // Parse skills from comma-separated string to array
      skills: data.skills ? data.skills.split(',').map(s => s.trim()).filter(Boolean) : [],
      location: data.location,
      // Map salary expectations to actual range strings
      salary_expectation: mapSalaryRange(data.salaryExpectations),
      // Map work preference to job type
      preferred_job_type: mapWorkPreference(data.workPreference),
      // Store career goals in bio
      bio: data.careerGoals,
    };

    // Include role-specific fields from signup if available
    if (signupData) {
      // For freelancers
      if (signupData.professionalTitle) {
        profileData.professional_title = signupData.professionalTitle;
      }
      if (signupData.hourlyRate) {
        profileData.hourly_rate = signupData.hourlyRate;
      }
      if (signupData.portfolioUrl) {
        profileData.portfolio_url = signupData.portfolioUrl;
      }
      
      // For employers
      if (signupData.companyName) {
        profileData.company_name = signupData.companyName;
      }
      if (signupData.companyWebsite) {
        profileData.company_website = signupData.companyWebsite;
      }
      if (signupData.industry) {
        profileData.industry = signupData.industry;
      }
    }

    // Update the user profile with the onboarding data
    const response = await profileService.updateProfile(profileData);
    
    // If there's a video introduction, handle it separately
    if (data.videoIntroduction) {
      // In a real implementation, upload the video to storage
      console.log('Video introduction would be uploaded here');
    }

    return response;
  } catch (error) {
    console.error('Failed to submit onboarding data:', error);
    throw error;
  }
}

function mapSalaryRange(range: string): string {
  const salaryMap: Record<string, string> = {
    'entry': '$40,000 - $60,000',
    'mid': '$60,000 - $100,000',
    'senior': '$100,000 - $150,000',
    'executive': '$150,000+',
    '': 'Not specified'
  };
  return salaryMap[range] || 'Not specified';
}

function mapWorkPreference(preference: string): string {
  const preferenceMap: Record<string, string> = {
    'remote': 'Remote',
    'in-person': 'On-site',
    'hybrid': 'Hybrid',
    '': 'Any'
  };
  return preferenceMap[preference] || 'Any';
}
