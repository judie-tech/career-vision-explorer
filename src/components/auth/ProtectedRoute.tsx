
import { ReactNode, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "@/components/ui/sonner";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: "admin" | "jobseeker" | "employer";
}

export const ProtectedRoute = ({ 
  children, 
  requiredRole
}: ProtectedRouteProps) => {
  const { isAuthenticated, hasRole, isLoading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        toast.error("Authentication Required", {
          description: "Please log in to access this page",
        });
        
        // Redirect to appropriate login page
        const loginUrl = location.pathname.startsWith('/admin') ? '/admin/login' : '/login';
        navigate(`${loginUrl}?returnUrl=${encodeURIComponent(location.pathname)}`);
      } else if (requiredRole && !hasRole(requiredRole)) {
        // Role-specific error message
        const roleMessage = `You need ${requiredRole} permissions to access this page`;
        
        toast.error("Access Denied", {
          description: roleMessage,
        });
        
        // Redirect based on current role
        if (user) {
          const dashboardUrl = getDashboardUrl(user.role);
          navigate(dashboardUrl);
        } else {
          navigate("/login");
        }
      }
    }
  }, [isAuthenticated, hasRole, isLoading, navigate, requiredRole, location.pathname, user]);
  
  // Helper function to get appropriate dashboard URL
  const getDashboardUrl = (role: string) => {
    switch (role) {
      case 'admin':
        return '/admin/dashboard';
      case 'employer':
        return '/employer/dashboard';
      case 'jobseeker':
        return '/jobseeker/dashboard';
      default:
        return '/';
    }
  };
  
  // Show a loading indicator while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  // If not authenticated or doesn't have required role, don't render children
  if (!isAuthenticated || (requiredRole && !hasRole(requiredRole))) {
    return null;
  }
  
  // If authenticated and has required role, render children
  return <>{children}</>;
};
