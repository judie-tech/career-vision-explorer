
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Search, BarChart2, Rocket, MessageCircle, User, Book, Briefcase, LayoutGrid, MapPin, DollarSign, Tag } from "lucide-react";

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
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-career-blue to-career-purple relative overflow-hidden text-white">
        <div className="absolute inset-0 animated-bg opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32 relative">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div className="sm:text-center lg:text-left animate-fade-in">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block neon-text">AI-Driven job linkage</span>
              </h1>
              <p className="mt-3 text-base text-white/90 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto lg:mx-0">
                Visiondrill Careers Navigator uses advanced AI to match your skills with the
                perfect job, identify growth opportunities, and guide your career journey.
              </p>
              <div className="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link to="/signup">
                    <Button className="w-full px-8 py-6 text-lg bg-white text-career-blue hover:bg-gray-100 futuristic-btn high-contrast-text">
                      Create Your Profile
                    </Button>
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link to="/jobs">
                    <Button variant="outline" className="w-full px-8 py-6 text-lg border-white text-white hover:bg-white/10 glowing-border high-contrast-text">
                      Explore Jobs
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-12 relative lg:mt-0 animate-fade-in">
              <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:px-0 lg:max-w-none">
                <img
                  className="w-full rounded-xl shadow-xl ring-1 ring-white/20 glassmorphism"
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=600&h=400"
                  alt="Career planning dashboard"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Visiondrill Careers Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
              How Visiondrill Careers Works
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-500">
              Our intelligent platform combines AI technology with personalized career development to help you find and succeed in your dream job.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* AI-Powered Job Matching */}
            <div className="flex flex-col items-center text-center p-6 hover-scale glassmorphism">
              <div className="bg-blue-50 p-4 rounded-lg mb-5">
                <Search className="h-8 w-8 text-career-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI-Powered Job Matching</h3>
              <p className="text-gray-600">
                Our intelligent system finds the perfect job matches based on your skills, experience, and preferences.
              </p>
            </div>

            {/* Skills Assessment */}
            <div className="flex flex-col items-center text-center p-6 hover-scale glassmorphism">
              <div className="bg-blue-50 p-4 rounded-lg mb-5">
                <User className="h-8 w-8 text-career-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3">Skills Assessment</h3>
              <p className="text-gray-600">
                Identify your strengths and areas for improvement through integrated assessments and get a personalized readiness score.
              </p>
            </div>

            {/* Microlearning Paths */}
            <div className="flex flex-col items-center text-center p-6 hover-scale glassmorphism">
              <div className="bg-blue-50 p-4 rounded-lg mb-5">
                <Book className="h-8 w-8 text-career-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3">Microlearning Paths</h3>
              <p className="text-gray-600">
                Fill skill gaps with personalized learning recommendations and track your progress toward career goals.
              </p>
            </div>

            {/* AI Interview Practice */}
            <div className="flex flex-col items-center text-center p-6 hover-scale glassmorphism">
              <div className="bg-blue-50 p-4 rounded-lg mb-5">
                <MessageCircle className="h-8 w-8 text-career-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Interview Practice</h3>
              <p className="text-gray-600">
                Practice interviews with our AI coach that provides feedback on your responses, tone, and delivery.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link to="/jobs">
              <Button variant="outline" className="glowing-border">Discover More</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Your Career Journey with Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
              Your Career Journey with Us
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Follow these simple steps to kickstart your professional growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
            {/* Step 1: Create Your Profile */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-career-blue text-white rounded-full flex items-center justify-center text-2xl font-bold">
                    1
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <User className="h-10 w-10 text-career-blue p-2 bg-white rounded-full border-2 border-career-blue" />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mt-6 mb-3">Create Your Profile</h3>
              <p className="text-gray-600">
                Build your comprehensive profile with our AI-powered onboarding wizard.
              </p>
              <div className="mt-6">
                <Link to="/signup">
                  <Button className="futuristic-btn">Get Started</Button>
                </Link>
              </div>
            </div>

            {/* Step 2: Explore Your Dashboard */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-career-blue text-white rounded-full flex items-center justify-center text-2xl font-bold">
                    2
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <LayoutGrid className="h-10 w-10 text-career-blue p-2 bg-white rounded-full border-2 border-career-blue" />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mt-6 mb-3">Explore Your Dashboard</h3>
              <p className="text-gray-600">
                Get insights on your career readiness, skill gaps, and personalized recommendations.
              </p>
              <div className="mt-6">
                <Link to="/profile">
                  <Button className="futuristic-btn">View Dashboard</Button>
                </Link>
              </div>
            </div>

            {/* Step 3: Apply to Top Jobs */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-career-blue text-white rounded-full flex items-center justify-center text-2xl font-bold">
                    3
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <Briefcase className="h-10 w-10 text-career-blue p-2 bg-white rounded-full border-2 border-career-blue" />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mt-6 mb-3">Apply to Top Jobs</h3>
              <p className="text-gray-600">
                Get matched with opportunities aligned with your skills and career goals.
              </p>
              <div className="mt-6">
                <Link to="/jobs">
                  <Button className="futuristic-btn">Find Jobs</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Tools for Your Career Journey
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Everything you need to plan, develop, and advance your career.
            </p>
          </div>

          <div className="mt-12">
            <Tabs defaultValue="skills" className="w-full">
              <TabsList className="grid w-full grid-cols-3 rounded-xl p-1 glassmorphism">
                <TabsTrigger value="skills" className="rounded-lg">Skills Assessment</TabsTrigger>
                <TabsTrigger value="market" className="rounded-lg">Market Insights</TabsTrigger>
                <TabsTrigger value="planning" className="rounded-lg">Career Planning</TabsTrigger>
              </TabsList>
              <TabsContent value="skills" className="mt-8 p-6 bg-gray-50 rounded-lg glassmorphism">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Assess Your Skills</h3>
                    <p className="mt-4 text-gray-600">
                      Identify your strengths and areas for improvement with our comprehensive skills
                      assessment tools. Get personalized recommendations for skill development.
                    </p>
                    <ul className="mt-6 space-y-3">
                      <li className="flex items-center">
                        <svg
                          className="h-5 w-5 mr-2 text-career-blue"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Personalized skill gap analysis
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-5 w-5 mr-2 text-career-blue"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Targeted learning recommendations
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-5 w-5 mr-2 text-career-blue"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Industry benchmark comparisons
                      </li>
                    </ul>
                    <div className="mt-6">
                      <Link to="/skills">
                        <Button className="futuristic-btn">
                          Take Assessment
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <img
                      src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=500&h=400"
                      alt="Skills Assessment"
                      className="rounded-lg shadow-md glassmorphism"
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="market" className="mt-8 p-6 bg-gray-50 rounded-lg glassmorphism">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Market Insights</h3>
                    <p className="mt-4 text-gray-600">
                      Stay informed about industry trends, salary benchmarks, and in-demand skills.
                      Our market insights help you make data-driven career decisions.
                    </p>
                    <ul className="mt-6 space-y-3">
                      <li className="flex items-center">
                        <svg
                          className="h-5 w-5 mr-2 text-career-blue"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Salary data for different roles
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-5 w-5 mr-2 text-career-blue"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Emerging industry trends
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-5 w-5 mr-2 text-career-blue"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Regional job demand forecasts
                      </li>
                    </ul>
                    <div className="mt-6">
                      <Link to="/insights">
                        <Button className="futuristic-btn">
                          View Insights
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <img
                      src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=500&h=400"
                      alt="Market Insights"
                      className="rounded-lg shadow-md glassmorphism"
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="planning" className="mt-8 p-6 bg-gray-50 rounded-lg glassmorphism">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Career Planning</h3>
                    <p className="mt-4 text-gray-600">
                      Set your career goals and create actionable plans to achieve them.
                      Visualize your path and track your progress along the way.
                    </p>
                    <ul className="mt-6 space-y-3">
                      <li className="flex items-center">
                        <svg
                          className="h-5 w-5 mr-2 text-career-blue"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        5-year career roadmap creation
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-5 w-5 mr-2 text-career-blue"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Milestone tracking and reminders
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-5 w-5 mr-2 text-career-blue"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Goal-oriented skill development plans
                      </li>
                    </ul>
                    <div className="mt-6">
                      <Link to="/career-paths">
                        <Button className="futuristic-btn">
                          Create Plan
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <img
                      src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=500&h=400"
                      alt="Career Planning"
                      className="rounded-lg shadow-md glassmorphism"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Success Stories
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              See how others have transformed their careers with Visiondrill.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="hover-scale futuristic-card">
                <CardContent className="p-6">
                  <div className="text-gray-600 italic">&ldquo;{testimonial.quote}&rdquo;</div>
                  <div className="mt-4">
                    <p className="text-gray-900 font-medium">{testimonial.author}</p>
                    <p className="text-gray-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-career-blue text-white animated-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl neon-text">
            Ready to Transform Your Career?
          </h2>
          <p className="mt-4 text-xl opacity-90 max-w-2xl mx-auto">
            Join thousands of professionals who are navigating their career paths with confidence.
          </p>
          <div className="mt-8">
            <Link to="/signup">
              <Button className="bg-white text-career-blue hover:bg-gray-100 futuristic-btn high-contrast-text">
                <Rocket className="h-5 w-5 mr-2" />
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
