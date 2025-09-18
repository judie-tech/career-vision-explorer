import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { linkedInOAuthService } from '@/services/linkedin-oauth.service';
import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

const LinkedInCallback: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setTokens } = useAuth();

  useEffect(() => {
    let isProcessing = false;
    
    const handleCallback = async () => {
      if (isProcessing) {
        console.log('🔍 LinkedInCallback: Already processing, skipping');
        return;
      }
      
      isProcessing = true;
      try {
        console.log('🔍 LinkedInCallback: Starting callback handling');
        console.log('🔍 Current URL:', window.location.href);
        console.log('🔍 URL hash:', window.location.hash);
        console.log('🔍 URL search:', window.location.search);
        
        // Check if Supabase is configured
        if (!isSupabaseConfigured() || !supabase) {
          throw new Error('Supabase is not configured');
        }

        // Handle the OAuth callback with Supabase
        // Check for URL hash parameters (Supabase OAuth uses hash fragments)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        const error = hashParams.get('error');
        const errorDescription = hashParams.get('error_description');
        
        console.log('🔍 Hash params:', {
          accessToken: accessToken ? 'present' : 'missing',
          refreshToken: refreshToken ? 'present' : 'missing',
          error,
          errorDescription
        });
        
        if (error) {
          throw new Error(`OAuth error: ${error} - ${errorDescription}`);
        }
        
        if (!accessToken) {
          console.log('🔍 No access token in hash, trying to get session from Supabase');
          // Try to get session from Supabase
          const { data, error: sessionError } = await supabase.auth.getSession();
          
          if (sessionError) {
            console.error('Session error:', sessionError);
            throw sessionError;
          }
          
          const session = data.session;
          console.log('🔍 Supabase session:', session ? 'found' : 'not found');
          
          if (!session) {
            throw new Error('No session found after OAuth callback');
          }
          
          // Process the session
          await processSession(session);
        } else {
          console.log('🔍 Found access token in hash, creating session object');
          // We have tokens from URL hash, create a session object
          const session = {
            access_token: accessToken,
            refresh_token: refreshToken,
            user: {
              id: hashParams.get('user_id') || '',
              email: hashParams.get('email') || '',
              user_metadata: {}
            }
          };
          
          console.log('🔍 Created session object:', session);
          await processSession(session);
        }
        
        async function processSession(session: any) {
          console.log('🔍 Processing session:', session);
          
          if (session && session.user) {
            console.log('✅ Valid session found, sending to backend');
            console.log('🔍 Session data:', {
              access_token: session.access_token ? 'present' : 'missing',
              user_id: session.user.id,
              email: session.user.email
            });
            
            // Send session to backend for token exchange
            const requestBody = {
              supabase_access_token: session.access_token,
              supabase_user_id: session.user.id,
              email: session.user.email,
              account_type: 'job_seeker', // Default account type
              user_metadata: session.user.user_metadata
            };
            
            console.log('🔍 Sending request to backend:', requestBody);
            
            const response = await fetch('/api/v1/auth/linkedin/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(requestBody),
            });
            
            console.log('🔍 Backend response status:', response.status);
            
            if (!response.ok) {
              const errorText = await response.text();
              console.error('❌ Backend error:', errorText);
              throw new Error(`Backend verification failed: ${response.statusText} - ${errorText}`);
            }
            
            const tokens = await response.json();
            console.log('🔍 Backend tokens received:', tokens);
            
            if (tokens.access_token && tokens.refresh_token) {
              console.log('✅ Setting tokens and redirecting');
              setTokens(tokens.access_token, tokens.refresh_token);
              
              toast.success('LinkedIn authentication successful!', {
                description: 'Welcome to Visiondrill!'
              });
              
              // Determine redirect based on account type
              const accountType = tokens.account_type || 'job_seeker';
              console.log('🔍 Redirecting to account type:', accountType);
              
              if (accountType === 'employer') {
                navigate('/employer/dashboard');
              } else if (accountType === 'freelancer') {
                navigate('/freelancer/dashboard');
              } else {
                navigate('/jobseeker/dashboard');
              }
            } else {
              console.error('❌ No tokens received from backend');
              throw new Error('No tokens received from backend');
            }
          } else {
            console.error('❌ Invalid session data:', session);
            throw new Error('Invalid session data');
          }
        }
      } catch (error: any) {
        console.error('Callback handling failed:', error);
        toast.error('Authentication failed', {
          description: error.message || 'Failed to complete LinkedIn login. Please try again.'
        });
        navigate('/login?error=auth_failed');
      } finally {
        isProcessing = false;
      }
    };

    handleCallback();
    
    // Cleanup function
    return () => {
      isProcessing = false;
    };
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
