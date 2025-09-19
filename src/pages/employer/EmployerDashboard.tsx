import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/admin/DashboardLayout";
import { JobPostHeader } from "@/components/employer/JobPostHeader";
import { StatisticsCards } from "@/components/employer/StatisticsCards";
import { RecentApplicantsTable } from "@/components/employer/RecentApplicantsTable";
import { JobListingsTable } from "@/components/employer/JobListingsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  Users,
  Briefcase,
  PlusCircle,
  FolderOpen,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "@/components/ui/sonner";
import { ApiErrorBoundary } from "@/components/error/ApiErrorBoundary";
import { DashboardSwitcher } from "@/components/layout/EmpDashboardSwitch";
// Mock Active Projects Table component (you'll need to create this)
const ActiveProjectsTable = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center space-x-4">
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse shadow-sm"></div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">
              Mobile App Development
            </h3>
            <p className="text-base text-gray-600 mt-1">
              React Native • 3 developers assigned
            </p>
            <div className="flex items-center mt-2 space-x-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
              <span className="text-sm font-medium text-blue-600">75%</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold mb-2">
            In Progress
          </span>
          <p className="text-sm text-gray-500">Due: Dec 15, 2024</p>
        </div>
      </div>

      <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center space-x-4">
          <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse shadow-sm"></div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">
              E-commerce Platform
            </h3>
            <p className="text-base text-gray-600 mt-1">
              Full Stack • 5 developers assigned
            </p>
            <div className="flex items-center mt-2 space-x-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-400 h-2 rounded-full"
                  style={{ width: "25%" }}
                ></div>
              </div>
              <span className="text-sm font-medium text-blue-600">25%</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold mb-2">
            Planning
          </span>
          <p className="text-sm text-gray-500">Due: Jan 30, 2025</p>
        </div>
      </div>

      <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center space-x-4">
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse shadow-sm"></div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">
              Data Analytics Dashboard
            </h3>
            <p className="text-base text-gray-600 mt-1">
              Python/ML • 2 developers assigned
            </p>
            <div className="flex items-center mt-2 space-x-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: "90%" }}
                ></div>
              </div>
              <span className="text-sm font-medium text-blue-600">90%</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold mb-2">
            Testing
          </span>
          <p className="text-sm text-gray-500">Due: Nov 20, 2024</p>
        </div>
      </div>
    </div>
  );
};

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, hasRole, isLoading } = useAuth();

  useEffect(() => {
    // Check authentication and employer role
    if (!isLoading && !isAuthenticated) {
      toast.error("Authentication Required", {
        description: "Please log in to access the employer dashboard",
      });
      navigate("/admin/login?returnUrl=/employer/dashboard");
      return;
    }

    if (!isLoading && isAuthenticated && !hasRole("employer")) {
      toast.error("Access Denied", {
        description: "You need employer permissions to access this page",
      });
      navigate("/");
      return;
    }
  }, [isAuthenticated, hasRole, isLoading, navigate]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Don't render if not authenticated or not an employer
  if (!isAuthenticated || !hasRole("employer")) {
    return null;
  }

  return (
    <ApiErrorBoundary>
      <DashboardLayout title="Employer Dashboard" role="employer">
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Header Section */}
          <div className="mb-8">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="mb-6 lg:mb-0">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3">
                      Welcome Back!
                    </h1>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Manage your job postings and connect with top talent from
                      around the world
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl shadow-lg">
                      <TrendingUp className="h-8 w-8 text-white" />
                    </div>
                    <div className="hidden sm:block">
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Dashboard</p>
                        <p className="font-semibold text-gray-800">
                          Employer Portal
                        </p>
                      </div>
                    </div>

                  </div>
                  <div className="p-1">
                    < DashboardSwitcher />


                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Job Post Header - Quick Actions */}
          <div className="mb-8">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <JobPostHeader />
            </Card>
          </div>

          {/* Statistics Overview */}
          <div className="mb-8">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-xl font-semibold text-gray-800">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-2 rounded-xl mr-3 shadow-lg">
                    <Briefcase className="h-5 w-5 text-white" />
                  </div>
                  Quick Overview & Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <StatisticsCards />
              </CardContent>
            </Card>
          </div>

          {/* Recent Applications */}
          <div className="mb-8">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="border-b border-gray-100/80 bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl mr-4 shadow-lg group-hover:scale-105 transition-transform duration-200">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-800">
                        Recent Applications
                      </h2>
                      <p className="text-sm text-gray-600 mt-1">
                        Latest submissions
                      </p>
                    </div>
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    New
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <RecentApplicantsTable />
              </CardContent>
            </Card>
          </div>

          {/* Recent Job Listings */}
          <div className="mb-8">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="border-b border-gray-100/80 bg-gradient-to-r from-blue-50 to-cyan-50">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-3 rounded-xl mr-4 shadow-lg group-hover:scale-105 transition-transform duration-200">
                      <Briefcase className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-800">
                        Recent Job Listings
                      </h2>
                      <p className="text-sm text-gray-600 mt-1">
                        Last 5 postings
                      </p>
                    </div>
                  </div>
                  <button className="flex items-center bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-2 rounded-full text-sm font-medium transition-colors duration-200">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add New
                  </button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <JobListingsTable limit={5} />
              </CardContent>
            </Card>
          </div>

          {/* Active Projects */}
          <div className="mb-8">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="border-b border-gray-100/80 bg-gradient-to-r from-orange-50 to-amber-50">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-3 rounded-xl mr-4 shadow-lg group-hover:scale-105 transition-transform duration-200">
                      <FolderOpen className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-800">
                        Active Projects
                      </h2>
                      <p className="text-sm text-gray-600 mt-1">Ongoing work</p>
                    </div>
                  </div>
                  <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                    3 Active
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ActiveProjectsTable />
              </CardContent>
            </Card>
          </div>

          {/* Bottom Spacing for Better Visual Balance */}
          <div className="h-12"></div>
        </div>
      </DashboardLayout>
    </ApiErrorBoundary>
  );
};

export default EmployerDashboard;
