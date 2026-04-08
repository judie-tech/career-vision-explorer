import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Video, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Interview {
  id: string;
  jobTitle: string;
  company: string;
  date: string;
  time: string;
  type: "video" | "phone" | "in-person";
  status: "upcoming" | "completed" | "cancelled";
  location?: string;
}

const mockInterviews: Interview[] = [
  {
    id: "1",
    jobTitle: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    date: "2024-07-20",
    time: "10:00 AM",
    type: "video",
    status: "upcoming"
  },
  {
    id: "2",
    jobTitle: "UI/UX Designer",
    company: "Design Studio",
    date: "2024-07-22",
    time: "2:00 PM",
    type: "in-person",
    status: "upcoming",
    location: "123 Design Ave, NYC"
  }
];

export const InterviewsCard = () => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />;
      case "in-person":
        return <MapPin className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "upcoming":
        return "default";
      case "completed":
        return "secondary";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <Calendar className="h-5 w-5 text-blue-600" />
          Upcoming Interviews
        </CardTitle>
        <CardDescription>Your scheduled interviews and meetings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockInterviews.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No interviews scheduled</p>
            <Button variant="outline" className="mt-4" asChild>
              <Link to="/jobs">Browse Jobs</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {mockInterviews.slice(0, 3).map((interview) => (
                <div key={interview.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-gray-900">{interview.jobTitle}</h4>
                      <Badge variant={getStatusBadgeVariant(interview.status)}>
                        {interview.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{interview.company}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(interview.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {interview.time}
                      </div>
                      <div className="flex items-center gap-1">
                        {getTypeIcon(interview.type)}
                        <span className="capitalize">{interview.type}</span>
                      </div>
                    </div>
                    {interview.location && (
                      <p className="text-xs text-gray-400 mt-1">{interview.location}</p>
                    )}
                  </div>
                  <Button variant="ghost" size="sm">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/jobseeker/dashboard">View All Interviews</Link>
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};