-- SQL modifications for jobs_listing table to better support the UI

-- Add missing columns to jobs_listing table
ALTER TABLE public.jobs_listing 
ADD COLUMN IF NOT EXISTS job_type text DEFAULT 'Full-time' CHECK (job_type = ANY (ARRAY['Full-time'::text, 'Part-time'::text, 'Contract'::text, 'Internship'::text, 'Remote'::text])),
ADD COLUMN IF NOT EXISTS experience_level text DEFAULT 'Mid Level' CHECK (experience_level = ANY (ARRAY['Entry Level'::text, 'Mid Level'::text, 'Senior Level'::text, 'Executive'::text])),
ADD COLUMN IF NOT EXISTS skills_required jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS description text,
ADD COLUMN IF NOT EXISTS benefits jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS application_deadline timestamp with time zone,
ADD COLUMN IF NOT EXISTS remote_friendly boolean DEFAULT false;

-- Update existing jobs to have default values if they don't have them
UPDATE public.jobs_listing 
SET 
  job_type = COALESCE(job_type, 'Full-time'),
  experience_level = COALESCE(experience_level, 'Mid Level'),
  skills_required = COALESCE(skills_required, '[]'::jsonb),
  remote_friendly = COALESCE(remote_friendly, false)
WHERE job_type IS NULL OR experience_level IS NULL OR skills_required IS NULL;

-- Create an index on commonly searched fields
CREATE INDEX IF NOT EXISTS idx_jobs_listing_search ON public.jobs_listing USING gin (
  to_tsvector('english', title || ' ' || company || ' ' || COALESCE(description, '') || ' ' || requirements)
);

-- Create index on location for location-based searches
CREATE INDEX IF NOT EXISTS idx_jobs_listing_location ON public.jobs_listing (location);

-- Create index on job_type and experience_level for filtering
CREATE INDEX IF NOT EXISTS idx_jobs_listing_filters ON public.jobs_listing (job_type, experience_level, is_active);

-- Create a view that joins jobs with poster profile information
CREATE OR REPLACE VIEW public.jobs_with_profiles AS
SELECT 
  j.*,
  p.name as posted_by_name,
  p.email as posted_by_email,
  p.account_type as posted_by_account_type
FROM public.jobs_listing j
LEFT JOIN public.profile p ON j.posted_by = p.user_id;

-- Grant permissions for the view
GRANT SELECT ON public.jobs_with_profiles TO authenticated;
GRANT SELECT ON public.jobs_with_profiles TO anon;

-- Function to calculate job match score based on user skills (for future use)
CREATE OR REPLACE FUNCTION calculate_job_match_score(user_skills jsonb, job_skills jsonb)
RETURNS integer
LANGUAGE plpgsql
AS $$
DECLARE
  match_count integer := 0;
  total_skills integer := 0;
  skill_item text;
BEGIN
  -- Count total required skills
  SELECT jsonb_array_length(job_skills) INTO total_skills;
  
  -- If no skills required, return default score
  IF total_skills = 0 THEN
    RETURN 75;
  END IF;
  
  -- Count matching skills
  FOR skill_item IN SELECT jsonb_array_elements_text(job_skills) LOOP
    IF user_skills ? skill_item THEN
      match_count := match_count + 1;
    END IF;
  END LOOP;
  
  -- Return percentage match (minimum 20%)
  RETURN GREATEST(20, (match_count * 100 / total_skills));
END;
$$;