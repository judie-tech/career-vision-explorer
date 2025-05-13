
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users, LineChart, Clock } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  iconColor: string;
}

const StatCard = ({ title, value, subtitle, icon, iconColor }: StatCardProps) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex items-center">
        <div className={`h-8 w-8 ${iconColor} mr-2`}>{icon}</div>
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export const StatisticsCards = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
      <StatCard
        title="Active Listings"
        value={8}
        subtitle="3 boosted listings"
        icon={<Briefcase className="h-8 w-8" />}
        iconColor="text-career-blue"
      />
      <StatCard
        title="Total Applicants"
        value={64}
        subtitle="+12 this week"
        icon={<Users className="h-8 w-8" />}
        iconColor="text-career-purple"
      />
      <StatCard
        title="Interviews Scheduled"
        value={15}
        subtitle="5 this week"
        icon={<Clock className="h-8 w-8" />}
        iconColor="text-green-600"
      />
      <StatCard
        title="Listing Views"
        value="1,248"
        subtitle="+18% from last month"
        icon={<LineChart className="h-8 w-8" />}
        iconColor="text-amber-500"
      />
    </div>
  );
};
