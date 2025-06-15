
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { StatItem } from "@/types/about-content";

interface StatsSectionProps {
  stats: StatItem[];
}

export const StatsSection = ({ stats }: StatsSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistics Section</CardTitle>
        <p className="text-sm text-muted-foreground">Key company metrics and numbers</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
