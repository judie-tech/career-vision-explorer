
import AdminLayout from "@/components/admin/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Book, Smartphone } from "lucide-react";
import { ApiDocumentationCard } from "@/components/admin/api/ApiDocumentationCard";
import { ApiEndpointsTable } from "@/components/admin/api/ApiEndpointsTable";
import { IntegrationGuideCard } from "@/components/admin/api/IntegrationGuideCard";

const AdminAPI = () => {
  const apiEndpoints = [
    {
      category: "Jobs API",
      endpoints: [
        { 
          method: "GET", 
          path: "/api/jobs", 
          description: "Search jobs with filters",
          params: ["query", "location", "type", "experienceLevel", "skills", "salaryMin", "salaryMax", "page", "limit"],
          example: `const results = await JobsApi.searchJobs({
  query: 'frontend developer',
  location: 'Nairobi',
  experienceLevel: 'Mid'
});`,
          response: `{
  "jobs": [...],
  "total": 150,
  "page": 1,
  "limit": 10
}`
        },
        { 
          method: "GET", 
          path: "/api/jobs/:id", 
          description: "Get job by ID",
          params: ["id"],
          example: `const job = await JobsApi.getJobById('job123');`,
          response: `{
  "id": "job123",
  "title": "Frontend Developer",
  "company": "TechCorp",
  ...
}`
        },
        { 
          method: "POST", 
          path: "/api/jobs/:id/save", 
          description: "Save job to wishlist",
          params: ["id"],
          example: `await JobsApi.saveJob('job123');`
        },
        { 
          method: "POST", 
          path: "/api/jobs/:id/apply", 
          description: "Apply to job",
          params: ["id", "coverLetter", "resume"],
          example: `await JobsApi.applyToJob('job123', {
  coverLetter: 'Dear Hiring Manager...',
  resume: 'resume_file_id'
});`
        },
      ]
    },
    {
      category: "Profile API",
      endpoints: [
        { 
          method: "GET", 
          path: "/api/profile", 
          description: "Get user profile",
          example: `const profile = await ProfileApi.getProfile();`
        },
        { 
          method: "PUT", 
          path: "/api/profile", 
          description: "Update user profile",
          params: ["name", "bio", "skills", "location", "phone"],
          example: `const updated = await ProfileApi.updateProfile({
  name: 'John Doe',
  bio: 'Updated bio'
});`
        },
        { 
          method: "POST", 
          path: "/api/profile/image", 
          description: "Upload profile image",
          params: ["imageFile"],
          example: `const imageUrl = await ProfileApi.uploadProfileImage(file);`
        },
        { 
          method: "POST", 
          path: "/api/profile/resume", 
          description: "Upload resume",
          params: ["resumeFile"],
          example: `const resumeId = await ProfileApi.uploadResume(file);`
        },
      ]
    },
    {
      category: "Applications API",
      endpoints: [
        { 
          method: "GET", 
          path: "/api/applications", 
          description: "Get all applications",
          example: `const applications = await ApplicationsApi.getApplications();`
        },
        { 
          method: "POST", 
          path: "/api/applications", 
          description: "Submit new application",
          params: ["jobId", "coverLetter", "resume", "customAnswers"],
          example: `const app = await ApplicationsApi.submitApplication({
  jobId: 'job123',
  coverLetter: 'My cover letter...'
});`
        },
        { 
          method: "PUT", 
          path: "/api/applications/:id/status", 
          description: "Update application status",
          params: ["id", "status"],
          example: `await ApplicationsApi.updateApplicationStatus('app123', 'Interview');`
        },
        { 
          method: "DELETE", 
          path: "/api/applications/:id", 
          description: "Withdraw application",
          params: ["id"],
          example: `await ApplicationsApi.withdrawApplication('app123');`
        },
      ]
    },
    {
      category: "Career Paths API",
      endpoints: [
        { 
          method: "GET", 
          path: "/api/career-paths", 
          description: "Get all career paths",
          example: `const paths = await CareerPathsApi.getCareerPaths();`
        },
        { 
          method: "GET", 
          path: "/api/career-paths/:id", 
          description: "Get career path by ID",
          params: ["id"],
          example: `const path = await CareerPathsApi.getCareerPathById('path123');`
        },
        { 
          method: "POST", 
          path: "/api/career-paths/:id/enroll", 
          description: "Enroll in career path",
          params: ["id"],
          example: `await CareerPathsApi.enrollInCareerPath('path123');`
        },
        { 
          method: "PUT", 
          path: "/api/career-paths/:pathId/steps/:stepId", 
          description: "Update step progress",
          params: ["pathId", "stepId", "completed"],
          example: `await CareerPathsApi.updateStepProgress('path123', 'step456', true);`
        },
      ]
    },
    {
      category: "Skills API",
      endpoints: [
        { 
          method: "GET", 
          path: "/api/skills", 
          description: "Get user skills",
          example: `const skills = await SkillsApi.getUserSkills();`
        },
        { 
          method: "POST", 
          path: "/api/skills", 
          description: "Add new skill",
          params: ["name", "category", "level"],
          example: `const skill = await SkillsApi.addSkill('Vue.js', 'Frontend');`
        },
        { 
          method: "POST", 
          path: "/api/skills/:id/assess", 
          description: "Start skill assessment",
          params: ["id"],
          example: `const questions = await SkillsApi.startSkillAssessment('skill123');`
        },
        { 
          method: "POST", 
          path: "/api/skills/:id/submit", 
          description: "Submit skill assessment",
          params: ["id", "answers"],
          example: `const result = await SkillsApi.submitSkillAssessment('skill123', [0, 2, 1, 3]);`
        },
      ]
    }
  ];

  const mobileEndpoints = [
    {
      category: "Mobile Config",
      endpoints: [
        { 
          method: "GET", 
          path: "/api/mobile/config", 
          description: "Get mobile app configuration",
          example: `const config = await MobileApi.getAppConfig();`,
          response: `{
  "appVersion": "1.0.0",
  "apiVersion": "v1",
  "features": ["offline_mode", "push_notifications"],
  "maintenanceMode": false
}`
        },
        { 
          method: "GET", 
          path: "/api/mobile/updates", 
          description: "Check for app updates",
          example: `const update = await MobileApi.checkForUpdates();`,
          response: `{
  "hasUpdate": false
}`
        },
      ]
    },
    {
      category: "Push Notifications",
      endpoints: [
        { 
          method: "POST", 
          path: "/api/mobile/notifications/register", 
          description: "Register device for notifications",
          params: ["deviceToken", "platform", "userId"],
          example: `await MobileApi.registerForPushNotifications(deviceToken);`
        },
        { 
          method: "POST", 
          path: "/api/mobile/notifications/send", 
          description: "Send push notification",
          params: ["title", "body", "data", "scheduledAt"],
          example: `await MobileApi.sendPushNotification({
  title: "New Job Match",
  body: "We found 3 new jobs for you"
});`
        },
      ]
    },
    {
      category: "Offline Sync",
      endpoints: [
        { 
          method: "GET", 
          path: "/api/mobile/sync", 
          description: "Download offline data",
          example: `const data = await MobileApi.syncOfflineData();`,
          response: `{
  "jobs": [...],
  "profile": {...},
  "applications": [...],
  "lastSync": "2024-06-15T10:00:00Z"
}`
        },
        { 
          method: "POST", 
          path: "/api/mobile/sync", 
          description: "Upload offline changes",
          params: ["applications", "profileUpdates"],
          example: `await MobileApi.uploadOfflineData({
  applications: [...],
  profileUpdates: {...}
});`
        },
      ]
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            API Management
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Comprehensive API documentation and endpoints for both web and mobile applications.
          </p>
        </div>

        <Tabs defaultValue="endpoints" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="endpoints" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              API Endpoints
            </TabsTrigger>
            <TabsTrigger value="documentation" className="flex items-center gap-2">
              <Book className="h-4 w-4" />
              Documentation
            </TabsTrigger>
            <TabsTrigger value="mobile" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              Mobile API
            </TabsTrigger>
          </TabsList>

          <TabsContent value="endpoints" className="space-y-6">
            <div className="grid gap-6">
              {apiEndpoints.map((category) => (
                <ApiEndpointsTable 
                  key={category.category}
                  category={category.category}
                  endpoints={category.endpoints}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="documentation" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <ApiDocumentationCard
                title="Website API Documentation"
                description="Complete documentation for the main website API endpoints"
                features={[
                  "REST API endpoints",
                  "Request/Response schemas", 
                  "Authentication guide",
                  "Error handling",
                  "Code examples"
                ]}
                docPath="/docs/website-api.md"
                icon={Book}
                color="#3B82F6"
              />

              <ApiDocumentationCard
                title="Mobile API Documentation"
                description="Mobile-specific API documentation for Capacitor apps"
                features={[
                  "Push notifications",
                  "Offline sync",
                  "App updates",
                  "Native features",
                  "Capacitor integration"
                ]}
                docPath="/docs/mobile-api.md"
                icon={Smartphone}
                color="#10B981"
              />

              <div className="md:col-span-2">
                <IntegrationGuideCard />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="mobile" className="space-y-6">
            <div className="grid gap-6">
              {mobileEndpoints.map((category) => (
                <ApiEndpointsTable 
                  key={category.category}
                  category={category.category}
                  endpoints={category.endpoints}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminAPI;
