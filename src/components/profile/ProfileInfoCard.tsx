
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Edit, MapPin, GraduationCap, Briefcase, Upload, User, Star } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface ProfileInfoCardProps {
  userName: string;
  userRole: string;
  userEducation: string;
  userExperience: string;
  userLocation?: string;
  userBio?: string;
  profileImage?: string;
  onEditProfile?: () => void;
  onImageUpload?: (imageUrl: string) => void;
}

const ProfileInfoCard = ({
  userName,
  userRole,
  userEducation,
  userExperience,
  userLocation,
  userBio,
  profileImage,
  onEditProfile,
  onImageUpload,
}: ProfileInfoCardProps) => {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (onImageUpload) {
        onImageUpload(result);
        toast.success("Profile image updated successfully!");
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <Card className="overflow-hidden shadow-lg border-0 bg-gradient-to-br from-white to-blue-50/20 backdrop-blur-sm">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Enhanced Profile Image Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative group">
              <Avatar className="h-36 w-36 ring-4 ring-blue-100 shadow-xl transition-all duration-300 group-hover:ring-blue-200">
                <AvatarImage src={profileImage} alt={userName} className="object-cover" />
                <AvatarFallback className="text-3xl bg-gradient-to-br from-blue-100 to-purple-100">
                  <User className="h-20 w-20 text-blue-400" />
                </AvatarFallback>
              </Avatar>
              <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1.5 shadow-lg">
                <Star className="h-4 w-4 text-white fill-current" />
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => document.getElementById('profile-image-input')?.click()}
              className="flex items-center gap-2 bg-white/80 hover:bg-white shadow-sm border-blue-200 hover:border-blue-300 transition-all duration-200"
            >
              <Upload className="h-4 w-4" />
              Upload Photo
            </Button>
            <input
              id="profile-image-input"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Enhanced Profile Info Section */}
          <div className="flex-1 space-y-6">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold text-gray-900 leading-tight">{userName}</h1>
                <p className="text-xl text-blue-600 font-semibold">{userRole}</p>
              </div>
              <Button 
                onClick={onEditProfile} 
                variant="outline" 
                size="sm"
                className="bg-white/80 hover:bg-white shadow-sm border-blue-200 hover:border-blue-300 transition-all duration-200"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg">
                <div className="p-2 bg-blue-100 rounded-full">
                  <GraduationCap className="h-4 w-4 text-blue-600" />
                </div>
                <span className="font-medium text-gray-700">{userEducation}</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg">
                <div className="p-2 bg-purple-100 rounded-full">
                  <Briefcase className="h-4 w-4 text-purple-600" />
                </div>
                <span className="font-medium text-gray-700">{userExperience}</span>
              </div>
              {userLocation && (
                <div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg sm:col-span-2">
                  <div className="p-2 bg-green-100 rounded-full">
                    <MapPin className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-700">{userLocation}</span>
                </div>
              )}
            </div>

            {userBio && (
              <div className="p-4 bg-white/60 rounded-lg">
                <p className="text-gray-700 leading-relaxed text-base">{userBio}</p>
              </div>
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200 px-3 py-1">
                Available for work
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 px-3 py-1">
                Open to opportunities
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileInfoCard;
