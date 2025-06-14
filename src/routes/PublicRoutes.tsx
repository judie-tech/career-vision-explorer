
import { Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Jobs from "@/pages/Jobs";
import JobDetails from "@/pages/JobDetails";
import PublicProfile from "@/pages/PublicProfile";
import NotFound from "@/pages/NotFound";

export const PublicRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile/:id" element={<PublicProfile />} />
      
      {/* Job Routes */}
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobs/:id" element={<JobDetails />} />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
