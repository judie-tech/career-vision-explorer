
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: "admin" | "jobseeker" | "employer";
}

export const ProtectedRoute = ({ 
  children, 
  requiredRole
}: ProtectedRouteProps) => {
  const { isAuthenticated, hasRole, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access this page",
        variant: "destructive",
      });
      navigate("/admin/login");
    } else if (!isLoading && isAuthenticated && requiredRole && !hasRole(requiredRole)) {
      toast({
        title: "Access Denied",
        description: `You need ${requiredRole} permissions to access this page`,
        variant: "destructive",
      });
      navigate("/admin/login");
    }
  }, [isAuthenticated, hasRole, isLoading, navigate, requiredRole, toast]);
  
  // Show nothing while checking authentication
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  // If not authenticated or doesn't have required role, don't render children
  if (!isAuthenticated || (requiredRole && !hasRole(requiredRole))) {
    return null;
  }
  
  // If authenticated and has required role, render children
  return <>{children}</>;
};
