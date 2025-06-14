
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
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
import AdminTestimonials from "@/pages/admin/AdminTestimonials";
import AdminContent from "@/pages/admin/AdminContent";
import EmployerDashboard from "@/pages/admin/EmployerDashboard";
import JobSeekerDashboard from "@/pages/admin/JobSeekerDashboard";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/hooks/use-auth";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
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
                <Route path="/admin" element={
                  <ProtectedRoute requiredRole="admin">
                    <Navigate to="/admin/dashboard" replace />
                  </ProtectedRoute>
                } />
                <Route path="/admin/dashboard" element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin/jobs" element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminJobs />
                  </ProtectedRoute>
                } />
                <Route path="/admin/users" element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminUsers />
                  </ProtectedRoute>
                } />
                <Route path="/admin/settings" element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminSettings />
                  </ProtectedRoute>
                } />
                <Route path="/admin/career-paths" element={
                  <ProtectedRoute requiredRole="admin">
                    <CareerPaths />
                  </ProtectedRoute>
                } />
                <Route path="/admin/skills" element={
                  <ProtectedRoute requiredRole="admin">
                    <Skills />
                  </ProtectedRoute>
                } />
                <Route path="/admin/testimonials" element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminTestimonials />
                  </ProtectedRoute>
                } />
                <Route path="/admin/content" element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminContent />
                  </ProtectedRoute>
                } />
                
                {/* Employer Routes */}
                <Route path="/employer/dashboard" element={
                  <ProtectedRoute requiredRole="employer">
                    <EmployerDashboard />
                  </ProtectedRoute>
                } />
                
                {/* Job Seeker Routes */}
                <Route path="/jobseeker/dashboard" element={
                  <ProtectedRoute requiredRole="jobseeker">
                    <JobSeekerDashboard />
                  </ProtectedRoute>
                } />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
          </div>
          <Toaster />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
