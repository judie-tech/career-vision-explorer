
import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, ExternalLink, Search, Filter } from "lucide-react";
import { usePartners, Partner } from "@/hooks/use-partners";

const AdminPartners = () => {
  const { partners, addPartner, updatePartner, deletePartner, isLoading } = usePartners();
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    website: "",
    category: "employer" as Partner["category"],
    description: ""
  });

  const handleAddPartner = () => {
    setEditingPartner(null);
    setFormData({ name: "", logo: "", website: "", category: "employer", description: "" });
    setIsDialogOpen(true);
  };

  const handleEditPartner = (partner: Partner) => {
    setEditingPartner(partner);
    setFormData({
      name: partner.name,
      logo: partner.logo,
      website: partner.website,
      category: partner.category,
      description: partner.description || ""
    });
    setIsDialogOpen(true);
  };

  const handleSavePartner = () => {
    if (!formData.name || !formData.logo || !formData.website) {
      return;
    }

    if (editingPartner) {
      updatePartner(editingPartner.id, formData);
    } else {
      addPartner(formData);
    }

    setIsDialogOpen(false);
    setFormData({ name: "", logo: "", website: "", category: "employer", description: "" });
  };

  const handleDeletePartner = (id: number) => {
    if (window.confirm("Are you sure you want to delete this partner?")) {
      deletePartner(id);
    }
  };

  const getCategoryColor = (category: Partner["category"]) => {
    switch (category) {
      case "employer": return "bg-blue-100 text-blue-800";
      case "education": return "bg-green-100 text-green-800";
      case "recruiting": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || partner.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getStats = () => {
    return {
      total: partners.length,
      employers: partners.filter(p => p.category === "employer").length,
      education: partners.filter(p => p.category === "education").length,
      recruiting: partners.filter(p => p.category === "recruiting").length
    };
  };

  const stats = getStats();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Partner Management</h1>
            <p className="text-muted-foreground">Manage partner organizations and their showcase images</p>
          </div>
          <Button onClick={handleAddPartner} disabled={isLoading}>
            <Plus className="h-4 w-4 mr-2" />
            Add Partner
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Partners</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Employers</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.employers}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Education</p>
                  <p className="text-2xl font-bold text-green-600">{stats.education}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Recruiting</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.recruiting}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search partners..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="employer">Employers</SelectItem>
              <SelectItem value="education">Educational Institutions</SelectItem>
              <SelectItem value="recruiting">Recruiting Agencies</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPartners.map((partner) => (
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
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center";
                    }}
                  />
                </div>
                {partner.description && (
                  <p className="text-sm text-muted-foreground text-center line-clamp-2">
                    {partner.description}
                  </p>
                )}
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <ExternalLink className="h-4 w-4" />
                  <a href={partner.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Visit Website
                  </a>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEditPartner(partner)} className="flex-1" disabled={isLoading}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeletePartner(partner.id)} className="flex-1" disabled={isLoading}>
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPartners.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No partners found matching your criteria.</p>
          </div>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingPartner ? "Edit Partner" : "Add New Partner"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Partner Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter partner name"
                />
              </div>
              <div>
                <Label htmlFor="logo">Logo URL *</Label>
                <Input
                  id="logo"
                  value={formData.logo}
                  onChange={(e) => setFormData(prev => ({ ...prev, logo: e.target.value }))}
                  placeholder="Enter logo URL"
                />
              </div>
              <div>
                <Label htmlFor="website">Website URL *</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                  placeholder="https://partner-website.com"
                />
              </div>
              <div>
                <Label htmlFor="category">Category *</Label>
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
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of the partner"
                  rows={3}
                />
              </div>
              {formData.logo && (
                <div className="flex justify-center">
                  <img 
                    src={formData.logo} 
                    alt="Preview"
                    className="h-20 w-20 object-contain rounded-full shadow-md"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center";
                    }}
                  />
                </div>
              )}
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1" disabled={isLoading}>
                  Cancel
                </Button>
                <Button onClick={handleSavePartner} className="flex-1" disabled={isLoading || !formData.name || !formData.logo || !formData.website}>
                  {isLoading ? "Saving..." : editingPartner ? "Update" : "Add"} Partner
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
