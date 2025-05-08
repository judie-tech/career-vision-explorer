
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Layout from "@/components/layout/Layout";

const CareerPaths = () => {
  const [industry, setIndustry] = useState("");

  // Mock career path data
  const careerPaths = [
    {
      id: 1,
      title: "Software Development",
      description: "From junior developer to CTO, explore the software development career path",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&h=200",
      roles: [
        "Junior Developer",
        "Mid-level Developer",
        "Senior Developer",
        "Tech Lead",
        "Software Architect",
        "CTO",
      ],
      skills: ["Programming", "System Design", "Problem Solving", "Communication", "Leadership"],
      averageSalary: "$105,000",
      growthRate: "+22%",
      demandLevel: "Very High",
    },
    {
      id: 2,
      title: "Data Science",
      description: "Navigate the world of data, from analyst to chief data officer",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=300&h=200",
      roles: [
        "Data Analyst",
        "Data Scientist",
        "Senior Data Scientist",
        "Data Science Manager",
        "Chief Data Officer",
      ],
      skills: ["Statistics", "Machine Learning", "Data Visualization", "SQL", "Python"],
      averageSalary: "$115,000",
      growthRate: "+28%",
      demandLevel: "Very High",
    },
    {
      id: 3,
      title: "Product Management",
      description: "Build the roadmap from product associate to VP of Product",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=300&h=200",
      roles: [
        "Associate Product Manager",
        "Product Manager",
        "Senior Product Manager",
        "Director of Product",
        "VP of Product",
      ],
      skills: ["User Research", "Roadmap Planning", "Stakeholder Management", "Analytics", "Strategy"],
      averageSalary: "$125,000",
      growthRate: "+18%",
      demandLevel: "High",
    },
    {
      id: 4,
      title: "UX/UI Design",
      description: "Create seamless user experiences from junior designer to design director",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=300&h=200",
      roles: [
        "Junior Designer",
        "UX/UI Designer",
        "Senior Designer",
        "Lead Designer",
        "Design Director",
      ],
      skills: ["User Research", "Wireframing", "Visual Design", "Prototyping", "Design Systems"],
      averageSalary: "$95,000",
      growthRate: "+15%",
      demandLevel: "High",
    },
    {
      id: 5,
      title: "Digital Marketing",
      description: "Grow from marketing specialist to chief marketing officer",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=300&h=200",
      roles: [
        "Marketing Specialist",
        "Digital Marketing Manager",
        "Marketing Director",
        "VP of Marketing",
        "CMO",
      ],
      skills: ["SEO", "Content Strategy", "Analytics", "Campaign Management", "Brand Development"],
      averageSalary: "$90,000",
      growthRate: "+10%",
      demandLevel: "Medium",
    },
    {
      id: 6,
      title: "DevOps Engineering",
      description: "Progress through the infrastructure and operations pathway",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=300&h=200",
      roles: [
        "Junior DevOps Engineer",
        "DevOps Engineer",
        "Senior DevOps Engineer",
        "DevOps Lead",
        "Head of Infrastructure",
      ],
      skills: ["CI/CD", "Cloud Services", "Infrastructure as Code", "Monitoring", "Security"],
      averageSalary: "$120,000",
      growthRate: "+25%",
      demandLevel: "Very High",
    },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Explore Career Paths
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Discover the journey from entry-level to leadership positions across different industries.
          </p>
        </div>

        {/* Filter section */}
        <div className="mb-8 flex justify-end">
          <div className="w-full md:w-64">
            <Select value={industry} onValueChange={setIndustry}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Industries</SelectItem>
                <SelectItem value="tech">Technology</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="design">Design</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Career paths grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careerPaths.map((path) => (
            <Card key={path.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={path.image}
                    alt={path.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{path.title}</h3>
                  <p className="text-gray-600 mb-4">{path.description}</p>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-sm font-medium text-gray-500">Average Salary</p>
                      <p className="text-lg font-bold text-career-blue">{path.averageSalary}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-sm font-medium text-gray-500">Growth Rate</p>
                      <p className="text-lg font-bold text-green-600">{path.growthRate}</p>
                    </div>
                  </div>

                  <Link to={`/career-paths/${path.id}`}>
                    <Button className="w-full bg-career-blue hover:bg-career-blue/90">
                      Explore Path
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured career path */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Career Path: Software Development</h2>
          
          <Tabs defaultValue="progression">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="progression">Career Progression</TabsTrigger>
              <TabsTrigger value="skills">Key Skills</TabsTrigger>
              <TabsTrigger value="insights">Industry Insights</TabsTrigger>
            </TabsList>
            <TabsContent value="progression" className="mt-6">
              <div className="relative">
                {/* Progression line */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full border-l-2 border-dashed border-career-blue/30 top-0 z-0"></div>
                
                {/* Progression steps */}
                <div className="space-y-12 relative z-10">
                  {careerPaths[0].roles.map((role, index) => (
                    <div
                      key={index}
                      className={`flex flex-col md:flex-row items-center ${
                        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                    >
                      <div className="md:w-5/12 text-center md:text-right md:pr-8 md:pl-0 px-4">
                        {index % 2 === 0 ? (
                          <>
                            <h4 className="text-lg font-bold text-gray-900">{role}</h4>
                            <p className="text-gray-600">
                              {index === 0 && "1-2 years of experience"}
                              {index === 1 && "2-5 years of experience"}
                              {index === 2 && "5-8 years of experience"}
                              {index === 3 && "8-10 years of experience"}
                              {index === 4 && "10-15 years of experience"}
                              {index === 5 && "15+ years of experience"}
                            </p>
                          </>
                        ) : null}
                      </div>

                      <div className="md:w-2/12 flex justify-center">
                        <div className="w-10 h-10 rounded-full bg-career-blue text-white flex items-center justify-center">
                          {index + 1}
                        </div>
                      </div>

                      <div className="md:w-5/12 text-center md:text-left md:pl-8 md:pr-0 px-4">
                        {index % 2 !== 0 ? (
                          <>
                            <h4 className="text-lg font-bold text-gray-900">{role}</h4>
                            <p className="text-gray-600">
                              {index === 0 && "1-2 years of experience"}
                              {index === 1 && "2-5 years of experience"}
                              {index === 2 && "5-8 years of experience"}
                              {index === 3 && "8-10 years of experience"}
                              {index === 4 && "10-15 years of experience"}
                              {index === 5 && "15+ years of experience"}
                            </p>
                          </>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="skills" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {careerPaths[0].skills.map((skill, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <h4 className="font-bold text-gray-900">{skill}</h4>
                    <div className="mt-2 h-2.5 w-full bg-gray-200 rounded-full">
                      <div
                        className="h-2.5 rounded-full bg-career-blue"
                        style={{ width: `${85 - index * 10}%` }}
                      ></div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      {index === 0 && "Essential for all software development roles"}
                      {index === 1 && "Critical for mid-level positions and above"}
                      {index === 2 && "Required for all levels, especially senior roles"}
                      {index === 3 && "Increasingly important as you advance"}
                      {index === 4 && "Required for leadership positions"}
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="insights" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-2">Market Demand</h4>
                  <div className="text-3xl font-bold text-career-blue">Very High</div>
                  <p className="mt-2 text-gray-600">
                    The demand for software developers continues to outpace supply in most markets.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-2">Remote Work</h4>
                  <div className="text-3xl font-bold text-career-purple">70%</div>
                  <p className="mt-2 text-gray-600">
                    Percentage of jobs offering remote or hybrid work options.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-2">Key Employers</h4>
                  <ul className="mt-2 space-y-1">
                    <li className="text-gray-600">• Tech Giants (Google, Microsoft, Apple)</li>
                    <li className="text-gray-600">• Startups and Scale-ups</li>
                    <li className="text-gray-600">• Financial Institutions</li>
                    <li className="text-gray-600">• Healthcare Technology</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h4 className="font-bold text-gray-900 mb-4">Salary Progression</h4>
                <div className="relative h-60">
                  <div className="absolute inset-0 flex items-end">
                    {careerPaths[0].roles.map((role, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div
                          className="w-full bg-career-blue"
                          style={{
                            height: `${20 + index * 30}px`,
                            opacity: 0.6 + index * 0.1,
                          }}
                        ></div>
                        <span className="text-xs font-medium mt-2 text-gray-600 text-center">
                          {role.split(" ")[0]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-2 text-center text-sm text-gray-500">
                  Average salary ranges from $70,000 for Junior roles to $200,000+ for leadership positions
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* CTA section */}
        <div className="mt-16 bg-career-blue text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold">Ready to Map Your Career Journey?</h2>
          <p className="mt-2 text-lg opacity-90">
            Create a personalized career development plan based on your skills and goals.
          </p>
          <div className="mt-6">
            <Link to="/signup">
              <Button className="bg-white text-career-blue hover:bg-gray-100">
                Create Your Career Plan
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CareerPaths;
