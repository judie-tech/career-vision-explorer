
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AdminLayout from "@/components/admin/AdminLayout";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, Edit, Trash, Eye, FileText, Image, Video } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

type Content = {
  id: string;
  title: string;
  type: "article" | "guide" | "video" | "infographic";
  category: string;
  content: string;
  author: string;
  status: "published" | "draft" | "review";
  publishDate: string;
  lastModified: string;
  views: number;
  likes: number;
  tags: string[];
};

const mockContent: Content[] = [
  {
    id: "1",
    title: "Complete Guide to Frontend Development",
    type: "guide",
    category: "Career Guides",
    content: "A comprehensive guide covering everything you need to know about frontend development...",
    author: "John Doe",
    status: "published",
    publishDate: "2024-03-01",
    lastModified: "2024-03-05",
    views: 1542,
    likes: 89,
    tags: ["frontend", "development", "react", "javascript"],
  },
  {
    id: "2",
    title: "Top 10 Skills for 2024",
    type: "article",
    category: "Market Insights",
    content: "Discover the most in-demand skills for the upcoming year...",
    author: "Jane Smith",
    status: "published",
    publishDate: "2024-02-28",
    lastModified: "2024-02-28",
    views: 2341,
    likes: 156,
    tags: ["skills", "2024", "trends", "career"],
  },
];

const AdminContent = () => {
  const { toast } = useToast();
  const [content, setContent] = useState<Content[]>(mockContent);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);

  const [editForm, setEditForm] = useState<Partial<Content>>({
    title: "",
    type: "article",
    category: "",
    content: "",
    author: "",
    status: "draft",
    tags: [],
  });

  const filteredContent = content.filter((item) => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || item.type === typeFilter;
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleEditClick = (item: Content) => {
    setSelectedContent(item);
    setEditForm({ ...item });
    setIsEditDialogOpen(true);
  };

  const handleViewClick = (item: Content) => {
    setSelectedContent(item);
    setIsViewDialogOpen(true);
  };

  const handleDeleteClick = (item: Content) => {
    setSelectedContent(item);
    setIsDeleteDialogOpen(true);
  };

  const handleAddClick = () => {
    setEditForm({
      title: "",
      type: "article",
      category: "",
      content: "",
      author: "",
      status: "draft",
      tags: [],
    });
    setIsAddDialogOpen(true);
  };

  const handleAddContent = async () => {
    if (!editForm.title || !editForm.category || !editForm.content || !editForm.author) {
      toast({
        title: "Error",
        description: "Required fields are missing",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const newContent: Content = {
        ...editForm as Content,
        id: Date.now().toString(),
        publishDate: new Date().toISOString().split('T')[0],
        lastModified: new Date().toISOString().split('T')[0],
        views: 0,
        likes: 0,
      };
      setContent(prev => [...prev, newContent]);
      toast({ title: "Success", description: "Content created successfully" });
      setIsAddDialogOpen(false);
    } catch (error) {
      toast({ title: "Error", description: "Failed to create content", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditContent = async () => {
    if (!selectedContent?.id) return;
    
    setIsLoading(true);
    try {
      setContent(prev => prev.map(item => 
        item.id === selectedContent.id ? { 
          ...item, 
          ...editForm, 
          lastModified: new Date().toISOString().split('T')[0]
        } : item
      ));
      toast({ title: "Success", description: "Content updated successfully" });
      setIsEditDialogOpen(false);
    } catch (error) {
      toast({ title: "Error", description: "Failed to update content", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteContent = async () => {
    if (!selectedContent?.id) return;
    
    setIsLoading(true);
    try {
      setContent(prev => prev.filter(item => item.id !== selectedContent.id));
      toast({ title: "Success", description: "Content deleted successfully" });
      setIsDeleteDialogOpen(false);
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete content", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "article": return <FileText className="h-4 w-4" />;
      case "guide": return <FileText className="h-4 w-4" />;
      case "video": return <Video className="h-4 w-4" />;
      case "infographic": return <Image className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "published": return "default";
      case "draft": return "secondary";
      case "review": return "outline";
      default: return "outline";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Content Management</h1>
            <p className="text-muted-foreground">Manage articles, guides, and educational content</p>
          </div>
          <Button onClick={handleAddClick} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Content
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search content..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="article">Article</SelectItem>
              <SelectItem value="guide">Guide</SelectItem>
              <SelectItem value="video">Video</SelectItem>
              <SelectItem value="infographic">Infographic</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="review">Review</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Content</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Likes</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContent.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {getTypeIcon(item.type)}
                        {item.title}
                      </div>
                      <div className="text-sm text-muted-foreground">{item.category}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {item.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.author}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(item.status)}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.views.toLocaleString()}</TableCell>
                  <TableCell>{item.likes}</TableCell>
                  <TableCell>{item.lastModified}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleViewClick(item)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEditClick(item)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteClick(item)} className="text-destructive">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredContent.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No content found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Similar dialog structure for CRUD operations */}
    </AdminLayout>
  );
};

export default AdminContent;
