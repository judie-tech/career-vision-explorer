
import Layout from "@/components/layout/Layout";
import FuturisticHeroSection from "@/components/home/FuturisticHeroSection";
import FeatureSection from "@/components/home/FeatureSection";
import JobListingSection from "@/components/home/JobListingSection";
import CareerPathSection from "@/components/home/CareerPathSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  // Sample data
  const featuredJobs = [
    {
      id: 1,
      title: "Senior AI Engineer",
      company: "TechFlow Inc.",
      location: "San Francisco, CA",
      salary: "$150,000 - $200,000",
      tags: ["AI/ML", "Python", "Remote"],
    },
    {
      id: 2,
      title: "UX Designer",
      company: "Design Studios",
      location: "New York, NY",
      salary: "$90,000 - $120,000",
      tags: ["Figma", "Prototyping", "Design Systems"],
    },
    {
      id: 3,
      title: "DevOps Engineer",
      company: "CloudTech",
      location: "Remote",
      salary: "$120,000 - $160,000",
      tags: ["AWS", "Kubernetes", "CI/CD"],
    },
  ];

  const careerPaths = [
    {
      id: 1,
      title: "AI & Machine Learning",
      description: "Build intelligent systems that shape the future",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&h=400",
    },
    {
      id: 2,
      title: "Data Science",
      description: "Transform data into actionable insights",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&h=400",
    },
    {
      id: 3,
      title: "Cybersecurity",
      description: "Protect digital assets in an interconnected world",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&h=400",
    },
  ];

  const testimonials = [
    {
      id: 1,
      quote: "VisionDrill's AI matched me with my dream job in just 2 weeks. The platform is incredibly intuitive.",
      author: "Sarah Chen",
      role: "Software Engineer at Google",
    },
    {
      id: 2,
      quote: "The career path recommendations were spot-on. I transitioned from marketing to data science seamlessly.",
      author: "Michael Rodriguez",
      role: "Data Scientist at Netflix",
    },
    {
      id: 3,
      quote: "As an employer, VisionDrill helps us find candidates who are genuinely passionate about our mission.",
      author: "Emily Johnson",
      role: "HR Director at Tesla",
    },
  ];

  return (
    <Layout>
      <FuturisticHeroSection />
      <FeatureSection />
      <JobListingSection featuredJobs={featuredJobs} />
      <CareerPathSection careerPaths={careerPaths} />
      <TestimonialSection testimonials={testimonials} />
      <CTASection />
    </Layout>
  );
};

export default Index;
