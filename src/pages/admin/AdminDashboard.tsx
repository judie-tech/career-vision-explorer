
import { useState } from "react";
import { Link } from "react-router-dom";
import { AdminButton } from "@/components/ui/custom-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminLayout from "@/components/admin/AdminLayout";
import { BarChart, Users, Briefcase, BookOpen, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [stats] = useState({
    users: 1456,
    jobs: 378,
    careerPaths: 25,
    skills: 124
  });

  const handleQuickAction = (action: string) => {
    toast({
      title: `Action Initiated: ${action}`,
      description: `You're now managing ${action.toLowerCase()}`,
    });
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.users}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Jobs</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.jobs}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Career Paths</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.careerPaths}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Skills</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.skills}</div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link to="/admin/users">
                <AdminButton variant="primary" className="w-full" onClick={() => handleQuickAction("Users")}>
                  Manage Users
                </AdminButton>
              </Link>
              <Link to="/admin/jobs">
                <AdminButton variant="primary" className="w-full" onClick={() => handleQuickAction("Jobs")}>
                  Manage Jobs
                </AdminButton>
              </Link>
              <Link to="/admin/career-paths">
                <AdminButton variant="primary" className="w-full" onClick={() => handleQuickAction("Career Paths")}>
                  Manage Career Paths
                </AdminButton>
              </Link>
              <Link to="/admin/skills">
                <AdminButton variant="primary" className="w-full" onClick={() => handleQuickAction("Skills")}>
                  Manage Skills
                </AdminButton>
              </Link>
              <Link to="/admin/settings">
                <AdminButton variant="primary" className="w-full" onClick={() => handleQuickAction("Settings")}>
                  Site Settings
                </AdminButton>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>System</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Database</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Connected</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>API Services</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Online</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Storage</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">85% Available</span>
                </div>
                <Link to="/admin/settings">
                  <AdminButton variant="outline" className="w-full flex gap-2 items-center">
                    <Settings className="h-4 w-4" />
                    <span>System Settings</span>
                  </AdminButton>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
