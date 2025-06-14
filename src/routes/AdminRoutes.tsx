
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
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
import AdminProfiles from "@/pages/admin/AdminProfiles";

export const AdminRoutes = () => {
  return (
    <Routes>
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
    </Routes>
  );
};
