
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import Layout from "@/components/layout/Layout";
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";

const Insights = () => {
  const [industry, setIndustry] = useState("");
  const [region, setRegion] = useState("");

  // Mock data for charts
  const salaryByRoleData = [
    { name: "Software Engineer", salary: 110000 },
    { name: "Data Scientist", salary: 120000 },
    { name: "Product Manager", salary: 125000 },
    { name: "UX Designer", salary: 95000 },
    { name: "DevOps Engineer", salary: 115000 },
    { name: "Marketing Manager", salary: 90000 },
  ];

  const jobTrendData = [
    { month: "Jan", jobs: 5200 },
    { month: "Feb", jobs: 5000 },
    { month: "Mar", jobs: 5400 },
    { month: "Apr", jobs: 5600 },
    { month: "May", jobs: 6000 },
    { month: "Jun", jobs: 5800 },
    { month: "Jul", jobs: 6200 },
    { month: "Aug", jobs: 6400 },
    { month: "Sep", jobs: 6700 },
    { month: "Oct", jobs: 6500 },
    { month: "Nov", jobs: 6800 },
    { month: "Dec", jobs: 7000 },
  ];

  const skillDemandData = [
    { name: "React", value: 25 },
    { name: "Python", value: 20 },
    { name: "Data Analysis", value: 15 },
    { name: "Cloud Services", value: 12 },
    { name: "UX Design", value: 10 },
    { name: "Leadership", value: 18 },
  ];

  const SKILL_COLORS = [
    "#3b82f6",
    "#8b5cf6",
    "#6366f1",
    "#a855f7",
    "#ec4899",
    "#14b8a6",
  ];

  // Industry insights data
  const industryInsights = [
    {
      industry: "Technology",
      topRoles: ["Software Engineer", "Product Manager", "Data Scientist"],
      averageSalary: "$115,000",
      growthRate: "+18%",
      topSkills: ["Programming", "System Design", "AI/ML"],
    },
    {
      industry: "Finance",
      topRoles: ["Financial Analyst", "Investment Banker", "Risk Manager"],
      averageSalary: "$105,000",
      growthRate: "+8%",
      topSkills: ["Financial Modeling", "Risk Assessment", "Regulatory Compliance"],
    },
    {
      industry: "Healthcare",
      topRoles: ["Medical Technician", "Healthcare Administrator", "Nurse Practitioner"],
      averageSalary: "$95,000",
      growthRate: "+15%",
      topSkills: ["Patient Care", "Medical Knowledge", "Regulatory Compliance"],
    },
  ];

  // Regional data
  const regionalData = [
    {
      region: "San Francisco Bay Area",
      topIndustries: ["Tech", "Biotech", "Finance"],
      averageSalary: "$145,000",
      jobGrowth: "+12%",
      costOfLiving: "Very High",
    },
    {
      region: "New York City",
      topIndustries: ["Finance", "Media", "Fashion"],
      averageSalary: "$125,000",
      jobGrowth: "+9%",
      costOfLiving: "Very High",
    },
    {
      region: "Austin, TX",
      topIndustries: ["Tech", "Education", "Healthcare"],
      averageSalary: "$95,000",
      jobGrowth: "+15%",
      costOfLiving: "Medium",
    },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Market Insights
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Stay informed about industry trends, salary benchmarks, and in-demand skills.
          </p>
        </div>

        {/* Filter section */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
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
          
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Regions</SelectItem>
              <SelectItem value="us-west">US West</SelectItem>
              <SelectItem value="us-east">US East</SelectItem>
              <SelectItem value="us-central">US Central</SelectItem>
              <SelectItem value="europe">Europe</SelectItem>
              <SelectItem value="asia">Asia</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Main dashboard */}
        <div>
          <Tabs defaultValue="market">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="market">Market Overview</TabsTrigger>
              <TabsTrigger value="industry">Industry Insights</TabsTrigger>
              <TabsTrigger value="regional">Regional Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="market" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Job Openings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-career-blue">128,432</div>
                    <p className="text-sm text-gray-500">+15% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Average Salary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-career-blue">$112,500</div>
                    <p className="text-sm text-gray-500">+5% from last year</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Remote Jobs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-career-blue">32%</div>
                    <p className="text-sm text-gray-500">+8% from last year</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Salary by Role</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={salaryByRoleData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`$${value}`, "Avg. Salary"]} />
                          <Legend />
                          <Bar dataKey="salary" fill="#3b82f6" name="Average Salary" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Job Openings Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={jobTrendData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="jobs"
                            stroke="#8b5cf6"
                            activeDot={{ r: 8 }}
                            name="Job Openings"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>In-demand Skills</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col md:flex-row items-center">
                    <div className="w-full md:w-1/2 h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={skillDemandData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {skillDemandData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={SKILL_COLORS[index % SKILL_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value}%`, "Demand"]} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="w-full md:w-1/2 mt-6 md:mt-0">
                      <h3 className="font-bold text-lg mb-3">Key Takeaways</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <span className="inline-block w-3 h-3 rounded-full bg-career-blue mr-2"></span>
                          React continues to dominate frontend development
                        </li>
                        <li className="flex items-center">
                          <span className="inline-block w-3 h-3 rounded-full bg-career-purple mr-2"></span>
                          Python skills highly sought after for data and backend roles
                        </li>
                        <li className="flex items-center">
                          <span className="inline-block w-3 h-3 rounded-full bg-career-indigo mr-2"></span>
                          Data analysis skills in high demand across industries
                        </li>
                        <li className="flex items-center">
                          <span className="inline-block w-3 h-3 rounded-full bg-career-violet mr-2"></span>
                          Cloud service expertise growing in importance
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Market Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Remote Work Revolution</h3>
                        <p className="text-gray-700">
                          The shift to remote work continues to transform the job market, with 32% of all new positions
                          offering remote options. Companies are adapting their policies to attract top talent,
                          regardless of geographic location.
                        </p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">AI & Automation Impact</h3>
                        <p className="text-gray-700">
                          As AI and automation technologies mature, there's increasing demand for workers who can
                          collaborate with these systems. Roles requiring human creativity, critical thinking, and
                          emotional intelligence are seeing wage growth.
                        </p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Skills-based Hiring</h3>
                        <p className="text-gray-700">
                          Employers are placing greater emphasis on demonstrated skills over traditional credentials.
                          This trend is creating opportunities for career changers who invest in developing
                          in-demand capabilities through non-traditional education paths.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="industry" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {industryInsights.map((insight, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle>{insight.industry}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-gray-700">Top Roles</h3>
                          <ul className="mt-1 space-y-1">
                            {insight.topRoles.map((role, idx) => (
                              <li key={idx} className="text-gray-600">• {role}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h3 className="font-semibold text-gray-700">Average Salary</h3>
                            <p className="text-career-blue font-medium">{insight.averageSalary}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-700">Growth Rate</h3>
                            <p className="text-green-600 font-medium">{insight.growthRate}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-gray-700">In-Demand Skills</h3>
                          <div className="mt-1 flex flex-wrap gap-2">
                            {insight.topSkills.map((skill, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <Button variant="outline" className="w-full">
                          View Industry Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Industry Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Industry
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Job Growth
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Avg. Salary
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Remote %
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Entry Barrier
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Technology
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                              +18%
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              $115,000
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              45%
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              Medium
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Finance
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                              +8%
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              $105,000
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              20%
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              High
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Healthcare
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                              +15%
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              $95,000
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              15%
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              Very High
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Marketing
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                              +12%
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              $85,000
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              40%
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              Medium
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Education
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                              +5%
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              $65,000
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              35%
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              Medium
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="regional" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {regionalData.map((region, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle>{region.region}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-gray-700">Top Industries</h3>
                          <div className="mt-1 flex flex-wrap gap-2">
                            {region.topIndustries.map((industry, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                              >
                                {industry}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h3 className="font-semibold text-gray-700">Average Salary</h3>
                            <p className="text-career-blue font-medium">{region.averageSalary}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-700">Job Growth</h3>
                            <p className="text-green-600 font-medium">{region.jobGrowth}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-gray-700">Cost of Living</h3>
                          <p className="mt-1 text-gray-600">{region.costOfLiving}</p>
                        </div>

                        <Button variant="outline" className="w-full">
                          View Region Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Remote Work Opportunities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <p className="text-gray-700">
                        The rise of remote work has created new opportunities for professionals to work for companies
                        based in high-salary regions while living in areas with lower costs of living.
                      </p>
                      
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h4 className="font-semibold text-gray-900 mb-2">Remote Work by Industry</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-gray-600">Technology</p>
                            <div className="mt-1 h-2 bg-gray-200 rounded-full">
                              <div className="h-2 bg-career-blue rounded-full" style={{ width: "75%" }}></div>
                            </div>
                            <p className="mt-1 text-xs text-right">75%</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Marketing</p>
                            <div className="mt-1 h-2 bg-gray-200 rounded-full">
                              <div className="h-2 bg-career-blue rounded-full" style={{ width: "65%" }}></div>
                            </div>
                            <p className="mt-1 text-xs text-right">65%</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Finance</p>
                            <div className="mt-1 h-2 bg-gray-200 rounded-full">
                              <div className="h-2 bg-career-blue rounded-full" style={{ width: "45%" }}></div>
                            </div>
                            <p className="mt-1 text-xs text-right">45%</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Design</p>
                            <div className="mt-1 h-2 bg-gray-200 rounded-full">
                              <div className="h-2 bg-career-blue rounded-full" style={{ width: "70%" }}></div>
                            </div>
                            <p className="mt-1 text-xs text-right">70%</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Education</p>
                            <div className="mt-1 h-2 bg-gray-200 rounded-full">
                              <div className="h-2 bg-career-blue rounded-full" style={{ width: "60%" }}></div>
                            </div>
                            <p className="mt-1 text-xs text-right">60%</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Healthcare</p>
                            <div className="mt-1 h-2 bg-gray-200 rounded-full">
                              <div className="h-2 bg-career-blue rounded-full" style={{ width: "25%" }}></div>
                            </div>
                            <p className="mt-1 text-xs text-right">25%</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Benefits of Remote Work Flexibility</h4>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start">
                            <svg
                              className="h-5 w-5 mr-2 text-career-blue flex-shrink-0"
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
                            <span>Access to job opportunities regardless of geographic location</span>
                          </li>
                          <li className="flex items-start">
                            <svg
                              className="h-5 w-5 mr-2 text-career-blue flex-shrink-0"
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
                            <span>Potential for higher salary-to-cost-of-living ratio</span>
                          </li>
                          <li className="flex items-start">
                            <svg
                              className="h-5 w-5 mr-2 text-career-blue flex-shrink-0"
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
                            <span>Improved work-life balance and reduced commute stress</span>
                          </li>
                          <li className="flex items-start">
                            <svg
                              className="h-5 w-5 mr-2 text-career-blue flex-shrink-0"
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
                            <span>Ability to choose living location based on personal preferences rather than job availability</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Insights;
