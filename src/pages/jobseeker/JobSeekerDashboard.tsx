import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { DashboardBackground } from "@/components/jobseeker/dashboard/DashboardBackground";
import { ProfileCompletionCard } from "@/components/jobseeker/dashboard/ProfileCompletionCard";
import { RecentActivityCard } from "@/components/jobseeker/dashboard/RecentActivityCard";
import { QuickStatsCards } from "@/components/jobseeker/dashboard/QuickStatsCards";
import EditProfileDialog from "@/components/profile/EditProfileDialog";
import { useAuth } from "@/hooks/use-auth";
import { Bell, MessageSquare, Edit3 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const JobSeekerDashboard = () => {
  const { profile } = useAuth();
  const [editProfileOpen, setEditProfileOpen] = useState(false);

  const handleSaveProfile = async (data: any) => {
    console.log("Saving profile:", data);
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
                      onClick={() => setEditProfileOpen(true)}
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
            {/* Profile Completion Card - Left half */}
            <div>
              <ProfileCompletionCard />
            </div>

            {/* Recent Activity Card - Right half */}
            <div>
              <RecentActivityCard />
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
      </div>
    </Layout>
  );
};

export default JobSeekerDashboard;
