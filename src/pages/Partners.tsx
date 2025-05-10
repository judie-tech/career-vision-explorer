
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Building, GraduationCap, UserCheck, Globe } from "lucide-react";

const Partners = () => {
  const partnerCategories = [
    {
      id: 1,
      title: "Employers",
      icon: <Building className="h-10 w-10 text-career-blue" />,
      description: "Connect with top talent and showcase your company culture",
      features: [
        "AI-powered candidate matching",
        "Branded employer profile",
        "Automated screening and scheduling",
        "Advanced analytics dashboard"
      ]
    },
    {
      id: 2,
      title: "Educational Institutions",
      icon: <GraduationCap className="h-10 w-10 text-career-blue" />,
      description: "Help your students launch successful careers",
      features: [
        "Student outcome tracking",
        "Curriculum optimization insights",
        "Industry partnership opportunities",
        "Career services integration"
      ]
    },
    {
      id: 3,
      title: "Recruiting Agencies",
      icon: <UserCheck className="h-10 w-10 text-career-blue" />,
      description: "Streamline your recruiting process with AI",
      features: [
        "Candidate database integration",
        "Smart matching algorithms",
        "Bulk job posting capability",
        "Client reporting tools"
      ]
    },
    {
      id: 4,
      title: "Technology Partners",
      icon: <Globe className="h-10 w-10 text-career-blue" />,
      description: "Integrate with our platform to expand your reach",
      features: [
        "Developer API access",
        "Single sign-on integration",
        "Custom data analysis tools",
        "Co-marketing opportunities"
      ]
    }
  ];

  const partnersShowcase = [
    { name: "TechGiant Inc.", logo: "https://images.unsplash.com/photo-1549124864-b7d1ac7abb08?auto=format&fit=crop&w=100&h=100" },
    { name: "Global University", logo: "https://images.unsplash.com/photo-1568792923760-d70635a89fdd?auto=format&fit=crop&w=100&h=100" },
    { name: "Future Staffing", logo: "https://images.unsplash.com/photo-1565372195458-9de0b320ef04?auto=format&fit=crop&w=100&h=100" },
    { name: "InnovateHR", logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=100&h=100" },
    { name: "Career Academy", logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=100&h=100" },
    { name: "NextGen Technologies", logo: "https://images.unsplash.com/photo-1560441347-3a9c2e1e7e5c?auto=format&fit=crop&w=100&h=100" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-career-blue to-career-purple text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animated-bg absolute inset-0 opacity-10"></div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 neon-text">
            Unlock Your Career Potential with AI-Powered Guidance
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10">
            Visiondrill Careers Navigator uses advanced AI to match your skills with the
            perfect job, identify growth opportunities, and guide your career journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto px-8 py-6 text-lg bg-white text-career-blue hover:bg-gray-100 futuristic-btn">
                Create Your Profile
              </Button>
            </Link>
            <Link to="/jobs">
              <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 py-6 text-lg border-white text-white hover:bg-white/10 glowing-border">
                Explore Jobs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Partnership Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
              Partnership Opportunities
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Join our ecosystem of employers, educators, and technology partners to shape the future of career development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {partnerCategories.map((category) => (
              <Card key={category.id} className="futuristic-card hover-scale">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 p-3 rounded-full bg-blue-50">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                    <p className="text-gray-600 mb-6">{category.description}</p>
                    <ul className="space-y-2 text-left mb-6 w-full">
                      {category.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="h-5 w-5 mr-2 text-career-blue mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="futuristic-btn mt-auto">Learn More</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Join the organizations already transforming their talent acquisition and development
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {partnersShowcase.map((partner, index) => (
              <div key={index} className="hover-scale">
                <img 
                  src={partner.logo} 
                  alt={`${partner.name} logo`} 
                  className="h-20 w-20 object-contain rounded-full shadow-md"
                />
                <p className="text-center mt-2 text-sm font-medium">{partner.name}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button className="futuristic-btn">View All Partners</Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-career-blue to-career-purple text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-4 neon-text">Ready to Partner With Us?</h2>
            <p className="text-lg opacity-90 max-w-xl">
              Schedule a demo to learn how Visiondrill can help your organization thrive in the modern talent landscape.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="futuristic-btn bg-white text-career-blue hover:bg-gray-100">
              Request Demo
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 glowing-border">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Partners;
