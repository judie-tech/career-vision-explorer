
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, User, Camera } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface ProfileImageUploadProps {
  currentImage?: string;
  onImageUpload: (imageUrl: string) => void;
}

const ProfileImageUpload = ({ currentImage, onImageUpload }: ProfileImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please select a valid image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreviewImage(result);
      handleUpload(result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async (imageData: string) => {
    setIsUploading(true);
    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would upload to a cloud service
      // For now, we'll use the base64 data URL
      onImageUpload(imageData);
      
      toast.success("Profile image updated successfully!");
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const displayImage = previewImage || currentImage;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Avatar className="h-32 w-32">
              <AvatarImage src={displayImage} alt="Profile" />
              <AvatarFallback className="bg-gray-100">
                <User className="h-16 w-16 text-gray-500" />
              </AvatarFallback>
            </Avatar>
            <Button
              size="sm"
              className="absolute bottom-0 right-0 rounded-full h-10 w-10 p-0"
              onClick={handleButtonClick}
              disabled={isUploading}
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="text-center">
            <h3 className="font-medium text-lg">Profile Photo</h3>
            <p className="text-sm text-gray-500 mt-1">
              Upload a professional photo to help employers recognize you
            </p>
          </div>

          <Button
            onClick={handleButtonClick}
            disabled={isUploading}
            variant="outline"
            className="w-full"
          >
            <Upload className="h-4 w-4 mr-2" />
            {isUploading ? "Uploading..." : "Change Photo"}
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          <p className="text-xs text-gray-400 text-center">
            Supports JPG, PNG, GIF up to 5MB
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileImageUpload;
