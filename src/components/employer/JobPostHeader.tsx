
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const JobPostHeader = () => {
  return (
    <div className="flex justify-between mb-6">
      <h2 className="text-2xl font-bold text-gray-900">Job Listings</h2>
      <Button>
        <Plus className="h-4 w-4 mr-2" />
        Post New Job
      </Button>
    </div>
  );
};
