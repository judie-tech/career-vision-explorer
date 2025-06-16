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
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout/Layout";
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, TrendingDown, Users, DollarSign, Briefcase, MapPin, Filter, BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon, Sparkles } from "lucide-react";
import { useInsights } from "@/hooks/use-insights-provider";
import { InsightsProvider } from "@/hooks/use-insights-provider";

const InsightsContent = () => {
  const [industry, setIndustry] = useState("all-industries");
  const [region, setRegion] = useState("all-regions");
  
  const {
    marketData,
    industryInsights,
    regionalData,
    salaryByRoleData,
    jobTrendData,
    skillDemandData,
  } = useInsights();

  const SKILL_COLORS = [
    "#3b82f6",
    "#8b5cf6",
    "#6366f1",
    "#a855f7",
    "#ec4899",
    "#14b8a6",
  ];

  const formatValue = (type: string, value: number) => {
    switch (type) {
      case "average_salary":
        return `$${value.toLocaleString()}`;
      case "remote_jobs":
        return `${value}%`;
      default:
        return value.toLocaleString();
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "average_salary":
        return <DollarSign className="h-4 w-4 sm:h-6 sm:w-6" />;
      case "remote_jobs":
        return <Users className="h-4 w-4 sm:h-6 sm:w-6" />;
      default:
        return <Briefcase className="h-4 w-4 sm:h-6 sm:w-6" />;
    }
  };

  const getChangeColor = (change: string) => {
    if (change.startsWith('+')) return 'text-green-600';
    if (change.startsWith('-')) return 'text-red-600';
    return 'text-gray-600';
  };

  const getChangeIcon = (change: string) => {
    if (change.startsWith('+')) return <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />;
    if (change.startsWith('-')) return <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4" />;
    return null;
  };

  // Filter data based on selected filters
  const filteredIndustryInsights = industry === "all-industries" 
    ? industryInsights 
    : industryInsights.filter(insight => 
        insight.industry.toLowerCase().includes(industry.replace('-', ' '))
      );

  const filteredRegionalData = region === "all-regions"
    ? regionalData
    : regionalData.filter(data =>
        data.region.toLowerCase().includes(region.replace('-', ' '))
      );

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-12">
          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              <Badge variant="secondary" className="text-xs sm:text-sm font-medium px-2 sm:px-3 py-1">
                Market Intelligence
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
              Market Insights & Analytics
            </h1>
            <p className="text-sm sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
              Discover comprehensive market trends, salary benchmarks, and in-demand skills 
              to make informed career decisions and stay ahead of the competition.
            </p>
          </div>

          {/* Filter section */}
          <Card className="mb-6 sm:mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Filter Data</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger className="h-10 sm:h-12 border-2 focus:border-blue-500 text-sm sm:text-base">
                    <SelectValue placeholder="Filter by industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-industries">All Industries</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger className="h-10 sm:h-12 border-2 focus:border-blue-500 text-sm sm:text-base">
                    <SelectValue placeholder="Filter by region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-regions">All Regions</SelectItem>
                    <SelectItem value="san-francisco">San Francisco Bay Area</SelectItem>
                    <SelectItem value="new-york">New York City</SelectItem>
                    <SelectItem value="austin">Austin, TX</SelectItem>
                    <SelectItem value="seattle">Seattle, WA</SelectItem>
                    <SelectItem value="boston">Boston, MA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Main dashboard */}
          <Tabs defaultValue="market" className="space-y-6 sm:space-y-8">
            <div className="flex justify-center">
              <TabsList className="grid grid-cols-3 w-full max-w-lg h-12 sm:h-14 bg-white/80 backdrop-blur-sm border-2 p-1">
                <TabsTrigger value="market" className="flex items-center gap-1 sm:gap-2 h-full data-[state=active]:bg-blue-500 data-[state=active]:text-white text-xs sm:text-sm">
                  <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Market Overview</span>
                  <span className="sm:hidden">Market</span>
                </TabsTrigger>
                <TabsTrigger value="industry" className="flex items-center gap-1 sm:gap-2 h-full data-[state=active]:bg-blue-500 data-[state=active]:text-white text-xs sm:text-sm">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Industry Insights</span>
                  <span className="sm:hidden">Industry</span>
                </TabsTrigger>
                <TabsTrigger value="regional" className="flex items-center gap-1 sm:gap-2 h-full data-[state=active]:bg-blue-500 data-[state=active]:text-white text-xs sm:text-sm">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Regional Analysis</span>
                  <span className="sm:hidden">Regional</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="market" className="mt-6 sm:mt-8 space-y-6 sm:space-y-8">
              {/* Market Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {marketData.map((data) => (
                  <Card key={data.id} className="relative overflow-hidden border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 group">
                    <CardHeader className="pb-2 sm:pb-3">
                      <div className="flex items-center justify-between">
                        <div className="p-2 sm:p-3 rounded-xl bg-blue-100 text-blue-600 group-hover:bg-blue-200 transition-colors">
                          {getIcon(data.type)}
                        </div>
                        <div className={`flex items-center gap-1 ${getChangeColor(data.change)}`}>
                          {getChangeIcon(data.change)}
                          <span className="text-xs sm:text-sm font-medium">{data.change}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardTitle className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">
                        {data.label}
                      </CardTitle>
                      <div className="text-xl sm:text-3xl font-bold text-gray-900 mb-1">
                        {formatValue(data.type, data.value)}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500">from last month</p>
                    </CardContent>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Card>
                ))}
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                  <CardHeader className="pb-2 sm:pb-4">
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                      <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                      Salary by Role
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-60 sm:h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={salaryByRoleData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                          <YAxis tick={{ fontSize: 10 }} />
                          <Tooltip 
                            formatter={(value) => [`$${value.toLocaleString()}`, "Avg. Salary"]}
                            contentStyle={{ 
                              backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                              border: 'none', 
                              borderRadius: '8px', 
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                              fontSize: '12px'
                            }}
                          />
                          <Bar dataKey="salary" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
                          <defs>
                            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#3b82f6" />
                              <stop offset="100%" stopColor="#1d4ed8" />
                            </linearGradient>
                          </defs>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                  <CardHeader className="pb-2 sm:pb-4">
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                      <LineChartIcon className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                      Job Openings Trend
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-60 sm:h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={jobTrendData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                          <YAxis tick={{ fontSize: 10 }} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                              border: 'none', 
                              borderRadius: '8px', 
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                              fontSize: '12px'
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="jobs"
                            stroke="#8b5cf6"
                            strokeWidth={3}
                            activeDot={{ r: 6, fill: "#8b5cf6" }}
                            name="Job Openings"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Skills Section */}
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader className="pb-2 sm:pb-4">
                  <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                    <PieChartIcon className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                    In-demand Skills Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                  <div className="h-60 sm:h-80">
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
                        <Tooltip 
                          formatter={(value) => [`${value}%`, "Demand"]}
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                            border: 'none', 
                            borderRadius: '8px', 
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                            fontSize: '12px'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-4 sm:space-y-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">Key Market Insights</h3>
                    <div className="space-y-3 sm:space-y-4">
                      {[
                        { skill: "React", trend: "dominate", color: "bg-blue-500" },
                        { skill: "Python", trend: "high demand", color: "bg-purple-500" },
                        { skill: "Data Analysis", trend: "growing", color: "bg-indigo-500" },
                        { skill: "Cloud Services", trend: "expanding", color: "bg-violet-500" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                          <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${item.color}`}></div>
                          <span className="font-medium text-gray-900 text-sm sm:text-base">{item.skill}</span>
                          <span className="text-xs sm:text-sm text-gray-600">continues to {item.trend}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Market Trends - Mobile optimized */}
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader className="pb-2 sm:pb-4">
                  <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                    <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                    Market Trends & Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {[
                      {
                        title: "Remote Work Revolution",
                        description: "32% of positions now offer remote options, transforming how companies attract talent globally.",
                        icon: <Users className="h-4 w-4 sm:h-6 sm:w-6" />,
                        color: "bg-blue-100 text-blue-600"
                      },
                      {
                        title: "AI & Automation Impact",
                        description: "Growing demand for workers who can collaborate with AI systems and leverage automation tools.",
                        icon: <Sparkles className="h-4 w-4 sm:h-6 sm:w-6" />,
                        color: "bg-purple-100 text-purple-600"
                      },
                      {
                        title: "Skills-based Hiring",
                        description: "Employers prioritize demonstrated skills over traditional credentials, creating new opportunities.",
                        icon: <TrendingUp className="h-4 w-4 sm:h-6 sm:w-6" />,
                        color: "bg-green-100 text-green-600"
                      }
                    ].map((trend, index) => (
                      <div key={index} className="p-4 sm:p-6 rounded-xl border border-gray-200 hover:border-gray-300 transition-all hover:shadow-md">
                        <div className={`inline-flex p-2 sm:p-3 rounded-lg ${trend.color} mb-3 sm:mb-4`}>
                          {trend.icon}
                        </div>
                        <h3 className="text-sm sm:text-lg font-semibold text-gray-900 mb-2">{trend.title}</h3>
                        <p className="text-xs sm:text-base text-gray-600 leading-relaxed">{trend.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="industry" className="mt-6 sm:mt-8 space-y-6 sm:space-y-8">
              {/* Industry Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredIndustryInsights.map((insight) => (
                  <Card key={insight.id} className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 group">
                    <CardHeader className="pb-2 sm:pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm sm:text-lg font-bold text-gray-900">{insight.industry}</CardTitle>
                        <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                          {insight.growthRate}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 sm:space-y-6">
                      <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <div className="text-center p-2 sm:p-3 rounded-lg bg-blue-50">
                          <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mx-auto mb-1" />
                          <p className="text-xs text-gray-600">Avg. Salary</p>
                          <p className="font-bold text-blue-600 text-xs sm:text-sm">{insight.averageSalary}</p>
                        </div>
                        <div className="text-center p-2 sm:p-3 rounded-lg bg-green-50">
                          <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mx-auto mb-1" />
                          <p className="text-xs text-gray-600">Growth</p>
                          <p className="font-bold text-green-600 text-xs sm:text-sm">{insight.growthRate}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 text-xs sm:text-sm">Top Roles</h4>
                        <div className="space-y-1">
                          {insight.topRoles.slice(0, 3).map((role, idx) => (
                            <Badge key={idx} variant="outline" className="mr-1 mb-1 text-xs">
                              {role}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 text-xs sm:text-sm">Key Skills</h4>
                        <div className="flex flex-wrap gap-1">
                          {insight.topSkills.slice(0, 4).map((skill, idx) => (
                            <Badge key={idx} className="text-xs bg-blue-100 text-blue-800 hover:bg-blue-200">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button variant="outline" className="w-full group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors text-xs sm:text-sm h-8 sm:h-10">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="regional" className="mt-6 sm:mt-8 space-y-6 sm:space-y-8">
              {/* Regional Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredRegionalData.map((region) => (
                  <Card key={region.id} className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 group">
                    <CardHeader className="pb-2 sm:pb-4">
                      <CardTitle className="flex items-center gap-2 text-sm sm:text-lg font-bold text-gray-900">
                        <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                        {region.region}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 sm:space-y-6">
                      <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <div className="text-center p-2 sm:p-3 rounded-lg bg-blue-50">
                          <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mx-auto mb-1" />
                          <p className="text-xs text-gray-600">Avg. Salary</p>
                          <p className="font-bold text-blue-600 text-xs sm:text-sm">{region.averageSalary}</p>
                        </div>
                        <div className="text-center p-2 sm:p-3 rounded-lg bg-green-50">
                          <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mx-auto mb-1" />
                          <p className="text-xs text-gray-600">Job Growth</p>
                          <p className="font-bold text-green-600 text-xs sm:text-sm">{region.jobGrowth}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 text-xs sm:text-sm">Top Industries</h4>
                        <div className="flex flex-wrap gap-1">
                          {region.topIndustries.map((industry, idx) => (
                            <Badge key={idx} className="text-xs bg-purple-100 text-purple-800">
                              {industry}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="p-2 sm:p-3 rounded-lg bg-gray-50">
                        <h4 className="font-semibold text-gray-900 mb-1 text-xs sm:text-sm">Cost of Living</h4>
                        <p className="text-gray-600 text-xs sm:text-sm">{region.costOfLiving}</p>
                      </div>

                      <Button variant="outline" className="w-full group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors text-xs sm:text-sm h-8 sm:h-10">
                        View Region Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

const Insights = () => {
  return (
    <InsightsProvider>
      <InsightsContent />
    </InsightsProvider>
  );
};

export default Insights;
