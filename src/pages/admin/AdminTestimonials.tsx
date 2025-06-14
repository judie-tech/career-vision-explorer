
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AdminLayout from "@/components/admin/AdminLayout";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, Edit, Trash, Eye, MessageSquare, Star } from "lucide-react";
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

type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  status: "approved" | "pending" | "rejected";
  featured: boolean;
  submittedDate: string;
  approvedDate?: string;
  category: "job-seeker" | "employer" | "career-changer";
};

const mockTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Software Engineer",
    company: "TechCorp",
    content: "Visiondrill helped me transition from marketing to software engineering. The career path guidance was invaluable.",
    rating: 5,
    status: "approved",
    featured: true,
    submittedDate: "2024-02-15",
    approvedDate: "2024-02-16",
    category: "career-changer",
  },
  {
    id: "2",
    name: "Mike Chen",
    role: "Product Manager",
    company: "StartupXYZ",
    content: "Found my dream job through Visiondrill's platform. The skill assessment really helped me understand my strengths.",
    rating: 5,
    status: "approved",
    featured: false,
    submittedDate: "2024-03-01",
    approvedDate: "2024-03-02",
    category: "job-seeker",
  },
  {
    id: "3",
    name: "Emily Davis",
    role: "HR Director",
    company: "Enterprise Inc",
    content: "As an employer, Visiondrill has helped us find qualified candidates quickly and efficiently.",
    rating: 4,
    status: "pending",
    featured: false,
    submittedDate: "2024-03-10",
    category: "employer",
  },
];

const AdminTestimonials = () => {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>(mockTestimonials);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);

  const [editForm, setEditForm] = useState<Partial<Testimonial>>({
    name: "",
    role: "",
    company: "",
    content: "",
    rating: 5,
    status: "pending",
    featured: false,
    category: "job-seeker",
  });

  const filteredTestimonials = testimonials.filter((testimonial) => {
    const matchesSearch = 
      testimonial.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || testimonial.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || testimonial.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleEditClick = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setEditForm({ ...testimonial });
    setIsEditDialogOpen(true);
  };

  const handleViewClick = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsViewDialogOpen(true);
  };

  const handleDeleteClick = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsDeleteDialogOpen(true);
  };

  const handleAddClick = () => {
    setEditForm({
      name: "",
      role: "",
      company: "",
      content: "",
      rating: 5,
      status: "pending",
      featured: false,
      category: "job-seeker",
    });
    setIsAddDialogOpen(true);
  };

  const handleApprove = async (id: string) => {
    setIsLoading(true);
    try {
      setTestimonials(prev => prev.map(testimonial => 
        testimonial.id === id ? { 
          ...testimonial, 
          status: "approved" as const,
          approvedDate: new Date().toISOString().split('T')[0]
        } : testimonial
      ));
      toast({ title: "Success", description: "Testimonial approved successfully" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to approve testimonial", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async (id: string) => {
    setIsLoading(true);
    try {
      setTestimonials(prev => prev.map(testimonial => 
        testimonial.id === id ? { ...testimonial, status: "rejected" as const } : testimonial
      ));
      toast({ title: "Success", description: "Testimonial rejected" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to reject testimonial", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFeatured = async (testimonial: Testimonial) => {
    setIsLoading(true);
    try {
      setTestimonials(prev => prev.map(t => 
        t.id === testimonial.id ? { ...t, featured: !t.featured } : t
      ));
      toast({ 
        title: "Success", 
        description: `Testimonial ${testimonial.featured ? 'unfeatured' : 'featured'} successfully` 
      });
    } catch (error) {
      toast({ title: "Error", description: "Failed to update testimonial", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTestimonial = async () => {
    if (!editForm.name || !editForm.content || !editForm.role || !editForm.company) {
      toast({
        title: "Error",
        description: "Required fields are missing",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const newTestimonial: Testimonial = {
        ...editForm as Testimonial,
        id: Date.now().toString(),
        submittedDate: new Date().toISOString().split('T')[0],
      };
      setTestimonials(prev => [...prev, newTestimonial]);
      toast({ title: "Success", description: "Testimonial created successfully" });
      setIsAddDialogOpen(false);
    } catch (error) {
      toast({ title: "Error", description: "Failed to create testimonial", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditTestimonial = async () => {
    if (!selectedTestimonial?.id) return;
    
    setIsLoading(true);
    try {
      setTestimonials(prev => prev.map(testimonial => 
        testimonial.id === selectedTestimonial.id ? { ...testimonial, ...editForm } : testimonial
      ));
      toast({ title: "Success", description: "Testimonial updated successfully" });
      setIsEditDialogOpen(false);
    } catch (error) {
      toast({ title: "Error", description: "Failed to update testimonial", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTestimonial = async () => {
    if (!selectedTestimonial?.id) return;
    
    setIsLoading(true);
    try {
      setTestimonials(prev => prev.filter(testimonial => testimonial.id !== selectedTestimonial.id));
      toast({ title: "Success", description: "Testimonial deleted successfully" });
      setIsDeleteDialogOpen(false);
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete testimonial", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "approved": return "default";
      case "pending": return "secondary";
      case "rejected": return "destructive";
      default: return "outline";
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Testimonials Management</h1>
            <p className="text-muted-foreground">Manage user testimonials and reviews</p>
          </div>
          <Button onClick={handleAddClick} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Testimonial
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search testimonials..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="job-seeker">Job Seeker</SelectItem>
              <SelectItem value="employer">Employer</SelectItem>
              <SelectItem value="career-changer">Career Changer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Person</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTestimonials.map((testimonial) => (
                <TableRow key={testimonial.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex">
                      {renderStars(testimonial.rating)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {testimonial.category.replace('-', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(testimonial.status)}>
                      {testimonial.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {testimonial.featured && <Badge>Featured</Badge>}
                  </TableCell>
                  <TableCell>{testimonial.submittedDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleViewClick(testimonial)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEditClick(testimonial)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      {testimonial.status === "pending" && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleApprove(testimonial.id)}
                            className="text-green-600"
                          >
                            ✓
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleReject(testimonial.id)}
                            className="text-red-600"
                          >
                            ✗
                          </Button>
                        </>
                      )}
                      {testimonial.status === "approved" && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleToggleFeatured(testimonial)}
                          className="text-blue-600"
                        >
                          <Star className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteClick(testimonial)} className="text-destructive">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredTestimonials.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No testimonials found
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

export default AdminTestimonials;
