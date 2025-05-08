
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CareerGoalsStep } from "./steps/CareerGoalsStep";
import { WorkPreferenceStep } from "./steps/WorkPreferenceStep";
import { SalaryExpectationsStep } from "./steps/SalaryExpectationsStep";
import { LocationStep } from "./steps/LocationStep";
import { VideoIntroductionStep } from "./steps/VideoIntroductionStep";
import { ProfileSummaryStep } from "./steps/ProfileSummaryStep";
import { VideoRecordingModal } from "./VideoRecordingModal";
import { AIAssistant } from "./AIAssistant";
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
    workPreference: "",
    salaryExpectations: "",
    location: "",
    skills: "",
    videoIntroduction: null,
  });
  const [videoRecordingOpen, setVideoRecordingOpen] = useState(false);
  const [videoAnalyzing, setVideoAnalyzing] = useState(false);
  const [videoAnalysisResult, setVideoAnalysisResult] = useState<string | null>(null);
  const [aiResponses, setAiResponses] = useState<string[]>([
    "Welcome to VisionDrill! I'm here to help you set up your profile and find the perfect career opportunities. Let's get started by understanding your career goals and preferences."
  ]);
  
  const totalSteps = 5;
  const progress = ((currentStep + 1) / (totalSteps + 1)) * 100;
  
  const updateField = <K extends keyof OnboardingData>(field: K, value: OnboardingData[K]) => {
    setData(prev => ({ ...prev, [field]: value }));
  };
  
  const simulateAiResponse = () => {
    const responses = [
      "Thank you for sharing your career goals! This helps us understand what you're looking for.",
      "Great choice! We'll find opportunities that match your work style preference.",
      "Thanks for sharing your salary expectations. This will help us match you with appropriate opportunities.",
      "Perfect! We'll focus on opportunities in your preferred location.",
      "Thanks for completing your profile! Based on your information, I've identified some initial career paths that might interest you."
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
        "Our AI analysis indicates strong communication skills, clear articulation, and good eye contact. Your enthusiasm comes across well, which is a plus for client-facing roles."
      );
    }, 2000);
  };
  
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <CareerGoalsStep 
            value={data.careerGoals} 
            onChange={(value) => updateField("careerGoals", value)} 
          />
        );
      
      case 1:
        return (
          <WorkPreferenceStep 
            value={data.workPreference} 
            onChange={(value) => updateField("workPreference", value)} 
          />
        );
      
      case 2:
        return (
          <SalaryExpectationsStep 
            value={data.salaryExpectations} 
            onChange={(value) => updateField("salaryExpectations", value)} 
          />
        );
      
      case 3:
        return (
          <LocationStep 
            value={data.location} 
            onChange={(value) => updateField("location", value)} 
          />
        );
      
      case 4:
        return (
          <VideoIntroductionStep 
            videoFile={data.videoIntroduction}
            onVideoUpload={handleVideoUpload}
            openVideoRecording={() => setVideoRecordingOpen(true)}
            videoAnalyzing={videoAnalyzing}
            videoAnalysisResult={videoAnalysisResult}
          />
        );
      
      case 5:
        return <ProfileSummaryStep data={data} />;
      
      default:
        return null;
    }
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
          
          <div className="mt-2 mb-4">
            <Progress value={progress} className="h-1" />
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>Getting Started</span>
              <span>Profile Complete</span>
            </div>
          </div>
          
          <AIAssistant message={aiResponses[aiResponses.length - 1]} />
          
          <div className="mb-4">
            {renderStep()}
          </div>
          
          <DialogFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button onClick={handleNext}>
              {currentStep < totalSteps ? (
                <>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                'Complete'
              )}
            </Button>
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
