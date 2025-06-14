
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Plus, TrendingUp, Users, DollarSign, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface MarketData {
  id: string;
  type: "job_openings" | "average_salary" | "remote_jobs";
  value: number;
  change: string;
  label: string;
  description?: string;
}

interface IndustryInsight {
  id: string;
  industry: string;
  topRoles: string[];
  averageSalary: string;
  growthRate: string;
  topSkills: string[];
  description?: string;
}

const InsightsManagement = () => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"market" | "industry">("market");

  // Enhanced market data with more realistic values
  const [marketData, setMarketData] = useState<MarketData[]>([
    { 
      id: "1", 
      type: "job_openings", 
      value: 128432, 
      change: "+15%", 
      label: "Active Job Openings",
      description: "Total number of active job postings across all industries"
    },
    { 
      id: "2", 
      type: "average_salary", 
      value: 112500, 
      change: "+5%", 
      label: "Average Annual Salary",
      description: "Mean salary across all technology positions"
    },
    { 
      id: "3", 
      type: "remote_jobs", 
      value: 68, 
      change: "+12%", 
      label: "Remote Opportunities",
      description: "Percentage of jobs offering remote work options"
    },
  ]);

  // Enhanced industry data
  const [industryData, setIndustryData] = useState<IndustryInsight[]>([
    {
      id: "1",
      industry: "Technology & Software",
      topRoles: ["Software Engineer", "Product Manager", "Data Scientist", "DevOps Engineer"],
      averageSalary: "$125,000",
      growthRate: "+18%",
      topSkills: ["JavaScript", "Python", "React", "AWS", "Machine Learning"],
      description: "Leading sector in digital transformation and innovation"
    },
    {
      id: "2",
      industry: "Finance & Banking",
      topRoles: ["Financial Analyst", "Investment Banker", "Risk Manager", "Fintech Developer"],
      averageSalary: "$105,000",
      growthRate: "+8%",
      topSkills: ["Financial Modeling", "Risk Assessment", "SQL", "Python", "Regulatory Compliance"],
      description: "Traditional finance embracing digital transformation"
    },
    {
      id: "3",
      industry: "Healthcare & Biotech",
      topRoles: ["Data Analyst", "Healthcare IT", "Biotech Researcher", "Medical Device Engineer"],
      averageSalary: "$98,000",
      growthRate: "+22%",
      topSkills: ["Healthcare Analytics", "Regulatory Affairs", "Clinical Research", "Medical Devices"],
      description: "Rapidly growing sector with increasing digitalization"
    },
  ]);

  const validateMarketData = (data: Partial<MarketData>): string | null => {
    if (!data.label?.trim()) return "Label is required";
    if (!data.type) return "Type is required";
    if (data.value === undefined || data.value < 0) return "Value must be a positive number";
    if (!data.change?.trim()) return "Change percentage is required";
    return null;
  };

  const validateIndustryData = (data: Partial<IndustryInsight>): string | null => {
    if (!data.industry?.trim()) return "Industry name is required";
    if (!data.averageSalary?.trim()) return "Average salary is required";
    if (!data.growthRate?.trim()) return "Growth rate is required";
    return null;
  };

  const handleAddMarketData = (data: Partial<MarketData>) => {
    const validation = validateMarketData(data);
    if (validation) {
      toast.error(validation);
      return;
    }

    const newItem: MarketData = {
      id: Date.now().toString(),
      type: data.type || "job_openings",
      value: data.value || 0,
      change: data.change || "0%",
      label: data.label || "",
      description: data.description || "",
    };
    setMarketData([...marketData, newItem]);
    toast.success(`Market data "${newItem.label}" added successfully`);
    setShowAddDialog(false);
  };

  const handleAddIndustryData = (data: Partial<IndustryInsight>) => {
    const validation = validateIndustryData(data);
    if (validation) {
      toast.error(validation);
      return;
    }

    const newItem: IndustryInsight = {
      id: Date.now().toString(),
      industry: data.industry || "",
      topRoles: data.topRoles || [],
      averageSalary: data.averageSalary || "",
      growthRate: data.growthRate || "",
      topSkills: data.topSkills || [],
      description: data.description || "",
    };
    setIndustryData([...industryData, newItem]);
    toast.success(`Industry data "${newItem.industry}" added successfully`);
    setShowAddDialog(false);
  };

  const handleEditMarketData = (id: string, data: Partial<MarketData>) => {
    const validation = validateMarketData(data);
    if (validation) {
      toast.error(validation);
      return;
    }

    setMarketData(marketData.map(item => 
      item.id === id ? { ...item, ...data } : item
    ));
    toast.success("Market data updated successfully");
    setEditingItem(null);
  };

  const handleEditIndustryData = (id: string, data: Partial<IndustryInsight>) => {
    const validation = validateIndustryData(data);
    if (validation) {
      toast.error(validation);
      return;
    }

    setIndustryData(industryData.map(item => 
      item.id === id ? { ...item, ...data } : item
    ));
    toast.success("Industry data updated successfully");
    setEditingItem(null);
  };

  const handleDeleteMarketData = (id: string) => {
    const item = marketData.find(item => item.id === id);
    if (item) {
      setMarketData(marketData.filter(item => item.id !== id));
      toast.success(`"${item.label}" deleted successfully`);
    }
  };

  const handleDeleteIndustryData = (id: string) => {
    const item = industryData.find(item => item.id === id);
    if (item) {
      setIndustryData(industryData.filter(item => item.id !== id));
      toast.success(`"${item.industry}" deleted successfully`);
    }
  };

  const formatValue = (type: string, value: number) => {
    switch (type) {
      case "average_salary":
        return `$${value.toLocaleString()}`;
      case "remote_jobs":
        return `${value}%`;
      default:
        return value.toLocaleString();
    }
  };

  const getChangeColor = (change: string) => {
    if (change.startsWith('+')) return 'text-green-600';
    if (change.startsWith('-')) return 'text-red-600';
    return 'text-gray-600';
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "average_salary":
        return <DollarSign className="h-4 w-4" />;
      case "remote_jobs":
        return <Users className="h-4 w-4" />;
      default:
        return <TrendingUp className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Insights Management</h2>
          <p className="text-muted-foreground">
            Manage market data and industry insights displayed on the public insights page
          </p>
        </div>
        <Button onClick={() => setShowAddDialog(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add {activeTab === "market" ? "Market Data" : "Industry Data"}
        </Button>
      </div>

      <div className="flex space-x-4">
        <Button 
          variant={activeTab === "market" ? "default" : "outline"}
          onClick={() => setActiveTab("market")}
          className="flex items-center gap-2"
        >
          <TrendingUp className="h-4 w-4" />
          Market Data ({marketData.length})
        </Button>
        <Button 
          variant={activeTab === "industry" ? "default" : "outline"}
          onClick={() => setActiveTab("industry")}
          className="flex items-center gap-2"
        >
          <Users className="h-4 w-4" />
          Industry Data ({industryData.length})
        </Button>
      </div>

      {activeTab === "market" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketData.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  {getIcon(item.type)}
                  {item.label}
                </CardTitle>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingItem(item)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteMarketData(item.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatValue(item.type, item.value)}
                </div>
                <p className={`text-xs ${getChangeColor(item.change)}`}>
                  {item.change} from last period
                </p>
                {item.description && (
                  <p className="text-xs text-muted-foreground mt-2">
                    {item.description}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "industry" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {industryData.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {item.industry}
                </CardTitle>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingItem(item)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteIndustryData(item.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Growth Rate:</span>
                    <Badge className={`${item.growthRate.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {item.growthRate}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Avg Salary:</span>
                    <span className="font-semibold">{item.averageSalary}</span>
                  </div>
                  <div>
                    <span className="font-medium">Top Roles:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.topRoles.slice(0, 3).map((role, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {role}
                        </Badge>
                      ))}
                      {item.topRoles.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{item.topRoles.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium">Top Skills:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.topSkills.slice(0, 3).map((skill, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {item.topSkills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{item.topSkills.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  {item.description && (
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AddDataDialog 
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAddMarket={handleAddMarketData}
        onAddIndustry={handleAddIndustryData}
        type={activeTab}
      />

      <EditDataDialog
        open={!!editingItem}
        onOpenChange={() => setEditingItem(null)}
        item={editingItem}
        onSaveMarket={handleEditMarketData}
        onSaveIndustry={handleEditIndustryData}
      />
    </div>
  );
};

interface AddDataDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddMarket: (data: any) => void;
  onAddIndustry: (data: any) => void;
  type: "market" | "industry";
}

const AddDataDialog = ({ open, onOpenChange, onAddMarket, onAddIndustry, type }: AddDataDialogProps) => {
  const [formData, setFormData] = useState<any>({});
  const [newRole, setNewRole] = useState("");
  const [newSkill, setNewSkill] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === "market") {
      onAddMarket(formData);
    } else {
      onAddIndustry(formData);
    }
    setFormData({});
    setNewRole("");
    setNewSkill("");
  };

  const addRole = () => {
    if (newRole.trim() && !formData.topRoles?.includes(newRole.trim())) {
      setFormData({
        ...formData,
        topRoles: [...(formData.topRoles || []), newRole.trim()]
      });
      setNewRole("");
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.topSkills?.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        topSkills: [...(formData.topSkills || []), newSkill.trim()]
      });
      setNewSkill("");
    }
  };

  const removeRole = (role: string) => {
    setFormData({
      ...formData,
      topRoles: formData.topRoles?.filter((r: string) => r !== role) || []
    });
  };

  const removeSkill = (skill: string) => {
    setFormData({
      ...formData,
      topSkills: formData.topSkills?.filter((s: string) => s !== skill) || []
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Add {type === "market" ? "Market" : "Industry"} Data
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {type === "market" ? (
            <>
              <div>
                <Label htmlFor="label">Label *</Label>
                <Input
                  id="label"
                  value={formData.label || ""}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  placeholder="e.g., Active Job Openings"
                  required
                />
              </div>
              <div>
                <Label htmlFor="type">Type *</Label>
                <Select
                  value={formData.type || ""}
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="job_openings">Job Openings</SelectItem>
                    <SelectItem value="average_salary">Average Salary</SelectItem>
                    <SelectItem value="remote_jobs">Remote Jobs %</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="value">Value *</Label>
                <Input
                  id="value"
                  type="number"
                  value={formData.value || ""}
                  onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                  placeholder="e.g., 128432"
                  required
                  min="0"
                />
              </div>
              <div>
                <Label htmlFor="change">Change % *</Label>
                <Input
                  id="change"
                  value={formData.change || ""}
                  onChange={(e) => setFormData({ ...formData, change: e.target.value })}
                  placeholder="e.g., +15%"
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Optional description"
                  rows={2}
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <Label htmlFor="industry">Industry Name *</Label>
                <Input
                  id="industry"
                  value={formData.industry || ""}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  placeholder="e.g., Technology & Software"
                  required
                />
              </div>
              <div>
                <Label htmlFor="averageSalary">Average Salary *</Label>
                <Input
                  id="averageSalary"
                  value={formData.averageSalary || ""}
                  onChange={(e) => setFormData({ ...formData, averageSalary: e.target.value })}
                  placeholder="e.g., $115,000"
                  required
                />
              </div>
              <div>
                <Label htmlFor="growthRate">Growth Rate *</Label>
                <Input
                  id="growthRate"
                  value={formData.growthRate || ""}
                  onChange={(e) => setFormData({ ...formData, growthRate: e.target.value })}
                  placeholder="e.g., +18%"
                  required
                />
              </div>
              <div>
                <Label>Top Roles</Label>
                <div className="flex space-x-2">
                  <Input
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    placeholder="Add a role"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRole())}
                  />
                  <Button type="button" onClick={addRole} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.topRoles?.map((role: string, idx: number) => (
                    <Badge key={idx} variant="secondary" className="flex items-center gap-1">
                      {role}
                      <button type="button" onClick={() => removeRole(role)}>×</button>
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <Label>Top Skills</Label>
                <div className="flex space-x-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  />
                  <Button type="button" onClick={addSkill} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.topSkills?.map((skill: string, idx: number) => (
                    <Badge key={idx} variant="outline" className="flex items-center gap-1">
                      {skill}
                      <button type="button" onClick={() => removeSkill(skill)}>×</button>
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Optional description"
                  rows={2}
                />
              </div>
            </>
          )}
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Data</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

interface EditDataDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: any;
  onSaveMarket: (id: string, data: any) => void;
  onSaveIndustry: (id: string, data: any) => void;
}

const EditDataDialog = ({ open, onOpenChange, item, onSaveMarket, onSaveIndustry }: EditDataDialogProps) => {
  const [formData, setFormData] = useState<any>({});
  const [newRole, setNewRole] = useState("");
  const [newSkill, setNewSkill] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (item?.type) {
      onSaveMarket(item.id, formData);
    } else {
      onSaveIndustry(item.id, formData);
    }
  };

  React.useEffect(() => {
    if (item) {
      setFormData(item);
    }
  }, [item]);

  if (!item) return null;

  const addRole = () => {
    if (newRole.trim() && !formData.topRoles?.includes(newRole.trim())) {
      setFormData({
        ...formData,
        topRoles: [...(formData.topRoles || []), newRole.trim()]
      });
      setNewRole("");
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.topSkills?.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        topSkills: [...(formData.topSkills || []), newSkill.trim()]
      });
      setNewSkill("");
    }
  };

  const removeRole = (role: string) => {
    setFormData({
      ...formData,
      topRoles: formData.topRoles?.filter((r: string) => r !== role) || []
    });
  };

  const removeSkill = (skill: string) => {
    setFormData({
      ...formData,
      topSkills: formData.topSkills?.filter((s: string) => s !== skill) || []
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Data</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {item.type ? (
            // Market data form
            <>
              <div>
                <Label htmlFor="label">Label *</Label>
                <Input
                  id="label"
                  value={formData.label || ""}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="value">Value *</Label>
                <Input
                  id="value"
                  type="number"
                  value={formData.value || ""}
                  onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                  required
                  min="0"
                />
              </div>
              <div>
                <Label htmlFor="change">Change % *</Label>
                <Input
                  id="change"
                  value={formData.change || ""}
                  onChange={(e) => setFormData({ ...formData, change: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                />
              </div>
            </>
          ) : (
            // Industry data form
            <>
              <div>
                <Label htmlFor="industry">Industry Name *</Label>
                <Input
                  id="industry"
                  value={formData.industry || ""}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="averageSalary">Average Salary *</Label>
                <Input
                  id="averageSalary"
                  value={formData.averageSalary || ""}
                  onChange={(e) => setFormData({ ...formData, averageSalary: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="growthRate">Growth Rate *</Label>
                <Input
                  id="growthRate"
                  value={formData.growthRate || ""}
                  onChange={(e) => setFormData({ ...formData, growthRate: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Top Roles</Label>
                <div className="flex space-x-2">
                  <Input
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    placeholder="Add a role"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRole())}
                  />
                  <Button type="button" onClick={addRole} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.topRoles?.map((role: string, idx: number) => (
                    <Badge key={idx} variant="secondary" className="flex items-center gap-1">
                      {role}
                      <button type="button" onClick={() => removeRole(role)}>×</button>
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <Label>Top Skills</Label>
                <div className="flex space-x-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  />
                  <Button type="button" onClick={addSkill} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.topSkills?.map((skill: string, idx: number) => (
                    <Badge key={idx} variant="outline" className="flex items-center gap-1">
                      {skill}
                      <button type="button" onClick={() => removeSkill(skill)}>×</button>
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                />
              </div>
            </>
          )}
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InsightsManagement;
