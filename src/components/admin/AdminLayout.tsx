
import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, Users, Briefcase, BookOpen, BarChart, Settings, 
  MessageSquare, FileText, LogOut, Menu, X, Home, Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { AdminBreadcrumb } from "./AdminBreadcrumb";
import { useAuth } from "@/hooks/use-auth";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const { user, logout } = useAuth();

  // Update sidebar state when screen size changes
  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

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

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-white shadow-md hover:shadow-lg transition-shadow"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Sidebar */}
      <div className={`${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transition-transform duration-200 ease-in-out lg:translate-x-0 shadow-lg`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 border-b border-gray-200 bg-gradient-to-r from-career-blue to-career-purple">
            <h1 className="text-xl font-bold text-white">Visiondrill Admin</h1>
          </div>
          
          <div className="flex items-center px-4 py-3 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-career-blue to-career-purple flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{user?.name || "Admin User"}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role || "admin"}</p>
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-4 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-3 text-sm rounded-lg transition-all duration-200 ${
                    isActiveRoute(item.href)
                      ? "bg-gradient-to-r from-career-blue to-career-purple text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="p-4 border-t border-gray-200 space-y-2 bg-gray-50">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={handleExitAdmin}
            >
              <Home className="mr-2 h-4 w-4" />
              Back to Site
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200 transition-colors"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className={`flex-1 transition-all duration-200 ${sidebarOpen ? "lg:ml-64" : "ml-0"}`}>
        <main className="h-full overflow-y-auto bg-gray-50">
          <div className="p-6">
            <AdminBreadcrumb />
            <div className="bg-white rounded-lg shadow-sm p-6 mt-4">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
