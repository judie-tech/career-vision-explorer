
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AdminLayout from "@/components/admin/AdminLayout";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, Edit, Trash, Eye, Filter } from "lucide-react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useAdminJobs, AdminJob } from "@/hooks/use-admin-jobs";
import { JobFormDialog } from "@/components/admin/JobFormDialog";

const AdminJobs = () => {
  const { toast } = useToast();
  const { 
    filteredJobs, 
    searchQuery, 
    statusFilter, 
    setSearchQuery, 
    setStatusFilter, 
    deleteJob 
  } = useAdminJobs();

  const [selectedJob, setSelectedJob] = useState<AdminJob | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isJobFormOpen, setIsJobFormOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "draft":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "expired":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleViewJob = (job: AdminJob) => {
    setSelectedJob(job);
    setIsViewDialogOpen(true);
  };

  const handleEditJob = (job: AdminJob) => {
    setSelectedJob(job);
    setFormMode("edit");
    setIsJobFormOpen(true);
  };

  const handleDeleteJob = (job: AdminJob) => {
    setSelectedJob(job);
    setIsDeleteDialogOpen(true);
  };

  const handleCreateJob = () => {
    setSelectedJob(null);
    setFormMode("create");
    setIsJobFormOpen(true);
  };

  const confirmDelete = () => {
    if (selectedJob) {
      deleteJob(selectedJob.id);
      setIsDeleteDialogOpen(false);
      setSelectedJob(null);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Jobs Management</h1>
            <p className="text-gray-600 mt-1">
              Manage job postings across the platform
            </p>
          </div>
          <Button onClick={handleCreateJob} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Job
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search jobs by title, company, or location..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Status: {statusFilter === "all" ? "All" : statusFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                All Status
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("active")}>
                Active
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("draft")}>
                Draft
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("expired")}>
                Expired
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="text-2xl font-bold text-green-600">
              {filteredJobs.filter(job => job.status === "active").length}
            </div>
            <div className="text-sm text-gray-600">Active Jobs</div>
          </div>
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="text-2xl font-bold text-yellow-600">
              {filteredJobs.filter(job => job.status === "draft").length}
            </div>
            <div className="text-sm text-gray-600">Draft Jobs</div>
          </div>
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="text-2xl font-bold text-red-600">
              {filteredJobs.filter(job => job.status === "expired").length}
            </div>
            <div className="text-sm text-gray-600">Expired Jobs</div>
          </div>
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="text-2xl font-bold text-blue-600">
              {filteredJobs.reduce((sum, job) => sum + job.applications, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Applications</div>
          </div>
        </div>

        {/* Jobs Table */}
        <div className="bg-white shadow-sm rounded-lg border overflow-hidden">
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
                <TableRow key={job.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{job.title}</div>
                      <div className="text-sm text-gray-500">{job.type}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{job.company}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>{job.postedDate}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(job.status)} variant="outline">
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{job.applications}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleViewJob(job)}
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEditJob(job)}
                        className="text-green-600 hover:text-green-800 hover:bg-green-50"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteJob(job)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredJobs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    {searchQuery || statusFilter !== "all" 
                      ? "No jobs match your current filters" 
                      : "No jobs found"
                    }
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Job Form Dialog */}
      <JobFormDialog
        open={isJobFormOpen}
        onOpenChange={setIsJobFormOpen}
        job={selectedJob || undefined}
        mode={formMode}
      />

      {/* View Job Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedJob?.title}</DialogTitle>
            <DialogDescription>
              {selectedJob?.company} • {selectedJob?.location}
            </DialogDescription>
          </DialogHeader>
          
          {selectedJob && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-900">Department</h3>
                  <p className="text-gray-600">{selectedJob.department}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Job Type</h3>
                  <p className="text-gray-600 capitalize">{selectedJob.type}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Experience</h3>
                  <p className="text-gray-600">{selectedJob.experience}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Salary</h3>
                  <p className="text-gray-600">{selectedJob.salary}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Posted Date</h3>
                  <p className="text-gray-600">{selectedJob.postedDate}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Applications</h3>
                  <p className="text-gray-600">{selectedJob.applications}</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 whitespace-pre-line">{selectedJob.description}</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">Requirements</h3>
                <ul className="list-disc list-inside space-y-1">
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index} className="text-gray-600">{req}</li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900">Status:</span>
                <Badge className={getStatusColor(selectedJob.status)} variant="outline">
                  {selectedJob.status}
                </Badge>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={() => {
              setIsViewDialogOpen(false);
              handleEditJob(selectedJob!);
            }}>
              Edit Job
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
              Are you sure you want to delete "{selectedJob?.title}" at {selectedJob?.company}? 
              This action cannot be undone and will remove all associated applications.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete Job
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminJobs;
