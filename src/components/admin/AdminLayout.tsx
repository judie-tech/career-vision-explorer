
import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, Users, Briefcase, BookOpen, BarChart, Settings, 
  MessageSquare, FileText, LogOut, Menu, X, Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { AdminBreadcrumb } from "./AdminBreadcrumb";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const { user, logout, isAuthenticated, hasRole } = useAuth();

  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    if (!isAuthenticated || !hasRole('admin')) {
      toast({
        title: "Access Denied",
        description: "Please log in as an admin to access this page",
        variant: "destructive",
      });
      navigate("/admin/login");
    }
  }, [isAuthenticated, hasRole, navigate, toast]);

  const navigationItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { name: "Users", icon: Users, href: "/admin/users" },
    { name: "Jobs", icon: Briefcase, href: "/admin/jobs" },
    { name: "Career Paths", icon: BookOpen, href: "/admin/career-paths" },
    { name: "Skills", icon: BarChart, href: "/admin/skills" },
    { name: "Testimonials", icon: MessageSquare, href: "/admin/testimonials" },
    { name: "Content", icon: FileText, href: "/admin/content" },
    { name: "Settings", icon: Settings, href: "/admin/settings" },
  ];
  
  const isActiveRoute = (path: string) => {
    if (path === "/admin" && location.pathname === "/admin") {
      return true;
    }
    return location.pathname.startsWith(path) && path !== "/admin";
  };

  const handleExitAdmin = () => {
    toast({
      title: "Exiting Admin Panel",
      description: "Returning to the main site",
    });
    navigate('/');
  };
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate('/admin/login');
  };

  if (!isAuthenticated || !hasRole('admin')) {
    return null;
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-background shadow-md hover:shadow-lg"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border transition-transform duration-200 ease-in-out lg:translate-x-0 shadow-lg",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 border-b border-border bg-primary/5">
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Visiondrill Admin
            </h1>
          </div>
          
          <div className="flex items-center px-4 py-3 border-b border-border bg-muted/20">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                <Users className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">{user?.name || "Admin User"}</p>
                <p className="text-xs text-muted-foreground capitalize">{user?.role || "admin"}</p>
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-4 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm rounded-lg transition-all duration-200",
                    isActiveRoute(item.href)
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="p-4 border-t border-border space-y-2 bg-muted/20">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={handleExitAdmin}
            >
              <Home className="mr-2 h-4 w-4" />
              Back to Site
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/20"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className={cn(
        "flex-1 transition-all duration-200",
        sidebarOpen ? "lg:ml-64" : "ml-0"
      )}>
        <main className="h-full overflow-y-auto">
          <div className="p-6">
            <AdminBreadcrumb />
            <div className="bg-card rounded-lg shadow-sm border p-6 mt-4">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
