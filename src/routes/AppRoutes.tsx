
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { ScrollToTop, PageLoader } from "./routeUtils";
import { publicRoutes } from "./PublicRoutes";
import { adminRoutes } from "./AdminRoutes";
import { employerRoutes } from "./EmployerRoutes";
import { jobSeekerRoutes } from "./JobSeekerRoutes";
import { NotFound } from "./lazyImports";

const AppRoutesContent = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        {publicRoutes}
        
        {/* Admin Routes */}
        {adminRoutes}

        {/* Employer Routes */}
        {employerRoutes}

        {/* Job Seeker Protected Routes */}
        {jobSeekerRoutes}

        {/* Catch-all route for 404 */}
        <Route path="*" element={
          <Suspense fallback={<PageLoader />}>
            <NotFound />
          </Suspense>
        } />
      </Routes>
    </>
  );
};

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AppRoutesContent />
    </BrowserRouter>
  );
};
