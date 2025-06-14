
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { ThemeProvider } from "@/components/theme/ThemeProvider"
import { Toaster } from "@/components/ui/toaster"
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Jobs from "@/pages/Jobs";
import Skills from "@/pages/Skills";
import Insights from "@/pages/Insights";
import CareerPaths from "@/pages/CareerPaths";
import Partners from "@/pages/Partners";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/NotFound";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminJobs from "@/pages/admin/AdminJobs";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminSettings from "@/pages/admin/AdminSettings";
import EmployerDashboard from "@/pages/admin/EmployerDashboard";
import JobSeekerDashboard from "@/pages/admin/JobSeekerDashboard";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <div className="min-h-screen bg-gray-50">
          <Router>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/career-paths" element={<CareerPaths />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/profile" element={<Profile />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <Routes>
                      <Route path="dashboard" element={<AdminDashboard />} />
                      <Route path="jobs" element={<AdminJobs />} />
                      <Route path="users" element={<AdminUsers />} />
                      <Route path="settings" element={<AdminSettings />} />
                    </Routes>
                  </ProtectedRoute>
                }
              />
              
              {/* Employer Routes */}
              <Route
                path="/employer/*"
                element={
                  <ProtectedRoute requiredRole="employer">
                    <Routes>
                      <Route path="dashboard" element={<EmployerDashboard />} />
                    </Routes>
                  </ProtectedRoute>
                }
              />
              
              {/* Job Seeker Routes */}
              <Route
                path="/jobseeker/*"
                element={
                  <ProtectedRoute requiredRole="jobseeker">
                    <Routes>
                      <Route path="dashboard" element={<JobSeekerDashboard />} />
                    </Routes>
                  </ProtectedRoute>
                }
              />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </div>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
