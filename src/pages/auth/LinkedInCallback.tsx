import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { linkedInOAuthService } from '@/services/linkedin-oauth.service';
import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const LinkedInCallback: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setTokens } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const queryParams = new URLSearchParams(location.search);
      const code = queryParams.get('code');
      const state = queryParams.get('state');
      const error = queryParams.get('error');

      if (error) {
        console.error('LinkedIn OAuth error:', error);
        toast.error('LinkedIn authentication failed', {
          description: error === 'user_cancelled' 
            ? 'You cancelled the authentication process.' 
            : 'An error occurred during authentication.'
        });
        navigate('/login');
        return;
      }

      if (code && state) {
        try {
          const response = await linkedInOAuthService.handleCallback(code, state);
          
          // Store tokens in auth context
          setTokens(response.access_token, response.refresh_token);
          
          // If this is running in a popup, store tokens temporarily and close
          if (window.opener) {
            localStorage.setItem('linkedin_access_token', response.access_token);
            localStorage.setItem('linkedin_refresh_token', response.refresh_token);
            window.close();
          } else {
            // Redirect to dashboard or onboarding
            toast.success('LinkedIn authentication successful!', {
              description: 'Welcome to Visiondrill!'
            });
            navigate('/dashboard');
          }
        } catch (error) {
          console.error('Callback handling failed:', error);
          navigate('/login?error=auth_failed');
        }
      } else {
        console.error('Missing code or state in callback');
        navigate('/login?error=invalid_callback');
      }
    };

    handleCallback();
  }, [location, navigate, setTokens]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-career-blue" />
        <h2 className="mt-4 text-lg font-semibold">Completing LinkedIn authentication...</h2>
        <p className="mt-2 text-sm text-gray-600">Please wait while we process your login.</p>
      </div>
    </div>
  );
};

export default LinkedInCallback;
