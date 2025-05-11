
import { useState } from "react";
import { AdminButton } from "@/components/ui/custom-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AdminLayout from "@/components/admin/AdminLayout";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, Edit, Trash, Eye } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  postedDate: string;
  status: "active" | "draft" | "expired";
  applications: number;
  description?: string;
};

const AdminJobs = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const [jobs, setJobs] = useState<Job[]>([
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      postedDate: "2023-05-12",
      status: "active",
      applications: 24,
      description: "We are looking for a Senior Frontend Developer with React experience to join our team. You'll be working on our flagship product and collaborating with designers and backend engineers."
    },
    {
      id: 2,
      title: "Product Manager",
      company: "InnovateSoft",
      location: "New York, NY",
      postedDate: "2023-05-10",
      status: "active",
      applications: 18,
      description: "InnovateSoft is seeking a Product Manager to lead our product development initiatives. The ideal candidate has 5+ years of experience in SaaS products."
    },
    {
      id: 3,
      title: "Data Scientist",
      company: "DataViz Analytics",
      location: "Remote",
      postedDate: "2023-05-08",
      status: "draft",
      applications: 0,
      description: "Join our data science team to work on cutting-edge machine learning models. We're looking for someone with a strong background in statistics and Python programming."
    },
    {
      id: 4,
      title: "UX Designer",
      company: "CreativeMinds",
      location: "Chicago, IL",
      postedDate: "2023-04-15",
      status: "expired",
      applications: 32,
      description: "As a UX Designer at CreativeMinds, you'll be responsible for creating intuitive and engaging user experiences for our clients across various industries."
    },
  ]);

  const [jobForm, setJobForm] = useState<Job>({
    id: 0,
    title: "",
    company: "",
    location: "",
    postedDate: new Date().toISOString().split('T')[0],
    status: "draft",
    applications: 0,
    description: ""
  });

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleViewClick = (job: Job) => {
    setSelectedJob(job);
    setIsViewDialogOpen(true);
  };

  const handleEditClick = (job: Job) => {
    setSelectedJob(job);
    setJobForm({...job});
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (job: Job) => {
    setSelectedJob(job);
    setIsDeleteDialogOpen(true);
  };

  const handleAddClick = () => {
    setJobForm({
      id: jobs.length > 0 ? Math.max(...jobs.map(j => j.id)) + 1 : 1,
      title: "",
      company: "",
      location: "",
      postedDate: new Date().toISOString().split('T')[0],
      status: "draft",
      applications: 0,
      description: ""
    });
    setIsAddDialogOpen(true);
  };

  const handleAddJob = () => {
    if (!jobForm.title || !jobForm.company || !jobForm.location) {
      toast({
        title: "Error",
        description: "Title, company and location are required",
        variant: "destructive",
      });
      return;
    }
    
    setJobs([...jobs, jobForm]);
    setIsAddDialogOpen(false);
    
    toast({
      title: "Job Added",
      description: `${jobForm.title} at ${jobForm.company} has been added successfully`,
    });
  };

  const handleEditJob = () => {
    if (!selectedJob) return;
    
    setJobs(jobs.map(job => job.id === selectedJob.id ? jobForm : job));
    setIsEditDialogOpen(false);
    
    toast({
      title: "Job Updated",
      description: `${jobForm.title} has been updated successfully`,
    });
  };

  const handleDeleteJob = () => {
    if (!selectedJob) return;
    
    setJobs(jobs.filter(job => job.id !== selectedJob.id));
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Job Deleted",
      description: `${selectedJob.title} at ${selectedJob.company} has been removed`,
    });
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Jobs Management</h1>
          <AdminButton 
            variant="primary"
            icon={<Plus className="h-4 w-4" />}
            onClick={handleAddClick}
          >
            Add Job
          </AdminButton>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="text"
                  placeholder="Search jobs..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Posted Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Applications</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.title}</TableCell>
                    <TableCell>{job.company}</TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell>{job.postedDate}</TableCell>
                    <TableCell>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(job.status)}`}>
                        {job.status}
                      </span>
                    </TableCell>
                    <TableCell>{job.applications}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800" onClick={() => handleViewClick(job)}>
                        <Eye size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800" onClick={() => handleEditClick(job)}>
                        <Edit size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800" onClick={() => handleDeleteClick(job)}>
                        <Trash size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredJobs.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No jobs found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* View Job Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedJob?.title}</DialogTitle>
            <DialogDescription>
              {selectedJob?.company} · {selectedJob?.location}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Posted: {selectedJob?.postedDate}</span>
              <span className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${selectedJob ? getStatusColor(selectedJob.status) : ''}`}>
                {selectedJob?.status}
              </span>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Applications</h3>
              <p>{selectedJob?.applications}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Description</h3>
              <p className="text-sm whitespace-pre-line">{selectedJob?.description}</p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Job Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Job</DialogTitle>
            <DialogDescription>
              Create a new job posting
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="title" className="text-right">Title</label>
              <Input
                id="title"
                value={jobForm.title}
                onChange={(e) => setJobForm({...jobForm, title: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="company" className="text-right">Company</label>
              <Input
                id="company"
                value={jobForm.company}
                onChange={(e) => setJobForm({...jobForm, company: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="location" className="text-right">Location</label>
              <Input
                id="location"
                value={jobForm.location}
                onChange={(e) => setJobForm({...jobForm, location: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="status" className="text-right">Status</label>
              <select
                id="status"
                value={jobForm.status}
                onChange={(e) => setJobForm({...jobForm, status: e.target.value as "active" | "draft" | "expired"})}
                className="col-span-3 border rounded p-2"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <label htmlFor="description" className="text-right">Description</label>
              <Textarea
                id="description"
                value={jobForm.description}
                onChange={(e) => setJobForm({...jobForm, description: e.target.value})}
                rows={6}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddJob}>Create Job</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Job Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Job</DialogTitle>
            <DialogDescription>
              Make changes to the job posting
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-title" className="text-right">Title</label>
              <Input
                id="edit-title"
                value={jobForm.title}
                onChange={(e) => setJobForm({...jobForm, title: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-company" className="text-right">Company</label>
              <Input
                id="edit-company"
                value={jobForm.company}
                onChange={(e) => setJobForm({...jobForm, company: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-location" className="text-right">Location</label>
              <Input
                id="edit-location"
                value={jobForm.location}
                onChange={(e) => setJobForm({...jobForm, location: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-status" className="text-right">Status</label>
              <select
                id="edit-status"
                value={jobForm.status}
                onChange={(e) => setJobForm({...jobForm, status: e.target.value as "active" | "draft" | "expired"})}
                className="col-span-3 border rounded p-2"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-applications" className="text-right">Applications</label>
              <Input
                id="edit-applications"
                type="number"
                value={jobForm.applications.toString()}
                onChange={(e) => setJobForm({...jobForm, applications: parseInt(e.target.value) || 0})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <label htmlFor="edit-description" className="text-right">Description</label>
              <Textarea
                id="edit-description"
                value={jobForm.description}
                onChange={(e) => setJobForm({...jobForm, description: e.target.value})}
                rows={6}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditJob}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedJob?.title} at {selectedJob?.company}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteJob}>Delete Job</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminJobs;
