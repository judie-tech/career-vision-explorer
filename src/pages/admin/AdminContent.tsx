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
      title: "Hero Section - AI-Driven job linkage",
      slug: "hero-main-title",
      type: "hero",
      status: "published",
      content: "AI-Driven job linkage - Visiondrill Careers Navigator uses advanced AI to match your skills with the perfect job, identify growth opportunities, and guide your career journey.",
      excerpt: "Main hero section text for the homepage",
      location: "homepage-hero",
      authorId: "admin",
      authorName: "Admin User",
      createdAt: "2024-01-10",
      updatedAt: "2024-01-12",
    },
    {
      id: "3",
      title: "CTA Section - Transform Your Career",
      slug: "cta-transform-career",
      type: "cta",
      status: "published",
      content: "Ready to Transform Your Career? Join thousands of professionals who are navigating their career paths with confidence.",
      excerpt: "Call-to-action section encouraging user engagement",
      location: "homepage-cta",
      authorId: "admin",
      authorName: "Admin User",
      createdAt: "2024-01-20",
      updatedAt: "2024-01-20",
    },
    {
      id: "4",
      title: "Footer - Company Info",
      slug: "footer-company-info",
      type: "footer",
      status: "published",
      content: "© 2024 VisionDrill. All rights reserved. Your trusted partner in career development and job matching.",
      excerpt: "Footer copyright and company information",
      location: "global-footer",
      authorId: "admin",
      authorName: "Admin User",
      createdAt: "2024-01-05",
      updatedAt: "2024-01-05",
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
      location: data.location,
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
            location: data.location,
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
      location: content.location || "",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Content Management</h1>
            <p className="text-gray-600 mt-2">Manage all website content including pages, sections, and text</p>
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
