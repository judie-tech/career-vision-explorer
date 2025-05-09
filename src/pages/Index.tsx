
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
      <section className="bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div className="sm:text-center lg:text-left animate-fade-in">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Navigate Your</span>{" "}
                <span className="block gradient-text">Career Journey</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto lg:mx-0">
                Discover career paths, explore job opportunities, and develop your skills with
                personalized guidance. Your professional future starts here.
              </p>
              <div className="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link to="/signup">
                    <Button className="w-full px-8 py-6 text-lg bg-career-blue hover:bg-career-blue/90">
                      Get Started
                    </Button>
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link to="/career-paths">
                    <Button variant="outline" className="w-full px-8 py-6 text-lg">
                      Explore Careers
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-12 relative lg:mt-0 animate-fade-in">
              <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:px-0 lg:max-w-none">
                <img
                  className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5"
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=600&h=400"
                  alt="Career planning dashboard"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Search Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Find Your Next Opportunity
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Search through thousands of job listings tailored to your skills and preferences.
            </p>
            <div className="mt-8 max-w-2xl mx-auto">
              <div className="flex rounded-md shadow-sm">
                <Input
                  type="text"
                  placeholder="Search jobs, skills, or companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-l-md"
                />
                <Link to={`/jobs?q=${searchQuery}`}>
                  <Button className="rounded-l-none bg-career-blue hover:bg-career-blue/90">
                    Search
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Featured Jobs</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredJobs.map((job) => (
                <Card key={job.id} className="hover-scale">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900">{job.title}</h4>
                    <p className="text-gray-600">{job.company}</p>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <svg
                        className="h-4 w-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {job.location}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{job.salary}</div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {job.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6">
                      <Link to={`/jobs/${job.id}`}>
                        <Button variant="outline" className="w-full">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link to="/jobs">
                <Button variant="outline">Browse All Jobs</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Career Paths Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Discover Career Paths
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Explore different career trajectories and understand what skills and experience
              you need to progress.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {careerPaths.map((path) => (
              <div key={path.id} className="career-card hover-scale">
                <div className="h-48 w-full overflow-hidden rounded-lg">
                  <img
                    src={path.image}
                    alt={path.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-4 text-xl font-bold text-gray-900">{path.title}</h3>
                <p className="mt-2 text-gray-600">{path.description}</p>
                <div className="mt-4">
                  <Link to={`/career-paths/${path.id}`}>
                    <Button variant="outline" className="w-full">
                      Explore Path
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/career-paths">
              <Button variant="outline">View All Career Paths</Button>
            </Link>
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
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="skills">Skills Assessment</TabsTrigger>
                <TabsTrigger value="market">Market Insights</TabsTrigger>
                <TabsTrigger value="planning">Career Planning</TabsTrigger>
              </TabsList>
              <TabsContent value="skills" className="mt-8 p-6 bg-gray-50 rounded-lg">
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
                        <Button className="bg-career-blue hover:bg-career-blue/90">
                          Take Assessment
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <img
                      src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=500&h=400"
                      alt="Skills Assessment"
                      className="rounded-lg shadow-md"
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="market" className="mt-8 p-6 bg-gray-50 rounded-lg">
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
                        <Button className="bg-career-blue hover:bg-career-blue/90">
                          View Insights
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <img
                      src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=500&h=400"
                      alt="Market Insights"
                      className="rounded-lg shadow-md"
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="planning" className="mt-8 p-6 bg-gray-50 rounded-lg">
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
                        <Button className="bg-career-blue hover:bg-career-blue/90">
                          Create Plan
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <img
                      src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=500&h=400"
                      alt="Career Planning"
                      className="rounded-lg shadow-md"
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
              <Card key={testimonial.id} className="hover-scale">
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
      <section className="py-16 bg-career-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Ready to Transform Your Career?
          </h2>
          <p className="mt-4 text-xl opacity-90 max-w-2xl mx-auto">
            Join thousands of professionals who are navigating their career paths with confidence.
          </p>
          <div className="mt-8">
            <Link to="/signup">
              <Button className="bg-white text-career-blue hover:bg-gray-100">
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
