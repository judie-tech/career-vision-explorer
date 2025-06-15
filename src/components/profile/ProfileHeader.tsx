
import { Button } from "@/components/ui/button";
import { Settings, Briefcase, Edit, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ProfileHeaderProps {
  userName: string;
  userRole: string;
  userEducation: string;
  userExperience: string;
  onEditProfile?: () => void;
}

const ProfileHeader = ({ userName, userRole, userEducation, userExperience, onEditProfile }: ProfileHeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 mb-8 border border-blue-100">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm text-blue-600 font-medium">
            <span>Profile Dashboard</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-500">Career Management</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Welcome back, {userName.split(' ')[0]}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Manage your career profile, track your progress, and discover new opportunities tailored to your goals.
          </p>
        </div>
        <div className="mt-6 md:mt-0 flex flex-col sm:flex-row gap-3">
          <Link to="/jobseeker/dashboard">
            <Button variant="outline" className="flex items-center hover:bg-white/50 transition-colors">
              <Briefcase className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Button 
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            onClick={onEditProfile}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
