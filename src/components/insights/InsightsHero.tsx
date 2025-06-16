
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

const InsightsHero = () => {
  return (
    <div className="text-center mb-8 sm:mb-12">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
        <Badge variant="secondary" className="text-xs sm:text-sm font-medium px-2 sm:px-3 py-1">
          Market Intelligence
        </Badge>
      </div>
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
        Market Insights & Analytics
      </h1>
      <p className="text-sm sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
        Discover comprehensive market trends, salary benchmarks, and in-demand skills 
        to make informed career decisions and stay ahead of the competition.
      </p>
    </div>
  );
};

export default InsightsHero;
