
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Building, Users, Calendar } from "lucide-react";

interface CompanyInfoCardProps {
  company: {
    name: string;
    size: string;
    industry: string;
    founded: string;
    website: string;
  };
}

export const CompanyInfoCard = ({ company }: CompanyInfoCardProps) => {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-xl opacity-15 group-hover:opacity-25 transition-opacity duration-300"></div>
      <Card className="relative bg-slate-800/50 border border-slate-700/50 rounded-2xl backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center gap-3">
            <Building className="h-6 w-6 text-indigo-400" />
            Company Info
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
            <Building className="h-5 w-5 text-indigo-400" />
            <span className="text-slate-300 font-medium">{company.name}</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
            <Users className="h-5 w-5 text-blue-400" />
            <span className="text-slate-300">{company.size}</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
            <Calendar className="h-5 w-5 text-purple-400" />
            <span className="text-slate-300">Founded {company.founded}</span>
          </div>
          <div className="p-3 bg-gradient-to-r from-slate-800/40 to-slate-700/40 rounded-lg border border-slate-600/30">
            <div className="text-sm text-slate-400 mb-1">Industry</div>
            <div className="text-slate-300 font-medium">{company.industry}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
