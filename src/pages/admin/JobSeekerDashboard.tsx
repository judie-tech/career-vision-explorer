
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApplicationDetailsDialog } from "@/components/jobseeker/ApplicationDetailsDialog";
import { QuickStatsCards } from "@/components/jobseeker/dashboard/QuickStatsCards";
import { OverviewTab } from "@/components/jobseeker/dashboard/OverviewTab";
import { JobRecommendationsTab } from "@/components/jobseeker/dashboard/JobRecommendationsTab";
import { ApplicationUpdatesTab } from "@/components/jobseeker/dashboard/ApplicationUpdatesTab";
import { LearningPathsTab } from "@/components/jobseeker/dashboard/LearningPathsTab";

const JobSeekerDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [applicationDialogOpen, setApplicationDialogOpen] = useState(false);

  const handleViewApplication = (application: any) => {
    setSelectedApplication(application);
    setApplicationDialogOpen(true);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-green-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
        
        <div className="relative container py-8 space-y-8">
          {/* Header */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Welcome back, Sarah! 👋
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Your personalized dashboard to track your career journey and discover new opportunities.
            </p>
          </div>

          {/* Quick Stats */}
          <QuickStatsCards />

          {/* Main Dashboard Content */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm rounded-xl p-1 shadow-lg">
              <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg transition-all duration-300">
                Overview
              </TabsTrigger>
              <TabsTrigger value="applications" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg transition-all duration-300">
                Applications
              </TabsTrigger>
              <TabsTrigger value="recommendations" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg transition-all duration-300">
                Recommendations
              </TabsTrigger>
              <TabsTrigger value="learning" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg transition-all duration-300">
                Learning
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <OverviewTab />
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-6">
              <JobRecommendationsTab />
            </TabsContent>

            <TabsContent value="applications" className="space-y-6">
              <ApplicationUpdatesTab onViewApplication={handleViewApplication} />
            </TabsContent>

            <TabsContent value="learning" className="space-y-6">
              <LearningPathsTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <ApplicationDetailsDialog
        application={selectedApplication}
        open={applicationDialogOpen}
        onOpenChange={setApplicationDialogOpen}
      />
    </Layout>
  );
};

export default JobSeekerDashboard;
