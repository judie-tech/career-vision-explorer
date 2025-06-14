
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Route, BarChart2, Compass, Sparkles } from "lucide-react";
import CareerPathVisualizer from "./CareerPathVisualizer";

const CareerPathsTabs = () => {
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
  );
};

export default CareerPathsTabs;
