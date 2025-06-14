
import AdminLayout from "@/components/admin/AdminLayout";
import { AdminMetrics } from "@/components/admin/AdminMetrics";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated, hasRole } = useAuth();

  useEffect(() => {
    console.log("AdminDashboard mounted", { user, isAuthenticated });
    
    if (!isAuthenticated) {
      toast({
        title: "Access Denied",
        description: "Please log in to access the admin dashboard",
        variant: "destructive",
      });
      navigate("/admin/login");
      return;
    }

    if (!hasRole("admin")) {
      toast({
        title: "Access Denied", 
        description: "You don't have permission to access the admin dashboard",
        variant: "destructive",
      });
      navigate("/");
      return;
    }
  }, [isAuthenticated, hasRole, navigate, toast, user]);

  if (!isAuthenticated || !hasRole("admin")) {
    return null;
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to the Visiondrill administration panel
          </p>
        </div>
        <AdminMetrics />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
