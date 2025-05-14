
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { NewJobPostDialog } from "./NewJobPostDialog";
import { FilterDropdown, FilterSettings } from "./FilterDropdown";
import { useJobPosts } from "@/hooks/use-job-posts";

export const JobPostHeader = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { updateFilters } = useJobPosts();
  
  const handleFilterChange = (filters: FilterSettings) => {
    updateFilters(filters);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    updateFilters({ searchQuery: e.target.value });
  };

  return (
    <div className="mb-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Job Listings</h2>
        <NewJobPostDialog />
      </div>
      <div className="flex gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search job listings..."
            className="pl-8"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <FilterDropdown onFilterChange={handleFilterChange} />
      </div>
    </div>
  );
};
