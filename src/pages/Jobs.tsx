
import Layout from "@/components/layout/Layout";
import { JobsContainer } from "@/components/jobs/JobsContainer";
import { mockJobs } from "@/data/mockJobs";

const Jobs = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
        
        <div className="relative container py-12">
          <JobsContainer jobs={mockJobs} />
        </div>
      </div>
    </Layout>
  );
};

export default Jobs;
