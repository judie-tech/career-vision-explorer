
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, BookOpen, Briefcase, TrendingUp, MapPin, Mail, Calendar } from "lucide-react";

interface ProfileInfoCardProps {
  userName: string;
  userRole: string;
  userEducation: string;
  userExperience: string;
  userLocation?: string;
  userBio?: string;
  profileImage?: string;
}

const ProfileInfoCard = ({ 
  userName, 
  userRole, 
  userEducation, 
  userExperience, 
  userLocation, 
  userBio,
  profileImage 
}: ProfileInfoCardProps) => {
  return (
    <Card className="h-full shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
      <CardContent className="p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
          <div className="relative">
            <Avatar className="h-20 w-20 ring-4 ring-blue-100 shadow-lg">
              <AvatarImage src={profileImage} alt={userName} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-lg font-semibold">
                <User className="h-10 w-10" />
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-3 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{userName}</h2>
            <p className="text-lg text-blue-600 font-medium mb-2">{userRole}</p>
            <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
              <TrendingUp className="h-3 w-3 mr-1" />
              Open to opportunities
            </Badge>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <BookOpen className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-700">Education</p>
                <p className="text-sm text-gray-600">{userEducation}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
              <Briefcase className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-700">Experience</p>
                <p className="text-sm text-gray-600">{userExperience}</p>
              </div>
            </div>
          </div>
          
          {userLocation && (
            <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
              <MapPin className="h-5 w-5 text-orange-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-700">Location</p>
                <p className="text-sm text-gray-600">{userLocation}</p>
              </div>
            </div>
          )}
        </div>

        {userBio && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
              <User className="h-4 w-4 mr-2 text-gray-600" />
              About Me
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg">
              {userBio}
            </p>
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              Member since Jan 2024
            </span>
            <span className="flex items-center">
              <Mail className="h-4 w-4 mr-1" />
              Verified email
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileInfoCard;
