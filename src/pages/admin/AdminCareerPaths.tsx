
import AdminLayout from "@/components/admin/AdminLayout";

const AdminCareerPaths = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Career Paths Management</h1>
          <p className="text-muted-foreground">
            Manage career paths and progression routes
          </p>
        </div>
        <div className="bg-muted/20 rounded-lg p-8 text-center">
          <h3 className="text-lg font-medium mb-2">Career Paths Module</h3>
          <p className="text-muted-foreground">
            This module will allow you to create and manage career progression paths.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCareerPaths;
