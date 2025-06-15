
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Eye, Calendar, Star } from "lucide-react";

export const QuickStatsCards = () => {
  const stats = [
    {
      icon: Briefcase,
      value: "12",
      label: "Applications",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Eye,
      value: "3",
      label: "Profile Views",
      gradient: "from-green-500 to-green-600"
    },
    {
      icon: Calendar,
      value: "2",
      label: "Interviews",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: Star,
      value: "85%",
      label: "Profile Score",
      gradient: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className={`h-12 w-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
