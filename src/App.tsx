
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/hooks/use-auth";
import { UsersProvider } from "@/hooks/use-users";
import { JobsProvider } from "@/hooks/use-jobs";
import Layout from "@/components/layout/Layout";
import Index from "@/pages/Index";
import Jobs from "@/pages/Jobs";
import CareerPaths from "@/pages/CareerPaths";
import Skills from "@/pages/Skills";
import Insights from "@/pages/Insights";
import Profile from "@/pages/Profile";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Partners from "@/pages/Partners";
import NotFound from "@/pages/NotFound";

// Admin pages
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminJobs from "@/pages/admin/AdminJobs";
import AdminCareerPaths from "@/pages/admin/AdminCareerPaths";
import AdminSkills from "@/pages/admin/AdminSkills";
import AdminContent from "@/pages/admin/AdminContent";
import AdminTestimonials from "@/pages/admin/AdminTestimonials";
import AdminSettings from "@/pages/admin/AdminSettings";
import EmployerDashboard from "@/pages/admin/EmployerDashboard";
import JobSeekerDashboard from "@/pages/admin/JobSeekerDashboard";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UsersProvider>
          <JobsProvider>
            <Router>
              <Routes>
                {/* Public routes with layout */}
                <Route path="/" element={<Layout><Index /></Layout>} />
                <Route path="/jobs" element={<Layout><Jobs /></Layout>} />
                <Route path="/career-paths" element={<Layout><CareerPaths /></Layout>} />
                <Route path="/skills" element={<Layout><Skills /></Layout>} />
                <Route path="/insights" element={<Layout><Insights /></Layout>} />
                <Route path="/profile" element={<Layout><Profile /></Layout>} />
                <Route path="/partners" element={<Layout><Partners /></Layout>} />

                {/* Auth routes */}
                <Route path="/login" element={<Layout><Login /></Layout>} />
                <Route path="/signup" element={<Layout><Signup /></Layout>} />

                {/* Admin routes (no layout wrapper) */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/jobs" element={<AdminJobs />} />
                <Route path="/admin/career-paths" element={<AdminCareerPaths />} />
                <Route path="/admin/skills" element={<AdminSkills />} />
                <Route path="/admin/content" element={<AdminContent />} />
                <Route path="/admin/testimonials" element={<AdminTestimonials />} />
                <Route path="/admin/settings" element={<AdminSettings />} />

                {/* Dashboard routes */}
                <Route path="/employer/dashboard" element={<EmployerDashboard />} />
                <Route path="/jobseeker/dashboard" element={<JobSeekerDashboard />} />

                {/* 404 route */}
                <Route path="*" element={<Layout><NotFound /></Layout>} />
              </Routes>
              <Toaster />
            </Router>
          </JobsProvider>
        </UsersProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
