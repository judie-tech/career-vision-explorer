
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Home, Bell, Settings } from "lucide-react";
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

  const handleNotifications = () => {
    toast({
      title: "Notifications",
      description: "You have 3 new notifications",
    });
  };

  const handleSettings = () => {
    navigate(`/${role}/settings`);
  };

  if (!isAuthenticated || !hasRole(role)) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">{title}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Logged in as: <span className="font-medium">{user?.name}</span>
              </span>
              <div className="flex space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleNotifications}
                  className="transition-colors hover:bg-gray-100"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Notifications</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleSettings}
                  className="transition-colors hover:bg-gray-100"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Settings</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleBackToSite}
                  className="transition-colors hover:bg-gray-100"
                >
                  <Home className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Back to Site</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  className="transition-colors hover:bg-red-50 hover:text-red-600"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-2">
          <AdminBreadcrumb />
          <div className="bg-white rounded-lg shadow-sm p-6 mt-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
