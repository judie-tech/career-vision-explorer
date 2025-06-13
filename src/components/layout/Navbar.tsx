
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { AdminNavItem } from "./AdminNavItem";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Jobs", href: "/jobs" },
    { name: "Career Paths", href: "/career-paths" },
    { name: "Skills", href: "/skills" },
    { name: "Insights", href: "/insights" },
    { name: "Partners", href: "/partners" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="glassmorphism sticky top-0 z-50 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <span className="text-2xl font-bold gradient-text neon-text hover:scale-105 transition-all duration-300">
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
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive(item.href)
                    ? "bg-white/20 backdrop-blur-sm text-blue-600 shadow-lg"
                    : "text-gray-700 hover:bg-white/10 hover:text-blue-600 hover:backdrop-blur-sm"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex md:items-center md:space-x-3">
            <AdminNavItem />
            <Link to="/login">
              <Button variant="outline" size="sm" className="futuristic-btn bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20">
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" className="futuristic-btn">
                Sign up
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-300"
            >
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && isMobile && (
        <div className="md:hidden glassmorphism border-t border-white/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 rounded-xl text-base font-medium transition-all duration-300 ${
                  isActive(item.href)
                    ? "bg-white/20 text-blue-600"
                    : "text-gray-700 hover:bg-white/10 hover:text-blue-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 pb-3 border-t border-white/20">
              <div className="flex items-center px-3 space-x-2">
                <AdminNavItem />
              </div>
              <div className="mt-3 px-2 space-y-1">
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-xl text-base font-medium text-gray-700 hover:bg-white/10 hover:text-blue-600 transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 rounded-xl text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
