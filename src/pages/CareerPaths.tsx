
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, BarChart2, Route, Compass, Filter, Sparkles, TrendingUp, Clock } from "lucide-react";
import CareerPathVisualizer from "@/components/career/CareerPathVisualizer";
import { useCareerPaths } from "@/hooks/use-career-paths";

const CareerPaths = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const { careerPaths } = useCareerPaths();
  
  // Create popular paths from the career paths data
  const popularPaths = careerPaths.map(path => ({
    title: path.title,
    description: path.description,
    duration: path.estimatedDuration,
    difficulty: path.difficulty,
    steps: path.steps.length,
    color: path.category === 'Development' ? 'bg-blue-500' : 
           path.category === 'Data Science' ? 'bg-purple-500' :
           path.category === 'Design' ? 'bg-green-500' : 'bg-orange-500',
    id: path.id,
    category: path.category,
    tags: path.tags
  }));

  // Filter paths based on search query and selected filter
  const filteredPaths = popularPaths.filter(path => {
    const matchesSearch = searchQuery === "" || 
      path.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      path.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      path.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      path.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = selectedFilter === "all" || 
      (selectedFilter === "trending" && ['Development', 'Data Science'].includes(path.category));
    
    return matchesSearch && matchesFilter;
  });

  const handlePathClick = (pathId: string) => {
    console.log(`Selected career path: ${pathId}`);
    // The CareerPathVisualizer will handle the detailed view
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSelectedFilter("all");
  };
  
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="container py-12">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-blue-600" />
              <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">Career Guidance</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Explore Career Paths
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover structured career journeys tailored to your goals. Visualize progression steps, 
              required skills, and timelines to achieve your dream role.
            </p>
          </div>
          
          {/* Search and Filters */}
          <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search career paths, skills, or industries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 text-base border-2 focus:border-blue-500"
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant={selectedFilter === "all" ? "default" : "outline"} 
                    onClick={() => setSelectedFilter("all")}
                    className="h-12"
                  >
                    All Paths ({popularPaths.length})
                  </Button>
                  <Button 
                    variant={selectedFilter === "trending" ? "default" : "outline"} 
                    onClick={() => setSelectedFilter("trending")}
                    className="h-12"
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Trending ({popularPaths.filter(p => ['Development', 'Data Science'].includes(p.category)).length})
                  </Button>
                  {(searchQuery || selectedFilter !== "all") && (
                    <Button 
                      variant="ghost" 
                      onClick={handleClearSearch}
                      className="h-12"
                    >
                      Clear
                    </Button>
                  )}
                </div>
              </div>
              {filteredPaths.length !== popularPaths.length && (
                <div className="mt-4 text-sm text-muted-foreground">
                  Showing {filteredPaths.length} of {popularPaths.length} career paths
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Browse Cards */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Route className="h-6 w-6 text-blue-600" />
              {selectedFilter === "trending" ? "Trending" : "Popular"} Career Paths
            </h2>
            
            {filteredPaths.length === 0 ? (
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <div className="max-w-md mx-auto">
                    <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No career paths found</h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your search terms or filters to find relevant career paths.
                    </p>
                    <Button onClick={handleClearSearch}>
                      Clear all filters
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredPaths.map((path, index) => (
                  <Card 
                    key={path.id || index} 
                    className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-white/90 backdrop-blur-sm hover:scale-105"
                    onClick={() => handlePathClick(path.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className={`w-12 h-12 rounded-lg ${path.color} flex items-center justify-center mb-3`}>
                        <Route className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                        {path.title}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {path.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Duration</span>
                          <Badge variant="secondary" className="text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            {path.duration}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Difficulty</span>
                          <Badge 
                            variant={path.difficulty === 'Beginner' ? 'secondary' : 
                                   path.difficulty === 'Intermediate' ? 'default' : 'destructive'}
                            className="text-xs"
                          >
                            {path.difficulty}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Steps</span>
                          <span className="font-medium">{path.steps} stages</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Category</span>
                          <Badge variant="outline" className="text-xs">
                            {path.category}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
          
          {/* Main Tabs Section */}
          <Tabs defaultValue="visualize" className="space-y-8">
            <div className="flex justify-center">
              <TabsList className="grid grid-cols-3 w-full max-w-md h-14 bg-white/80 backdrop-blur-sm border-2 p-1">
                <TabsTrigger value="visualize" className="flex items-center gap-2 h-full data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                  <Route className="w-4 h-4" />
                  <span className="hidden sm:inline">Visualize Path</span>
                  <span className="sm:hidden">Visualize</span>
                </TabsTrigger>
                <TabsTrigger value="compare" className="flex items-center gap-2 h-full data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                  <BarChart2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Compare Paths</span>
                  <span className="sm:hidden">Compare</span>
                </TabsTrigger>
                <TabsTrigger value="roadmap" className="flex items-center gap-2 h-full data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                  <Compass className="w-4 h-4" />
                  <span className="hidden sm:inline">My Roadmap</span>
                  <span className="sm:hidden">Roadmap</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="visualize" className="space-y-6">
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl flex items-center justify-center gap-2">
                    <Route className="h-6 w-6 text-blue-600" />
                    Interactive Career Path Visualizer
                  </CardTitle>
                  <CardDescription className="text-base">
                    Explore detailed career progressions with skills, timelines, and salary insights
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <CareerPathVisualizer />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="compare" className="space-y-6">
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <div className="max-w-md mx-auto">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <BarChart2 className="h-10 w-10 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Compare Career Paths</h2>
                    <p className="text-muted-foreground mb-8 leading-relaxed">
                      Side-by-side comparison of different career trajectories including salary ranges, 
                      skill requirements, and progression timelines to help you make informed decisions.
                    </p>
                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Coming Soon
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="roadmap" className="space-y-6">
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <div className="max-w-md mx-auto">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Compass className="h-10 w-10 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Personal Career Roadmap</h2>
                    <p className="text-muted-foreground mb-8 leading-relaxed">
                      Create your personalized career roadmap based on your current skills, experience, 
                      and career goals with AI-powered recommendations and milestone tracking.
                    </p>
                    <Button size="lg" className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Coming Soon
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default CareerPaths;
