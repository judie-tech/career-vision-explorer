
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/admin/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { useInterviews } from "@/hooks/use-interviews";
import { useApplicants } from "@/hooks/use-applicants";
import { useJobPosts } from "@/hooks/use-job-posts";
import { toast } from "sonner";
import { ApplicantSelectionSection } from "@/components/employer/interview/ApplicantSelectionSection";
import { CandidateInformationSection } from "@/components/employer/interview/CandidateInformationSection";
import { JobPositionSection } from "@/components/employer/interview/JobPositionSection";
import { ScheduleInformationSection } from "@/components/employer/interview/ScheduleInformationSection";
import { InterviewDetailsSection } from "@/components/employer/interview/InterviewDetailsSection";
import { NotesSection } from "@/components/employer/interview/NotesSection";
import { ActionButtonsSection } from "@/components/employer/interview/ActionButtonsSection";

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

  const handleCancel = () => {
    navigate("/employer/dashboard");
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
                <ApplicantSelectionSection
                  applicants={applicants}
                  selectedApplicantId={selectedApplicantId}
                  onApplicantSelect={handleApplicantSelect}
                />

                <CandidateInformationSection
                  candidateName={candidateName}
                  candidateEmail={candidateEmail}
                  onNameChange={setCandidateName}
                  onEmailChange={setCandidateEmail}
                />

                <JobPositionSection
                  jobs={jobs}
                  selectedJobId={selectedJobId}
                  onJobChange={setSelectedJobId}
                />

                <ScheduleInformationSection
                  date={date}
                  time={time}
                  onDateChange={setDate}
                  onTimeChange={setTime}
                />

                <InterviewDetailsSection
                  interviewType={interviewType}
                  interviewer={interviewer}
                  onInterviewTypeChange={setInterviewType}
                  onInterviewerChange={setInterviewer}
                />

                <NotesSection
                  notes={notes}
                  onNotesChange={setNotes}
                />

                <ActionButtonsSection
                  isSubmitting={isSubmitting}
                  onCancel={handleCancel}
                />
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewSchedule;
