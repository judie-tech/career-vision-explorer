import React from 'react';
import { useProfile } from '@/hooks/use-user-profile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const ProfileDebugger = () => {
  const { profile, isLoading, error, refreshProfile } = useProfile();

  return (
    <Card className="m-4 border-2 border-red-500">
      <CardHeader className="bg-red-50">
        <CardTitle className="text-red-700">🔍 Profile Debugger (Dev Only)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-4">
        <div>
          <h3 className="font-semibold text-sm mb-2">Loading State:</h3>
          <Badge variant={isLoading ? "destructive" : "success"}>
            {isLoading ? "Loading..." : "Loaded"}
          </Badge>
        </div>

        {error && (
          <div className="bg-red-100 p-2 rounded">
            <h3 className="font-semibold text-sm text-red-700">Error:</h3>
            <p className="text-xs text-red-600">{error}</p>
          </div>
        )}

        <div>
          <h3 className="font-semibold text-sm mb-2">Profile Data:</h3>
          {profile ? (
            <div className="space-y-2 text-xs">
              <p><strong>User ID:</strong> {profile.user_id}</p>
              <p><strong>Name:</strong> {profile.name || 'Not set'}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Location:</strong> {profile.location || 'Not set'}</p>
              <p><strong>Account Type:</strong> {profile.account_type}</p>
              <p><strong>Profile Completion:</strong> {profile.profile_completion_percentage}%</p>
            </div>
          ) : (
            <p className="text-xs text-gray-500">No profile data</p>
          )}
        </div>

        <div>
          <h3 className="font-semibold text-sm mb-2">Skills ({profile?.skills?.length || 0}):</h3>
          {profile?.skills && profile.skills.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {profile.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-500">No skills found</p>
          )}
        </div>

        <div className="pt-2 border-t">
          <Button 
            size="sm" 
            onClick={() => {
              console.log('Full profile object:', profile);
              refreshProfile();
            }}
            className="w-full"
          >
            Log Profile & Refresh
          </Button>
        </div>

        <div className="text-xs text-gray-500 mt-2">
          <p>💡 Check browser console for detailed logs</p>
          <p>💡 Profile should have skills for recommendations to work</p>
        </div>
      </CardContent>
    </Card>
  );
};
