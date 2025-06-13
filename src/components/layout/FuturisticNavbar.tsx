
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useAuth } from "@/hooks/use-auth";
import { 
  Zap, 
  Menu, 
  X, 
  User, 
  LogOut, 
  Shield, 
  Briefcase,
  Search,
  Bell,
  Settings
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const FuturisticNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getUserDashboard = () => {
    switch (user?.role) {
      case 'admin': return '/admin';
      case 'employer': return '/employer/dashboard';
      case 'jobseeker': return '/jobseeker/dashboard';
      default: return '/';
    }
  };

  const getRoleIcon = () => {
    switch (user?.role) {
      case 'admin': return <Shield className="h-4 w-4" />;
      case 'employer': return <Briefcase className="h-4 w-4" />;
      case 'jobseeker': return <User className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass-nav shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg group-hover:shadow-xl transition-all duration-300">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white text-glow">
              VisionDrill
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/jobs" className="text-white/80 hover:text-white transition-colors duration-300 font-medium">
              Jobs
            </Link>
            <Link to="/career-paths" className="text-white/80 hover:text-white transition-colors duration-300 font-medium">
              Career Paths
            </Link>
            <Link to="/skills" className="text-white/80 hover:text-white transition-colors duration-300 font-medium">
              Skills
            </Link>
            <Link to="/insights" className="text-white/80 hover:text-white transition-colors duration-300 font-medium">
              Insights
            </Link>
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="glass-button border-0">
                  <Search className="h-4 w-4 text-white" />
                </Button>
                <Button variant="ghost" size="icon" className="glass-button border-0 relative">
                  <Bell className="h-4 w-4 text-white" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="glass-button border-0 p-2">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                            {user?.name?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-white font-medium">{user?.name}</span>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="glass-card border-white/20 text-white">
                    <DropdownMenuItem onClick={() => navigate(getUserDashboard())}>
                      {getRoleIcon()}
                      <span className="ml-2">Dashboard</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <User className="h-4 w-4" />
                      <span className="ml-2">Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="h-4 w-4" />
                      <span className="ml-2">Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/20" />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="h-4 w-4" />
                      <span className="ml-2">Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button className="glass-button border-white/30">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="glass-button-primary">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="glass-button border-0"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden glass-card mt-4 p-4 space-y-4 slide-in-bottom">
            <Link 
              to="/jobs" 
              className="block py-2 text-white/80 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Jobs
            </Link>
            <Link 
              to="/career-paths" 
              className="block py-2 text-white/80 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Career Paths
            </Link>
            <Link 
              to="/skills" 
              className="block py-2 text-white/80 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Skills
            </Link>
            <Link 
              to="/insights" 
              className="block py-2 text-white/80 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Insights
            </Link>
            
            {!isAuthenticated && (
              <div className="pt-4 border-t border-white/20 space-y-3">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full glass-button border-white/30">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full glass-button-primary">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
