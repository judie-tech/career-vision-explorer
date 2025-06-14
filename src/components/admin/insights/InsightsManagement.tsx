
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Plus, TrendingUp, Users, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MarketData {
  id: string;
  type: "job_openings" | "average_salary" | "remote_jobs";
  value: number;
  change: string;
  label: string;
}

interface IndustryInsight {
  id: string;
  industry: string;
  topRoles: string[];
  averageSalary: string;
  growthRate: string;
  topSkills: string[];
}

const InsightsManagement = () => {
  const { toast } = useToast();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"market" | "industry">("market");

  // Mock market data
  const [marketData, setMarketData] = useState<MarketData[]>([
    { id: "1", type: "job_openings", value: 128432, change: "+15%", label: "Job Openings" },
    { id: "2", type: "average_salary", value: 112500, change: "+5%", label: "Average Salary" },
    { id: "3", type: "remote_jobs", value: 32, change: "+8%", label: "Remote Jobs %" },
  ]);

  // Mock industry data
  const [industryData, setIndustryData] = useState<IndustryInsight[]>([
    {
      id: "1",
      industry: "Technology",
      topRoles: ["Software Engineer", "Product Manager", "Data Scientist"],
      averageSalary: "$115,000",
      growthRate: "+18%",
      topSkills: ["Programming", "System Design", "AI/ML"],
    },
    {
      id: "2",
      industry: "Finance",
      topRoles: ["Financial Analyst", "Investment Banker", "Risk Manager"],
      averageSalary: "$105,000",
      growthRate: "+8%",
      topSkills: ["Financial Modeling", "Risk Assessment", "Regulatory Compliance"],
    },
  ]);

  const handleAddMarketData = (data: Partial<MarketData>) => {
    const newItem: MarketData = {
      id: Date.now().toString(),
      type: data.type || "job_openings",
      value: data.value || 0,
      change: data.change || "0%",
      label: data.label || "",
    };
    setMarketData([...marketData, newItem]);
    toast({ title: "Market data added successfully" });
  };

  const handleEditMarketData = (id: string, data: Partial<MarketData>) => {
    setMarketData(marketData.map(item => 
      item.id === id ? { ...item, ...data } : item
    ));
    toast({ title: "Market data updated successfully" });
  };

  const handleDeleteMarketData = (id: string) => {
    setMarketData(marketData.filter(item => item.id !== id));
    toast({ title: "Market data deleted successfully" });
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Insights Management</h2>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Data
        </Button>
      </div>

      <div className="flex space-x-4">
        <Button 
          variant={activeTab === "market" ? "default" : "outline"}
          onClick={() => setActiveTab("market")}
        >
          Market Data
        </Button>
        <Button 
          variant={activeTab === "industry" ? "default" : "outline"}
          onClick={() => setActiveTab("industry")}
        >
          Industry Data
        </Button>
      </div>

      {activeTab === "market" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {marketData.map((item) => (
            <Card key={item.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{item.label}</CardTitle>
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
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatValue(item.type, item.value)}
                </div>
                <p className="text-xs text-green-600">{item.change} from last period</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "industry" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {industryData.map((item) => (
            <Card key={item.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>{item.industry}</CardTitle>
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
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium">Growth Rate: </span>
                    <Badge className="bg-green-100 text-green-800">{item.growthRate}</Badge>
                  </div>
                  <div>
                    <span className="font-medium">Avg Salary: </span>
                    {item.averageSalary}
                  </div>
                  <div>
                    <span className="font-medium">Top Skills: </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.topSkills.map((skill, idx) => (
                        <Badge key={idx} variant="outline">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AddDataDialog 
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAdd={handleAddMarketData}
        type={activeTab}
      />

      <EditDataDialog
        open={!!editingItem}
        onOpenChange={() => setEditingItem(null)}
        item={editingItem}
        onSave={handleEditMarketData}
      />
    </div>
  );
};

interface AddDataDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (data: any) => void;
  type: "market" | "industry";
}

const AddDataDialog = ({ open, onOpenChange, onAdd, type }: AddDataDialogProps) => {
  const [formData, setFormData] = useState<any>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({});
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add {type === "market" ? "Market" : "Industry"} Data</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {type === "market" ? (
            <>
              <div>
                <Label htmlFor="label">Label</Label>
                <Input
                  id="label"
                  value={formData.label || ""}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
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
                <Label htmlFor="value">Value</Label>
                <Input
                  id="value"
                  type="number"
                  value={formData.value || ""}
                  onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="change">Change %</Label>
                <Input
                  id="change"
                  value={formData.change || ""}
                  onChange={(e) => setFormData({ ...formData, change: e.target.value })}
                  placeholder="+15%"
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  value={formData.industry || ""}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="averageSalary">Average Salary</Label>
                <Input
                  id="averageSalary"
                  value={formData.averageSalary || ""}
                  onChange={(e) => setFormData({ ...formData, averageSalary: e.target.value })}
                  placeholder="$115,000"
                  required
                />
              </div>
              <div>
                <Label htmlFor="growthRate">Growth Rate</Label>
                <Input
                  id="growthRate"
                  value={formData.growthRate || ""}
                  onChange={(e) => setFormData({ ...formData, growthRate: e.target.value })}
                  placeholder="+18%"
                  required
                />
              </div>
            </>
          )}
          <div className="flex justify-end space-x-2">
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
  onSave: (id: string, data: any) => void;
}

const EditDataDialog = ({ open, onOpenChange, item, onSave }: EditDataDialogProps) => {
  const [formData, setFormData] = useState<any>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(item?.id, formData);
    onOpenChange(false);
  };

  // Update form data when item changes
  React.useEffect(() => {
    if (item) {
      setFormData(item);
    }
  }, [item]);

  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Data</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {item.type ? (
            // Market data form
            <>
              <div>
                <Label htmlFor="label">Label</Label>
                <Input
                  id="label"
                  value={formData.label || ""}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="value">Value</Label>
                <Input
                  id="value"
                  type="number"
                  value={formData.value || ""}
                  onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="change">Change %</Label>
                <Input
                  id="change"
                  value={formData.change || ""}
                  onChange={(e) => setFormData({ ...formData, change: e.target.value })}
                  required
                />
              </div>
            </>
          ) : (
            // Industry data form
            <>
              <div>
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  value={formData.industry || ""}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="averageSalary">Average Salary</Label>
                <Input
                  id="averageSalary"
                  value={formData.averageSalary || ""}
                  onChange={(e) => setFormData({ ...formData, averageSalary: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="growthRate">Growth Rate</Label>
                <Input
                  id="growthRate"
                  value={formData.growthRate || ""}
                  onChange={(e) => setFormData({ ...formData, growthRate: e.target.value })}
                  required
                />
              </div>
            </>
          )}
          <div className="flex justify-end space-x-2">
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
