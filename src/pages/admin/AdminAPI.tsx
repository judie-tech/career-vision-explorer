
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, Code, Book, Smartphone } from "lucide-react";
import { toast } from "sonner";

const AdminAPI = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const apiEndpoints = [
    {
      category: "Jobs API",
      endpoints: [
        { method: "GET", path: "/api/jobs", description: "Search jobs with filters" },
        { method: "GET", path: "/api/jobs/:id", description: "Get job by ID" },
        { method: "POST", path: "/api/jobs/:id/save", description: "Save job to wishlist" },
        { method: "POST", path: "/api/jobs/:id/apply", description: "Apply to job" },
      ]
    },
    {
      category: "Profile API",
      endpoints: [
        { method: "GET", path: "/api/profile", description: "Get user profile" },
        { method: "PUT", path: "/api/profile", description: "Update user profile" },
        { method: "POST", path: "/api/profile/image", description: "Upload profile image" },
        { method: "POST", path: "/api/profile/resume", description: "Upload resume" },
      ]
    },
    {
      category: "Applications API",
      endpoints: [
        { method: "GET", path: "/api/applications", description: "Get all applications" },
        { method: "POST", path: "/api/applications", description: "Submit new application" },
        { method: "PUT", path: "/api/applications/:id/status", description: "Update application status" },
        { method: "DELETE", path: "/api/applications/:id", description: "Withdraw application" },
      ]
    },
    {
      category: "Career Paths API",
      endpoints: [
        { method: "GET", path: "/api/career-paths", description: "Get all career paths" },
        { method: "GET", path: "/api/career-paths/:id", description: "Get career path by ID" },
        { method: "POST", path: "/api/career-paths/:id/enroll", description: "Enroll in career path" },
        { method: "PUT", path: "/api/career-paths/:pathId/steps/:stepId", description: "Update step progress" },
      ]
    },
    {
      category: "Skills API",
      endpoints: [
        { method: "GET", path: "/api/skills", description: "Get user skills" },
        { method: "POST", path: "/api/skills", description: "Add new skill" },
        { method: "POST", path: "/api/skills/:id/assess", description: "Start skill assessment" },
        { method: "POST", path: "/api/skills/:id/submit", description: "Submit skill assessment" },
      ]
    }
  ];

  const mobileEndpoints = [
    {
      category: "Mobile Config",
      endpoints: [
        { method: "GET", path: "/api/mobile/config", description: "Get mobile app configuration" },
        { method: "GET", path: "/api/mobile/updates", description: "Check for app updates" },
      ]
    },
    {
      category: "Push Notifications",
      endpoints: [
        { method: "POST", path: "/api/mobile/notifications/register", description: "Register device for notifications" },
        { method: "POST", path: "/api/mobile/notifications/send", description: "Send push notification" },
      ]
    },
    {
      category: "Offline Sync",
      endpoints: [
        { method: "GET", path: "/api/mobile/sync", description: "Download offline data" },
        { method: "POST", path: "/api/mobile/sync", description: "Upload offline changes" },
      ]
    }
  ];

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET": return "bg-green-100 text-green-800";
      case "POST": return "bg-blue-100 text-blue-800";
      case "PUT": return "bg-yellow-100 text-yellow-800";
      case "DELETE": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            API Management
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Access and manage the Visiondrill API endpoints and documentation for both web and mobile applications.
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
                <Card key={category.category}>
                  <CardHeader>
                    <CardTitle className="text-xl">{category.category}</CardTitle>
                    <CardDescription>
                      Available endpoints for {category.category.toLowerCase()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.endpoints.map((endpoint, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Badge className={getMethodColor(endpoint.method)}>
                              {endpoint.method}
                            </Badge>
                            <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                              {endpoint.path}
                            </code>
                            <span className="text-sm text-gray-600">{endpoint.description}</span>
                          </div>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => copyToClipboard(endpoint.path)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="documentation" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Book className="h-5 w-5" />
                    Website API Documentation
                  </CardTitle>
                  <CardDescription>
                    Complete documentation for the main website API endpoints
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Comprehensive guide covering all website API endpoints, request/response formats, and authentication.
                  </p>
                  <Button className="w-full" onClick={() => window.open('/docs/website-api.md', '_blank')}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Website API Docs
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5" />
                    Mobile API Documentation
                  </CardTitle>
                  <CardDescription>
                    Mobile-specific API documentation for Capacitor apps
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Documentation for mobile-specific features like push notifications, offline sync, and app updates.
                  </p>
                  <Button className="w-full" onClick={() => window.open('/docs/mobile-api.md', '_blank')}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Mobile API Docs
                  </Button>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Integration Guide
                  </CardTitle>
                  <CardDescription>
                    Step-by-step guide for integrating APIs into your applications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Learn how to integrate the APIs with React hooks, state management, error handling, and testing strategies.
                  </p>
                  <Button className="w-full" onClick={() => window.open('/docs/api-integration-guide.md', '_blank')}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Integration Guide
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="mobile" className="space-y-6">
            <div className="grid gap-6">
              {mobileEndpoints.map((category) => (
                <Card key={category.category}>
                  <CardHeader>
                    <CardTitle className="text-xl">{category.category}</CardTitle>
                    <CardDescription>
                      Mobile-specific endpoints for {category.category.toLowerCase()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.endpoints.map((endpoint, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Badge className={getMethodColor(endpoint.method)}>
                              {endpoint.method}
                            </Badge>
                            <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                              {endpoint.path}
                            </code>
                            <span className="text-sm text-gray-600">{endpoint.description}</span>
                          </div>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => copyToClipboard(endpoint.path)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminAPI;
