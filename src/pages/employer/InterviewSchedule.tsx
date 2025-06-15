
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
import { CalendarIcon, ArrowLeft, Clock, Users, Briefcase, Video, Phone, MapPin, User } from "lucide-react";
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

      // Schedule the interview
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

      // Update applicant status if this is an existing applicant
      if (selectedApplicantId) {
        updateApplicantStatus(selectedApplicantId, "Interview");
      }

      toast.success("Interview scheduled successfully!");
      
      // Navigate back to dashboard
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate("/employer/dashboard")}
            className="mb-4 hover:bg-white border-gray-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center">
              <div className="bg-blue-50 p-3 rounded-full mr-4">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Schedule Interview
                </h1>
                <p className="text-gray-600 mt-2 text-lg">
                  Set up an interview with a candidate
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <Card className="max-w-4xl mx-auto shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
            <CardTitle className="text-2xl text-gray-800 flex items-center">
              <Users className="h-6 w-6 mr-3 text-blue-600" />
              Interview Details
            </CardTitle>
            <CardDescription className="text-gray-600">
              Fill in the information below to schedule the interview
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Applicant Selection */}
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  <User className="h-5 w-5 text-gray-600 mr-2" />
                  <Label className="text-lg font-semibold text-gray-800">Select Existing Applicant (Optional)</Label>
                </div>
                <select
                  value={selectedApplicantId}
                  onChange={(e) => handleApplicantSelect(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800 shadow-sm"
                >
                  <option value="">Select an applicant or enter manually below</option>
                  {applicants.map((applicant) => (
                    <option key={applicant.id} value={applicant.id}>
                      {applicant.name} - {applicant.position}
                    </option>
                  ))}
                </select>
              </div>

              {/* Candidate Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="candidateName" className="text-base font-medium text-gray-800 flex items-center">
                    <User className="h-4 w-4 mr-2 text-gray-600" />
                    Candidate Name *
                  </Label>
                  <Input
                    id="candidateName"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    placeholder="Enter candidate name"
                    className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="candidateEmail" className="text-base font-medium text-gray-800">
                    Candidate Email *
                  </Label>
                  <Input
                    id="candidateEmail"
                    type="email"
                    value={candidateEmail}
                    onChange={(e) => setCandidateEmail(e.target.value)}
                    placeholder="candidate@example.com"
                    className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Job Position */}
              <div className="space-y-3">
                <Label htmlFor="jobSelect" className="text-base font-medium text-gray-800 flex items-center">
                  <Briefcase className="h-4 w-4 mr-2 text-gray-600" />
                  Job Position *
                </Label>
                <select
                  id="jobSelect"
                  value={selectedJobId}
                  onChange={(e) => setSelectedJobId(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800 shadow-sm h-12"
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

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-base font-medium text-gray-800 flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-2 text-gray-600" />
                    Interview Date *
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-12 justify-start text-left font-normal border-gray-300",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white shadow-lg">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="time" className="text-base font-medium text-gray-800 flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-600" />
                    Interview Time *
                  </Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      id="time"
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Interview Type and Interviewer */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="interviewType" className="text-base font-medium text-gray-800 flex items-center">
                    {getInterviewTypeIcon(interviewType)}
                    <span className="ml-2">Interview Type</span>
                  </Label>
                  <select
                    id="interviewType"
                    value={interviewType}
                    onChange={(e) => setInterviewType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800 shadow-sm h-12"
                  >
                    <option value="Video">Video Call</option>
                    <option value="Phone">Phone Call</option>
                    <option value="In-Person">In Person</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="interviewer" className="text-base font-medium text-gray-800 flex items-center">
                    <User className="h-4 w-4 mr-2 text-gray-600" />
                    Interviewer *
                  </Label>
                  <Input
                    id="interviewer"
                    value={interviewer}
                    onChange={(e) => setInterviewer(e.target.value)}
                    placeholder="Enter interviewer name"
                    className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-3">
                <Label htmlFor="notes" className="text-base font-medium text-gray-800">
                  Additional Notes
                </Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any additional information or instructions for the interview..."
                  className="min-h-[120px] border-gray-300 focus:border-blue-500 focus:ring-blue-500 resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <Button 
                  type="submit" 
                  className="flex-1 h-12 text-base font-medium bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Scheduling..." : "Schedule Interview"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate("/employer/dashboard")}
                  disabled={isSubmitting}
                  className="px-8 h-12 text-base border-gray-300 hover:bg-gray-50"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default InterviewSchedule;
