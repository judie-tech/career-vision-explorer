import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { interviewService } from '@/services/interview.service';
import { toast } from 'sonner';

const TestInterview = () => {
  const { profile } = useAuth();
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testEndpoint = async () => {
    if (!profile) {
      toast.error('No profile loaded');
      return;
    }

    setLoading(true);
    try {
      const response = await interviewService.getProfileBasedQuestions({
        question_count: 5,
        focus_areas: ['Technical', 'Behavioral']
      });
      
      setResult(response);
      toast.success('Successfully generated questions!');
    } catch (error: any) {
      console.error('Error:', error);
      toast.error(`Error: ${error.message || 'Unknown error'}`);
      setResult({ error: error.message || error.toString() });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Test Interview Question Generation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold">Profile Status:</h3>
            <pre className="bg-gray-100 p-2 rounded text-xs">
              {profile ? JSON.stringify({
                user_id: profile.user_id,
                name: profile.name,
                skills: profile.skills?.length || 0,
                experience_years: profile.experience_years,
                work_experience: profile.work_experience?.length || 0
              }, null, 2) : 'No profile loaded'}
            </pre>
          </div>

          <Button onClick={testEndpoint} disabled={loading || !profile}>
            {loading ? 'Testing...' : 'Test Interview Endpoint'}
          </Button>

          {result && (
            <div>
              <h3 className="font-semibold">Result:</h3>
              <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto max-h-96">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TestInterview;
