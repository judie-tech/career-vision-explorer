
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

export const AdminNavItem = () => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return (
      <Button variant="ghost" asChild className="text-sm font-medium">
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
  
  return (
    <Button variant="admin" asChild className="text-sm font-medium">
      <Link to={getDashboardUrl()}>
        <Shield className="mr-2 h-4 w-4" />
        {user?.role === 'admin' ? 'Admin Dashboard' : 
          user?.role === 'employer' ? 'Employer Portal' : 'Job Seeker Portal'}
      </Link>
    </Button>
  );
};
