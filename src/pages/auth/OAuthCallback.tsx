import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { toast } from '@/components/ui/sonner';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const OAuthCallback = () => {
  const { handleOAuthCallback } = useAuth();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processCallback = async () => {
      try {
        await handleOAuthCallback();
        // The handleOAuthCallback function will handle the redirect
      } catch (error: any) {
        console.error('OAuth callback error:', error);
        setError(error.message || 'Failed to complete authentication');
        setIsProcessing(false);
      }
    };

    processCallback();
  }, [handleOAuthCallback]);

  if (error) {
    return (
      <Layout>
        <div className="max-w-md mx-auto px-4 py-12">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-red-600">
                Authentication Failed
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.href = '/login'}
                className="bg-career-blue text-white px-4 py-2 rounded-md hover:bg-career-blue/90 transition-colors"
              >
                Return to Login
              </button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto px-4 py-12">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Completing Authentication
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-career-blue" />
              <p className="text-gray-600">
                Please wait while we complete your LinkedIn authentication...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default OAuthCallback;
