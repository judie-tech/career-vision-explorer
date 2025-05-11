
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import FeatureSection from "@/components/home/FeatureSection";
import CareerJourneySection from "@/components/home/CareerJourneySection";
import ToolsSection from "@/components/home/ToolsSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import JobListingSection from "@/components/home/JobListingSection";
import CareerPathSection from "@/components/home/CareerPathSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
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
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&h=200",
    },
    {
      id: 2,
      title: "Data Science",
      description: "Navigate the world of data, from analyst to chief data officer",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=300&h=200",
    },
    {
      id: 3,
      title: "Product Management",
      description: "Build the roadmap from product associate to VP of Product",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=300&h=200",
    },
  ];
  
  const testimonials = [
    {
      id: 1,
      quote: "Visiondrill helped me understand my career options and find a job that perfectly matches my skills and aspirations.",
      author: "Maria Rodriguez",
      role: "UX Designer at DesignHub",
    },
    {
      id: 2,
      quote: "The career path visualization feature is incredible. It gave me a clear roadmap of skills I need to develop to reach my goals.",
      author: "James Wilson",
      role: "Software Engineer at TechGiant",
    },
    {
      id: 3,
      quote: "Using Visiondrill's skills assessment helped me identify gaps in my knowledge and focus my learning efforts effectively.",
      author: "Sarah Johnson",
      role: "Product Manager at InnovateNow",
    },
  ];
  
  return (
    <Layout>
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
