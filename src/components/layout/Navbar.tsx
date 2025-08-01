
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Shield, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useAuth } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, refreshProfile } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getDashboardUrl = () => {
    if (!user) return "/";
    switch (user.account_type) {
      case 'admin':
        return '/admin/dashboard';
      case 'employer':
        return '/employer/dashboard';
      case 'job_seeker':
        return '/jobseeker/dashboard';
      case 'freelancer':
        return '/freelancer/dashboard';
      default:
        return '/';
    }
  };

  const getDashboardLink = () => {
    if (!isAuthenticated || !user) return null;
    
    const dashboardUrl = getDashboardUrl();
    const dashboardName = user.account_type === 'admin' ? 'Admin Dashboard' : 'Dashboard';
    
    return {
      name: dashboardName,
      href: dashboardUrl,
      icon: user.account_type === 'admin' ? Shield : User
    };
  };

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Jobs", href: "/jobs" },
    { name: "Freelancers", href: "/freelancers" },
    { name: "Job Matching", href: "/job-matching" },
    { name: "Career Paths", href: "/career-paths" },
    { name: "Skills", href: "/skills" },
    { name: "Enhanced Skill Analysis", href: "/enhanced-skill-analysis" },
    { name: "Interview Prep", href: "/interview-prep" },
    { name: "Insights", href: "/insights" },
    { name: "Profile", href: "/profile" },
  ];


  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Visiondrill
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex md:items-center md:space-x-2">
            <ThemeToggle />
            {/* Dashboard Link - Show for authenticated users */}
            {isAuthenticated && user && (() => {
              const dashboardInfo = getDashboardLink();
              if (!dashboardInfo) return null;
              
              const Icon = dashboardInfo.icon;
              const isDashboardActive = location.pathname.startsWith(dashboardInfo.href) || 
                                      (user.account_type === 'admin' && location.pathname.startsWith('/admin')) ||
                                      (user.account_type === 'employer' && location.pathname.startsWith('/employer')) ||
                                      (user.account_type === 'job_seeker' && location.pathname.startsWith('/jobseeker'));
              
              return (
                <Link
                  to={dashboardInfo.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isDashboardActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {dashboardInfo.name}
                </Link>
              );
            })()}
            
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {user.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
<DropdownMenuItem onClick={() => navigate(getDashboardUrl())}>
  Dashboard
</DropdownMenuItem>
<DropdownMenuItem onClick={() => navigate("/profile")}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Log in
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors"
            >
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && isMobile && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 pb-3 border-t border-border">
              {/* Dashboard Link - Show for authenticated users */}
              {isAuthenticated && user && (() => {
                const dashboardInfo = getDashboardLink();
                if (!dashboardInfo) return null;
                
                const Icon = dashboardInfo.icon;
                const isDashboardActive = location.pathname.startsWith(dashboardInfo.href) || 
                                        (user.account_type === 'admin' && location.pathname.startsWith('/admin')) ||
                                        (user.account_type === 'employer' && location.pathname.startsWith('/employer')) ||
                                        (user.account_type === 'job_seeker' && location.pathname.startsWith('/jobseeker'));
                
                return (
                  <div className="flex items-center px-3 space-x-2">
                    <Link
                      to={dashboardInfo.href}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                        isDashboardActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="h-4 w-4" />
                      {dashboardInfo.name}
                    </Link>
                  </div>
                );
              })()}
              <div className="mt-3 px-2 space-y-1">
                {isAuthenticated && user ? (
                  <>
                    <div className="px-3 py-2 text-base font-medium text-muted-foreground">
                      Signed in as {user.name}
                    </div>
                    <Link
                      to={getDashboardUrl()}
                      className="block px-3 py-2 rounded-lg text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="block px-3 py-2 rounded-lg text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-red-600 hover:bg-accent transition-colors"
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-3 py-2 rounded-lg text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Log in
                    </Link>
                    <Link
                      to="/signup"
                      className="block px-3 py-2 rounded-lg text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
