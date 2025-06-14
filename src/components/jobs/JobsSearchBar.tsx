
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";

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
    <div className="flex flex-col md:flex-row gap-3 mb-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search jobs, companies, or skills..."
          className="pl-10 career-card border-0 shadow-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Button 
        variant="outline" 
        className="flex items-center gap-2 career-card border-0 shadow-md"
        onClick={() => setFiltersVisible(!filtersVisible)}
      >
        <Filter className="h-4 w-4" />
        Filters
        {activeFiltersCount > 0 && (
          <Badge className="ml-1 bg-primary">{activeFiltersCount}</Badge>
        )}
      </Button>
    </div>
  );
};
