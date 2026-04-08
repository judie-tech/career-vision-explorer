
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContentStats from "@/components/admin/content/ContentStats";
import ContentFilters from "@/components/admin/content/ContentFilters";
import ContentTable from "@/components/admin/content/ContentTable";
import ContentForm from "@/components/admin/content/ContentForm";
import { FooterContentManagement } from "@/components/admin/content/FooterContentManagement";
import { AboutPageManagement } from "@/components/admin/content/AboutPageManagement";
import { useContentForm } from "@/hooks/useContentForm";
import { Content, ContentStatus } from "@/types/content";
import { useContent, ContentProvider } from "@/hooks/use-content";

const AdminContentContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [editingContent, setEditingContent] = useState<Content | null>(null);

  const form = useContentForm();
  const { contents, updateContent, addContent, deleteContent } = useContent();

  const handleEdit = (content: Content) => {
    setEditingContent(content);
    form.reset({
      title: content.title,
      slug: content.slug,
      type: content.type,
      status: content.status,
      content: content.content,
      excerpt: content.excerpt || "",
      location: content.location || "",
    });
  };

  const handleDelete = (id: string) => {
    deleteContent(id);
  };

  const handleStatusChange = (id: string, status: ContentStatus) => {
    updateContent(id, { status });
  };

  const handleSubmit = (data: any) => {
    if (editingContent) {
      updateContent(editingContent.id, data);
    } else {
      addContent({
        ...data,
        authorId: "1",
        authorName: "Admin User",
      });
    }
    form.reset();
    setEditingContent(null);
  };

  const handleCancel = () => {
    form.reset();
    setEditingContent(null);
  };

  // Filter contents based on search and filters
  const filteredContents = contents.filter(content => {
    const matchesSearch = searchTerm === "" || 
      content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (content.location && content.location.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === "all" || content.status === statusFilter;
    const matchesType = typeFilter === "all" || content.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Content Management</h1>
        <p className="text-muted-foreground">
          Manage website content, pages, and footer information
        </p>
      </div>

      <Tabs defaultValue="content" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="about">About Page</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="space-y-6">
          <ContentStats contents={filteredContents} />
          <ContentFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
          />
          <ContentTable
            contents={filteredContents}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
          <ContentForm 
            form={form}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitLabel={editingContent ? "Update Content" : "Create Content"}
          />
        </TabsContent>

        <TabsContent value="about">
          <AboutPageManagement />
        </TabsContent>
        
        <TabsContent value="footer">
          <FooterContentManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const AdminContent = () => {
  return (
    <AdminLayout>
      <ContentProvider>
        <AdminContentContent />
      </ContentProvider>
    </AdminLayout>
  );
};

export default AdminContent;
