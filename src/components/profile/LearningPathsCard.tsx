
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, BookOpen, Play, Eye } from "lucide-react";
import { useLearningPaths } from "@/hooks/use-learning-paths";
import BrowseLearningPathsDialog from "@/components/learning/BrowseLearningPathsDialog";
import LearningPathDetailsDialog from "@/components/learning/LearningPathDetailsDialog";

const LearningPathsCard = () => {
  const { learningPaths } = useLearningPaths();
  const [showBrowseDialog, setShowBrowseDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedPath, setSelectedPath] = useState(null);

  const handleViewDetails = (path) => {
    setSelectedPath(path);
    setShowDetailsDialog(true);
  };

  const handleContinueLearning = (path) => {
    setSelectedPath(path);
    setShowDetailsDialog(true);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">My Learning Paths</CardTitle>
          <CardDescription>Track your progress in various learning programs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {learningPaths.map((path) => (
              <div key={path.id} className="border rounded-lg p-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div>
                    <h3 className="font-medium flex items-center">
                      <GraduationCap className="h-5 w-5 mr-2 text-blue-500" />
                      {path.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {path.modulesCompleted} of {path.modules} modules completed
                    </p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <Badge className="bg-blue-100 text-blue-800">
                      {path.progress}% Complete
                    </Badge>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{path.progress}%</span>
                  </div>
                  <Progress value={path.progress} />
                </div>
                
                <div className="mt-4 flex gap-3">
                  <Button 
                    className="flex-1 flex items-center"
                    onClick={() => handleContinueLearning(path)}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Continue Learning
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 flex items-center"
                    onClick={() => handleViewDetails(path)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            ))}
            
            <div className="border border-dashed rounded-lg p-4 flex flex-col items-center justify-center py-8">
              <BookOpen className="h-8 w-8 text-gray-400 mb-2" />
              <h3 className="font-medium">Discover New Learning Paths</h3>
              <p className="text-sm text-gray-500 mt-1 text-center max-w-sm">
                Explore our curated learning paths to develop new skills and advance your career.
              </p>
              <Button 
                className="mt-4"
                onClick={() => setShowBrowseDialog(true)}
              >
                Browse Learning Paths
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <BrowseLearningPathsDialog
        open={showBrowseDialog}
        onOpenChange={setShowBrowseDialog}
      />

      <LearningPathDetailsDialog
        open={showDetailsDialog}
        onOpenChange={setShowDetailsDialog}
        learningPath={selectedPath}
      />
    </>
  );
};

export default LearningPathsCard;
