
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Target, TrendingUp, Shield, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const features = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Smart Job Matching",
      description: "Our AI algorithms analyze your skills, experience, and preferences to find the perfect job matches."
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Career Path Guidance",
      description: "Get personalized career roadmaps and skill development recommendations."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Skills Assessment",
      description: "Comprehensive skills evaluation to help you understand your strengths and growth areas."
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Market Insights",
      description: "Stay informed about industry trends, salary benchmarks, and in-demand skills."
    }
  ];

  const stats = [
    { number: "10K+", label: "Job Seekers" },
    { number: "500+", label: "Companies" },
    { number: "95%", label: "Match Accuracy" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary/5 via-background to-primary/10">
          <div className="max-w-6xl mx-auto px-4 py-24">
            <div className="text-center space-y-6">
              <Badge variant="secondary" className="mb-4">
                About Visiondrill
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Navigate your career journey with 
                <span className="text-primary"> confidence</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                We believe that everyone deserves to find meaningful work that aligns with their skills, values, and aspirations. Our AI-driven platform connects talent with opportunity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Link to="/jobs">
                  <Button size="lg" className="w-full sm:w-auto">
                    Explore Jobs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="border-y bg-card">
          <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-16 space-y-24">
          {/* Mission Section */}
          <section className="text-center space-y-6">
            <Badge variant="outline" className="mb-4">
              Our Mission
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Democratizing Career Success
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              At Visiondrill Career Explorer, we're committed to breaking down barriers in career development. 
              Our platform leverages cutting-edge AI technology to provide personalized career guidance that was 
              once only available to a privileged few.
            </p>
          </section>

          {/* Features Section */}
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <Badge variant="outline">
                What We Do
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Powerful Tools for Your Career
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Our comprehensive suite of tools is designed to support you at every stage of your career journey.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 text-primary rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Story Section */}
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <Badge variant="outline">
                Our Story
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Building the Future of Work
              </h2>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Founded in 2024, Visiondrill Career Explorer was born from the vision to democratize 
                  career guidance and make quality career advice accessible to everyone. Our team of 
                  career experts, data scientists, and technologists work together to create innovative 
                  solutions for the modern job market.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We're committed to helping professionals at every stage of their career journey, 
                  from recent graduates to experienced executives looking for their next challenge.
                </p>
                <div className="flex items-center gap-4 pt-4">
                  <Users className="h-8 w-8 text-primary" />
                  <div>
                    <div className="font-semibold">Expert Team</div>
                    <div className="text-sm text-muted-foreground">
                      Career advisors, AI specialists, and industry experts
                    </div>
                  </div>
                </div>
              </div>
              
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary mb-2">2024</div>
                      <div className="text-muted-foreground">Founded</div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Job Placements</span>
                        <span className="font-semibold">5,000+</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Partner Companies</span>
                        <span className="font-semibold">500+</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Success Rate</span>
                        <span className="font-semibold">95%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center space-y-8 py-16">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Ready to Transform Your Career?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join thousands of professionals who have already discovered their perfect career path with Visiondrill.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/jobs">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Browse Jobs
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default About;
