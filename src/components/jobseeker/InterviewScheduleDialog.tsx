
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Video, Phone, MapPin } from "lucide-react";
import { useInterviewSchedule } from "@/hooks/use-interview-schedule";

interface InterviewScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const InterviewScheduleDialog = ({ open, onOpenChange }: InterviewScheduleDialogProps) => {
  const { interviews, getUpcomingInterviews } = useInterviewSchedule();
  const upcomingInterviews = getUpcomingInterviews();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Video": return <Video className="h-4 w-4" />;
      case "Phone": return <Phone className="h-4 w-4" />;
      case "In-person": return <MapPin className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Video": return "bg-blue-100 text-blue-800";
      case "Phone": return "bg-green-100 text-green-800";
      case "In-person": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Interview Schedule</DialogTitle>
          <DialogDescription>
            Your upcoming interviews and meetings
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {upcomingInterviews.length > 0 ? (
            <>
              {upcomingInterviews.map((interview) => (
                <div key={interview.id} className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{interview.jobTitle}</h4>
                      <p className="text-sm text-muted-foreground">{interview.company}</p>
                    </div>
                    <Badge className={getTypeColor(interview.type)}>
                      {getTypeIcon(interview.type)}
                      <span className="ml-1">{interview.type}</span>
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(interview.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {interview.time}
                    </div>
                  </div>
                  
                  <p className="text-sm">
                    <span className="font-medium">Interviewer:</span> {interview.interviewerName}
                  </p>
                  
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" className="flex-1">
                      Reschedule
                    </Button>
                    <Button size="sm" className="flex-1">
                      Join Meeting
                    </Button>
                  </div>
                </div>
              ))}
              
              <div className="pt-2">
                <Button variant="ghost" className="w-full">
                  View Full Calendar
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">No upcoming interviews scheduled</p>
              <Button onClick={() => onOpenChange(false)}>
                Close
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
