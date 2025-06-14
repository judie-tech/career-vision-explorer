
import AdminLayout from "@/components/admin/AdminLayout";

const AdminSkills = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Skills Management</h1>
          <p className="text-muted-foreground">
            Manage skills database and skill assessments
          </p>
        </div>
        <div className="bg-muted/20 rounded-lg p-8 text-center">
          <h3 className="text-lg font-medium mb-2">Skills Module</h3>
          <p className="text-muted-foreground">
            This module will allow you to manage the skills database and create skill assessments.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSkills;
