
import { useState, useEffect } from "react";
import { Check, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface VideoRecordingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export const VideoRecordingModal = ({ isOpen, onClose, onSave }: VideoRecordingModalProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = () => {
    setIsRecording(true);
    toast.info("Recording started", {
      description: "Your video is now being recorded"
    });
    
    // In a real app, this would use MediaRecorder API to record video
    setTimeout(() => {
      setIsRecording(false);
      setRecordingComplete(true);
      toast.success("Recording complete", {
        description: "Your video has been recorded successfully"
      });
    }, 5000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setRecordingComplete(true);
    toast.info("Recording stopped", {
      description: "You've stopped the recording"
    });
  };

  const handleReRecord = () => {
    setRecordingComplete(false);
    toast.info("Ready to re-record", {
      description: "Previous recording will be discarded"
    });
  };

  const handleSave = () => {
    onSave();
    onClose();
    toast.success("Video saved", {
      description: "Your introduction video has been saved to your profile"
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
                {isRecording ? `Recording... ${formatTime(recordingTime)}` : "Camera preview will appear here"}
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
              onClick={stopRecording}
            >
              Stop Recording
            </Button>
          )}
          
          {recordingComplete && (
            <>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleReRecord}
              >
                Re-record
              </Button>
              <Button className="w-full" onClick={handleSave}>
                Save & Continue
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
