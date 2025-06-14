
import { useState } from "react";
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
import { AIAssistant } from "./AIAssistant";
import { ProgressIndicator } from "./ProgressIndicator";
import { StepNavigation } from "./StepNavigation";
import { StepRenderer } from "./StepRenderer";
import { OnboardingData } from "./types";

interface OnboardingWizardProps {
  onComplete: () => void;
}

const OnboardingWizard = ({ onComplete }: OnboardingWizardProps) => {
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
    "Welcome to Visiondrill! I'm here to help you set up your profile and find the perfect career opportunities. Let's get started by understanding your career goals and preferences."
  ]);
  
  const totalSteps = 6;
  const progress = ((currentStep + 1) / (totalSteps + 1)) * 100;
  
  const updateField = <K extends keyof OnboardingData>(field: K, value: OnboardingData[K]) => {
    setData(prev => ({ ...prev, [field]: value }));
  };
  
  const simulateAiResponse = () => {
    const responses = [
      "You can import your LinkedIn profile or start fresh. This will help us customize your experience to match your needs.",
      "Thank you for sharing your career goals! This information helps us understand what you're looking for in your career journey.",
      "Great choice! We'll find opportunities that match your preferred work style and environment.",
      "Thank you for sharing your salary expectations. This will help us match you with appropriate opportunities within your range.",
      "Perfect! We'll focus on finding opportunities in your preferred location and nearby areas.",
      "Thank you for completing your profile! Based on your information, I've identified some initial career paths that might interest you and align with your goals."
    ];
    
    if (currentStep < responses.length) {
      setAiResponses(prev => [...prev, responses[currentStep]]);
    }
  };
  
  const handleNext = () => {
    simulateAiResponse();
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
    toast({
      title: "Profile Created Successfully!",
      description: "Your profile is ready. Let's explore career opportunities!",
    });
    onComplete();
    navigate("/jobs");
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
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Complete Your Profile</DialogTitle>
            <DialogDescription>
              Let's set up your profile so we can find the perfect opportunities for you.
            </DialogDescription>
          </DialogHeader>
          
          <ProgressIndicator progress={progress} />
          
          <AIAssistant message={aiResponses[aiResponses.length - 1]} />
          
          <div className="mb-4">
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
