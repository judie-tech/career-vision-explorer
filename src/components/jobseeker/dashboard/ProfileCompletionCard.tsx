
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Target } from "lucide-react";

export const ProfileCompletionCard = () => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <Target className="h-5 w-5 text-blue-600" />
          Profile Completion
        </CardTitle>
        <CardDescription>Complete your profile to attract more employers</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-700">Overall Progress</span>
            <span className="font-medium text-gray-900">85%</span>
          </div>
          <Progress value={85} className="h-3" />
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">Add Work Experience</span>
            <Badge className="bg-green-100 text-green-800 border-green-200">Complete</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">Upload Resume</span>
            <Badge className="bg-orange-100 text-orange-800 border-orange-200">Pending</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
