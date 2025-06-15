
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

export const RecentActivityCard = () => {
  const activities = [
    {
      text: "Applied to DevOps Engineer position",
      color: "blue"
    },
    {
      text: "Profile viewed by 2 employers",
      color: "green"
    },
    {
      text: "Completed skills assessment",
      color: "purple"
    }
  ];

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <Clock className="h-5 w-5 text-green-600" />
          Recent Activity
        </CardTitle>
        <CardDescription>Your latest actions and updates</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <div key={index} className={`flex items-center gap-3 p-3 bg-${activity.color}-50 rounded-lg`}>
              <div className={`h-2 w-2 bg-${activity.color}-500 rounded-full`}></div>
              <span className="text-sm text-gray-700">{activity.text}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
