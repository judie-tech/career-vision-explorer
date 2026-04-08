import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate("/login");
  };

  return (
    <nav className="bg-background border-b border-border h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
      <Link to="/" className="text-lg font-bold">
        VisionDrill
      </Link>

      <div className="hidden md:flex md:items-center md:space-x-6">
        <Link to="/jobs" className="text-sm font-medium transition-colors hover:text-primary">
          Jobs
        </Link>
        <Link to="/freelancer/1" className="text-sm font-medium transition-colors hover:text-primary">
          Freelancers
        </Link>
        <Link to="/career-paths" className="text-sm font-medium transition-colors hover:text-primary">
          Career Paths
        </Link>
        <Link to="/insights" className="text-sm font-medium transition-colors hover:text-primary">
          Insights
        </Link>
        <Link to="/partners" className="text-sm font-medium transition-colors hover:text-primary">
          Partners
        </Link>
      </div>

      {isAuthenticated ? (
        <div className="hidden md:flex md:items-center md:space-x-4">
          <Link
            to="/profile"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {user?.name}
          </Link>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      ) : (
        <div className="hidden md:flex md:items-center md:space-x-4">
          <Link
            to="/login"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Sign Up
          </Link>
        </div>
      )}

      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="sm">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="sm:max-w-sm">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>
              Explore VisionDrill and manage your account.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <Link
              to="/jobs"
              className="text-sm font-medium transition-colors hover:text-primary block py-2"
            >
              Jobs
            </Link>
            <Link
              to="/career-paths"
              className="text-sm font-medium transition-colors hover:text-primary block py-2"
            >
              Career Paths
            </Link>
            <Link
              to="/insights"
              className="text-sm font-medium transition-colors hover:text-primary block py-2"
            >
              Insights
            </Link>
            <Link
              to="/partners"
              className="text-sm font-medium transition-colors hover:text-primary block py-2"
            >
              Partners
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="text-sm font-medium transition-colors hover:text-primary block py-2"
                >
                  {user?.name}
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout} className="w-full">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium transition-colors hover:text-primary block py-2"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-sm font-medium transition-colors hover:text-primary block py-2"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Navbar;
