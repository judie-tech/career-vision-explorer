
import React, { useState } from "react";
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
import { Eye, Edit, Trash, Calendar, List } from "lucide-react";
import { useJobPosts, JobPost } from "@/hooks/use-job-posts";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

export function JobListingsTable() {
  const { jobs, removeJob } = useJobPosts();
  const [showBoostedOnly, setShowBoostedOnly] = useState(false);
  const navigate = useNavigate();
  
  const filteredJobs = showBoostedOnly 
    ? jobs.filter(job => job.isBoosted)
    : jobs;
  
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
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowBoostedOnly(!showBoostedOnly)}
          >
            {showBoostedOnly ? "Show All" : "Show Boosted Only"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
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
                      <DropdownMenuItem>
                        <EditJobDialog job={job} />
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Listing
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
