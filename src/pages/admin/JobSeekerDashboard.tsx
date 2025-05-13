
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, FileText, CheckSquare, Calendar } from "lucide-react";
import DashboardLayout from "@/components/admin/DashboardLayout";

const JobSeekerDashboard = () => {
  return (
    <DashboardLayout title="Job Seeker Dashboard" role="jobseeker">
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
    </DashboardLayout>
  );
};

export default JobSeekerDashboard;
