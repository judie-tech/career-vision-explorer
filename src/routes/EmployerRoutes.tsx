
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import EmployerDashboard from "@/pages/employer/EmployerDashboard";
import EmployerJobs from "@/pages/employer/EmployerJobs";
import JobApplicants from "@/pages/employer/JobApplicants";
import AllApplicants from "@/pages/employer/AllApplicants";
import EmployerInterviews from "@/pages/employer/EmployerInterviews";
import InterviewSchedule from "@/pages/employer/InterviewSchedule";

export const EmployerRoutes = () => {
  return (
    <Routes>
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
    </Routes>
  );
};
