-- Sample data for testing the enhanced jobs portal

-- First, let's insert some sample profiles (employers and job seekers)
INSERT INTO public.profile (user_id, name, email, password_hash, skills, account_type) VALUES
  (gen_random_uuid(), 'TechCorp HR', 'hr@techcorp.com', '$2b$12$sample_hash_1', '[]'::jsonb, 'employer'),
  (gen_random_uuid(), 'StartupXYZ', 'jobs@startupxyz.com', '$2b$12$sample_hash_2', '[]'::jsonb, 'employer'),
  (gen_random_uuid(), 'John Developer', 'john@example.com', '$2b$12$sample_hash_3', '["JavaScript", "React", "Node.js", "Python"]'::jsonb, 'job_seeker'),
  (gen_random_uuid(), 'Sarah Designer', 'sarah@example.com', '$2b$12$sample_hash_4', '["UI/UX Design", "Figma", "Adobe Creative Suite", "HTML/CSS"]'::jsonb, 'job_seeker')
ON CONFLICT (email) DO NOTHING;

-- Insert sample jobs using the employer profiles
DO $$
DECLARE
    employer_1_id uuid;
    employer_2_id uuid;
BEGIN
    -- Get employer IDs
    SELECT user_id INTO employer_1_id FROM public.profile WHERE email = 'hr@techcorp.com' LIMIT 1;
    SELECT user_id INTO employer_2_id FROM public.profile WHERE email = 'jobs@startupxyz.com' LIMIT 1;
    
    -- Insert sample jobs
    INSERT INTO public.jobs_listing (
        title, company, requirements, location, salary_range, posted_by, 
        job_type, experience_level, skills_required, description, 
        benefits, remote_friendly, is_active
    ) VALUES
    (
        'Senior Frontend Developer',
        'TechCorp',
        'Strong experience with React, TypeScript, and modern frontend development practices. Experience with state management, testing, and CI/CD.',
        'San Francisco, CA',
        '$120,000 - $160,000',
        employer_1_id,
        'Full-time',
        'Senior Level',
        '["React", "TypeScript", "JavaScript", "HTML/CSS", "Git", "Testing"]'::jsonb,
        'We are looking for a Senior Frontend Developer to join our growing team. You will be responsible for building user-facing applications and working closely with our design and backend teams.',
        '["Health Insurance", "401k", "Flexible PTO", "Remote Work Options", "Professional Development Budget"]'::jsonb,
        true,
        true
    ),
    (
        'Full Stack JavaScript Developer',
        'StartupXYZ',
        'Experience with Node.js, React, and database technologies. Startup experience preferred.',
        'Austin, TX',
        '$80,000 - $120,000',
        employer_2_id,
        'Full-time',
        'Mid Level',
        '["JavaScript", "Node.js", "React", "MongoDB", "Express.js", "REST APIs"]'::jsonb,
        'Join our fast-growing startup as a Full Stack Developer. You will work on both frontend and backend features, helping to scale our platform.',
        '["Equity", "Health Insurance", "Flexible Hours", "Learning Budget"]'::jsonb,
        true,
        true
    ),
    (
        'Junior Frontend Developer',
        'TechCorp',
        'Entry-level position for recent graduates or bootcamp graduates. Basic knowledge of HTML, CSS, JavaScript required.',
        'Remote',
        '$60,000 - $80,000',
        employer_1_id,
        'Full-time',
        'Entry Level',
        '["HTML/CSS", "JavaScript", "Git", "Basic React"]'::jsonb,
        'Perfect opportunity for someone starting their career in frontend development. You will receive mentorship and work on real projects.',
        '["Health Insurance", "401k", "Mentorship Program", "Learning Resources"]'::jsonb,
        true,
        true
    ),
    (
        'UI/UX Designer',
        'StartupXYZ',
        'Experience with design tools like Figma, user research, and prototyping. Portfolio required.',
        'Austin, TX',
        '$70,000 - $100,000',
        employer_2_id,
        'Full-time',
        'Mid Level',
        '["UI/UX Design", "Figma", "User Research", "Prototyping", "Adobe Creative Suite"]'::jsonb,
        'We are seeking a talented UI/UX Designer to help shape the user experience of our products. You will work closely with product and engineering teams.',
        '["Equity", "Health Insurance", "Design Conference Budget", "Creative Tools Budget"]'::jsonb,
        false,
        true
    ),
    (
        'DevOps Engineer',
        'TechCorp',
        'Experience with AWS, Docker, Kubernetes, and CI/CD pipelines. Infrastructure as code experience preferred.',
        'San Francisco, CA',
        '$130,000 - $170,000',
        employer_1_id,
        'Full-time',
        'Senior Level',
        '["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform", "Python", "Linux"]'::jsonb,
        'Lead our infrastructure and deployment processes. You will be responsible for maintaining and scaling our cloud infrastructure.',
        '["Health Insurance", "401k", "Flexible PTO", "Remote Work Options", "Conference Budget"]'::jsonb,
        true,
        true
    ),
    (
        'Part-time React Developer',
        'StartupXYZ',
        'Flexible part-time position for experienced React developers. Perfect for students or those seeking work-life balance.',
        'Remote',
        '$40/hour',
        employer_2_id,
        'Part-time',
        'Mid Level',
        '["React", "JavaScript", "HTML/CSS", "Git"]'::jsonb,
        'Flexible part-time opportunity to work on exciting projects while maintaining work-life balance.',
        '["Flexible Hours", "Remote Work", "Project-based Work"]'::jsonb,
        true,
        true
    );
    
END $$;

-- Insert some sample applications
DO $$
DECLARE
    job_seeker_1_id uuid;
    job_seeker_2_id uuid;
    job_1_id uuid;
    job_2_id uuid;
BEGIN
    -- Get job seeker IDs
    SELECT user_id INTO job_seeker_1_id FROM public.profile WHERE email = 'john@example.com' LIMIT 1;
    SELECT user_id INTO job_seeker_2_id FROM public.profile WHERE email = 'sarah@example.com' LIMIT 1;
    
    -- Get some job IDs
    SELECT job_id INTO job_1_id FROM public.jobs_listing WHERE title = 'Senior Frontend Developer' LIMIT 1;
    SELECT job_id INTO job_2_id FROM public.jobs_listing WHERE title = 'UI/UX Designer' LIMIT 1;
    
    -- Insert sample applications
    INSERT INTO public.applications (user_id, job_id, cover_letter, status) VALUES
    (
        job_seeker_1_id,
        job_1_id,
        'I am very interested in this Senior Frontend Developer position. With my experience in React and TypeScript, I believe I would be a great fit for your team.',
        'Pending'
    ),
    (
        job_seeker_2_id,
        job_2_id,
        'I am excited about the UI/UX Designer opportunity at StartupXYZ. My portfolio demonstrates my skills in user-centered design and my experience with Figma.',
        'Reviewed'
    );
    
END $$;

-- Insert some sample skills
INSERT INTO public.skills_listing (name, category, demand_level, associated_jobs) VALUES
  ('React', 'Frontend', 'High', '[]'::jsonb),
  ('TypeScript', 'Programming Language', 'High', '[]'::jsonb),
  ('Node.js', 'Backend', 'High', '[]'::jsonb),
  ('Python', 'Programming Language', 'High', '[]'::jsonb),
  ('UI/UX Design', 'Design', 'High', '[]'::jsonb),
  ('Docker', 'DevOps', 'High', '[]'::jsonb),
  ('AWS', 'Cloud', 'High', '[]'::jsonb),
  ('JavaScript', 'Programming Language', 'High', '[]'::jsonb),
  ('HTML/CSS', 'Frontend', 'Medium', '[]'::jsonb),
  ('Figma', 'Design', 'Medium', '[]'::jsonb)
ON CONFLICT (name) DO NOTHING;

-- Insert some sample recommendations
DO $$
DECLARE
    job_seeker_1_id uuid;
BEGIN
    SELECT user_id INTO job_seeker_1_id FROM public.profile WHERE email = 'john@example.com' LIMIT 1;
    
    INSERT INTO public.recommendations (user_id, suggested_skill, rationale) VALUES
    (
        job_seeker_1_id,
        'TypeScript',
        'Based on current job market trends, TypeScript skills are highly demanded for React developers and would increase your job prospects significantly.'
    ),
    (
        job_seeker_1_id,
        'Docker',
        'Many companies are looking for developers with containerization knowledge. Learning Docker would make you more versatile and attractive to employers.'
    );
END $$;