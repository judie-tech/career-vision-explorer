
import AdminLayout from "@/components/admin/AdminLayout";
import { AdminMetrics } from "@/components/admin/AdminMetrics";

const AdminDashboard = () => {
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
