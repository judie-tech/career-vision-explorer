
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";

interface FilterState {
  remote: boolean;
  hybrid: boolean;
  inPerson: boolean;
  fullTime: boolean;
  contract: boolean;
  highMatch: boolean;
  entryLevel: boolean;
  midLevel: boolean;
  senior: boolean;
  executive: boolean;
}

interface SelectedSkills {
  javascript: boolean;
  react: boolean;
}

interface JobsFiltersProps {
  filter: FilterState;
  setFilter: (filter: FilterState) => void;
  salaryRange: string;
  setSalaryRange: (range: string) => void;
  selectedSkills: SelectedSkills;
  setSelectedSkills: (skills: SelectedSkills) => void;
  resetFilters: () => void;
}

export const JobsFilters = ({
  filter,
  setFilter,
  salaryRange,
  setSalaryRange,
  selectedSkills,
  setSelectedSkills,
  resetFilters
}: JobsFiltersProps) => {
  return (
    <Card className="mb-4 career-card border-0 shadow-lg">
      <CardContent className="py-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Filters</h3>
          <Button variant="ghost" size="sm" onClick={resetFilters} className="text-sm">
            <X className="h-4 w-4 mr-1" />
            Reset Filters
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <h4 className="font-medium mb-2">Work Style</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remote"
                  checked={filter.remote}
                  onCheckedChange={(checked) => setFilter({...filter, remote: checked === true})}
                />
                <label htmlFor="remote" className="text-sm font-medium">Remote</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="hybrid"
                  checked={filter.hybrid}
                  onCheckedChange={(checked) => setFilter({...filter, hybrid: checked === true})}
                />
                <label htmlFor="hybrid" className="text-sm font-medium">Hybrid</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="inPerson"
                  checked={filter.inPerson}
                  onCheckedChange={(checked) => setFilter({...filter, inPerson: checked === true})}
                />
                <label htmlFor="inPerson" className="text-sm font-medium">In-Person</label>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Experience Level</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="entryLevel"
                  checked={filter.entryLevel}
                  onCheckedChange={(checked) => setFilter({...filter, entryLevel: checked === true})}
                />
                <label htmlFor="entryLevel" className="text-sm font-medium">Entry Level</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="midLevel"
                  checked={filter.midLevel}
                  onCheckedChange={(checked) => setFilter({...filter, midLevel: checked === true})}
                />
                <label htmlFor="midLevel" className="text-sm font-medium">Mid Level</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="senior"
                  checked={filter.senior}
                  onCheckedChange={(checked) => setFilter({...filter, senior: checked === true})}
                />
                <label htmlFor="senior" className="text-sm font-medium">Senior</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="executive"
                  checked={filter.executive}
                  onCheckedChange={(checked) => setFilter({...filter, executive: checked === true})}
                />
                <label htmlFor="executive" className="text-sm font-medium">Executive</label>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Salary Range</h4>
            <Select
              value={salaryRange}
              onValueChange={(value) => setSalaryRange(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ranges</SelectItem>
                <SelectItem value="0-50">0 - 50K KES</SelectItem>
                <SelectItem value="50-100">50K - 100K KES</SelectItem>
                <SelectItem value="100-150">100K - 150K KES</SelectItem>
                <SelectItem value="150+">150K+ KES</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Skills</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="javascript"
                  checked={selectedSkills.javascript}
                  onCheckedChange={(checked) => setSelectedSkills({...selectedSkills, javascript: checked === true})}
                />
                <label htmlFor="javascript" className="text-sm font-medium">JavaScript</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="react"
                  checked={selectedSkills.react}
                  onCheckedChange={(checked) => setSelectedSkills({...selectedSkills, react: checked === true})}
                />
                <label htmlFor="react" className="text-sm font-medium">React</label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="highMatch"
              checked={filter.highMatch}
              onCheckedChange={(checked) => setFilter({...filter, highMatch: checked === true})}
            />
            <label htmlFor="highMatch" className="text-sm font-medium">High Match (80%+)</label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
