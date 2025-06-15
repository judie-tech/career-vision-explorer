
import Layout from "@/components/layout/Layout";

const About = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">About Visiondrill</h1>
            <p className="text-xl text-muted-foreground">
              Navigate your career journey with confidence and clarity
            </p>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-6">
                At Visiondrill Career Explorer, we believe that everyone deserves to find meaningful work that aligns with their skills, values, and aspirations. Our AI-driven platform helps professionals discover opportunities that match their unique profile and career goals.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">What We Do</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="font-semibold mb-2">Smart Job Matching</h3>
                  <p className="text-muted-foreground">Our AI algorithms analyze your skills, experience, and preferences to find the perfect job matches.</p>
                </div>
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="font-semibold mb-2">Career Path Guidance</h3>
                  <p className="text-muted-foreground">Get personalized career roadmaps and skill development recommendations.</p>
                </div>
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="font-semibold mb-2">Skills Assessment</h3>
                  <p className="text-muted-foreground">Comprehensive skills evaluation to help you understand your strengths and growth areas.</p>
                </div>
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="font-semibold mb-2">Market Insights</h3>
                  <p className="text-muted-foreground">Stay informed about industry trends, salary benchmarks, and in-demand skills.</p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                Founded in 2024, Visiondrill Career Explorer was born from the vision to democratize career guidance and make quality career advice accessible to everyone. Our team of career experts, data scientists, and technologists work together to create innovative solutions for the modern job market.
              </p>
              <p className="text-muted-foreground">
                We're committed to helping professionals at every stage of their career journey, from recent graduates to experienced executives looking for their next challenge.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
