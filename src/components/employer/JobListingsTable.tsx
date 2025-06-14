
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EditJobDialog } from "./EditJobDialog";
import { deleteJobDialog } from "@/lib/utils";
import { Eye, Edit, Trash, List } from "lucide-react";
import { useJobPosts, JobPost } from "@/hooks/use-job-posts";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

export function JobListingsTable() {
  const { filteredJobs, removeJob } = useJobPosts();
  const navigate = useNavigate();
  
  const handleViewApplicants = (jobId: string) => {
    navigate(`/employer/jobs/${jobId}/applicants`);
  };
  
  const handleDelete = (job: JobPost) => {
    deleteJobDialog({
      title: `Delete ${job.title}?`,
      description: "This will permanently delete this job listing and cannot be undone.",
      onConfirm: () => removeJob(job.id),
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Active Job Listings</CardTitle>
          <CardDescription>
            Manage your current job postings and view their performance
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {filteredJobs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No job listings match your current filters
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Title</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Posted</TableHead>
                <TableHead>Applicants</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>
                    <div className="font-medium">{job.title}</div>
                    <div className="text-sm text-muted-foreground">{job.type}</div>
                  </TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>
                    {formatDistanceToNow(new Date(job.datePosted), { addSuffix: true })}
                  </TableCell>
                  <TableCell>{job.applicants}</TableCell>
                  <TableCell>{job.views}</TableCell>
                  <TableCell>
                    {job.isBoosted && (
                      <Badge className="bg-green-100 text-green-800">Boosted</Badge>
                    )}
                    {!job.isBoosted && (
                      <Badge variant="outline">Standard</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <EditJobDialog job={job} />
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <List className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleViewApplicants(job.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Applicants
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDelete(job)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
