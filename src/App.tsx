
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { AuthProvider } from "@/hooks/use-auth";
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
import EmployerDashboard from "./pages/admin/EmployerDashboard";
import JobSeekerDashboard from "./pages/admin/JobSeekerDashboard";

// Employer pages
import EmployerJobs from "./pages/employer/EmployerJobs";
import JobApplicants from "./pages/employer/JobApplicants";
import AllApplicants from "./pages/employer/AllApplicants";
import InterviewSchedule from "./pages/employer/InterviewSchedule";
import EmployerInterviews from "./pages/employer/EmployerInterviews";

import { ProtectedRoute } from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="career-platform-theme">
        <AuthProvider>
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
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/jobs" element={<ProtectedRoute><AdminJobs /></ProtectedRoute>} />
                <Route path="/admin/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
                <Route path="/admin/content" element={<ProtectedRoute><AdminContent /></ProtectedRoute>} />
                <Route path="/admin/testimonials" element={<ProtectedRoute><AdminTestimonials /></ProtectedRoute>} />
                <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
                <Route path="/admin/employer" element={<ProtectedRoute><EmployerDashboard /></ProtectedRoute>} />
                <Route path="/admin/jobseeker" element={<ProtectedRoute><JobSeekerDashboard /></ProtectedRoute>} />
                
                {/* Job seeker routes */}
                <Route path="/jobseeker/dashboard" element={<ProtectedRoute requiredRole="jobseeker"><JobSeekerDashboard /></ProtectedRoute>} />
                
                {/* Employer routes */}
                <Route path="/employer/jobs" element={<ProtectedRoute><EmployerJobs /></ProtectedRoute>} />
                <Route path="/employer/jobs/:jobId/applicants" element={<ProtectedRoute><JobApplicants /></ProtectedRoute>} />
                <Route path="/employer/applicants" element={<ProtectedRoute><AllApplicants /></ProtectedRoute>} />
                <Route path="/employer/interviews" element={<ProtectedRoute><InterviewSchedule /></ProtectedRoute>} />
                <Route path="/employer/interview-schedule" element={<ProtectedRoute><EmployerInterviews /></ProtectedRoute>} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
