
import { useState, useMemo } from "react";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  matchScore: number;
  skills: string[];
  description: string;
  experienceLevel?: string;
}

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

export const useJobsFilter = (jobs: Job[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<FilterState>({
    remote: false,
    hybrid: false,
    inPerson: false,
    fullTime: false,
    contract: false,
    highMatch: false,
    entryLevel: false,
    midLevel: false,
    senior: false,
    executive: false
  });
  const [salaryRange, setSalaryRange] = useState<string>("all");
  const [selectedSkills, setSelectedSkills] = useState<SelectedSkills>({
    javascript: false,
    react: false,
  });
  const [filtersVisible, setFiltersVisible] = useState(false);

  const resetFilters = () => {
    setFilter({
      remote: false,
      hybrid: false,
      inPerson: false,
      fullTime: false,
      contract: false,
      highMatch: false,
      entryLevel: false,
      midLevel: false,
      senior: false,
      executive: false
    });
    setSalaryRange("all");
    setSelectedSkills({
      javascript: false,
      react: false,
    });
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      // Search filter
      if (searchTerm && !job.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !job.company.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))) {
        return false;
      }
      
      // Work Style filters
      if (filter.remote && !job.location.toLowerCase().includes("remote")) {
        return false;
      }
      
      if (filter.hybrid && !job.location.toLowerCase().includes("hybrid")) {
        return false;
      }
      
      if (filter.inPerson && (job.location.toLowerCase().includes("remote") || job.location.toLowerCase().includes("hybrid"))) {
        return false;
      }
      
      // Job Type filters
      if (filter.fullTime && !job.type.toLowerCase().includes("full-time")) {
        return false;
      }
      
      if (filter.contract && !job.type.toLowerCase().includes("contract")) {
        return false;
      }
      
      // Experience Level filters
      if (filter.entryLevel && job.experienceLevel !== "Entry Level") {
        return false;
      }
      
      if (filter.midLevel && job.experienceLevel !== "Mid Level") {
        return false;
      }
      
      if (filter.senior && job.experienceLevel !== "Senior") {
        return false;
      }
      
      if (filter.executive && job.experienceLevel !== "Executive") {
        return false;
      }
      
      // High match filter
      if (filter.highMatch && job.matchScore < 80) {
        return false;
      }
      
      // Salary range filter
      if (salaryRange !== "all") {
        const minSalary = parseInt(job.salary.match(/\d+/g)?.[0] || "0");
        const maxSalary = parseInt(job.salary.match(/\d+/g)?.[1] || "0");
        
        if (salaryRange === "0-50" && minSalary > 50) {
          return false;
        } else if (salaryRange === "50-100" && (minSalary > 100 || maxSalary < 50)) {
          return false;
        } else if (salaryRange === "100-150" && (minSalary > 150 || maxSalary < 100)) {
          return false;
        } else if (salaryRange === "150+" && maxSalary < 150) {
          return false;
        }
      }
      
      // Skills filters
      if (selectedSkills.javascript && !job.skills.some(skill => skill.toLowerCase() === "javascript")) {
        return false;
      }
      
      if (selectedSkills.react && !job.skills.some(skill => skill.toLowerCase() === "react")) {
        return false;
      }
      
      return true;
    });
  }, [jobs, searchTerm, filter, salaryRange, selectedSkills]);

  const activeFiltersCount = Object.values(filter).filter(Boolean).length + 
    (salaryRange !== "all" ? 1 : 0) + 
    Object.values(selectedSkills).filter(Boolean).length;

  return {
    searchTerm,
    setSearchTerm,
    filter,
    setFilter,
    salaryRange,
    setSalaryRange,
    selectedSkills,
    setSelectedSkills,
    filtersVisible,
    setFiltersVisible,
    filteredJobs,
    activeFiltersCount,
    resetFilters
  };
};
