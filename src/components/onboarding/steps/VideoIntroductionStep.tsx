
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Check, Upload, Video } from "lucide-react";
import { useState } from "react";

interface VideoIntroductionStepProps {
  videoFile: File | null;
  onVideoUpload: (file: File) => void;
  openVideoRecording: () => void;
  videoAnalyzing: boolean;
  videoAnalysisResult: string | null;
}

export const VideoIntroductionStep = ({ 
  videoFile, 
  onVideoUpload, 
  openVideoRecording, 
  videoAnalyzing, 
  videoAnalysisResult 
}: VideoIntroductionStepProps) => {
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onVideoUpload(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Add a video introduction</h3>
      <p className="text-sm text-gray-500">
        Record a 30-60 second introduction. Our AI will analyze your communication style.
      </p>
      <div className="flex flex-col gap-3">
        <Button onClick={openVideoRecording}>
          <Video className="mr-2 h-4 w-4" />
          Record Video
        </Button>
        <div className="relative">
          <Input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
          />
          <Button variant="outline" className="w-full">
            <Upload className="mr-2 h-4 w-4" />
            Upload Video
          </Button>
        </div>
      </div>
      {videoFile && (
        <div className="bg-green-50 border border-green-200 rounded-md p-3 flex items-center">
          <Check className="h-5 w-5 text-green-500 mr-2" />
          <span>{videoFile.name || "Video recorded successfully"}</span>
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
};
