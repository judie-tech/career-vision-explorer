
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ApplicationStatsCardProps {
  applicationStats: {
    total: number;
    active: number;
    interviews: number;
    offers: number;
  };
}

const ApplicationStatsCard = ({ applicationStats }: ApplicationStatsCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Job Application Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-3 rounded-md text-center">
            <p className="text-2xl font-bold text-blue-700">{applicationStats.total}</p>
            <p className="text-sm text-gray-500">Total Applications</p>
          </div>
          <div className="bg-amber-50 p-3 rounded-md text-center">
            <p className="text-2xl font-bold text-amber-700">{applicationStats.active}</p>
            <p className="text-sm text-gray-500">Active</p>
          </div>
          <div className="bg-purple-50 p-3 rounded-md text-center">
            <p className="text-2xl font-bold text-purple-700">{applicationStats.interviews}</p>
            <p className="text-sm text-gray-500">Interviews</p>
          </div>
          <div className="bg-green-50 p-3 rounded-md text-center">
            <p className="text-2xl font-bold text-green-700">{applicationStats.offers}</p>
            <p className="text-sm text-gray-500">Offers</p>
          </div>
        </div>
        <div className="mt-4">
          <Link to="/admin/jobseeker">
            <Button variant="outline" className="w-full">
              View Applications
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationStatsCard;
