
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Compass, Clock, TrendingUp, Star, CheckCircle2, Circle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MyRoadmapTab = () => {
  const { toast } = useToast();
  const [roadmapGoals, setRoadmapGoals] = useState<string[]>([
    "Complete JavaScript fundamentals",
    "Build first React project",
    "Learn backend technologies"
  ]);

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
  );
};

export default MyRoadmapTab;
