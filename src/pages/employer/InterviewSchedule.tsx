
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/admin/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, ArrowLeft, Clock, User, Mail, MapPin, Video, Phone, Users, Briefcase } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useInterviews } from "@/hooks/use-interviews";
import { useApplicants } from "@/hooks/use-applicants";
import { useJobPosts } from "@/hooks/use-job-posts";
import { toast } from "sonner";

const InterviewSchedule = () => {
  const navigate = useNavigate();
  const { scheduleInterview } = useInterviews();
  const { updateApplicantStatus, getAllApplicants } = useApplicants();
  const { jobs } = useJobPosts();
  
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [selectedApplicantId, setSelectedApplicantId] = useState("");
  const [selectedJobId, setSelectedJobId] = useState("");
  const [interviewType, setInterviewType] = useState("Video");
  const [notes, setNotes] = useState("");
  const [interviewer, setInterviewer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const applicants = getAllApplicants();

  const handleApplicantSelect = (applicantId: string) => {
    const applicant = applicants.find(a => a.id === applicantId);
    if (applicant) {
      setSelectedApplicantId(applicantId);
      setCandidateName(applicant.name);
      setCandidateEmail(applicant.email);
      setSelectedJobId(applicant.jobId);
    }
  };

  const validateForm = () => {
    if (!candidateName.trim()) {
      toast.error("Please enter candidate name");
      return false;
    }
    if (!candidateEmail.trim()) {
      toast.error("Please enter candidate email");
      return false;
    }
    if (!date) {
      toast.error("Please select interview date");
      return false;
    }
    if (!time) {
      toast.error("Please select interview time");
      return false;
    }
    if (!interviewer.trim()) {
      toast.error("Please enter interviewer name");
      return false;
    }
    if (!selectedJobId) {
      toast.error("Please select a job position");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const jobTitle = jobs.find(job => job.id === selectedJobId)?.title || "Unknown Position";

      scheduleInterview({
        applicantId: selectedApplicantId || "manual",
        applicantName: candidateName,
        jobId: selectedJobId,
        jobTitle,
        scheduledDate: format(date!, "yyyy-MM-dd"),
        scheduledTime: time,
        status: "Scheduled",
        interviewType: interviewType as "Phone" | "Video" | "In-Person",
        notes,
        interviewer
      });

      if (selectedApplicantId) {
        updateApplicantStatus(selectedApplicantId, "Interview");
      }

      toast.success("Interview scheduled successfully!");
      navigate("/employer/dashboard");
    } catch (error) {
      console.error("Error scheduling interview:", error);
      toast.error("Failed to schedule interview. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInterviewTypeIcon = (type: string) => {
    switch (type) {
      case "Video": return <Video className="h-4 w-4" />;
      case "Phone": return <Phone className="h-4 w-4" />;
      case "In-Person": return <MapPin className="h-4 w-4" />;
      default: return <Video className="h-4 w-4" />;
    }
  };

  return (
    <DashboardLayout title="Schedule Interview" role="employer">
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={() => navigate("/employer/dashboard")}
              className="flex items-center gap-2 hover:bg-blue-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            <div className="text-right">
              <h1 className="text-2xl font-bold text-gray-900">Schedule Interview</h1>
              <p className="text-gray-600">Set up an interview with your candidate</p>
            </div>
          </div>

          {/* Main Form */}
          <Card className="shadow-sm">
            <CardHeader className="border-b bg-white">
              <CardTitle className="flex items-center gap-2 text-xl">
                <CalendarIcon className="h-5 w-5 text-blue-600" />
                Interview Details
              </CardTitle>
              <CardDescription>
                Fill in the details to schedule your interview
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Applicant Selection Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-5 w-5 text-blue-600" />
                    <Label className="text-base font-medium">Select Existing Applicant (Optional)</Label>
                  </div>
                  <select
                    value={selectedApplicantId}
                    onChange={(e) => handleApplicantSelect(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select an applicant or enter manually below</option>
                    {applicants.map((applicant) => (
                      <option key={applicant.id} value={applicant.id}>
                        {applicant.name} - {applicant.position}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Candidate Information Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-3">
                    <User className="h-5 w-5 text-blue-600" />
                    <Label className="text-base font-medium">Candidate Information</Label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="candidateName" className="text-sm font-medium text-gray-700">
                        Candidate Name *
                      </Label>
                      <Input
                        id="candidateName"
                        value={candidateName}
                        onChange={(e) => setCandidateName(e.target.value)}
                        placeholder="Enter candidate name"
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="candidateEmail" className="text-sm font-medium text-gray-700">
                        Candidate Email *
                      </Label>
                      <Input
                        id="candidateEmail"
                        type="email"
                        value={candidateEmail}
                        onChange={(e) => setCandidateEmail(e.target.value)}
                        placeholder="candidate@example.com"
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Job Position Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                    <Label className="text-base font-medium">Job Position</Label>
                  </div>
                  <select
                    value={selectedJobId}
                    onChange={(e) => setSelectedJobId(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select a job position</option>
                    {jobs.map((job) => (
                      <option key={job.id} value={job.id}>
                        {job.title} - {job.location}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Schedule Information Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CalendarIcon className="h-5 w-5 text-blue-600" />
                    <Label className="text-base font-medium">Schedule Information</Label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Interview Date *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full mt-1 justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            disabled={(date) => date < new Date()}
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <Label htmlFor="time" className="text-sm font-medium text-gray-700">
                        Interview Time *
                      </Label>
                      <Input
                        id="time"
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Interview Details Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Video className="h-5 w-5 text-blue-600" />
                    <Label className="text-base font-medium">Interview Details</Label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Interview Type</Label>
                      <select
                        value={interviewType}
                        onChange={(e) => setInterviewType(e.target.value)}
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Video">🎥 Video Call</option>
                        <option value="Phone">📞 Phone Call</option>
                        <option value="In-Person">🏢 In Person</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="interviewer" className="text-sm font-medium text-gray-700">
                        Interviewer *
                      </Label>
                      <Input
                        id="interviewer"
                        value={interviewer}
                        onChange={(e) => setInterviewer(e.target.value)}
                        placeholder="Enter interviewer name"
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Notes Section */}
                <div className="space-y-4">
                  <Label htmlFor="notes" className="text-base font-medium text-gray-700">
                    Additional Notes
                  </Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any additional information or instructions for the interview..."
                    className="min-h-[100px]"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
                  <Button 
                    type="submit" 
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Clock className="h-4 w-4 mr-2 animate-spin" />
                        Scheduling...
                      </>
                    ) : (
                      <>
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        Schedule Interview
                      </>
                    )}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate("/employer/dashboard")}
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewSchedule;
