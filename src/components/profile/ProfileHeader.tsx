
import { Button } from "@/components/ui/button";
import { User, Settings, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

interface ProfileHeaderProps {
  userName: string;
  userRole: string;
  userEducation: string;
  userExperience: string;
}

const ProfileHeader = ({ userName, userRole, userEducation, userExperience }: ProfileHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-gray-500">Manage your career profile and track your progress</p>
      </div>
      <div className="mt-4 md:mt-0 flex gap-2">
        <Link to="/admin/jobseeker">
          <Button variant="outline" className="flex items-center">
            <Briefcase className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
        </Link>
        <Button variant="outline" className="flex items-center">
          <Settings className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </div>
    </div>
  );
};

export default ProfileHeader;
