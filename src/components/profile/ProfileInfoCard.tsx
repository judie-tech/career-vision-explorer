
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Edit, MapPin, GraduationCap, Briefcase, Upload, User } from "lucide-react";

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

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onImageUpload?.(result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-32 w-32">
              <AvatarImage src={profileImage} alt={userName} />
              <AvatarFallback className="text-2xl">
                <User className="h-16 w-16" />
              </AvatarFallback>
            </Avatar>
            <Button
              variant="outline"
              size="sm"
              onClick={() => document.getElementById('profile-image-input')?.click()}
              className="flex items-center gap-2"
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

          {/* Profile Info Section */}
          <div className="flex-1 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{userName}</h1>
                <p className="text-xl text-blue-600 font-medium">{userRole}</p>
              </div>
              <Button onClick={onEditProfile} variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                <span>{userEducation}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                <span>{userExperience}</span>
              </div>
              {userLocation && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{userLocation}</span>
                </div>
              )}
            </div>

            {userBio && (
              <div className="pt-2">
                <p className="text-gray-700 leading-relaxed">{userBio}</p>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <Badge variant="secondary">Available for work</Badge>
              <Badge variant="outline">Open to opportunities</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileInfoCard;
