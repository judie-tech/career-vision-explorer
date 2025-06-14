
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import FeatureSection from "@/components/home/FeatureSection";
import CareerJourneySection from "@/components/home/CareerJourneySection";
import ToolsSection from "@/components/home/ToolsSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import JobListingSection from "@/components/home/JobListingSection";
import CareerPathSection from "@/components/home/CareerPathSection";
import CTASection from "@/components/home/CTASection";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Shield, Briefcase, User, Sparkles } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { useHomeImages } from "@/hooks/use-home-images";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { homeImages } = useHomeImages();
  
  const featuredJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      salary: "$120,000 - $150,000",
      tags: ["React", "TypeScript", "UI/UX"],
    },
    {
      id: 2,
      title: "Product Manager",
      company: "InnovateSoft",
      location: "New York, NY",
      salary: "$110,000 - $135,000",
      tags: ["Product Strategy", "Agile", "UX Research"],
    },
    {
      id: 3,
      title: "Data Scientist",
      company: "DataViz Analytics",
      location: "Remote",
      salary: "$125,000 - $160,000",
      tags: ["Python", "Machine Learning", "Statistics"],
    },
  ];
  
  const careerPaths = [
    {
      id: 1,
      title: "Software Development",
      description: "From junior developer to CTO, explore the software development career path",
      image: homeImages.find(img => img.category === 'career-paths' && img.title.includes('Software'))?.url || 
             "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&h=200",
    },
    {
      id: 2,
      title: "Data Science",
      description: "Navigate the world of data, from analyst to chief data officer",
      image: homeImages.find(img => img.category === 'career-paths' && img.title.includes('Data'))?.url || 
             "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=300&h=200",
    },
    {
      id: 3,
      title: "Product Management",
      description: "Build the roadmap from product associate to VP of Product",
      image: homeImages.find(img => img.category === 'career-paths' && img.title.includes('Product'))?.url || 
             "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=300&h=200",
    },
  ];
  
  const testimonials = [
    {
      id: 1,
      quote: "Visiondrill helped me understand my career options and find a job that perfectly matches my skills and aspirations.",
      author: "Maria Rodriguez",
      role: "UX Designer at DesignHub",
      image: homeImages.find(img => img.category === 'testimonials' && img.title.includes('Maria'))?.url,
    },
    {
      id: 2,
      quote: "The career path visualization feature is incredible. It gave me a clear roadmap of skills I need to develop to reach my goals.",
      author: "James Wilson",
      role: "Software Engineer at TechGiant",
      image: homeImages.find(img => img.category === 'testimonials' && img.title.includes('James'))?.url,
    },
    {
      id: 3,
      quote: "Using Visiondrill's skills assessment helped me identify gaps in my knowledge and focus my learning efforts effectively.",
      author: "Sarah Johnson",
      role: "Product Manager at InnovateNow",
      image: homeImages.find(img => img.category === 'testimonials' && img.title.includes('Sarah'))?.url,
    },
  ];
  
  const handleQuickAccess = () => {
    if (!isAuthenticated) {
      toast.info("Login Required", {
        description: "Please login to access your dashboard",
      });
      navigate("/admin/login");
      return;
    }
    
    // Navigate based on user role
    switch (user?.role) {
      case "admin":
        navigate("/admin");
        break;
      case "employer":
        navigate("/employer/dashboard");
        break;
      case "jobseeker":
        navigate("/jobseeker/dashboard");
        break;
      default:
        navigate("/admin/login");
    }
  };
  
  return (
    <Layout>
      {isAuthenticated && user && (
        <div className="bg-gradient-to-r from-primary/5 via-blue-50 to-purple-50 border-b border-primary/10">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <div className="text-sm text-muted-foreground">
                  Welcome back, <span className="font-medium text-foreground">{user.name}</span>!
                </div>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleQuickAccess}
              className="flex items-center gap-2 bg-white/80 backdrop-blur-sm hover:bg-white border-primary/20 hover:border-primary/30 shadow-sm"
            >
              {user.role === "admin" ? (
                <Shield className="h-4 w-4" />
              ) : user.role === "employer" ? (
                <Briefcase className="h-4 w-4" />
              ) : (
                <User className="h-4 w-4" />
              )}
              Go to Dashboard
            </Button>
          </div>
        </div>
      )}
      <HeroSection />
      <FeatureSection />
      <CareerJourneySection />
      <JobListingSection featuredJobs={featuredJobs} />
      <CareerPathSection careerPaths={careerPaths} />
      <ToolsSection />
      <TestimonialSection testimonials={testimonials} />
      <CTASection />
    </Layout>
  );
};

export default Index;
