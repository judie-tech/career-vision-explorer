
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { AuthProvider } from "@/hooks/use-auth";
import { UsersProvider } from "@/hooks/use-users";
import Index from "./pages/Index";
import Jobs from "./pages/Jobs";
import Skills from "./pages/Skills";
import CareerPaths from "./pages/CareerPaths";
import Partners from "./pages/Partners";
import Insights from "./pages/Insights";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminJobs from "./pages/admin/AdminJobs";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminContent from "./pages/admin/AdminContent";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminInsights from "./pages/admin/AdminInsights";
import AdminCareerPaths from "./pages/admin/AdminCareerPaths";
import AdminSkills from "./pages/admin/AdminSkills";
import EmployerDashboard from "./pages/admin/EmployerDashboard";
import JobSeekerDashboard from "./pages/admin/JobSeekerDashboard";

// Employer pages
import EmployerJobs from "./pages/employer/EmployerJobs";
import JobApplicants from "./pages/employer/JobApplicants";
import AllApplicants from "./pages/employer/AllApplicants";
import InterviewSchedule from "./pages/employer/InterviewSchedule";
import EmployerInterviews from "./pages/employer/EmployerInterviews";

import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { UserProfileProvider } from "./hooks/use-user-profile";
import { LearningPathsProvider } from "./hooks/use-learning-paths";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="career-platform-theme">
        <AuthProvider>
          <UsersProvider>
            <UserProfileProvider>
              <LearningPathsProvider>
                <TooltipProvider>
                  <Toaster />
                  <Sonner />
                  <BrowserRouter>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/jobs" element={<Jobs />} />
                      <Route path="/skills" element={<Skills />} />
                      <Route path="/career-paths" element={<CareerPaths />} />
                      <Route path="/partners" element={<Partners />} />
                      <Route path="/insights" element={<Insights />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/profile" element={<Profile />} />
                      
                      {/* Admin routes */}
                      <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
                      <Route path="/admin/login" element={<AdminLogin />} />
                      <Route path="/admin/dashboard" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
                      <Route path="/admin/jobs" element={<ProtectedRoute requiredRole="admin"><AdminJobs /></ProtectedRoute>} />
                      <Route path="/admin/users" element={<ProtectedRoute requiredRole="admin"><AdminUsers /></ProtectedRoute>} />
                      <Route path="/admin/career-paths" element={<ProtectedRoute requiredRole="admin"><AdminCareerPaths /></ProtectedRoute>} />
                      <Route path="/admin/skills" element={<ProtectedRoute requiredRole="admin"><AdminSkills /></ProtectedRoute>} />
                      <Route path="/admin/content" element={<ProtectedRoute requiredRole="admin"><AdminContent /></ProtectedRoute>} />
                      <Route path="/admin/testimonials" element={<ProtectedRoute requiredRole="admin"><AdminTestimonials /></ProtectedRoute>} />
                      <Route path="/admin/insights" element={<ProtectedRoute requiredRole="admin"><AdminInsights /></ProtectedRoute>} />
                      <Route path="/admin/settings" element={<ProtectedRoute requiredRole="admin"><AdminSettings /></ProtectedRoute>} />
                      <Route path="/admin/employer" element={<ProtectedRoute requiredRole="admin"><EmployerDashboard /></ProtectedRoute>} />
                      <Route path="/admin/jobseeker" element={<ProtectedRoute requiredRole="admin"><JobSeekerDashboard /></ProtectedRoute>} />
                      
                      {/* Job seeker routes */}
                      <Route path="/jobseeker/dashboard" element={<ProtectedRoute requiredRole="jobseeker"><JobSeekerDashboard /></ProtectedRoute>} />
                      
                      {/* Employer routes */}
                      <Route path="/employer/jobs" element={<ProtectedRoute requiredRole="employer"><EmployerJobs /></ProtectedRoute>} />
                      <Route path="/employer/jobs/:jobId/applicants" element={<ProtectedRoute requiredRole="employer"><JobApplicants /></ProtectedRoute>} />
                      <Route path="/employer/applicants" element={<ProtectedRoute requiredRole="employer"><AllApplicants /></ProtectedRoute>} />
                      <Route path="/employer/interviews" element={<ProtectedRoute requiredRole="employer"><InterviewSchedule /></ProtectedRoute>} />
                      <Route path="/employer/interview-schedule" element={<ProtectedRoute requiredRole="employer"><EmployerInterviews /></ProtectedRoute>} />
                      
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </BrowserRouter>
                </TooltipProvider>
              </LearningPathsProvider>
            </UserProfileProvider>
          </UsersProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
