
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
    <Card className="career-card">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-3">
          <Building className="h-6 w-6 text-primary" />
          Company Info
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
          <Building className="h-5 w-5 text-primary" />
          <span className="font-medium">{company.name}</span>
        </div>
        <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
          <Users className="h-5 w-5 text-primary" />
          <span className="text-muted-foreground">{company.size}</span>
        </div>
        <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
          <Calendar className="h-5 w-5 text-primary" />
          <span className="text-muted-foreground">Founded {company.founded}</span>
        </div>
        <div className="p-3 bg-muted rounded-lg border">
          <div className="text-sm text-muted-foreground mb-1">Industry</div>
          <div className="font-medium">{company.industry}</div>
        </div>
      </CardContent>
    </Card>
  );
};
