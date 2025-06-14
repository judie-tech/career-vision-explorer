
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Profile from "@/pages/Profile";
import Skills from "@/pages/Skills";
import CareerPaths from "@/pages/CareerPaths";
import Partners from "@/pages/Partners";
import Insights from "@/pages/Insights";
import JobSeekerDashboard from "@/pages/admin/JobSeekerDashboard";

export const ProtectedRoutes = () => {
  return (
    <Routes>
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
    </Routes>
  );
};
