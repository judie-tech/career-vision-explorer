
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

// Public pages
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Jobs from "@/pages/Jobs";
import JobDetails from "@/pages/JobDetails";
import PublicProfile from "@/pages/PublicProfile";
import NotFound from "@/pages/NotFound";

// Protected pages
import Profile from "@/pages/Profile";
import Skills from "@/pages/Skills";
import CareerPaths from "@/pages/CareerPaths";
import LearningPaths from "@/pages/LearningPaths";
import Partners from "@/pages/Partners";
import Insights from "@/pages/Insights";
import JobSeekerDashboard from "@/pages/admin/JobSeekerDashboard";
import JobSeekerSettings from "@/pages/jobseeker/JobSeekerSettings";

// Admin pages
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminJobseekers from "@/pages/admin/AdminJobseekers";
import AdminJobs from "@/pages/admin/AdminJobs";
import AdminSkills from "@/pages/admin/AdminSkills";
import AdminCareerPaths from "@/pages/admin/AdminCareerPaths";
import AdminPartners from "@/pages/admin/AdminPartners";
import AdminTestimonials from "@/pages/admin/AdminTestimonials";
import AdminContent from "@/pages/admin/AdminContent";
import AdminInsights from "@/pages/admin/AdminInsights";
import AdminSettings from "@/pages/admin/AdminSettings";
import AdminProfiles from "@/pages/admin/AdminProfiles";

// Employer pages
import EmployerDashboard from "@/pages/employer/EmployerDashboard";
import EmployerJobs from "@/pages/employer/EmployerJobs";
import JobApplicants from "@/pages/employer/JobApplicants";
import AllApplicants from "@/pages/employer/AllApplicants";
import EmployerInterviews from "@/pages/employer/EmployerInterviews";
import InterviewSchedule from "@/pages/employer/InterviewSchedule";

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile/:id" element={<PublicProfile />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        
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
        <Route path="/admin/jobseeker" element={
          <ProtectedRoute requiredRole="admin">
            <AdminJobseekers />
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
        <Route path="/admin/partners" element={
          <ProtectedRoute requiredRole="admin">
            <AdminPartners />
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

        {/* Job Seeker Protected Routes */}
        <Route path="/jobseeker/dashboard" element={
          <ProtectedRoute requiredRole="jobseeker">
            <JobSeekerDashboard />
          </ProtectedRoute>
        } />
        <Route path="/jobseeker/settings" element={
          <ProtectedRoute requiredRole="jobseeker">
            <JobSeekerSettings />
          </ProtectedRoute>
        } />
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
        <Route path="/learning-paths" element={
          <ProtectedRoute>
            <LearningPaths />
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
        
        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
