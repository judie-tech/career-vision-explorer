import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Users } from "lucide-react";

interface JobDetailsViewProps {
  job: any;
}

const fallbackText = (value: any) => {
  if (value === null || value === undefined || value === "") {
    return "N/A";
  }
  return value;
};

export const JobDetailsView = ({ job }: JobDetailsViewProps) => {
  if (!job) return null;

  return (
    <Card className="career-card bg-white shadow-md">
      <CardContent className="p-8 space-y-8">
        {/* Job Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-md shadow-inner">
          <div>
            <label className="block font-semibold mb-1">Job ID</label>
            <p>{fallbackText(job.job_id)}</p>
          </div>
          <div>
            <label className="block font-semibold mb-1">Title</label>
            <p>{fallbackText(job.title)}</p>
          </div>
          <div>
            <label className="block font-semibold mb-1">Company</label>
            <p>{fallbackText(job.company)}</p>
          </div>
          <div>
            <label className="block font-semibold mb-1">Location</label>
            <p>{fallbackText(job.location)}</p>
          </div>
          <div>
            <label className="block font-semibold mb-1">Salary Range</label>
            <p>{fallbackText(job.salary_range || job.salary)}</p>
          </div>
          <div>
            <label className="block font-semibold mb-1">Posted By</label>
            <p>{fallbackText(job.posted_by)}</p>
          </div>
          <div>
            <label className="block font-semibold mb-1">Job Type</label>
            <p>{fallbackText(job.job_type || job.type)}</p>
          </div>
          <div>
            <label className="block font-semibold mb-1">Experience Level</label>
            <p>{fallbackText(job.experience_level || job.experienceLevel)}</p>
          </div>
          <div>
            <label className="block font-semibold mb-1">Application Deadline</label>
            <p>{fallbackText(job.application_deadline || job.applicationDeadline)}</p>
          </div>
          <div>
            <label className="block font-semibold mb-1">Is Active</label>
            <p>{job.is_active ? "Yes" : "No"}</p>
          </div>
          <div>
            <label className="block font-semibold mb-1">Remote Friendly</label>
            <p>{job.remote_friendly ? "Yes" : "No"}</p>
          </div>
          <div>
            <label className="block font-semibold mb-1">Match Score</label>
            <Badge>{fallbackText(job.match_score || job.matchScore || 0)}%</Badge>
          </div>
          <div>
            <label className="block font-semibold mb-1">Created At</label>
            <p>{fallbackText(job.created_at)}</p>
          </div>
          <div>
            <label className="block font-semibold mb-1">Updated At</label>
            <p>{fallbackText(job.updated_at)}</p>
          </div>
        </div>

        <Separator />

        {/* Description */}
        <div className="bg-gray-50 p-6 rounded-md shadow-inner">
          <label className="block font-semibold mb-1">Description</label>
          <p>{job.description ? job.description : "N/A"}</p>
        </div>

        {/* Skills Required */}
        <div className="bg-gray-50 p-6 rounded-md shadow-inner">
          <label className="block font-semibold mb-1">Skills Required</label>
          {job.skills_required?.length || job.skills?.length ? (
            <ul className="list-disc list-inside">
              {(job.skills_required || job.skills || []).map((skill: string, index: number) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          ) : (
            <p>N/A</p>
          )}
        </div>

        {/* Requirements */}
        <div className="bg-gray-50 p-6 rounded-md shadow-inner">
          <label className="block font-semibold mb-1">Requirements</label>
          {job.requirements ? (
            <ul className="list-disc list-inside">
              {(typeof job.requirements === "string" ? job.requirements.split(/\r?\n|,/) : job.requirements).map((req: string, index: number) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          ) : (
            <p>N/A</p>
          )}
        </div>

        {/* Responsibilities */}
        <div className="bg-gray-50 p-6 rounded-md shadow-inner">
          <label className="block font-semibold mb-1">Responsibilities</label>
          {job.responsibilities?.length ? (
            <ul className="list-disc list-inside">
              {job.responsibilities.map((resp: string, index: number) => (
                <li key={index}>{resp}</li>
              ))}
            </ul>
          ) : (
            <p>N/A</p>
          )}
        </div>

        {/* Benefits */}
        <div className="bg-gray-50 p-6 rounded-md shadow-inner">
          <label className="block font-semibold mb-1">Benefits</label>
          {job.benefits?.length ? (
            <ul className="list-disc list-inside">
              {job.benefits.map((benefit: string, index: number) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          ) : (
            <p>N/A</p>
          )}
        </div>

        <Separator />

        {/* Company Info */}
        <div className="bg-gray-50 p-6 rounded-md shadow-inner">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            Company Info
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold mb-1">Size</label>
              <p>{fallbackText(job.company_size)}</p>
            </div>
            <div>
              <label className="block font-semibold mb-1">Industry</label>
              <p>{fallbackText(job.company_industry)}</p>
            </div>
            <div>
              <label className="block font-semibold mb-1">Founded</label>
              <p>{fallbackText(job.company_founded)}</p>
            </div>
            <div>
              <label className="block font-semibold mb-1">Website</label>
              {job.company_website ? (
                <a href={job.company_website} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  {job.company_website}
                </a>
              ) : (
                <p>N/A</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};