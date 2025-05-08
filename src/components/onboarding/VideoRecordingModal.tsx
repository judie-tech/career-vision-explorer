
import { useState } from "react";
import { Check, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";

interface VideoRecordingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export const VideoRecordingModal = ({ isOpen, onClose, onSave }: VideoRecordingModalProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);

  const startRecording = () => {
    setIsRecording(true);
    // In a real app, this would use MediaRecorder API to record video
    setTimeout(() => {
      setIsRecording(false);
      setRecordingComplete(true);
    }, 3000);
  };

  const handleReRecord = () => {
    setRecordingComplete(false);
  };

  const handleSave = () => {
    onSave();
    onClose();
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
