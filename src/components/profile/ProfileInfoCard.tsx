
import { Card, CardContent } from "@/components/ui/card";
import { User, BookOpen, Briefcase, TrendingUp, MapPin, Phone } from "lucide-react";

interface ProfileInfoCardProps {
  userName: string;
  userRole: string;
  userEducation: string;
  userExperience: string;
  userLocation?: string;
  userBio?: string;
}

const ProfileInfoCard = ({ userName, userRole, userEducation, userExperience, userLocation, userBio }: ProfileInfoCardProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center">
          <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="h-8 w-8 text-gray-500" />
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-bold">{userName}</h2>
            <p className="text-gray-500">{userRole}</p>
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm">
            <BookOpen className="h-4 w-4 mr-2 text-gray-500" />
            {userEducation}
          </div>
          <div className="flex items-center text-sm">
            <Briefcase className="h-4 w-4 mr-2 text-gray-500" />
            {userExperience}
          </div>
          {userLocation && (
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-2 text-gray-500" />
              {userLocation}
            </div>
          )}
          <div className="flex items-center text-sm">
            <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
            Looking for new opportunities
          </div>
        </div>

        {userBio && (
          <div className="mt-4 pt-4 border-t">
            <h3 className="text-sm font-medium text-gray-700 mb-2">About</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{userBio}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileInfoCard;
