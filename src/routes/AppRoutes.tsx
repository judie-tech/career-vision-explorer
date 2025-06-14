
import { BrowserRouter as Router } from "react-router-dom";
import { PublicRoutes } from "./PublicRoutes";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { AdminRoutes } from "./AdminRoutes";
import { EmployerRoutes } from "./EmployerRoutes";

export const AppRoutes = () => {
  return (
    <Router>
      <PublicRoutes />
      <ProtectedRoutes />
      <AdminRoutes />
      <EmployerRoutes />
    </Router>
  );
};
