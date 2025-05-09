
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, BarChart2, Route, Compass } from "lucide-react";
import CareerPathVisualizer from "@/components/career/CareerPathVisualizer";

const CareerPaths = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <Layout>
      <div className="container py-8">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="text-3xl font-bold mb-2 gradient-text neon-text">Explore Career Paths</h1>
          <p className="text-gray-500">
            Visualize different career trajectories and understand what skills and experience
            you need to progress in your professional journey.
          </p>
        </div>
        
        <div className="max-w-xl mx-auto mb-10">
          <div className="flex gap-2">
            <Input
              placeholder="Search career paths..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 futuristic-input"
            />
            <Button className="futuristic-btn">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="visualize" className="max-w-5xl mx-auto">
          <TabsList className="grid grid-cols-3 w-[400px] mx-auto mb-8 glassmorphism p-1">
            <TabsTrigger value="visualize" className="flex items-center gap-2">
              <Route className="w-4 h-4" />
              <span>Visualize</span>
            </TabsTrigger>
            <TabsTrigger value="compare" className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4" />
              <span>Compare</span>
            </TabsTrigger>
            <TabsTrigger value="roadmap" className="flex items-center gap-2">
              <Compass className="w-4 h-4" />
              <span>Roadmap</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="visualize" className="glassmorphism p-6 rounded-xl">
            <CareerPathVisualizer />
          </TabsContent>
          
          <TabsContent value="compare" className="glassmorphism p-6 rounded-xl">
            <div className="text-center py-16">
              <h2 className="text-xl font-bold mb-2">Compare Career Paths</h2>
              <p className="text-gray-500 mb-4">
                Compare different career trajectories side by side to make informed decisions.
              </p>
              <Button className="futuristic-btn">Coming Soon</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="roadmap" className="glassmorphism p-6 rounded-xl">
            <div className="text-center py-16">
              <h2 className="text-xl font-bold mb-2">Personal Career Roadmap</h2>
              <p className="text-gray-500 mb-4">
                Create your personalized career roadmap based on your skills and goals.
              </p>
              <Button className="futuristic-btn">Coming Soon</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default CareerPaths;
