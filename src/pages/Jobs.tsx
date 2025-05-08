
import Layout from "@/components/layout/Layout";
import JobMatcher from "@/components/jobs/JobMatcher";

const Jobs = () => {
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-2">Find Your Dream Job</h1>
        <p className="text-gray-500 mb-8">
          Our AI-powered job matcher finds the perfect opportunities for your skills and career goals.
        </p>
        
        <JobMatcher />
      </div>
    </Layout>
  );
};

export default Jobs;
