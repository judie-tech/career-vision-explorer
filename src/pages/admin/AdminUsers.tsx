
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useUsers, User } from "@/hooks/use-users";
import { useToast } from "@/hooks/use-toast";
import { UserHeader } from "@/components/admin/users/UserHeader";
import { UserFilters } from "@/components/admin/users/UserFilters";
import { UserTable } from "@/components/admin/users/UserTable";
import { UserDialogs } from "@/components/admin/users/UserDialogs";
import { CompanyLogoManagement } from "@/components/admin/companies/CompanyLogoManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminUsers = () => {
  const { toast } = useToast();
  const { users, createUser, updateUser, deleteUser, isLoading } = useUsers();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [editForm, setEditForm] = useState<Partial<User>>({
    name: "",
    email: "",
    role: "jobseeker",
    status: "active",
  });

  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setEditForm({ ...user });
    setIsEditDialogOpen(true);
  };

  const handleViewClick = (user: User) => {
    setSelectedUser(user);
    setIsViewDialogOpen(true);
  };

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleAddClick = () => {
    setEditForm({
      name: "",
      email: "",
      role: "jobseeker",
      status: "active",
    });
    setIsAddDialogOpen(true);
  };

  const handleAddUser = async () => {
    if (!editForm.name || !editForm.email || !editForm.role || !editForm.status) {
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive",
      });
      return;
    }
    
    const success = await createUser(editForm as Omit<User, 'id' | 'joinDate'>);
    if (success) {
      setIsAddDialogOpen(false);
    }
  };

  const handleEditUser = async () => {
    if (!selectedUser?.id) return;
    
    const success = await updateUser(selectedUser.id, editForm);
    if (success) {
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser?.id) return;
    
    const success = await deleteUser(selectedUser.id);
    if (success) {
      setIsDeleteDialogOpen(false);
    }
  };

  const handleToggleStatus = async (user: User) => {
    const newStatus = user.status === "active" ? "inactive" : "active";
    await updateUser(user.id, { status: newStatus });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">
            Manage user accounts and company logos
          </p>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="companies">Company Logos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users" className="space-y-6">
            <UserHeader onAddClick={handleAddClick} />

            <UserFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              roleFilter={roleFilter}
              setRoleFilter={setRoleFilter}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />

            <UserTable
              users={filteredUsers}
              onViewClick={handleViewClick}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
              onToggleStatus={handleToggleStatus}
            />

            <UserDialogs
              selectedUser={selectedUser}
              isViewDialogOpen={isViewDialogOpen}
              setIsViewDialogOpen={setIsViewDialogOpen}
              isEditDialogOpen={isEditDialogOpen}
              setIsEditDialogOpen={setIsEditDialogOpen}
              isAddDialogOpen={isAddDialogOpen}
              setIsAddDialogOpen={setIsAddDialogOpen}
              isDeleteDialogOpen={isDeleteDialogOpen}
              setIsDeleteDialogOpen={setIsDeleteDialogOpen}
              editForm={editForm}
              setEditForm={setEditForm}
              onAddUser={handleAddUser}
              onEditUser={handleEditUser}
              onDeleteUser={handleDeleteUser}
              isLoading={isLoading}
            />
          </TabsContent>
          
          <TabsContent value="companies">
            <CompanyLogoManagement />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
