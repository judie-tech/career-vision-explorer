
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { UserProfileProvider } from "@/hooks/use-user-profile";
import { ProfilesProvider } from "@/hooks/use-profiles";
import { UsersProvider } from "@/hooks/use-users";
import { CareerPathsProvider } from "@/hooks/use-career-paths";
import { AuthProvider } from "@/hooks/use-auth";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Jobs from "@/pages/Jobs";
import JobDetails from "@/pages/JobDetails";
import Profile from "@/pages/Profile";
import Skills from "@/pages/Skills";
import CareerPaths from "@/pages/CareerPaths";
import Partners from "@/pages/Partners";
import Insights from "@/pages/Insights";
import NotFound from "@/pages/NotFound";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

// Admin Pages
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminJobs from "@/pages/admin/AdminJobs";
import AdminSkills from "@/pages/admin/AdminSkills";
import AdminCareerPaths from "@/pages/admin/AdminCareerPaths";
import AdminTestimonials from "@/pages/admin/AdminTestimonials";
import AdminContent from "@/pages/admin/AdminContent";
import AdminInsights from "@/pages/admin/AdminInsights";
import AdminSettings from "@/pages/admin/AdminSettings";

// Employer Pages
import EmployerDashboard from "@/pages/employer/EmployerDashboard";
import EmployerJobs from "@/pages/employer/EmployerJobs";
import JobApplicants from "@/pages/employer/JobApplicants";
import AllApplicants from "@/pages/employer/AllApplicants";
import EmployerInterviews from "@/pages/employer/EmployerInterviews";
import InterviewSchedule from "@/pages/employer/InterviewSchedule";

// Job Seeker Dashboard
import JobSeekerDashboard from "@/pages/admin/JobSeekerDashboard";

import PublicProfile from "@/pages/PublicProfile";
import AdminProfiles from "@/pages/admin/AdminProfiles";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <AuthProvider>
          <UserProfileProvider>
            <ProfilesProvider>
              <UsersProvider>
                <CareerPathsProvider>
                  <Router>
                    <Routes>
                      {/* Public Routes */}
                      <Route path="/" element={<Index />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/profile/:id" element={<PublicProfile />} />
                      
                      {/* Job Routes */}
                      <Route path="/jobs" element={<Jobs />} />
                      <Route path="/jobs/:id" element={<JobDetails />} />
                      
                      {/* Protected Routes */}
                      <Route path="/profile" element={
                        <ProtectedRoute>
                          <Profile />
                        </ProtectedRoute>
                      } />
                      <Route path="/skills" element={
                        <ProtectedRoute>
                          <Skills />
                        </ProtectedRoute>
                      } />
                      <Route path="/career-paths" element={
                        <ProtectedRoute>
                          <CareerPaths />
                        </ProtectedRoute>
                      } />
                      <Route path="/partners" element={
                        <ProtectedRoute>
                          <Partners />
                        </ProtectedRoute>
                      } />
                      <Route path="/insights" element={
                        <ProtectedRoute>
                          <Insights />
                        </ProtectedRoute>
                      } />

                      {/* Job Seeker Dashboard */}
                      <Route path="/jobseeker/dashboard" element={
                        <ProtectedRoute requiredRole="jobseeker">
                          <JobSeekerDashboard />
                        </ProtectedRoute>
                      } />

                      {/* Admin Routes */}
                      <Route path="/admin/login" element={<AdminLogin />} />
                      <Route path="/admin" element={
                        <ProtectedRoute requiredRole="admin">
                          <AdminDashboard />
                        </ProtectedRoute>
                      } />
                      <Route path="/admin/dashboard" element={
                        <ProtectedRoute requiredRole="admin">
                          <AdminDashboard />
                        </ProtectedRoute>
                      } />
                      <Route path="/admin/users" element={
                        <ProtectedRoute requiredRole="admin">
                          <AdminUsers />
                        </ProtectedRoute>
                      } />
                      <Route path="/admin/profiles" element={
                        <ProtectedRoute requiredRole="admin">
                          <AdminProfiles />
                        </ProtectedRoute>
                      } />
                      <Route path="/admin/jobs" element={
                        <ProtectedRoute requiredRole="admin">
                          <AdminJobs />
                        </ProtectedRoute>
                      } />
                      <Route path="/admin/skills" element={
                        <ProtectedRoute requiredRole="admin">
                          <AdminSkills />
                        </ProtectedRoute>
                      } />
                      <Route path="/admin/career-paths" element={
                        <ProtectedRoute requiredRole="admin">
                          <AdminCareerPaths />
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
                      <Route path="/admin/insights" element={
                        <ProtectedRoute requiredRole="admin">
                          <AdminInsights />
                        </ProtectedRoute>
                      } />
                      <Route path="/admin/settings" element={
                        <ProtectedRoute requiredRole="admin">
                          <AdminSettings />
                        </ProtectedRoute>
                      } />

                      {/* Employer Routes */}
                      <Route path="/employer/dashboard" element={
                        <ProtectedRoute requiredRole="employer">
                          <EmployerDashboard />
                        </ProtectedRoute>
                      } />
                      <Route path="/employer/jobs" element={
                        <ProtectedRoute requiredRole="employer">
                          <EmployerJobs />
                        </ProtectedRoute>
                      } />
                      <Route path="/employer/jobs/:id/applicants" element={
                        <ProtectedRoute requiredRole="employer">
                          <JobApplicants />
                        </ProtectedRoute>
                      } />
                      <Route path="/employer/applicants" element={
                        <ProtectedRoute requiredRole="employer">
                          <AllApplicants />
                        </ProtectedRoute>
                      } />
                      <Route path="/employer/interviews" element={
                        <ProtectedRoute requiredRole="employer">
                          <EmployerInterviews />
                        </ProtectedRoute>
                      } />
                      <Route path="/employer/interviews/schedule" element={
                        <ProtectedRoute requiredRole="employer">
                          <InterviewSchedule />
                        </ProtectedRoute>
                      } />

                      {/* Catch-all route */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Router>
                </CareerPathsProvider>
              </UsersProvider>
            </ProfilesProvider>
          </UserProfileProvider>
        </AuthProvider>
        <Toaster />
        <SonnerToaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
