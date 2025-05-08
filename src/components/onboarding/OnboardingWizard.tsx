
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Video, Check, ArrowRight, ArrowLeft } from "lucide-react";

interface OnboardingWizardProps {
  onComplete: () => void;
}

type WorkPreference = "remote" | "in-person" | "hybrid" | "";
type SalaryRange = "entry" | "mid" | "senior" | "executive" | "";

interface OnboardingData {
  careerGoals: string;
  workPreference: WorkPreference;
  salaryExpectations: SalaryRange;
  location: string;
  skills: string;
  videoIntroduction: File | null;
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
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
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
  
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      updateField("videoIntroduction", e.target.files[0]);
      analyzeVideo(e.target.files[0]);
    }
  };
  
  const startRecording = () => {
    setIsRecording(true);
    toast({
      title: "Recording Started",
      description: "Speak clearly about your career aspirations and skills (30-60 seconds)."
    });
    
    // In a real app, this would use MediaRecorder API to record video
    setTimeout(() => {
      setIsRecording(false);
      setRecordingComplete(true);
      toast({
        title: "Recording Complete",
        description: "Your video introduction has been recorded."
      });
    }, 3000);
  };
  
  const saveRecording = () => {
    // In a real app, this would save the recorded video blob
    setVideoRecordingOpen(false);
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
          <div className="space-y-4">
            <h3 className="text-lg font-medium">What are your career goals?</h3>
            <Textarea
              placeholder="I'm looking to advance my career in software development with a focus on machine learning and AI..."
              value={data.careerGoals}
              onChange={(e) => updateField("careerGoals", e.target.value)}
              className="min-h-[120px]"
            />
          </div>
        );
      
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">What's your preferred work style?</h3>
            <Select
              value={data.workPreference}
              onValueChange={(value) => updateField("workPreference", value as WorkPreference)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select work preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="in-person">In-Person</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">What are your salary expectations?</h3>
            <Select
              value={data.salaryExpectations}
              onValueChange={(value) => updateField("salaryExpectations", value as SalaryRange)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select salary range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entry">Entry Level (30K-50K KES/month)</SelectItem>
                <SelectItem value="mid">Mid Level (50K-100K KES/month)</SelectItem>
                <SelectItem value="senior">Senior Level (100K-200K KES/month)</SelectItem>
                <SelectItem value="executive">Executive Level (200K+ KES/month)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">What's your preferred location?</h3>
            <Input
              placeholder="Nairobi, Kenya"
              value={data.location}
              onChange={(e) => updateField("location", e.target.value)}
            />
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Add a video introduction</h3>
            <p className="text-sm text-gray-500">
              Record a 30-60 second introduction. Our AI will analyze your communication style.
            </p>
            <div className="flex flex-col gap-3">
              <Button onClick={() => setVideoRecordingOpen(true)}>
                <Video className="mr-2 h-4 w-4" />
                Record Video
              </Button>
              <div className="relative">
                <Input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                />
                <Button variant="outline" className="w-full">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Video
                </Button>
              </div>
            </div>
            {data.videoIntroduction && (
              <div className="bg-green-50 border border-green-200 rounded-md p-3 flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>{data.videoIntroduction.name || "Video recorded successfully"}</span>
              </div>
            )}
            {videoAnalyzing && (
              <div className="text-sm text-gray-500">
                Analyzing your video with AI...
                <Progress value={65} className="mt-2" />
              </div>
            )}
            {videoAnalysisResult && (
              <div className="bg-blue-50 border border-blue-200 rounded-md p-3 text-sm">
                <p className="font-medium mb-1">AI Communication Analysis:</p>
                <p>{videoAnalysisResult}</p>
              </div>
            )}
          </div>
        );
      
      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Your Profile Summary</h3>
            <div className="bg-gray-50 rounded-md p-4 space-y-3">
              <div>
                <p className="text-sm font-medium">Career Goals</p>
                <p className="text-sm text-gray-600">{data.careerGoals || "Not specified"}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Work Preference</p>
                <p className="text-sm text-gray-600">
                  {data.workPreference ? data.workPreference.charAt(0).toUpperCase() + data.workPreference.slice(1) : "Not specified"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Salary Expectations</p>
                <p className="text-sm text-gray-600">
                  {data.salaryExpectations === "entry" && "Entry Level (30K-50K KES/month)"}
                  {data.salaryExpectations === "mid" && "Mid Level (50K-100K KES/month)"}
                  {data.salaryExpectations === "senior" && "Senior Level (100K-200K KES/month)"}
                  {data.salaryExpectations === "executive" && "Executive Level (200K+ KES/month)"}
                  {!data.salaryExpectations && "Not specified"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm text-gray-600">{data.location || "Not specified"}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Video Introduction</p>
                <p className="text-sm text-gray-600">
                  {data.videoIntroduction ? "Provided" : "Not provided"}
                </p>
              </div>
            </div>
          </div>
        );
      
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
          
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="font-medium text-gray-700">AI Assistant:</p>
            <p className="text-gray-600">{aiResponses[aiResponses.length - 1]}</p>
          </div>
          
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
      
      <Dialog open={videoRecordingOpen} onOpenChange={setVideoRecordingOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Record Video Introduction</DialogTitle>
            <DialogDescription>
              Record a 30-60 second introduction about your skills and career goals.
            </DialogDescription>
          </DialogHeader>
          
          <div className="aspect-video bg-gray-100 rounded-md flex flex-col items-center justify-center">
            {!recordingComplete ? (
              <>
                <Video className="h-12 w-12 text-gray-400 mb-2" />
                <p className="text-gray-500 text-sm">
                  {isRecording ? "Recording..." : "Camera preview will appear here"}
                </p>
              </>
            ) : (
              <>
                <Check className="h-12 w-12 text-green-500 mb-2" />
                <p className="text-green-600 text-sm">Recording complete!</p>
              </>
            )}
          </div>
          
          <div className="flex gap-2">
            {!isRecording && !recordingComplete && (
              <Button onClick={startRecording} className="w-full">
                Start Recording
              </Button>
            )}
            
            {isRecording && (
              <Button 
                variant="destructive" 
                className="w-full"
                onClick={() => setIsRecording(false)}
              >
                Stop Recording
              </Button>
            )}
            
            {recordingComplete && (
              <>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setRecordingComplete(false)}
                >
                  Re-record
                </Button>
                <Button className="w-full" onClick={saveRecording}>
                  Save & Continue
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OnboardingWizard;
