
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { User, Camera } from "lucide-react";

interface ProfileImageUploadProps {
  profileImage: string;
  onImageChange: (imageUrl: string) => void;
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  profileImage,
  onImageChange,
}) => {
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select a valid image file",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image size must be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onImageChange(result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center space-y-4 pb-4">
      <div className="relative">
        <Avatar className="h-20 w-20">
          <AvatarImage src={profileImage} alt="Profile" />
          <AvatarFallback className="bg-gray-100">
            <User className="h-8 w-8 text-gray-500" />
          </AvatarFallback>
        </Avatar>
        <Button
          type="button"
          size="sm"
          className="absolute bottom-0 right-0 rounded-full h-8 w-8 p-0"
          onClick={() => document.getElementById('signup-image-input')?.click()}
        >
          <Camera className="h-3 w-3" />
        </Button>
      </div>
      <p className="text-xs text-gray-500 text-center">
        Add a profile photo (required)
      </p>
      <input
        id="signup-image-input"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
};

export default ProfileImageUpload;
