
import { useUsers, User } from "@/hooks/use-users";
import { useToast } from "@/hooks/use-toast";
import { UserHeader } from "./UserHeader";
import { UserFilters } from "./UserFilters";
import { UserTable } from "./UserTable";
import { UserDialogs } from "./UserDialogs";
import { useUserManagement } from "./UserManagementProvider";

export const UserManagementTab = () => {
  const { toast } = useToast();
  const { users, createUser, updateUser, deleteUser, isLoading } = useUsers();
  const {
    searchQuery,
    setSearchQuery,
    selectedUser,
    setSelectedUser,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isViewDialogOpen,
    setIsViewDialogOpen,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    editForm,
    setEditForm,
  } = useUserManagement();

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
    <div className="space-y-6">
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
    </div>
  );
};
