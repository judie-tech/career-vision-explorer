
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";

interface Interview {
  id: string;
  jobTitle: string;
  company: string;
  date: string;
  time: string;
  type: string;
}

interface UpcomingInterviewsCardProps {
  interviews: Interview[];
  onShowInterviewDialog: () => void;
}

const UpcomingInterviewsCard = ({ interviews, onShowInterviewDialog }: UpcomingInterviewsCardProps) => {
  if (interviews.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Upcoming Interviews</CardTitle>
        <CardDescription>Your scheduled interviews</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {interviews.slice(0, 3).map((interview) => (
            <div key={interview.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-medium">{interview.jobTitle}</h4>
                <p className="text-sm text-gray-500">{interview.company}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(interview.date).toLocaleDateString()}
                  <Clock className="h-3 w-3 ml-2" />
                  {interview.time}
                </div>
              </div>
              <Badge variant="outline">
                {interview.type}
              </Badge>
            </div>
          ))}
          <Button 
            variant="ghost" 
            className="w-full"
            onClick={onShowInterviewDialog}
          >
            View All Interviews
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingInterviewsCard;
