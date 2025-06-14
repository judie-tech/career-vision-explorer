
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart2, Clock } from "lucide-react";
import { useCareerPaths } from "@/hooks/use-career-paths";
import { useToast } from "@/hooks/use-toast";

const ComparePathsTab = () => {
  const { careerPaths } = useCareerPaths();
  const { toast } = useToast();
  const [selectedPaths, setSelectedPaths] = useState<string[]>([]);

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

  return (
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
  );
};

export default ComparePathsTab;
