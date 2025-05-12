
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { LogOut, User, FileText, CheckSquare, Calendar } from "lucide-react";

const JobSeekerDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated, logout, hasRole } = useAuth();

  useEffect(() => {
    // Redirect if not authenticated or not a job seeker
    if (!isAuthenticated || !hasRole('jobseeker')) {
      toast({
        title: "Access Denied",
        description: "Please log in as a job seeker to access this page",
        variant: "destructive",
      });
      navigate("/admin/login");
    }
  }, [isAuthenticated, hasRole, navigate, toast]);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate("/admin/login");
  };

  if (!isAuthenticated || !hasRole('jobseeker')) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Job Seeker Dashboard</h1>
            </div>
            <div className="flex items-center">
              <span className="mr-4 text-sm text-gray-700">
                Logged in as: <span className="font-medium">{user?.name}</span>
              </span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Profile Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <User className="h-8 w-8 text-career-blue mr-2" />
                  <div>
                    <p className="text-2xl font-bold">85%</p>
                    <p className="text-sm text-gray-500">Add missing skills to complete</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-career-purple mr-2" />
                  <div>
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-sm text-gray-500">3 awaiting response</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Interviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-green-600 mr-2" />
                  <div>
                    <p className="text-2xl font-bold">2</p>
                    <p className="text-sm text-gray-500">Next: Tomorrow, 2PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Skills Verified</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <CheckSquare className="h-8 w-8 text-amber-500 mr-2" />
                  <div>
                    <p className="text-2xl font-bold">8/15</p>
                    <p className="text-sm text-gray-500">Complete assessments</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Recommendations</CardTitle>
                <CardDescription>Tailored matches based on your profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* This would be populated with real job recommendations */}
                <div className="border-b pb-4">
                  <h3 className="font-medium text-lg">Senior Frontend Developer</h3>
                  <p className="text-sm text-gray-500">TechCorp Inc. • Remote • $120k-$150k</p>
                  <div className="flex mt-2">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-2">95% Match</span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">Posted 2 days ago</span>
                  </div>
                </div>
                
                <div className="border-b pb-4">
                  <h3 className="font-medium text-lg">React Team Lead</h3>
                  <p className="text-sm text-gray-500">InnovateX • Hybrid • $130k-$160k</p>
                  <div className="flex mt-2">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-2">92% Match</span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">Posted 1 week ago</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg">Full Stack Engineer</h3>
                  <p className="text-sm text-gray-500">GrowthStartup • On-site • $110k-$140k</p>
                  <div className="flex mt-2">
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded mr-2">87% Match</span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">Posted today</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerDashboard;
