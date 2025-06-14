
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AdminLayout from "@/components/admin/AdminLayout";
import { useJobs, Job } from "@/hooks/use-jobs";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, Edit, Trash, Eye, Play, Pause, X } from "lucide-react";
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

const AdminJobs = () => {
  const { toast } = useToast();
  const { jobs, createJob, updateJob, deleteJob, isLoading } = useJobs();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const [editForm, setEditForm] = useState<Partial<Job>>({
    title: "",
    company: "",
    location: "",
    type: "full-time",
    salary: "",
    description: "",
    requirements: [],
    benefits: [],
    status: "active",
    employerId: "2",
  });

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    const matchesType = typeFilter === "all" || job.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleEditClick = (job: Job) => {
    setSelectedJob(job);
    setEditForm({ ...job });
    setIsEditDialogOpen(true);
  };

  const handleViewClick = (job: Job) => {
    setSelectedJob(job);
    setIsViewDialogOpen(true);
  };

  const handleDeleteClick = (job: Job) => {
    setSelectedJob(job);
    setIsDeleteDialogOpen(true);
  };

  const handleAddClick = () => {
    setEditForm({
      title: "",
      company: "",
      location: "",
      type: "full-time",
      salary: "",
      description: "",
      requirements: [],
      benefits: [],
      status: "active",
      employerId: "2",
    });
    setIsAddDialogOpen(true);
  };

  const handleAddJob = async () => {
    if (!editForm.title || !editForm.company || !editForm.location || !editForm.description) {
      toast({
        title: "Error",
        description: "Required fields are missing",
        variant: "destructive",
      });
      return;
    }
    
    const success = await createJob(editForm as Omit<Job, 'id' | 'postedDate' | 'applicants' | 'views'>);
    if (success) {
      setIsAddDialogOpen(false);
    }
  };

  const handleEditJob = async () => {
    if (!selectedJob?.id) return;
    
    const success = await updateJob(selectedJob.id, editForm);
    if (success) {
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteJob = async () => {
    if (!selectedJob?.id) return;
    
    const success = await deleteJob(selectedJob.id);
    if (success) {
      setIsDeleteDialogOpen(false);
    }
  };

  const handleToggleStatus = async (job: Job) => {
    const newStatus = job.status === "active" ? "paused" : "active";
    await updateJob(job.id, { status: newStatus });
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active": return "default";
      case "paused": return "secondary";
      case "closed": return "destructive";
      default: return "outline";
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case "full-time": return "default";
      case "part-time": return "secondary";
      case "contract": return "outline";
      case "remote": return "default";
      default: return "outline";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Job Management</h1>
            <p className="text-muted-foreground">Manage job postings and applications</p>
          </div>
          <Button onClick={handleAddClick} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Job
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search jobs by title, company, or location..."
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
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Applications</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Posted Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{job.title}</div>
                      <div className="text-sm text-muted-foreground">{job.company} • {job.location}</div>
                      <div className="text-sm text-muted-foreground">{job.salary}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getTypeBadgeVariant(job.type)}>
                      {job.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(job.status)}>
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{job.applicants}</TableCell>
                  <TableCell>{job.views}</TableCell>
                  <TableCell>{job.postedDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleViewClick(job)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEditClick(job)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleToggleStatus(job)}
                        className={job.status === "active" ? "text-orange-600" : "text-green-600"}
                      >
                        {job.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteClick(job)} className="text-destructive">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredJobs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No jobs found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* View Job Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Job Details</DialogTitle>
          </DialogHeader>
          {selectedJob && (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <p className="text-sm text-muted-foreground">{selectedJob.title}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Company</label>
                  <p className="text-sm text-muted-foreground">{selectedJob.company}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <p className="text-sm text-muted-foreground">{selectedJob.location}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Type</label>
                  <p className="text-sm text-muted-foreground">{selectedJob.type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Salary</label>
                  <p className="text-sm text-muted-foreground">{selectedJob.salary}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <p className="text-sm text-muted-foreground">{selectedJob.status}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <p className="text-sm text-muted-foreground mt-1">{selectedJob.description}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Requirements</label>
                <ul className="text-sm text-muted-foreground mt-1 list-disc list-inside">
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
              <div>
                <label className="text-sm font-medium">Benefits</label>
                <ul className="text-sm text-muted-foreground mt-1 list-disc list-inside">
                  {selectedJob.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add/Edit Job Dialog */}
      <Dialog open={isAddDialogOpen || isEditDialogOpen} onOpenChange={(open) => {
        setIsAddDialogOpen(false);
        setIsEditDialogOpen(false);
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isAddDialogOpen ? "Add New Job" : "Edit Job"}</DialogTitle>
            <DialogDescription>
              {isAddDialogOpen ? "Create a new job posting" : "Update job information"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={editForm.title || ""}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  placeholder="Job title"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Company</label>
                <Input
                  value={editForm.company || ""}
                  onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                  placeholder="Company name"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Location</label>
                <Input
                  value={editForm.location || ""}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  placeholder="Job location"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Type</label>
                <Select value={editForm.type} onValueChange={(value) => setEditForm({ ...editForm, type: value as Job['type'] })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Salary</label>
                <Input
                  value={editForm.salary || ""}
                  onChange={(e) => setEditForm({ ...editForm, salary: e.target.value })}
                  placeholder="Salary range"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Status</label>
                <Select value={editForm.status} onValueChange={(value) => setEditForm({ ...editForm, status: value as Job['status'] })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={editForm.description || ""}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                placeholder="Job description"
                rows={4}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Requirements (one per line)</label>
              <Textarea
                value={editForm.requirements?.join('\n') || ""}
                onChange={(e) => setEditForm({ ...editForm, requirements: e.target.value.split('\n').filter(r => r.trim()) })}
                placeholder="Enter requirements, one per line"
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Benefits (one per line)</label>
              <Textarea
                value={editForm.benefits?.join('\n') || ""}
                onChange={(e) => setEditForm({ ...editForm, benefits: e.target.value.split('\n').filter(b => b.trim()) })}
                placeholder="Enter benefits, one per line"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsAddDialogOpen(false);
              setIsEditDialogOpen(false);
            }}>
              Cancel
            </Button>
            <Button 
              onClick={isAddDialogOpen ? handleAddJob : handleEditJob}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : (isAddDialogOpen ? "Create Job" : "Save Changes")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the job "{selectedJob?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteJob}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete Job"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminJobs;
