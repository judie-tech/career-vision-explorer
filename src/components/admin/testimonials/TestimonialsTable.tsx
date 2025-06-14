
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Edit2, Trash2, Star, User, Briefcase } from "lucide-react";
import { Testimonial, TestimonialStatus } from "@/types/testimonial";

interface TestimonialsTableProps {
  testimonials: Testimonial[];
  onEdit: (testimonial: Testimonial) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TestimonialStatus) => void;
}

const TestimonialsTable = ({ testimonials, onEdit, onDelete, onStatusChange }: TestimonialsTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "job-seeker": return <User className="h-4 w-4" />;
      case "employer": return <Briefcase className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Testimonials ({testimonials.length})</CardTitle>
        <CardDescription>Manage all testimonials and reviews</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Profile</TableHead>
              <TableHead>Name & Company</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testimonials.map((testimonial) => (
              <TableRow key={testimonial.id}>
                <TableCell>
                  <img 
                    src={testimonial.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=40&h=40"} 
                    alt={`${testimonial.name} profile`}
                    className="w-10 h-10 rounded-full object-cover border border-border"
                  />
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="max-w-xs">
                  <div className="truncate">{testimonial.content}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: testimonial.rating }, (_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="ml-1 text-sm">{testimonial.rating}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(testimonial.category)}
                    <span className="capitalize">{testimonial.category.replace('-', ' ')}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(testimonial.status)}>
                    {testimonial.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {testimonial.createdAt}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {testimonial.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onStatusChange(testimonial.id, "approved")}
                          className="text-green-600 hover:text-green-700"
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onStatusChange(testimonial.id, "rejected")}
                          className="text-red-600 hover:text-red-700"
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit(testimonial)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Testimonial</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this testimonial? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => onDelete(testimonial.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TestimonialsTable;
