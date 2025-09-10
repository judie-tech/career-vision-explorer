import { Routes, Route } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

// Lazy load pages
const Index = lazy(() => import("@/pages/Index"));
const Login = lazy(() => import("@/pages/Login"));
const Signup = lazy(() => import("@/pages/Signup"));
const LinkedInCallback = lazy(() => import("@/pages/auth/LinkedInCallback"));
const Jobs = lazy(() => import("@/pages/Jobs"));
const JobDetails = lazy(() => import("@/pages/JobDetails"));
const PublicProfile = lazy(() => import("@/pages/PublicProfile"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Profile = lazy(() => import("@/pages/Profile"));
const Skills = lazy(() => import("@/pages/Skills"));
const CareerPaths = lazy(() => import("@/pages/CareerPaths"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));

// Admin
const AdminLogin = lazy(() => import("@/pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const AdminAPI = lazy(() => import("@/pages/admin/AdminAPI"));
const AdminUsers = lazy(() => import("@/pages/admin/AdminUsers"));
const AdminJobseekers = lazy(() => import("@/pages/admin/AdminJobseekers"));
const AdminJobs = lazy(() => import("@/pages/admin/AdminJobs"));
const AdminSkills = lazy(() => import("@/pages/admin/AdminSkills"));
const AdminCareerPaths = lazy(() => import("@/pages/admin/AdminCareerPaths"));
const AdminPartners = lazy(() => import("@/pages/admin/AdminPartners"));
const AdminTestimonials = lazy(() => import("@/pages/admin/AdminTestimonials"));
const AdminContent = lazy(() => import("@/pages/admin/AdminContent"));
const AdminInsights = lazy(() => import("@/pages/admin/AdminInsights"));
const AdminSettings = lazy(() => import("@/pages/admin/AdminSettings"));
const AdminProfiles = lazy(() => import("@/pages/admin/AdminProfiles"));

// Employer
const EmployerDashboard = lazy(
  () => import("@/pages/employer/EmployerDashboard")
);
const EmployerJobs = lazy(() => import("@/pages/employer/EmployerJobs"));
const EmployerProjects = lazy(() => import("@/pages/EmployerProjects"));
const EmployerBoostingServices = lazy(
  () => import("@/pages/BoostingServicesPage")
);
const JobApplicants = lazy(() => import("@/pages/employer/JobApplicants"));
const AllApplicants = lazy(() => import("@/pages/employer/AllApplicants"));
const EmployerInterviews = lazy(
  () => import("@/pages/employer/EmployerInterviews")
);
const InterviewSchedule = lazy(
  () => import("@/pages/employer/InterviewSchedule")
);

// Jobseeker
const JobSeekerDashboard = lazy(
  () => import("@/pages/jobseeker/JobSeekerDashboard")
);
const JobSeekerSettings = lazy(
  () => import("@/pages/jobseeker/JobSeekerSettings")
);

// Freelancer
const Freelancers = lazy(() => import("@/pages/Freelancers"));
const FreelancerProfile = lazy(() => import("@/pages/FreelancerProfile"));
const FreelancerDashboard = lazy(
  () => import("@/pages/freelancer/FreelancerDashboard")
);
const CreateFreelancerProfile = lazy(
  () => import("@/pages/freelancer/CreateFreelancerProfile")
);

// Other
const About = lazy(() => import("@/pages/About"));
const Blog = lazy(() => import("@/pages/Blog"));
const Help = lazy(() => import("@/pages/Help"));
const Contact = lazy(() => import("@/pages/Contact"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Terms = lazy(() => import("@/pages/Terms"));
const LearningPaths = lazy(() => import("@/pages/LearningPaths"));
const Partners = lazy(() => import("@/pages/Partners"));
const Insights = lazy(() => import("@/pages/Insights"));
const InterviewPrep = lazy(() => import("@/pages/InterviewPrep"));
const SkillGapAnalysis = lazy(() => import("@/pages/SkillGapAnalysis"));
const EnhancedSkillAnalysis = lazy(
  () => import("@/pages/EnhancedSkillAnalysis")
);
const AIJobMatching = lazy(() => import("@/pages/AIJobMatching"));
const JobMatching = lazy(() => import("@/pages/JobMatching"));

// Loader
const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
      <div
        className="w-4 h-4 bg-primary rounded-full animate-pulse"
        style={{ animationDelay: "0.2s" }}
      ></div>
      <div
        className="w-4 h-4 bg-primary rounded-full animate-pulse"
        style={{ animationDelay: "0.4s" }}
      ></div>
    </div>
  </div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <Suspense fallback={<PageLoader />}>
              <Index />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<PageLoader />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={<PageLoader />}>
              <Signup />
            </Suspense>
          }
        />
        <Route
          path="/auth/callback"
          element={
            <Suspense fallback={<PageLoader />}>
              <LinkedInCallback />
            </Suspense>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <Suspense fallback={<PageLoader />}>
              <PublicProfile />
            </Suspense>
          }
        />
        <Route
          path="/jobs"
          element={
            <Suspense fallback={<PageLoader />}>
              <Jobs />
            </Suspense>
          }
        />
        <Route
          path="/jobs/:id"
          element={
            <Suspense fallback={<PageLoader />}>
              <JobDetails />
            </Suspense>
          }
        />
        <Route
          path="/freelancers"
          element={
            <Suspense fallback={<PageLoader />}>
              <Freelancers />
            </Suspense>
          }
        />
        <Route
          path="/freelancers/:freelancerId"
          element={
            <Suspense fallback={<PageLoader />}>
              <FreelancerProfile />
            </Suspense>
          }
        />
        <Route
          path="/about"
          element={
            <Suspense fallback={<PageLoader />}>
              <About />
            </Suspense>
          }
        />
        <Route
          path="/blog"
          element={
            <Suspense fallback={<PageLoader />}>
              <Blog />
            </Suspense>
          }
        />
        <Route
          path="/help"
          element={
            <Suspense fallback={<PageLoader />}>
              <Help />
            </Suspense>
          }
        />
        <Route
          path="/contact"
          element={
            <Suspense fallback={<PageLoader />}>
              <Contact />
            </Suspense>
          }
        />
        <Route
          path="/faq"
          element={
            <Suspense fallback={<PageLoader />}>
              <FAQ />
            </Suspense>
          }
        />
        <Route
          path="/privacy"
          element={
            <Suspense fallback={<PageLoader />}>
              <Privacy />
            </Suspense>
          }
        />
        <Route
          path="/terms"
          element={
            <Suspense fallback={<PageLoader />}>
              <Terms />
            </Suspense>
          }
        />
        <Route
          path="/insights"
          element={
            <Suspense fallback={<PageLoader />}>
              <Insights />
            </Suspense>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/login"
          element={
            <Suspense fallback={<PageLoader />}>
              <AdminLogin />
            </Suspense>
          }
        />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute requiredRole="admin">
              <Suspense fallback={<PageLoader />}>
                <AdminDashboard />
              </Suspense>
            </ProtectedRoute>
          }
        />

        {/* Employer Routes */}
        <Route
          path="/employer/dashboard"
          element={
            <ProtectedRoute requiredRole="employer">
              <Suspense fallback={<PageLoader />}>
                <EmployerDashboard />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/employer/jobs"
          element={
            <ProtectedRoute requiredRole="employer">
              <Suspense fallback={<PageLoader />}>
                <EmployerJobs />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/employer/projects"
          element={
            <ProtectedRoute requiredRole="employer">
              <Suspense fallback={<PageLoader />}>
                <EmployerProjects />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/employer/boosting-services"
          element={
            <ProtectedRoute requiredRole="employer">
              <Suspense fallback={<PageLoader />}>
                <EmployerBoostingServices />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/employer/applicants"
          element={
            <ProtectedRoute requiredRole="employer">
              <Suspense fallback={<PageLoader />}>
                <AllApplicants />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/employer/interviews"
          element={
            <ProtectedRoute requiredRole="employer">
              <Suspense fallback={<PageLoader />}>
                <EmployerInterviews />
              </Suspense>
            </ProtectedRoute>
          }
        />

        {/* Jobseeker Routes */}
        <Route
          path="/jobseeker/dashboard"
          element={
            <ProtectedRoute requiredRole="jobseeker">
              <Suspense fallback={<PageLoader />}>
                <JobSeekerDashboard />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobseeker/settings"
          element={
            <ProtectedRoute requiredRole="jobseeker">
              <Suspense fallback={<PageLoader />}>
                <JobSeekerSettings />
              </Suspense>
            </ProtectedRoute>
          }
        />

        {/* Freelancer Routes */}
        <Route
          path="/freelancer/dashboard"
          element={
            <ProtectedRoute requiredRole="freelancer">
              <Suspense fallback={<PageLoader />}>
                <FreelancerDashboard />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/freelancer/create-profile"
          element={
            <ProtectedRoute requiredRole="freelancer">
              <Suspense fallback={<PageLoader />}>
                <CreateFreelancerProfile />
              </Suspense>
            </ProtectedRoute>
          }
        />

        {/* General Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoader />}>
                <Dashboard />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoader />}>
                <Profile />
              </Suspense>
            </ProtectedRoute>
          }
        />

        {/* Other Routes */}
        <Route
          path="/skills"
          element={
            <Suspense fallback={<PageLoader />}>
              <Skills />
            </Suspense>
          }
        />
        <Route
          path="/career-paths"
          element={
            <Suspense fallback={<PageLoader />}>
              <CareerPaths />
            </Suspense>
          }
        />
        <Route
          path="/learning-paths"
          element={
            <Suspense fallback={<PageLoader />}>
              <LearningPaths />
            </Suspense>
          }
        />
        <Route
          path="/partners"
          element={
            <Suspense fallback={<PageLoader />}>
              <Partners />
            </Suspense>
          }
        />
        <Route
          path="/interview-prep"
          element={
            <Suspense fallback={<PageLoader />}>
              <InterviewPrep />
            </Suspense>
          }
        />
        <Route
          path="/skill-gap-analysis"
          element={
            <Suspense fallback={<PageLoader />}>
              <SkillGapAnalysis />
            </Suspense>
          }
        />
        <Route
          path="/enhanced-skill-analysis"
          element={
            <Suspense fallback={<PageLoader />}>
              <EnhancedSkillAnalysis />
            </Suspense>
          }
        />
        <Route
          path="/ai-job-matching"
          element={
            <Suspense fallback={<PageLoader />}>
              <AIJobMatching />
            </Suspense>
          }
        />
        <Route
          path="/job-matching"
          element={
            <Suspense fallback={<PageLoader />}>
              <JobMatching />
            </Suspense>
          }
        />

        {/* 404 Route */}
        <Route
          path="*"
          element={
            <Suspense fallback={<PageLoader />}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
};
