
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, Briefcase } from "lucide-react";

interface JobsSearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filtersVisible: boolean;
  setFiltersVisible: (visible: boolean) => void;
  activeFiltersCount: number;
}

export const JobsSearchBar = ({
  searchTerm,
  setSearchTerm,
  filtersVisible,
  setFiltersVisible,
  activeFiltersCount
}: JobsSearchBarProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Main Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search jobs, companies, or skills..."
            className="pl-12 h-12 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Quick Filters */}
        <div className="flex gap-3 items-center">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 h-12 px-6 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
          >
            <MapPin className="h-4 w-4" />
            Location
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2 h-12 px-6 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
          >
            <Briefcase className="h-4 w-4" />
            Job Type
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2 h-12 px-6 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
            onClick={() => setFiltersVisible(!filtersVisible)}
          >
            <Filter className="h-4 w-4" />
            All Filters
            {activeFiltersCount > 0 && (
              <Badge className="ml-2 bg-blue-500 hover:bg-blue-600 text-white border-0 px-2 py-1 text-xs font-bold">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
