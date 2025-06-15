
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentStats } from "@/components/admin/content/ContentStats";
import { ContentFilters } from "@/components/admin/content/ContentFilters";
import { ContentTable } from "@/components/admin/content/ContentTable";
import { ContentForm } from "@/components/admin/content/ContentForm";
import { FooterContentManagement } from "@/components/admin/content/FooterContentManagement";

const AdminContent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Content Management</h1>
          <p className="text-muted-foreground">
            Manage website content, pages, and footer information
          </p>
        </div>

        <Tabs defaultValue="content" className="space-y-6">
          <TabsList>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="footer">Footer Management</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="space-y-6">
            <ContentStats />
            <ContentFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              typeFilter={typeFilter}
              setTypeFilter={setTypeFilter}
            />
            <ContentTable
              searchQuery={searchQuery}
              statusFilter={statusFilter}
              typeFilter={typeFilter}
            />
            <ContentForm />
          </TabsContent>
          
          <TabsContent value="footer">
            <FooterContentManagement />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminContent;
