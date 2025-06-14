
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AdminLayout from "@/components/admin/AdminLayout";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, Edit, Trash, Eye, BookOpen } from "lucide-react";
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

type CareerPath = {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: string;
  skills: string[];
  steps: string[];
  status: "active" | "draft";
  createdDate: string;
};

const mockCareerPaths: CareerPath[] = [
  {
    id: "1",
    title: "Frontend Developer",
    description: "Learn to build modern web applications with React and TypeScript",
    category: "Technology",
    difficulty: "beginner",
    duration: "6 months",
    skills: ["HTML", "CSS", "JavaScript", "React", "TypeScript"],
    steps: ["Learn HTML/CSS basics", "Master JavaScript", "Learn React", "TypeScript fundamentals", "Build projects"],
    status: "active",
    createdDate: "2024-03-01",
  },
  {
    id: "2",
    title: "Product Manager",
    description: "Develop skills to lead product development from conception to launch",
    category: "Business",
    difficulty: "intermediate",
    duration: "9 months",
    skills: ["Product Strategy", "User Research", "Analytics", "Leadership", "Communication"],
    steps: ["Product fundamentals", "Market research", "User experience", "Analytics", "Leadership skills"],
    status: "active",
    createdDate: "2024-02-15",
  },
];

const AdminCareerPaths = () => {
  const { toast } = useToast();
  const [careerPaths, setCareerPaths] = useState<CareerPath[]>(mockCareerPaths);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPath, setSelectedPath] = useState<CareerPath | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);

  const [editForm, setEditForm] = useState<Partial<CareerPath>>({
    title: "",
    description: "",
    category: "",
    difficulty: "beginner",
    duration: "",
    skills: [],
    steps: [],
    status: "active",
  });

  const filteredPaths = careerPaths.filter((path) => {
    const matchesSearch = 
      path.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      path.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      path.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || path.category === categoryFilter;
    const matchesDifficulty = difficultyFilter === "all" || path.difficulty === difficultyFilter;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const handleEditClick = (path: CareerPath) => {
    setSelectedPath(path);
    setEditForm({ ...path });
    setIsEditDialogOpen(true);
  };

  const handleViewClick = (path: CareerPath) => {
    setSelectedPath(path);
    setIsViewDialogOpen(true);
  };

  const handleDeleteClick = (path: CareerPath) => {
    setSelectedPath(path);
    setIsDeleteDialogOpen(true);
  };

  const handleAddClick = () => {
    setEditForm({
      title: "",
      description: "",
      category: "",
      difficulty: "beginner",
      duration: "",
      skills: [],
      steps: [],
      status: "active",
    });
    setIsAddDialogOpen(true);
  };

  const handleAddPath = async () => {
    if (!editForm.title || !editForm.description || !editForm.category) {
      toast({
        title: "Error",
        description: "Required fields are missing",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const newPath: CareerPath = {
        ...editForm as CareerPath,
        id: Date.now().toString(),
        createdDate: new Date().toISOString().split('T')[0],
      };
      setCareerPaths(prev => [...prev, newPath]);
      toast({ title: "Success", description: "Career path created successfully" });
      setIsAddDialogOpen(false);
    } catch (error) {
      toast({ title: "Error", description: "Failed to create career path", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditPath = async () => {
    if (!selectedPath?.id) return;
    
    setIsLoading(true);
    try {
      setCareerPaths(prev => prev.map(path => 
        path.id === selectedPath.id ? { ...path, ...editForm } : path
      ));
      toast({ title: "Success", description: "Career path updated successfully" });
      setIsEditDialogOpen(false);
    } catch (error) {
      toast({ title: "Error", description: "Failed to update career path", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePath = async () => {
    if (!selectedPath?.id) return;
    
    setIsLoading(true);
    try {
      setCareerPaths(prev => prev.filter(path => path.id !== selectedPath.id));
      toast({ title: "Success", description: "Career path deleted successfully" });
      setIsDeleteDialogOpen(false);
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete career path", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const getDifficultyBadgeVariant = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "default";
      case "intermediate": return "secondary";
      case "advanced": return "destructive";
      default: return "outline";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Career Paths Management</h1>
            <p className="text-muted-foreground">Manage career development paths and learning tracks</p>
          </div>
          <Button onClick={handleAddClick} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Career Path
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search career paths..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Business">Business</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>
          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Career Path</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPaths.map((path) => (
                <TableRow key={path.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{path.title}</div>
                      <div className="text-sm text-muted-foreground">{path.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>{path.category}</TableCell>
                  <TableCell>
                    <Badge variant={getDifficultyBadgeVariant(path.difficulty)}>
                      {path.difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell>{path.duration}</TableCell>
                  <TableCell>
                    <Badge variant={path.status === "active" ? "default" : "secondary"}>
                      {path.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{path.createdDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleViewClick(path)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEditClick(path)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteClick(path)} className="text-destructive">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredPaths.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No career paths found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Dialogs for CRUD operations - similar structure to AdminJobs but with CareerPath fields */}
      {/* View, Add/Edit, and Delete dialogs would follow the same pattern as AdminJobs */}
    </AdminLayout>
  );
};

export default AdminCareerPaths;
