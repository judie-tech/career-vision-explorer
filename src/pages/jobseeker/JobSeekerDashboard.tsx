import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { DashboardBackground } from "@/components/jobseeker/dashboard/DashboardBackground";
import { ProfileCompletionCard } from "@/components/jobseeker/dashboard/ProfileCompletionCard";
import { RecentActivityCard } from "@/components/jobseeker/dashboard/RecentActivityCard";
import { QuickStatsCards } from "@/components/jobseeker/dashboard/QuickStatsCards";
import { InterviewScheduleDialog } from "@/components/jobseeker/InterviewScheduleDialog";
import EditProfileDialog from "@/components/profile/EditProfileDialog";
import { useAuth } from "@/hooks/use-auth";
import {
  Bell,
  MessageSquare,
  Edit3,
  Calendar,
  Clock,
  Video,
  Phone,
  MapPin,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useInterviewSchedule } from "@/hooks/use-interview-schedule";

const JobSeekerDashboard = () => {
  const { profile } = useAuth();
  const { interviews, getUpcomingInterviews } = useInterviewSchedule();
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [interviewDialogOpen, setInterviewDialogOpen] = useState(false);
  const navigate = useNavigate();

  const upcomingInterviews = getUpcomingInterviews();
  const nextInterview = upcomingInterviews[0];

  const handleSaveProfile = async (data: any) => {
    console.log("Saving profile:", data);
  };

  const handleEditProfile = () => {
    navigate("/profile");
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Video":
        return <Video className="h-3 w-3" />;
      case "Phone":
        return <Phone className="h-3 w-3" />;
      case "In-person":
        return <MapPin className="h-3 w-3" />;
      default:
        return <Calendar className="h-3 w-3" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Video":
        return "bg-blue-100 text-blue-700";
      case "Phone":
        return "bg-green-100 text-green-700";
      case "In-person":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Layout>
      <div className="min-h-screen relative overflow-hidden">
        <DashboardBackground />

        <div className="relative container py-8">
          {/* Header Section - Each side takes half the page */}
          <div className="flex items-start justify-between mb-8">
            {/* Left Side: Profile Info - Takes full 50% width */}
            <div className="flex-1 flex items-start justify-between pr-8">
              {/* Profile Photo and Name Section - Uses full width */}
              <div className="flex items-start gap-6 w-full">
                <Avatar className="h-20 w-20 flex-shrink-0">
                  <AvatarImage src={profile?.profile_image_url} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-lg">
                    {profile?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase() || "PN"}
                  </AvatarFallback>
                </Avatar>

                {/* Name and Actions - Takes remaining space */}
                <div className="flex flex-col gap-4 flex-1">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {profile?.name || "Profile Name"}
                  </h1>

                  {/* Edit Profile Button and Notification Icons - Now in same row */}
                  <div className="flex items-center gap-4">
                    <Button
                      onClick={handleEditProfile}
                      className="flex items-center gap-2"
                    >
                      <Edit3 className="h-4 w-4" />
                      Edit Profile
                    </Button>

                    {/* Notification Icons - Enlarged and next to button */}
                    <button className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                      <Bell className="h-6 w-6" />
                    </button>
                    <button className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                      <MessageSquare className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Quick Stats - Takes 50% */}
            <div className="flex-1 flex items-center justify-end pl-8">
              <QuickStatsCards />
            </div>
          </div>

          {/* Main Content Grid - Each takes half the page */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <ProfileCompletionCard />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <RecentActivityCard />

              {/* Upcoming Interviews Card */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    Upcoming Interviews
                    {upcomingInterviews.length > 0 && (
                      <Badge variant="secondary" className="ml-auto">
                        {upcomingInterviews.length}
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>
                    Your scheduled interviews and meetings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {nextInterview ? (
                    <>
                      {/* Next Interview */}
                      <div className="p-3 border rounded-lg space-y-2 bg-gradient-to-r from-blue-50 to-white">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-sm">
                              {nextInterview.jobTitle}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {nextInterview.company}
                            </p>
                          </div>
                          <Badge
                            className={`text-xs ${getTypeColor(
                              nextInterview.type
                            )}`}
                          >
                            {getTypeIcon(nextInterview.type)}
                            <span className="ml-1">{nextInterview.type}</span>
                          </Badge>
                        </div>

                        <div className="flex items-center gap-3 text-xs">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(nextInterview.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {nextInterview.time}
                          </div>
                        </div>

                        <p className="text-xs">
                          <span className="font-medium">Interviewer:</span>{" "}
                          {nextInterview.interviewerName}
                        </p>
                      </div>

                      {/* View All Button - Now with blue background */}
                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => setInterviewDialogOpen(true)}
                      >
                        View All Interviews
                      </Button>
                    </>
                  ) : (
                    <div className="text-center py-4 space-y-3">
                      <Calendar className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="text-muted-foreground text-sm">
                        No upcoming interviews
                      </p>
                      {/* View Schedule Button - Now with blue background */}
                      <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        size="sm"
                        onClick={() => setInterviewDialogOpen(true)}
                      >
                        View Schedule
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Edit Profile Dialog */}
        <EditProfileDialog
          open={editProfileOpen}
          onOpenChange={setEditProfileOpen}
          userData={{
            name: profile?.name || "",
            email: profile?.email || "",
            role: profile?.role || "",
            education: profile?.education || "",
            experience: profile?.experience || "",
            location: profile?.location || "",
            phone: profile?.phone || "",
            bio: profile?.bio || "",
            profileImage: profile?.profile_image_url || "",
          }}
          onSave={handleSaveProfile}
        />

        {/* Interview Schedule Dialog */}
        <InterviewScheduleDialog
          open={interviewDialogOpen}
          onOpenChange={setInterviewDialogOpen}
        />
      </div>
    </Layout>
  );
};

export default JobSeekerDashboard;
