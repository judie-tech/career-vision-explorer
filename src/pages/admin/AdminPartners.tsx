
import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Partner {
  id: number;
  name: string;
  logo: string;
  website: string;
  category: "employer" | "education" | "recruiting";
}

const AdminPartners = () => {
  const { toast } = useToast();
  const [partners, setPartners] = useState<Partner[]>([
    { 
      id: 1,
      name: "TechGiant Inc.", 
      logo: "/lovable-uploads/37656cc1-be74-4d59-8843-b6729c619a2a.png",
      website: "https://techgiant.com",
      category: "employer"
    },
    { 
      id: 2,
      name: "Global University", 
      logo: "https://images.unsplash.com/photo-1568792923760-d70635a89fdd?auto=format&fit=crop&w=100&h=100",
      website: "https://globaluniversity.edu",
      category: "education"
    },
    { 
      id: 3,
      name: "Future Staffing", 
      logo: "https://images.unsplash.com/photo-1565372195458-9de0b320ef04?auto=format&fit=crop&w=100&h=100",
      website: "https://futurestaffing.com",
      category: "recruiting"
    },
    { 
      id: 4,
      name: "InnovateHR", 
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=100&h=100",
      website: "https://innovatehr.com",
      category: "recruiting"
    },
    { 
      id: 5,
      name: "Career Academy", 
      logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=100&h=100",
      website: "https://careeracademy.edu",
      category: "education"
    },
    { 
      id: 6,
      name: "Elite Corp", 
      logo: "https://images.unsplash.com/photo-1560441347-3a9c2e1e7e5c?auto=format&fit=crop&w=100&h=100",
      website: "https://elitecorp.com",
      category: "employer"
    },
  ]);

  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    website: "",
    category: "employer" as Partner["category"]
  });

  const handleAddPartner = () => {
    setEditingPartner(null);
    setFormData({ name: "", logo: "", website: "", category: "employer" });
    setIsDialogOpen(true);
  };

  const handleEditPartner = (partner: Partner) => {
    setEditingPartner(partner);
    setFormData({
      name: partner.name,
      logo: partner.logo,
      website: partner.website,
      category: partner.category
    });
    setIsDialogOpen(true);
  };

  const handleSavePartner = () => {
    if (!formData.name || !formData.logo || !formData.website) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    if (editingPartner) {
      setPartners(prev => prev.map(p => 
        p.id === editingPartner.id 
          ? { ...p, ...formData }
          : p
      ));
      toast({
        title: "Success",
        description: "Partner updated successfully"
      });
    } else {
      const newPartner: Partner = {
        id: Math.max(...partners.map(p => p.id)) + 1,
        ...formData
      };
      setPartners(prev => [...prev, newPartner]);
      toast({
        title: "Success",
        description: "Partner added successfully"
      });
    }

    setIsDialogOpen(false);
    setFormData({ name: "", logo: "", website: "", category: "employer" });
  };

  const handleDeletePartner = (id: number) => {
    setPartners(prev => prev.filter(p => p.id !== id));
    toast({
      title: "Success",
      description: "Partner deleted successfully"
    });
  };

  const getCategoryColor = (category: Partner["category"]) => {
    switch (category) {
      case "employer": return "bg-blue-100 text-blue-800";
      case "education": return "bg-green-100 text-green-800";
      case "recruiting": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Partner Management</h1>
            <p className="text-muted-foreground">Manage partner organizations and their showcase images</p>
          </div>
          <Button onClick={handleAddPartner}>
            <Plus className="h-4 w-4 mr-2" />
            Add Partner
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner) => (
            <Card key={partner.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{partner.name}</CardTitle>
                  <Badge className={getCategoryColor(partner.category)}>
                    {partner.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center">
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} logo`}
                    className="h-20 w-20 object-contain rounded-full shadow-md"
                  />
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <ExternalLink className="h-4 w-4" />
                  <a href={partner.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Visit Website
                  </a>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEditPartner(partner)} className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeletePartner(partner.id)} className="flex-1">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingPartner ? "Edit Partner" : "Add New Partner"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Partner Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter partner name"
                />
              </div>
              <div>
                <Label htmlFor="logo">Logo URL</Label>
                <Input
                  id="logo"
                  value={formData.logo}
                  onChange={(e) => setFormData(prev => ({ ...prev, logo: e.target.value }))}
                  placeholder="Enter logo URL"
                />
              </div>
              <div>
                <Label htmlFor="website">Website URL</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                  placeholder="https://partner-website.com"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value: Partner["category"]) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employer">Employer</SelectItem>
                    <SelectItem value="education">Educational Institution</SelectItem>
                    <SelectItem value="recruiting">Recruiting Agency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {formData.logo && (
                <div className="flex justify-center">
                  <img 
                    src={formData.logo} 
                    alt="Preview"
                    className="h-20 w-20 object-contain rounded-full shadow-md"
                  />
                </div>
              )}
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleSavePartner} className="flex-1">
                  {editingPartner ? "Update" : "Add"} Partner
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminPartners;
