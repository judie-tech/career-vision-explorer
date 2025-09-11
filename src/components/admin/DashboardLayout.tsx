import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Home, Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { AdminBreadcrumb } from "./AdminBreadcrumb";
import Navbar from "@/components/layout/Navbar"; // ✅ global navbar import

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
    if (!isAuthenticated || !hasRole(role)) {
      toast({
        title: "Access Denied",
        description: `Please log in as a ${
          role === "jobseeker" ? "job seeker" : "employer"
        } to access this page`,
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
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* ✅ Global Navbar (always visible) */}
      <Navbar />

      {/* Dashboard Header */}
      <nav className="bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                {title}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Welcome,{" "}
                <span className="font-medium text-foreground">
                  {user?.name}
                </span>
              </span>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" onClick={handleNotifications}>
                  <Bell className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Notifications</span>
                </Button>
                <Button variant="ghost" size="sm" onClick={handleSettings}>
                  <Settings className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Settings</span>
                </Button>
                <Button variant="ghost" size="sm" onClick={handleBackToSite}>
                  <Home className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Back to Site</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-1 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-2">
          <AdminBreadcrumb />
          <div className="bg-card rounded-lg shadow-sm border p-6 mt-4">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
