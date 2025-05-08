
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold gradient-text">VisionDrill</span>
            </Link>
          </div>

          {!isMobile ? (
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              <Link
                to="/"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-career-blue transition-colors"
              >
                Home
              </Link>
              <Link
                to="/jobs"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-career-blue transition-colors"
              >
                Jobs
              </Link>
              <Link
                to="/career-paths"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-career-blue transition-colors"
              >
                Career Paths
              </Link>
              <Link
                to="/skills"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-career-blue transition-colors"
              >
                Skills
              </Link>
              <Link
                to="/insights"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-career-blue transition-colors"
              >
                Insights
              </Link>
            </div>
          ) : null}

          <div className="flex items-center">
            <div className="hidden md:ml-4 md:flex md:items-center">
              <Link to="/login">
                <Button variant="outline" className="mr-2">
                  Log in
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-career-blue hover:bg-career-blue/90">
                  Sign up
                </Button>
              </Link>
            </div>
            
            {isMobile && (
              <div className="ml-auto flex items-center md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-career-blue"
                >
                  <span className="sr-only">Open main menu</span>
                  {!isMenuOpen ? (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/jobs"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Jobs
            </Link>
            <Link
              to="/career-paths"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Career Paths
            </Link>
            <Link
              to="/skills"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Skills
            </Link>
            <Link
              to="/insights"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Insights
            </Link>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-5">
                <Link to="/login" className="w-full">
                  <Button variant="outline" className="w-full mb-2">
                    Log in
                  </Button>
                </Link>
              </div>
              <div className="flex items-center px-5">
                <Link to="/signup" className="w-full">
                  <Button className="w-full bg-career-blue hover:bg-career-blue/90">
                    Sign up
                  </Button>
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
