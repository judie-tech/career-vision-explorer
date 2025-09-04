import { useState, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { VideoRecordingModal } from "./VideoRecordingModal";
const AIAssistant = lazy(() => import("./AIAssistant").then(module => ({ default: module.AIAssistant })));
import { submitOnboardingData } from "@/services/onboarding.service";
import { ProgressIndicator } from "./ProgressIndicator";
import { StepNavigation } from "./StepNavigation";
import { StepRenderer } from "./StepRenderer";
import { FreelancerStepRenderer } from "./FreelancerStepRenderer";
import { EmployerStepRenderer } from "./EmployerStepRenderer";
import { OnboardingData } from "./types";

interface OnboardingWizardProps {
  onComplete: () => void;
  userRole?: 'jobseeker' | 'employer' | 'freelancer';
  signupData?: any; // Data from signup form including role-specific fields
}

const OnboardingWizard = ({ onComplete, userRole = 'jobseeker', signupData }: OnboardingWizardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    careerGoals: "",
    workPreference: "remote",
    salaryExpectations: "entry",
    location: "",
    skills: "",
    videoIntroduction: null,
  });
  const [videoRecordingOpen, setVideoRecordingOpen] = useState(false);
  const [videoAnalyzing, setVideoAnalyzing] = useState(false);
  const [videoAnalysisResult, setVideoAnalysisResult] = useState<string | null>(null);
const [aiResponses, setAiResponses] = useState<string[]>([
    userRole === 'freelancer' 
      ? "Welcome to Visiondrill! I'm here to help you set up your freelancer profile. Let's showcase your skills and services to connect with potential clients."
      : userRole === 'employer'
      ? "Welcome to Visiondrill! I'm here to help you set up your company profile and find the best talent for your team. Let's start by gathering information about your company."
      : "Welcome to Visiondrill! I'm here to help you set up your profile and find the perfect career opportunities. Let's get started by understanding your career goals and preferences."
  ]);
  
  // Different user types have different number of steps
  const totalSteps = userRole === 'employer' ? 6 : userRole === 'freelancer' ? 6 : 5;
  const progress = ((currentStep + 1) / (totalSteps + 1)) * 100;
  
  const updateField = <K extends keyof OnboardingData>(field: K, value: OnboardingData[K]) => {
    setData(prev => ({ ...prev, [field]: value }));
  };
  
  const simulateAiResponse = () => {
    const freelancerResponses = [
      "Tell me about your services and expertise. This will help potential clients understand what you offer.",
      "Great! Your experience and skills are valuable. Let's make sure clients can find you based on your expertise.",
      "Setting the right rate is important. We'll help you find clients who value your skills and budget.",
      "Your work preferences will help us match you with the right projects and clients.",
      "Excellent! A strong portfolio helps showcase your capabilities to potential clients.",
      "Perfect! Your location and language skills can open up both local and international opportunities.",
      "Thank you for completing your profile! Your freelancer profile is now ready to attract potential clients."
    ];
    
    const jobSeekerResponses = [
      "You can import your LinkedIn profile or start fresh. This will help us customize your experience to match your needs.",
      "Thank you for sharing your career goals! This information helps us understand what you're looking for in your career journey.",
      "Great choice! We'll find opportunities that match your preferred work style and environment.",
      "Thank you for sharing your salary expectations. This will help us match you with appropriate opportunities within your range.",
      "Perfect! We'll focus on finding opportunities in your preferred location and nearby areas.",
      "Thank you for completing your profile! Based on your information, I've identified some initial career paths that might interest you and align with your goals."
    ];
    
const employerResponses = [
      "Welcome! Let's begin by setting up your company's presence on our platform to attract the best talent.",
      "Great! Let's define the roles you're looking to fill and target potential candidates effectively.",
      "Understanding your company's culture and values will help us find matching talent with similar ethos.",
      "Work arrangements are crucial. Let's specify how your future employees will collaborate.",
      "Highlighting the benefits and perks offered will make your company stand out to top candidates.",
      "Upload your company logo to give your postings a professional look."
    ];
    
    const responses = userRole === 'freelancer' ? freelancerResponses : userRole === 'employer' ? employerResponses : jobSeekerResponses;
   
    if (currentStep < responses.length) {
      setAiResponses(prev => [...prev, responses[currentStep]]);
    }
  };
  
  const handleNext = () => {
    //simulateAiResponse();
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const handleComplete = () => {
    const completionMessages = {
      employer: {
        title: "Company Profile Created Successfully!",
        description: "Your company profile is ready. Start posting jobs to find the best talent!",
        redirect: "/employer/dashboard"
      },
      freelancer: {
        title: "Freelancer Profile Created Successfully!",
        description: "Your profile is ready. Start browsing projects and connecting with clients!",
        redirect: "/freelancer/dashboard"
      },
      jobseeker: {
        title: "Profile Created Successfully!",
        description: "Your profile is ready. Let's explore career opportunities!",
        redirect: "/jobs"
      }
    };
    
    const message = completionMessages[userRole] || completionMessages.jobseeker;
    
    // Add API call here to submit onboarding data
    submitOnboardingData(data, signupData, userRole).then(() => {
      toast({
        title: message.title,
        description: message.description,
      });
      onComplete();
      navigate(message.redirect);
    }).catch(error => {
      console.error('Onboarding error:', error);
      
      // Provide more specific error messages based on the error type
      let errorMessage = "Could not complete onboarding, please try again.";
      
      if (error.response?.status === 401) {
        errorMessage = "Your session has expired. Please log in again.";
      } else if (error.response?.status === 400) {
        errorMessage = "Some of the information provided is invalid. Please check your inputs.";
      } else if (error.response?.status === 500) {
        errorMessage = "Server error occurred. Please try again later.";
      } else if (error.message?.includes('network')) {
        errorMessage = "Network error. Please check your internet connection.";
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    });
  };
  
  const handleVideoUpload = (file: File) => {
    updateField("videoIntroduction", file);
    analyzeVideo(file);
  };
  
  const saveRecording = () => {
    // In a real app, this would save the recorded video blob
    const mockFile = new File([""], "video-intro.mp4", { type: "video/mp4" });
    updateField("videoIntroduction", mockFile);
    analyzeVideo(mockFile);
  };
  
  const analyzeVideo = (videoFile: File) => {
    setVideoAnalyzing(true);
    
    // This simulates AI analysis of the video
    setTimeout(() => {
      setVideoAnalyzing(false);
      setVideoAnalysisResult(
        "Our AI analysis indicates strong communication skills, clear articulation, and excellent eye contact. Your enthusiasm comes across very well, which is a significant advantage for client-facing roles and team collaboration."
      );
    }, 2000);
  };
  
  const handleLinkedInImport = (data: any) => {
    toast({
      title: "LinkedIn Profile Imported",
      description: "Your profile information has been successfully imported.",
    });
    // In a real app, this would populate the form with LinkedIn data
    setCurrentStep(1); // Move to career goals after import
  };
  
  return (
    <>
      <Dialog open={true}>
        <DialogContent className="max-w-xl space-y-6">
          <DialogHeader className="space-y-2">
            <DialogTitle>Complete Your Profile</DialogTitle>
            <DialogDescription>
              {userRole === 'employer' 
                ? "Let's set up your company profile to attract the best talent."
                : userRole === 'freelancer'
                ? "Let's create your freelancer profile to connect with potential clients."
                : "Let's set up your profile so we can find the perfect opportunities for you."}
            </DialogDescription>
          </DialogHeader>
          
          <ProgressIndicator progress={progress} />
          
          {/*
          <AIAssistant message={aiResponses[aiResponses.length - 1]} />

 */}
          
          <div className="mb-6">
{userRole === 'freelancer' ? (
              <FreelancerStepRenderer
                currentStep={currentStep}
                data={data}
                updateField={updateField}
                handleNext={handleNext}
                handleVideoUpload={handleVideoUpload}
                openVideoRecording={() => setVideoRecordingOpen(true)}
                videoAnalyzing={videoAnalyzing}
                videoAnalysisResult={videoAnalysisResult}
              />
            ) : userRole === 'employer' ? (
              <EmployerStepRenderer
                currentStep={currentStep}
                data={data}
                updateField={updateField}
                handleNext={handleNext}
                handleLogoUpload={(file) => updateField("companyLogo", file)}
              />
            ) : (
              <StepRenderer
                currentStep={currentStep}
                data={data}
                updateField={updateField}
                handleLinkedInImport={handleLinkedInImport}
                handleNext={handleNext}
                handleVideoUpload={handleVideoUpload}
                openVideoRecording={() => setVideoRecordingOpen(true)}
                videoAnalyzing={videoAnalyzing}
                videoAnalysisResult={videoAnalysisResult}
              />
            )}
          </div>
          
          <DialogFooter>
            <StepNavigation
              currentStep={currentStep}
              totalSteps={totalSteps}
              onBack={handleBack}
              onNext={handleNext}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <VideoRecordingModal 
        isOpen={videoRecordingOpen}
        onClose={() => setVideoRecordingOpen(false)}
        onSave={saveRecording}
      />
    </>
  );
};

export default OnboardingWizard;
