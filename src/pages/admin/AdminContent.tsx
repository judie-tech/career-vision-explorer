
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";
import ContentStats from "@/components/admin/content/ContentStats";
import ContentFilters from "@/components/admin/content/ContentFilters";
import ContentTable from "@/components/admin/content/ContentTable";
import ContentForm from "@/components/admin/content/ContentForm";
import { useContentForm, ContentFormData } from "@/hooks/useContentForm";
import { Content, ContentStatus, ContentType } from "@/types/content";

const AdminContent = () => {
  const { toast } = useToast();
  const [contents, setContents] = useState<Content[]>([
    {
      id: "1",
      title: "Welcome to VisionDrill",
      slug: "welcome-to-visiondrill",
      type: "page",
      status: "published",
      content: "Welcome to our AI-driven career platform that helps you find your perfect job match.",
      excerpt: "Get started with VisionDrill and discover your career potential.",
      authorId: "admin",
      authorName: "Admin User",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-16",
    },
    {
      id: "2",
      title: "How to Use Our Platform",
      slug: "how-to-use-platform",
      type: "article",
      status: "published",
      content: "Learn how to navigate and make the most of VisionDrill's features.",
      excerpt: "A comprehensive guide to using our platform effectively.",
      authorId: "admin",
      authorName: "Admin User",
      createdAt: "2024-01-10",
      updatedAt: "2024-01-12",
    },
    {
      id: "3",
      title: "Career Tips for Success",
      slug: "career-tips-success",
      type: "blog",
      status: "draft",
      content: "Essential tips and strategies for advancing your career.",
      excerpt: "Practical advice for career growth and development.",
      authorId: "admin",
      authorName: "Admin User",
      createdAt: "2024-01-20",
      updatedAt: "2024-01-20",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<Content | null>(null);

  const form = useContentForm();

  // Filter contents
  const filteredContents = contents.filter((content) => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || content.status === statusFilter;
    const matchesType = typeFilter === "all" || content.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleCreateContent = (data: ContentFormData) => {
    const newContent: Content = {
      id: Date.now().toString(),
      title: data.title,
      slug: data.slug,
      type: data.type,
      status: data.status,
      content: data.content,
      excerpt: data.excerpt,
      authorId: "admin",
      authorName: "Admin User",
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };

    setContents([newContent, ...contents]);
    setIsCreateOpen(false);
    form.reset();
    toast({
      title: "Success",
      description: "Content created successfully",
    });
  };

  const handleEditContent = (data: ContentFormData) => {
    if (!editingContent) return;

    const updatedContents = contents.map((content) =>
      content.id === editingContent.id
        ? { 
            ...content, 
            title: data.title,
            slug: data.slug,
            type: data.type,
            status: data.status,
            content: data.content,
            excerpt: data.excerpt,
            updatedAt: new Date().toISOString().split('T')[0]
          }
        : content
    );

    setContents(updatedContents);
    setEditingContent(null);
    form.reset();
    toast({
      title: "Success",
      description: "Content updated successfully",
    });
  };

  const handleDeleteContent = (id: string) => {
    setContents(contents.filter((content) => content.id !== id));
    toast({
      title: "Success",
      description: "Content deleted successfully",
    });
  };

  const handleStatusChange = (id: string, newStatus: ContentStatus) => {
    const updatedContents = contents.map((content) =>
      content.id === id
        ? { ...content, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] }
        : content
    );

    setContents(updatedContents);
    toast({
      title: "Success",
      description: `Content ${newStatus} successfully`,
    });
  };

  const openEditDialog = (content: Content) => {
    setEditingContent(content);
    form.reset({
      title: content.title,
      slug: content.slug,
      type: content.type,
      status: content.status,
      content: content.content,
      excerpt: content.excerpt,
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Content Management</h1>
            <p className="text-gray-600 mt-2">Manage pages, articles, and blog posts</p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Content
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Create New Content</DialogTitle>
                <DialogDescription>
                  Add new content to the platform
                </DialogDescription>
              </DialogHeader>
              <ContentForm
                form={form}
                onSubmit={handleCreateContent}
                onCancel={() => setIsCreateOpen(false)}
                submitLabel="Create Content"
              />
            </DialogContent>
          </Dialog>
        </div>

        <ContentStats contents={contents} />

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
          onEdit={openEditDialog}
          onDelete={handleDeleteContent}
          onStatusChange={handleStatusChange}
        />

        <Dialog open={!!editingContent} onOpenChange={() => setEditingContent(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Edit Content</DialogTitle>
              <DialogDescription>
                Update the content information
              </DialogDescription>
            </DialogHeader>
            <ContentForm
              form={form}
              onSubmit={handleEditContent}
              onCancel={() => setEditingContent(null)}
              submitLabel="Update Content"
            />
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminContent;
