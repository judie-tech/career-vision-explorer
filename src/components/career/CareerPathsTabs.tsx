
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Route, BarChart2, Compass, Clock, TrendingUp, Star, CheckCircle2, Circle } from "lucide-react";
import { useCareerPaths } from "@/hooks/use-career-paths";
import { useToast } from "@/hooks/use-toast";
import CareerPathVisualizer from "./CareerPathVisualizer";

const CareerPathsTabs = () => {
  const { careerPaths } = useCareerPaths();
  const { toast } = useToast();
  const [selectedPaths, setSelectedPaths] = useState<string[]>([]);
  const [roadmapGoals, setRoadmapGoals] = useState<string[]>([
    "Complete JavaScript fundamentals",
    "Build first React project",
    "Learn backend technologies"
  ]);

  const handlePathSelection = (pathId: string) => {
    setSelectedPaths(prev => {
      if (prev.includes(pathId)) {
        return prev.filter(id => id !== pathId);
      }
      if (prev.length >= 3) {
        toast({
          title: "Maximum Selection Reached",
          description: "You can compare up to 3 career paths at once.",
          variant: "destructive"
        });
        return prev;
      }
      return [...prev, pathId];
    });
  };

  const toggleRoadmapGoal = (goal: string) => {
    // In a real app, this would update the goal completion status
    toast({
      title: "Goal Updated",
      description: "Your roadmap progress has been updated.",
    });
  };

  const addNewGoal = () => {
    const newGoal = `New learning goal ${roadmapGoals.length + 1}`;
    setRoadmapGoals(prev => [...prev, newGoal]);
    toast({
      title: "Goal Added",
      description: "New goal added to your roadmap.",
    });
  };

  return (
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
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <BarChart2 className="h-6 w-6 text-blue-600" />
              Compare Career Paths
            </CardTitle>
            <CardDescription className="text-base">
              Select up to 3 career paths to compare side-by-side
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Path Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Select Paths to Compare</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {careerPaths.map((path) => (
                  <Card 
                    key={path.id}
                    className={`cursor-pointer transition-all ${
                      selectedPaths.includes(path.id) 
                        ? 'ring-2 ring-blue-500 bg-blue-50' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => handlePathSelection(path.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{path.title}</h4>
                          <p className="text-sm text-muted-foreground">{path.category}</p>
                        </div>
                        <Badge variant={path.difficulty === 'Beginner' ? 'secondary' : 
                                     path.difficulty === 'Intermediate' ? 'default' : 'destructive'}>
                          {path.difficulty}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Comparison Table */}
            {selectedPaths.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Path Comparison</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium">Attribute</th>
                        {selectedPaths.map(pathId => {
                          const path = careerPaths.find(p => p.id === pathId);
                          return (
                            <th key={pathId} className="text-left p-3 font-medium">
                              {path?.title}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-3 font-medium">Duration</td>
                        {selectedPaths.map(pathId => {
                          const path = careerPaths.find(p => p.id === pathId);
                          return (
                            <td key={pathId} className="p-3">
                              <Badge variant="secondary" className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {path?.estimatedDuration}
                              </Badge>
                            </td>
                          );
                        })}
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-medium">Difficulty</td>
                        {selectedPaths.map(pathId => {
                          const path = careerPaths.find(p => p.id === pathId);
                          return (
                            <td key={pathId} className="p-3">
                              <Badge variant={path?.difficulty === 'Beginner' ? 'secondary' : 
                                           path?.difficulty === 'Intermediate' ? 'default' : 'destructive'}>
                                {path?.difficulty}
                              </Badge>
                            </td>
                          );
                        })}
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-medium">Steps</td>
                        {selectedPaths.map(pathId => {
                          const path = careerPaths.find(p => p.id === pathId);
                          return (
                            <td key={pathId} className="p-3">{path?.steps.length} stages</td>
                          );
                        })}
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-medium">Category</td>
                        {selectedPaths.map(pathId => {
                          const path = careerPaths.find(p => p.id === pathId);
                          return (
                            <td key={pathId} className="p-3">
                              <Badge variant="outline">{path?.category}</Badge>
                            </td>
                          );
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {selectedPaths.length === 0 && (
              <div className="text-center py-8">
                <BarChart2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Select career paths above to start comparing</p>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="roadmap" className="space-y-6">
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <Compass className="h-6 w-6 text-blue-600" />
              My Career Roadmap
            </CardTitle>
            <CardDescription className="text-base">
              Track your progress and plan your career journey
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Progress Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span className="font-semibold">Current Level</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">Beginner</p>
                  <p className="text-sm text-muted-foreground">Frontend Development</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    <span className="font-semibold">Progress</span>
                  </div>
                  <p className="text-2xl font-bold text-green-600">65%</p>
                  <p className="text-sm text-muted-foreground">Goals Completed</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock className="h-5 w-5 text-purple-500" />
                    <span className="font-semibold">Est. Time</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-600">3 months</p>
                  <p className="text-sm text-muted-foreground">To next level</p>
                </CardContent>
              </Card>
            </div>

            {/* Learning Goals */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Learning Goals</h3>
                <Button onClick={addNewGoal} size="sm">
                  Add Goal
                </Button>
              </div>
              <div className="space-y-3">
                {roadmapGoals.map((goal, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => toggleRoadmapGoal(goal)}
                  >
                    {index < 2 ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-400" />
                    )}
                    <span className={index < 2 ? "line-through text-muted-foreground" : ""}>
                      {goal}
                    </span>
                    {index < 2 && (
                      <Badge variant="secondary" className="ml-auto">
                        Completed
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Actions */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Recommended Next Steps</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">Take Skills Assessment</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Evaluate your current skills to get personalized recommendations
                    </p>
                    <Button size="sm" className="w-full">
                      Start Assessment
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">Explore Learning Paths</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Discover structured courses to advance your skills
                    </p>
                    <Button size="sm" variant="outline" className="w-full">
                      Browse Courses
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default CareerPathsTabs;
