import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const DebugAuth = () => {
  const { user, isAuthenticated, profile, isLoading } = useAuth();
  const navigate = useNavigate();

  return (
    <Card className="fixed bottom-4 right-4 w-96 z-50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-sm">Auth Debug Info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-xs">
        <div>
          <strong>Loading:</strong> {isLoading ? "Yes" : "No"}
        </div>
        <div>
          <strong>Authenticated:</strong> {isAuthenticated ? "Yes" : "No"}
        </div>
        <div>
          <strong>User:</strong> {user ? JSON.stringify(user, null, 2) : "null"}
        </div>
        <div>
          <strong>Account Type:</strong> {user?.account_type || "N/A"}
        </div>
        <div>
          <strong>Profile Available:</strong> {profile ? "Yes" : "No"}
        </div>
        <div className="flex gap-2 mt-4">
          <Button size="sm" onClick={() => navigate("/profile")}>
            Go to Profile
          </Button>
          <Button size="sm" variant="outline" onClick={() => window.location.reload()}>
            Refresh
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DebugAuth;
