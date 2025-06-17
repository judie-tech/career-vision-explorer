CREATE TABLE resume_analysis (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profile(user_id),
    parsed_data JSONB,
    total_experience_years INTEGER,
    skill_strength JSONB,
    career_trajectory JSONB,
    parsed_at TIMESTAMPTZ DEFAULT NOW()
);