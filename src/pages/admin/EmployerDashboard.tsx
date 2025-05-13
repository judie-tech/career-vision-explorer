
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users, LineChart, Clock, Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/admin/DashboardLayout";

const EmployerDashboard = () => {
  return (
    <DashboardLayout title="Employer Dashboard" role="employer">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Job Listings</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Post New Job
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Briefcase className="h-8 w-8 text-career-blue mr-2" />
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-gray-500">3 boosted listings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Applicants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-8 w-8 text-career-purple mr-2" />
              <div>
                <p className="text-2xl font-bold">64</p>
                <p className="text-sm text-gray-500">+12 this week</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Interviews Scheduled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-green-600 mr-2" />
              <div>
                <p className="text-2xl font-bold">15</p>
                <p className="text-sm text-gray-500">5 this week</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Listing Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <LineChart className="h-8 w-8 text-amber-500 mr-2" />
              <div>
                <p className="text-2xl font-bold">1,248</p>
                <p className="text-sm text-gray-500">+18% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Applicants</CardTitle>
          <CardDescription>View and manage candidate applications</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Applied</TableHead>
                <TableHead>Match Score</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Sarah Johnson</TableCell>
                <TableCell>Senior Frontend Developer</TableCell>
                <TableCell>2 days ago</TableCell>
                <TableCell>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">95%</span>
                </TableCell>
                <TableCell>
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Review</span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Michael Chen</TableCell>
                <TableCell>Full Stack Engineer</TableCell>
                <TableCell>3 days ago</TableCell>
                <TableCell>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">92%</span>
                </TableCell>
                <TableCell>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Interview</span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Alex Rodriguez</TableCell>
                <TableCell>UX Designer</TableCell>
                <TableCell>1 week ago</TableCell>
                <TableCell>
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">86%</span>
                </TableCell>
                <TableCell>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Accepted</span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Jamie Smith</TableCell>
                <TableCell>DevOps Engineer</TableCell>
                <TableCell>1 week ago</TableCell>
                <TableCell>
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">71%</span>
                </TableCell>
                <TableCell>
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">Rejected</span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default EmployerDashboard;
