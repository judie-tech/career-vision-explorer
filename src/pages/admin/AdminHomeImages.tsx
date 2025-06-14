
import AdminLayout from "@/components/admin/AdminLayout";
import HomeImageManagement from "@/components/admin/home-images/HomeImageManagement";

const AdminHomeImages = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Home Page Images</h1>
          <p className="mt-2 text-gray-600">
            Manage images displayed on the homepage including career paths, testimonials, and other sections.
          </p>
        </div>
        
        <HomeImageManagement />
      </div>
    </AdminLayout>
  );
};

export default AdminHomeImages;
