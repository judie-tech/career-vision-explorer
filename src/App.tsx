
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import CareerPaths from "./pages/CareerPaths";
import Skills from "./pages/Skills";
import Insights from "./pages/Insights";
import Profile from "./pages/Profile";
import PublicProfile from "./pages/PublicProfile";
import Partners from "./pages/Partners";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminJobs from "./pages/admin/AdminJobs";
import AdminCareerPaths from "./pages/admin/AdminCareerPaths";
import AdminSkills from "./pages/admin/AdminSkills";
import AdminInsights from "./pages/admin/AdminInsights";
import AdminHomeImages from "./pages/admin/AdminHomeImages";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminContent from "./pages/admin/AdminContent";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminProfiles from "./pages/admin/AdminProfiles";
import JobSeekerDashboard from "./pages/admin/JobSeekerDashboard";
import EmployerDashboard from "./pages/admin/EmployerDashboard";

// Employer pages
import EmployerDashboardPage from "./pages/employer/EmployerDashboard";
import EmployerJobs from "./pages/employer/EmployerJobs";
import EmployerInterviews from "./pages/employer/EmployerInterviews";
import InterviewSchedule from "./pages/employer/InterviewSchedule";
import JobApplicants from "./pages/employer/JobApplicants";
import AllApplicants from "./pages/employer/AllApplicants";

import { ProtectedRoute } from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/career-paths" element={<CareerPaths />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/:id" element={<PublicProfile />} />
              <Route path="/partners" element={<Partners />} />

              {/* Admin routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
              <Route path="/admin/jobs" element={<ProtectedRoute><AdminJobs /></ProtectedRoute>} />
              <Route path="/admin/career-paths" element={<ProtectedRoute><AdminCareerPaths /></ProtectedRoute>} />
              <Route path="/admin/skills" element={<ProtectedRoute><AdminSkills /></ProtectedRoute>} />
              <Route path="/admin/insights" element={<ProtectedRoute><AdminInsights /></ProtectedRoute>} />
              <Route path="/admin/home-images" element={<ProtectedRoute><AdminHomeImages /></ProtectedRoute>} />
              <Route path="/admin/testimonials" element={<ProtectedRoute><AdminTestimonials /></ProtectedRoute>} />
              <Route path="/admin/content" element={<ProtectedRoute><AdminContent /></ProtectedRoute>} />
              <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
              <Route path="/admin/profiles" element={<ProtectedRoute><AdminProfiles /></ProtectedRoute>} />
              <Route path="/admin/jobseeker-dashboard" element={<ProtectedRoute><JobSeekerDashboard /></ProtectedRoute>} />
              <Route path="/admin/employer-dashboard" element={<ProtectedRoute><EmployerDashboard /></ProtectedRoute>} />

              {/* Employer routes */}
              <Route path="/employer/dashboard" element={<ProtectedRoute><EmployerDashboardPage /></ProtectedRoute>} />
              <Route path="/employer/jobs" element={<ProtectedRoute><EmployerJobs /></ProtectedRoute>} />
              <Route path="/employer/interviews" element={<ProtectedRoute><EmployerInterviews /></ProtectedRoute>} />
              <Route path="/employer/interviews/schedule" element={<ProtectedRoute><InterviewSchedule /></ProtectedRoute>} />
              <Route path="/employer/jobs/:jobId/applicants" element={<ProtectedRoute><JobApplicants /></ProtectedRoute>} />
              <Route path="/employer/applicants" element={<ProtectedRoute><AllApplicants /></ProtectedRoute>} />

              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
