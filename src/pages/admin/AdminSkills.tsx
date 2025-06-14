
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AdminLayout from "@/components/admin/AdminLayout";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, Edit, Trash, Eye, BarChart } from "lucide-react";
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

type Skill = {
  id: string;
  name: string;
  description: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  tags: string[];
  demandScore: number;
  growthRate: number;
  averageSalary: string;
  relatedJobs: string[];
  status: "active" | "deprecated";
  createdDate: string;
};

const mockSkills: Skill[] = [
  {
    id: "1",
    name: "React",
    description: "A JavaScript library for building user interfaces",
    category: "Frontend Development",
    level: "intermediate",
    tags: ["JavaScript", "Web Development", "Frontend"],
    demandScore: 95,
    growthRate: 15.5,
    averageSalary: "$85,000 - $120,000",
    relatedJobs: ["Frontend Developer", "Full Stack Developer", "React Developer"],
    status: "active",
    createdDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Python",
    description: "A versatile programming language for web development, data science, and automation",
    category: "Programming Languages",
    level: "beginner",
    tags: ["Programming", "Data Science", "Backend"],
    demandScore: 90,
    growthRate: 12.3,
    averageSalary: "$75,000 - $130,000",
    relatedJobs: ["Backend Developer", "Data Scientist", "Python Developer", "DevOps Engineer"],
    status: "active",
    createdDate: "2024-01-10",
  },
];

const AdminSkills = () => {
  const { toast } = useToast();
  const [skills, setSkills] = useState<Skill[]>(mockSkills);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);

  const [editForm, setEditForm] = useState<Partial<Skill>>({
    name: "",
    description: "",
    category: "",
    level: "beginner",
    tags: [],
    demandScore: 0,
    growthRate: 0,
    averageSalary: "",
    relatedJobs: [],
    status: "active",
  });

  const filteredSkills = skills.filter((skill) => {
    const matchesSearch = 
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || skill.category === categoryFilter;
    const matchesLevel = levelFilter === "all" || skill.level === levelFilter;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const handleEditClick = (skill: Skill) => {
    setSelectedSkill(skill);
    setEditForm({ ...skill });
    setIsEditDialogOpen(true);
  };

  const handleViewClick = (skill: Skill) => {
    setSelectedSkill(skill);
    setIsViewDialogOpen(true);
  };

  const handleDeleteClick = (skill: Skill) => {
    setSelectedSkill(skill);
    setIsDeleteDialogOpen(true);
  };

  const handleAddClick = () => {
    setEditForm({
      name: "",
      description: "",
      category: "",
      level: "beginner",
      tags: [],
      demandScore: 0,
      growthRate: 0,
      averageSalary: "",
      relatedJobs: [],
      status: "active",
    });
    setIsAddDialogOpen(true);
  };

  const handleAddSkill = async () => {
    if (!editForm.name || !editForm.description || !editForm.category) {
      toast({
        title: "Error",
        description: "Required fields are missing",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const newSkill: Skill = {
        ...editForm as Skill,
        id: Date.now().toString(),
        createdDate: new Date().toISOString().split('T')[0],
      };
      setSkills(prev => [...prev, newSkill]);
      toast({ title: "Success", description: "Skill created successfully" });
      setIsAddDialogOpen(false);
    } catch (error) {
      toast({ title: "Error", description: "Failed to create skill", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditSkill = async () => {
    if (!selectedSkill?.id) return;
    
    setIsLoading(true);
    try {
      setSkills(prev => prev.map(skill => 
        skill.id === selectedSkill.id ? { ...skill, ...editForm } : skill
      ));
      toast({ title: "Success", description: "Skill updated successfully" });
      setIsEditDialogOpen(false);
    } catch (error) {
      toast({ title: "Error", description: "Failed to update skill", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSkill = async () => {
    if (!selectedSkill?.id) return;
    
    setIsLoading(true);
    try {
      setSkills(prev => prev.filter(skill => skill.id !== selectedSkill.id));
      toast({ title: "Success", description: "Skill deleted successfully" });
      setIsDeleteDialogOpen(false);
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete skill", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const getLevelBadgeVariant = (level: string) => {
    switch (level) {
      case "beginner": return "default";
      case "intermediate": return "secondary";
      case "advanced": return "destructive";
      case "expert": return "outline";
      default: return "outline";
    }
  };

  const getDemandColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Skills Management</h1>
            <p className="text-muted-foreground">Manage skills database and market insights</p>
          </div>
          <Button onClick={handleAddClick} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Skill
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search skills..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Frontend Development">Frontend Development</SelectItem>
              <SelectItem value="Backend Development">Backend Development</SelectItem>
              <SelectItem value="Programming Languages">Programming Languages</SelectItem>
              <SelectItem value="Data Science">Data Science</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
            </SelectContent>
          </Select>
          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
              <SelectItem value="expert">Expert</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Skill</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Demand Score</TableHead>
                <TableHead>Growth Rate</TableHead>
                <TableHead>Avg Salary</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSkills.map((skill) => (
                <TableRow key={skill.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{skill.name}</div>
                      <div className="text-sm text-muted-foreground">{skill.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>{skill.category}</TableCell>
                  <TableCell>
                    <Badge variant={getLevelBadgeVariant(skill.level)}>
                      {skill.level}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={getDemandColor(skill.demandScore)}>
                      {skill.demandScore}/100
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-green-600">+{skill.growthRate}%</span>
                  </TableCell>
                  <TableCell>{skill.averageSalary}</TableCell>
                  <TableCell>
                    <Badge variant={skill.status === "active" ? "default" : "secondary"}>
                      {skill.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleViewClick(skill)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEditClick(skill)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteClick(skill)} className="text-destructive">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredSkills.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No skills found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Similar dialog structure as other admin pages for CRUD operations */}
    </AdminLayout>
  );
};

export default AdminSkills;
