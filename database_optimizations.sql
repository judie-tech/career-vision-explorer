-- Database optimization functions to reduce N+1 queries and improve performance
-- These functions should be run in your Supabase database

-- Function to get application count for a single job
CREATE OR REPLACE FUNCTION get_application_count(job_id_param UUID)
RETURNS INTEGER AS $$
BEGIN
    RETURN COALESCE((
        SELECT COUNT(*)::INTEGER 
        FROM applications 
        WHERE job_id = job_id_param
    ), 0);
END;
$$ LANGUAGE plpgsql;

-- Function to get application counts for multiple jobs (batch operation)
CREATE OR REPLACE FUNCTION get_application_counts_batch(job_ids UUID[])
RETURNS TABLE(job_id UUID, count INTEGER) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        j.job_id,
        COALESCE(COUNT(a.application_id)::INTEGER, 0) as count
    FROM 
        UNNEST(job_ids) AS j(job_id)
    LEFT JOIN 
        applications a ON a.job_id = j.job_id
    GROUP BY 
        j.job_id;
END;
$$ LANGUAGE plpgsql;

-- Function to get filtered jobs count (replaces separate count queries)
CREATE OR REPLACE FUNCTION get_filtered_jobs_count(where_conditions TEXT)
RETURNS INTEGER AS $$
DECLARE
    result INTEGER;
    query_text TEXT;
BEGIN
    query_text := 'SELECT COUNT(*)::INTEGER FROM jobs_listing WHERE ' || where_conditions;
    EXECUTE query_text INTO result;
    RETURN COALESCE(result, 0);
END;
$$ LANGUAGE plpgsql;

-- Index optimizations for better query performance
-- Create composite indexes for common query patterns

-- Index for active jobs with location filtering
CREATE INDEX IF NOT EXISTS idx_jobs_active_location 
ON jobs_listing (is_active, location) 
WHERE is_active = true;

-- Index for company and title searches
CREATE INDEX IF NOT EXISTS idx_jobs_company_title 
ON jobs_listing USING gin(to_tsvector('english', company || ' ' || title));

-- Index for full-text search on requirements
CREATE INDEX IF NOT EXISTS idx_jobs_requirements_search 
ON jobs_listing USING gin(to_tsvector('english', requirements));

-- Index for job listing pagination and sorting
CREATE INDEX IF NOT EXISTS idx_jobs_created_at_active 
ON jobs_listing (created_at DESC, is_active) 
WHERE is_active = true;

-- Index for employer's jobs
CREATE INDEX IF NOT EXISTS idx_jobs_posted_by_active 
ON jobs_listing (posted_by, is_active, created_at DESC);

-- Index for applications grouped by job
CREATE INDEX IF NOT EXISTS idx_applications_job_id 
ON applications (job_id);

-- Materialized view for job statistics (refresh periodically)
CREATE MATERIALIZED VIEW IF NOT EXISTS job_stats_cache AS
SELECT 
    COUNT(*) as total_jobs,
    COUNT(*) FILTER (WHERE is_active = true) as active_jobs,
    COUNT(DISTINCT company) as companies_count,
    COUNT(DISTINCT location) as locations_count,
    (SELECT COUNT(*) FROM applications) as total_applications,
    CASE 
        WHEN COUNT(*) > 0 THEN (SELECT COUNT(*) FROM applications)::FLOAT / COUNT(*)
        ELSE 0 
    END as avg_applications_per_job
FROM jobs_listing;

-- Create index on the materialized view
CREATE UNIQUE INDEX IF NOT EXISTS idx_job_stats_cache ON job_stats_cache ((1));

-- Function to refresh job stats cache
CREATE OR REPLACE FUNCTION refresh_job_stats_cache()
RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW job_stats_cache;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to refresh stats cache when jobs change (optional - can be heavy)
-- Uncomment if you want real-time stats, but it may impact performance
-- CREATE OR REPLACE FUNCTION refresh_stats_trigger()
-- RETURNS trigger AS $$
-- BEGIN
--     PERFORM refresh_job_stats_cache();
--     RETURN NULL;
-- END;
-- $$ LANGUAGE plpgsql;

-- CREATE TRIGGER job_stats_refresh
--     AFTER INSERT OR UPDATE OR DELETE ON jobs_listing
--     FOR EACH STATEMENT
--     EXECUTE FUNCTION refresh_stats_trigger();

-- Performance monitoring view to track slow queries
CREATE OR REPLACE VIEW slow_queries AS
SELECT 
    query,
    calls,
    total_time,
    mean_time,
    rows,
    100.0 * shared_blks_hit / nullif(shared_blks_hit + shared_blks_read, 0) AS hit_percent
FROM pg_stat_statements 
WHERE mean_time > 100  -- queries taking more than 100ms on average
ORDER BY mean_time DESC;

-- Example usage and comments:
-- 
-- 1. To get application count for a single job:
--    SELECT get_application_count('job-uuid-here');
--
-- 2. To get application counts for multiple jobs:
--    SELECT * FROM get_application_counts_batch(ARRAY['uuid1', 'uuid2', 'uuid3']);
--
-- 3. To get filtered job count:
--    SELECT get_filtered_jobs_count('is_active = true AND company ILIKE ''%tech%''');
--
-- 4. To refresh job stats cache:
--    SELECT refresh_job_stats_cache();
--
-- 5. To monitor slow queries:
--    SELECT * FROM slow_queries LIMIT 10;

-- Remember to:
-- - Run ANALYZE after creating indexes to update query planner statistics
-- - Monitor query performance using EXPLAIN ANALYZE
-- - Refresh the materialized view periodically (daily/hourly) based on your needs
-- - Consider partitioning large tables if they grow significantly

ANALYZE jobs_listing;
ANALYZE applications;
