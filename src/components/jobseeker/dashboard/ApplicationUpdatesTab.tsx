
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, ChevronRight } from "lucide-react";

interface ApplicationUpdatesTabProps {
  onViewApplication: (application: any) => void;
}

export const ApplicationUpdatesTab = ({ onViewApplication }: ApplicationUpdatesTabProps) => {
  const applicationUpdates = [
    {
      id: 1,
      company: "TechCorp Inc.",
      position: "Senior Frontend Developer",
      status: "Interview Scheduled",
      date: "May 15, 2023",
    },
    {
      id: 2,
      company: "Innovate Solutions",
      position: "Backend Engineer",
      status: "Application Received",
      date: "May 10, 2023",
    },
    {
      id: 3,
      company: "Creative Digital Agency",
      position: "UX Designer",
      status: "Rejected",
      date: "May 5, 2023",
    },
  ];

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <Users className="h-5 w-5 text-blue-600" />
          Application Updates
        </CardTitle>
        <CardDescription>Track the status of your recent job applications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {applicationUpdates.map((update) => (
          <div
            key={update.id}
            className="p-6 bg-gradient-to-r from-white to-gray-50/50 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {update.position}
                </h3>
                <div className="text-sm text-gray-600">
                  {update.company}
                </div>
              </div>
              <div className="text-right">
                <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-3 py-1">
                  {update.status}
                </Badge>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Updated on {update.date}
              </div>
              <Button 
                variant="outline" 
                className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-all duration-200"
                onClick={() => onViewApplication(update)}
              >
                View Application
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
