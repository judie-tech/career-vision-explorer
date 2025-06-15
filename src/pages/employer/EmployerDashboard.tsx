
import React from "react";
import DashboardLayout from "@/components/admin/DashboardLayout";
import { JobPostHeader } from "@/components/employer/JobPostHeader";
import { StatisticsCards } from "@/components/employer/StatisticsCards";
import { RecentApplicantsTable } from "@/components/employer/RecentApplicantsTable";
import { JobListingsTable } from "@/components/employer/JobListingsTable";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, Briefcase } from "lucide-react";

const EmployerDashboard = () => {
  return (
    <DashboardLayout title="Employer Dashboard" role="employer">
      <div className="space-y-8 p-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Welcome Back!
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                Manage your job postings and connect with top talent
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="bg-blue-50 p-3 rounded-full">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Job Post Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <JobPostHeader />
        </div>

        {/* Statistics Cards */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center mb-6">
            <div className="bg-purple-50 p-2 rounded-lg mr-3">
              <Briefcase className="h-5 w-5 text-purple-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Quick Overview</h2>
          </div>
          <StatisticsCards />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Job Listings */}
          <Card className="shadow-sm border-gray-100 hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-0">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="bg-blue-50 p-2 rounded-lg mr-3">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">Active Job Listings</h2>
                </div>
              </div>
              <div className="p-6">
                <JobListingsTable />
              </div>
            </CardContent>
          </Card>

          {/* Recent Applicants */}
          <Card className="shadow-sm border-gray-100 hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-0">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="bg-green-50 p-2 rounded-lg mr-3">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">Recent Applications</h2>
                </div>
              </div>
              <div className="p-6">
                <RecentApplicantsTable />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Spacing */}
        <div className="h-8"></div>
      </div>
    </DashboardLayout>
  );
};

export default EmployerDashboard;
