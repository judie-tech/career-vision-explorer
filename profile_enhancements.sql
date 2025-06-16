-- Enhance profile table with additional fields commonly needed for job portal

-- Add missing columns to profile table
ALTER TABLE public.profile 
ADD COLUMN IF NOT EXISTS bio text,
ADD COLUMN IF NOT EXISTS location text,
ADD COLUMN IF NOT EXISTS experience_years integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS education text,
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS linkedin_url text,
ADD COLUMN IF NOT EXISTS github_url text,
ADD COLUMN IF NOT EXISTS portfolio_url text,
ADD COLUMN IF NOT EXISTS profile_image_url text,
ADD COLUMN IF NOT EXISTS date_of_birth date,
ADD COLUMN IF NOT EXISTS salary_expectation text,
ADD COLUMN IF NOT EXISTS availability text DEFAULT 'Available' CHECK (availability = ANY (ARRAY['Available'::text, 'Not Available'::text, 'Available in 2 weeks'::text, 'Available in 1 month'::text])),
ADD COLUMN IF NOT EXISTS preferred_job_type text DEFAULT 'Full-time' CHECK (preferred_job_type = ANY (ARRAY['Full-time'::text, 'Part-time'::text, 'Contract'::text, 'Internship'::text, 'Remote'::text])),
ADD COLUMN IF NOT EXISTS work_authorization text,
ADD COLUMN IF NOT EXISTS languages jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS certifications jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS work_experience jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS projects jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS preferences jsonb DEFAULT '{}'::jsonb;

-- Create indexes for better search performance
CREATE INDEX IF NOT EXISTS idx_profile_location ON public.profile (location);
CREATE INDEX IF NOT EXISTS idx_profile_skills ON public.profile USING gin (skills);
CREATE INDEX IF NOT EXISTS idx_profile_account_type ON public.profile (account_type);
CREATE INDEX IF NOT EXISTS idx_profile_availability ON public.profile (availability);

-- Create a function to calculate profile completion percentage
CREATE OR REPLACE FUNCTION calculate_profile_completion(profile_row public.profile)
RETURNS integer
LANGUAGE plpgsql
AS $$
DECLARE
  completion_score integer := 0;
  total_fields integer := 15; -- Total number of optional fields we're checking
BEGIN
  -- Basic required fields (already required by table constraints)
  completion_score := completion_score + 20; -- Base score for required fields
  
  -- Optional fields (5 points each)
  IF profile_row.bio IS NOT NULL AND length(profile_row.bio) > 0 THEN
    completion_score := completion_score + 5;
  END IF;
  
  IF profile_row.location IS NOT NULL AND length(profile_row.location) > 0 THEN
    completion_score := completion_score + 5;
  END IF;
  
  IF profile_row.experience_years IS NOT NULL AND profile_row.experience_years > 0 THEN
    completion_score := completion_score + 5;
  END IF;
  
  IF profile_row.education IS NOT NULL AND length(profile_row.education) > 0 THEN
    completion_score := completion_score + 5;
  END IF;
  
  IF profile_row.phone IS NOT NULL AND length(profile_row.phone) > 0 THEN
    completion_score := completion_score + 5;
  END IF;
  
  IF profile_row.linkedin_url IS NOT NULL AND length(profile_row.linkedin_url) > 0 THEN
    completion_score := completion_score + 5;
  END IF;
  
  IF profile_row.github_url IS NOT NULL AND length(profile_row.github_url) > 0 THEN
    completion_score := completion_score + 5;
  END IF;
  
  IF profile_row.portfolio_url IS NOT NULL AND length(profile_row.portfolio_url) > 0 THEN
    completion_score := completion_score + 5;
  END IF;
  
  IF profile_row.profile_image_url IS NOT NULL AND length(profile_row.profile_image_url) > 0 THEN
    completion_score := completion_score + 5;
  END IF;
  
  IF profile_row.resume_link IS NOT NULL AND length(profile_row.resume_link) > 0 THEN
    completion_score := completion_score + 5;
  END IF;
  
  IF profile_row.skills IS NOT NULL AND jsonb_array_length(profile_row.skills) > 0 THEN
    completion_score := completion_score + 10; -- Skills are important
  END IF;
  
  IF profile_row.work_experience IS NOT NULL AND jsonb_array_length(profile_row.work_experience) > 0 THEN
    completion_score := completion_score + 10; -- Work experience is important
  END IF;
  
  IF profile_row.projects IS NOT NULL AND jsonb_array_length(profile_row.projects) > 0 THEN
    completion_score := completion_score + 5;
  END IF;
  
  IF profile_row.certifications IS NOT NULL AND jsonb_array_length(profile_row.certifications) > 0 THEN
    completion_score := completion_score + 5;
  END IF;
  
  IF profile_row.languages IS NOT NULL AND jsonb_array_length(profile_row.languages) > 0 THEN
    completion_score := completion_score + 5;
  END IF;
  
  -- Cap at 100%
  RETURN LEAST(100, completion_score);
END;
$$;

-- Create a view that includes calculated profile completion
CREATE OR REPLACE VIEW public.profiles_with_completion AS
SELECT 
  p.*,
  calculate_profile_completion(p) as profile_completion_percentage
FROM public.profile p;

-- Grant permissions for the view
GRANT SELECT ON public.profiles_with_completion TO authenticated;
GRANT SELECT ON public.profiles_with_completion TO anon;

-- Update sample profiles with additional information
DO $$
BEGIN
  -- Update job seeker profiles with sample data
  UPDATE public.profile 
  SET 
    bio = CASE 
      WHEN email = 'john@example.com' THEN 'Passionate full-stack developer with 3+ years of experience building web applications. I love working with React, Node.js, and modern development practices.'
      WHEN email = 'sarah@example.com' THEN 'Creative UI/UX designer with a passion for user-centered design. I specialize in creating intuitive and beautiful digital experiences.'
      ELSE bio
    END,
    location = CASE 
      WHEN email = 'john@example.com' THEN 'San Francisco, CA'
      WHEN email = 'sarah@example.com' THEN 'Austin, TX'
      ELSE location
    END,
    experience_years = CASE 
      WHEN email = 'john@example.com' THEN 3
      WHEN email = 'sarah@example.com' THEN 2
      ELSE experience_years
    END,
    education = CASE 
      WHEN email = 'john@example.com' THEN 'Bachelor of Science in Computer Science - UC Berkeley'
      WHEN email = 'sarah@example.com' THEN 'Bachelor of Fine Arts in Graphic Design - UT Austin'
      ELSE education
    END,
    salary_expectation = CASE 
      WHEN email = 'john@example.com' THEN '$90,000 - $120,000'
      WHEN email = 'sarah@example.com' THEN '$70,000 - $90,000'
      ELSE salary_expectation
    END,
    availability = 'Available',
    preferred_job_type = 'Full-time',
    work_experience = CASE 
      WHEN email = 'john@example.com' THEN '[
        {
          "company": "Tech Startup Inc.",
          "position": "Frontend Developer",
          "duration": "2022 - Present",
          "description": "Developed and maintained React applications, collaborated with cross-functional teams."
        },
        {
          "company": "Freelance",
          "position": "Web Developer",
          "duration": "2021 - 2022",
          "description": "Built custom websites for small businesses using modern web technologies."
        }
      ]'::jsonb
      WHEN email = 'sarah@example.com' THEN '[
        {
          "company": "Design Agency LLC",
          "position": "Junior UI/UX Designer",
          "duration": "2023 - Present",
          "description": "Created user interfaces for mobile and web applications, conducted user research."
        }
      ]'::jsonb
      ELSE work_experience
    END,
    languages = '["English", "Spanish"]'::jsonb,
    certifications = CASE 
      WHEN email = 'john@example.com' THEN '["AWS Cloud Practitioner", "React Developer Certification"]'::jsonb
      WHEN email = 'sarah@example.com' THEN '["Google UX Design Certificate", "Adobe Certified Expert"]'::jsonb
      ELSE certifications
    END
  WHERE email IN ('john@example.com', 'sarah@example.com');
  
END $$;