
import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, Users, Briefcase, BookOpen, BarChart, Settings, 
  MessageSquare, FileText, LogOut, Menu, X 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

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

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-white"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Sidebar */}
      <div className={`${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transition-transform duration-200 ease-in-out lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-800">Visiondrill Admin</h1>
          </div>
          
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-4 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-3 text-sm rounded-md ${
                    isActiveRoute(item.href)
                      ? "bg-career-blue text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="p-4 border-t border-gray-200">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200"
              onClick={handleExitAdmin}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Back to Site
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className={`flex-1 transition-all duration-200 ${sidebarOpen ? "lg:ml-64" : "ml-0"}`}>
        <main className="h-full overflow-y-auto bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
