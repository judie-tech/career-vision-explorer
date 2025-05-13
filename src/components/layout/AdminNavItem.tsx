
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Shield, Briefcase, User } from "lucide-react";

export const AdminNavItem = () => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return (
      <Button variant="outline" asChild size="sm" className="font-medium flex items-center">
        <Link to="/admin/login">
          <Shield className="mr-2 h-4 w-4" />
          Admin Portal
        </Link>
      </Button>
    );
  }
  
  // User is authenticated, direct them to the right dashboard based on role
  const getDashboardUrl = () => {
    switch (user?.role) {
      case 'admin':
        return '/admin';
      case 'employer':
        return '/employer/dashboard';
      case 'jobseeker':
        return '/jobseeker/dashboard';
      default:
        return '/admin/login';
    }
  };
  
  // Get appropriate icon for user role
  const getRoleIcon = () => {
    switch (user?.role) {
      case 'admin':
        return <Shield className="mr-2 h-4 w-4" />;
      case 'employer':
        return <Briefcase className="mr-2 h-4 w-4" />;
      case 'jobseeker':
        return <User className="mr-2 h-4 w-4" />;
      default:
        return <Shield className="mr-2 h-4 w-4" />;
    }
  };
  
  // Get button variant based on role
  const getButtonVariant = () => {
    switch (user?.role) {
      case 'admin':
        return 'default';
      case 'employer':
        return 'outline';
      case 'jobseeker':
        return 'outline';
      default:
        return 'outline';
    }
  };
  
  // Get appropriate text for the button
  const getButtonText = () => {
    switch (user?.role) {
      case 'admin':
        return 'Admin Dashboard';
      case 'employer':
        return 'Employer Dashboard';
      case 'jobseeker':
        return 'Job Seeker Dashboard';
      default:
        return 'Admin Portal';
    }
  };
  
  return (
    <Button variant={getButtonVariant()} asChild size="sm" className="font-medium flex items-center">
      <Link to={getDashboardUrl()}>
        {getRoleIcon()}
        {getButtonText()}
      </Link>
    </Button>
  );
};
