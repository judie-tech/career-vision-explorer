import React, { useState } from "react";
import {
  FolderOpen,
  Calendar,
  Users,
  MessageSquare,
  MoreVertical,
  Plus,
  Eye,
  UserCheck,
  AlertCircle,
} from "lucide-react";

const ProjectsPage = () => {
  const [activeTab, setActiveTab] = useState("all");

  // Empty projects state (replace with API or DB data later)
  const projects = [];

  const tabs = [
    { id: "all", label: "All Projects", count: projects.length },
    {
      id: "active",
      label: "Active",
      count: projects.filter((p) => p.status === "Active").length,
    },
    {
      id: "review",
      label: "In Review",
      count: projects.filter((p) => p.status === "In Review").length,
    },
    {
      id: "pending",
      label: "Pending",
      count: projects.filter((p) => p.status === "Pending").length,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-blue-100 text-blue-700";
      case "In Review":
        return "bg-blue-100 text-blue-600";
      case "Pending":
        return "bg-blue-50 text-blue-500";
      case "Completed":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-blue-50 text-blue-500";
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return "from-blue-600 to-blue-700";
    if (progress >= 50) return "from-blue-500 to-blue-600";
    return "from-blue-400 to-blue-500";
  };

  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((project) => {
          if (activeTab === "active") return project.status === "Active";
          if (activeTab === "review") return project.status === "In Review";
          if (activeTab === "pending") return project.status === "Pending";
          return true;
        });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full px-6 py-8 space-y-8">
        {/* Header Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white/20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Project Management
              </h1>
              <p className="text-gray-600">
                View listed projects, manage applicants, get freelancer
                recommendations, control deadlines, and communicate with
                assigned freelancers
              </p>
            </div>
            <button className="mt-4 lg:mt-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl">
              <Plus className="h-5 w-5" />
              <span>New Project</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
          <div className="flex items-center space-x-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    activeTab === tab.id ? "bg-blue-200" : "bg-gray-200"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Projects Table */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
          {filteredProjects.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50/50 border-b border-gray-200">
                  <tr>
                    <th className="text-left p-6 text-sm font-semibold text-gray-700">
                      Project
                    </th>
                    <th className="text-left p-6 text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="text-left p-6 text-sm font-semibold text-gray-700">
                      Freelancer
                    </th>
                    <th className="text-left p-6 text-sm font-semibold text-gray-700">
                      Applicants
                    </th>
                    <th className="text-left p-6 text-sm font-semibold text-gray-700">
                      Progress
                    </th>
                    <th className="text-left p-6 text-sm font-semibold text-gray-700">
                      Budget
                    </th>
                    <th className="text-left p-6 text-sm font-semibold text-gray-700">
                      Deadline
                    </th>
                    <th className="text-left p-6 text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Rows will render here when real data is added */}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-gray-100 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <FolderOpen className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No projects yet
              </h3>
              <p className="text-gray-500 mb-6">
                Start your first project by creating a new job posting and
                hiring freelancers
              </p>
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center space-x-2 mx-auto shadow-lg hover:shadow-xl">
                <Plus className="h-5 w-5" />
                <span>Create Project</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
