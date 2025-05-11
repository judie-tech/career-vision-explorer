
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Tag } from "lucide-react";

interface JobListingProps {
  featuredJobs: Array<{
    id: number;
    title: string;
    company: string;
    location: string;
    salary: string;
    tags: string[];
  }>;
}

const JobListingSection = ({ featuredJobs }: JobListingProps) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Featured Jobs</h2>
          <p className="mt-4 text-xl text-gray-500">Explore top opportunities matched to your profile</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {featuredJobs.map((job) => (
            <Link key={job.id} to={`/jobs/${job.id}`} className="block hover:no-underline">
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                <p className="text-gray-600 font-medium mt-1">{job.company}</p>
                
                <div className="flex items-center mt-4 text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{job.location}</span>
                </div>
                
                <div className="flex items-center mt-2 text-gray-500">
                  <DollarSign className="h-4 w-4 mr-1" />
                  <span className="text-sm">{job.salary}</span>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-gray-100 text-gray-800">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobListingSection;
