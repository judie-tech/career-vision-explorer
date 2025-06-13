
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { AdminBreadcrumb } from "./AdminBreadcrumb";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  role: "employer" | "jobseeker";
}

const DashboardLayout = ({ children, title, role }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated, logout, hasRole } = useAuth();

  useEffect(() => {
    // Redirect if not authenticated or not the correct role
    if (!isAuthenticated || !hasRole(role)) {
      toast({
        title: "Access Denied",
        description: `Please log in as a ${role === 'jobseeker' ? 'job seeker' : 'employer'} to access this page`,
        variant: "destructive",
      });
      navigate("/admin/login");
    }
  }, [isAuthenticated, hasRole, navigate, toast, role]);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate("/admin/login");
  };

  const handleBackToSite = () => {
    navigate("/");
    toast({
      title: "Returning to Site",
      description: "Exiting dashboard view",
    });
  };

  if (!isAuthenticated || !hasRole(role)) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen animated-bg">
      <nav className="glassmorphism border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold gradient-text">{title}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Logged in as: <span className="font-semibold gradient-text">{user?.name}</span>
              </span>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" onClick={handleBackToSite} className="hover:bg-white/10">
                  <Home className="h-4 w-4 mr-2" />
                  Back to Site
                </Button>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="hover:bg-white/10">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-2">
          <AdminBreadcrumb />
          <div className="cyber-card fade-in-up">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
