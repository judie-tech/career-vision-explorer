import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authService } from '../services/auth.service';
import { profileService } from '../services/profile.service';
import { User, UserLogin, UserRegister } from '../types/auth';
import { Profile } from '../types/api';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: UserLogin) => Promise<void>;
  register: (userData: UserRegister) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  hasRole: (role: 'job_seeker' | 'employer' | 'admin' | 'freelancer') => boolean;
  isAdmin: () => boolean;
  isEmployer: () => boolean;
  isJobSeeker: () => boolean;
  isFreelancer: () => boolean;
  setTokens: (accessToken: string, refreshToken: string) => void;
  // LinkedIn OAuth authentication
  signInWithLinkedIn: () => Promise<void>;
  handleOAuthCallback: () => Promise<void>;
  // Impersonation functionality for admin users
  impersonateUser: (targetUser: User) => void;
  stopImpersonation: () => void;
  isImpersonating: boolean;
  originalUser: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [originalUser, setOriginalUser] = useState<User | null>(null);
  const [isImpersonating, setIsImpersonating] = useState(false);

  // Initialize auth state on mount
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const storedUser = authService.getStoredUser();
      console.log('Auth initialization - stored user:', storedUser);
      
      if (storedUser && authService.isAuthenticated()) {
        // First set the stored user
        setUser(storedUser);
        
        // Then try to get fresh user data from the server
        try {
          const freshUser = await authService.getCurrentUser();
          console.log('Auth initialization - fresh user from server:', freshUser);
          authService.setStoredUser(freshUser);
          setUser(freshUser);
        } catch (error) {
          console.error('Failed to get fresh user data:', error);
          // Continue with stored user if fetch fails
        }
        
        await loadUserProfile();
        
        // Check if there's an impersonation session
        const impersonationData = localStorage.getItem('visiondrillImpersonation');
        if (impersonationData) {
          try {
            const { originalUser: storedOriginalUser, impersonatedUser } = JSON.parse(impersonationData);
            setOriginalUser(storedOriginalUser);
            setUser(impersonatedUser);
            setIsImpersonating(true);
            console.log('Restored impersonation session:', { originalUser: storedOriginalUser, impersonatedUser });
          } catch (e) {
            localStorage.removeItem('visiondrillImpersonation');
          }
        }
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      // Clear invalid auth data
      await authService.logout();
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserProfile = async () => {
    try {
      // Increase timeout to 30 seconds for slower connections
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Profile load timeout')), 30000)
      );
      
      const profilePromise = profileService.getProfile();
      const userProfile = await Promise.race([profilePromise, timeoutPromise]) as Profile;
      setProfile(userProfile);
      console.log('Profile loaded successfully:', userProfile);
    } catch (error) {
      console.error('Error loading profile:', error);
      
      // Don't try refresh token on timeout or network errors
      if (error.message?.includes('timeout') || error.message?.includes('fetch') || error.message?.includes('Failed to fetch')) {
        console.warn('Profile load failed due to network issue, continuing without profile');
        setProfile(null);
        // Don't show error toast for timeout/network issues since user can still use the app
        return;
      }
      
      // Check if it's a 404 (profile doesn't exist yet)
      if (error.message?.includes('404') || error.message?.includes('Not Found')) {
        console.warn('Profile not found - user may need to complete profile setup');
        setProfile(null);
        return;
      }
      
      // Only try refresh for auth-related errors (401, 403)
      if (error.message?.includes('401') || error.message?.includes('403') || error.message?.includes('Unauthorized')) {
        try {
          console.log('Attempting to refresh token due to auth error');
          await authService.refreshToken();
          const userProfile = await profileService.getProfile();
          setProfile(userProfile);
          console.log('Profile loaded after token refresh:', userProfile);
        } catch (refreshError) {
          console.error('Error refreshing token and loading profile:', refreshError);
          // If refresh fails, the session is invalid, so log out
          setProfile(null);
          console.warn('Logging out due to failed token refresh');
          // Don't auto-logout for profile issues
          // await logout();
        }
      } else {
        // For other errors, just continue without profile
        console.warn('Profile load failed with non-auth error, continuing without profile:', error.message);
        setProfile(null);
      }
    }
  };
  const login = async (credentials: UserLogin) => {
    try {
      setIsLoading(true);
      const tokenResponse = await authService.login(credentials);
      
      // Construct user object from token response
      const user: User = {
        user_id: tokenResponse.user_id,
        name: '', // Will be loaded from profile
        email: tokenResponse.email,
        account_type: tokenResponse.account_type as 'job_seeker' | 'employer' | 'admin' | 'freelancer'
      };
      
      authService.setStoredUser(user);
      setUser(user);
      await loadUserProfile();
      toast.success('Login successful!');
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Login failed. Please check your credentials.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: UserRegister) => {
    try {
      setIsLoading(true);
      await authService.register(userData);
      const user = await authService.getCurrentUser();
      authService.setStoredUser(user);
      setUser(user);
      await loadUserProfile();
      toast.success('Registration successful! Welcome aboard!');
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Registration failed. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem('visiondrillImpersonation');
      setUser(null);
      setProfile(null);
      setOriginalUser(null);
      setIsImpersonating(false);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      // Force clear local state even if API call fails
      localStorage.removeItem('visiondrillImpersonation');
      setUser(null);
      setProfile(null);
      setOriginalUser(null);
      setIsImpersonating(false);
    }
  };

  const refreshProfile = async () => {
    if (user && authService.isAuthenticated()) {
      try {
        // Refresh user data to get updated account_type
        const updatedUser = await authService.getCurrentUser();
        authService.setStoredUser(updatedUser);
        setUser(updatedUser);
        
        // Load profile data
        await loadUserProfile();
      } catch (error) {
        console.error('Error refreshing user data:', error);
        // If getCurrentUser fails, just load profile
        await loadUserProfile();
      }
    }
  };

  const hasRole = (role: 'job_seeker' | 'employer' | 'admin' | 'freelancer'): boolean => {
    return user?.account_type === role;
  };

  const isAdmin = (): boolean => {
    return hasRole('admin');
  };

  const isEmployer = (): boolean => {
    return hasRole('employer');
  };

  const isJobSeeker = (): boolean => {
    return hasRole('job_seeker');
  };

  const impersonateUser = (targetUser: User) => {
    if (!user || user.account_type !== 'admin') {
      toast.error("Access Denied", {
        description: "Only admin users can impersonate other users",
      });
      return;
    }

    console.log('Starting impersonation:', { originalUser: user, targetUser });
    
    // Store impersonation session
    const impersonationData = {
      originalUser: user,
      impersonatedUser: targetUser
    };
    localStorage.setItem('visiondrillImpersonation', JSON.stringify(impersonationData));
    
    setOriginalUser(user);
    setUser(targetUser);
    setIsImpersonating(true);
    
    toast.success("Impersonation Started", {
      description: `Now viewing as ${targetUser.name}`,
    });
  };

  const stopImpersonation = () => {
    if (!isImpersonating || !originalUser) return;
    
    console.log('Stopping impersonation, returning to:', originalUser);
    
    // Clear impersonation session
    localStorage.removeItem('visiondrillImpersonation');
    
    setUser(originalUser);
    setOriginalUser(null);
    setIsImpersonating(false);
    
    toast.success("Impersonation Stopped", {
      description: `Returned to your original account`,
    });
  };

  const isFreelancer = (): boolean => {
    return hasRole('freelancer');
  };

  const setTokens = (accessToken: string, refreshToken: string) => {
    // Store tokens
    authService.setStoredTokens(accessToken, refreshToken);
    
    // Decode token to get user info
    try {
      const payload = JSON.parse(atob(accessToken.split('.')[1]));
      const user: User = {
        user_id: payload.sub,
        name: '',  // Will be loaded from profile
        email: payload.email,
        account_type: payload.account_type as 'job_seeker' | 'employer' | 'admin' | 'freelancer'
      };
      
      authService.setStoredUser(user);
      setUser(user);
      
      // Load profile data
      loadUserProfile();
    } catch (error) {
      console.error('Error decoding token:', error);
      toast.error('Failed to process authentication tokens');
    }
  };

  const signInWithLinkedIn = async () => {
    try {
      setIsLoading(true);
      await authService.signInWithLinkedIn();
      // The OAuth flow will redirect the user, so we don't need to do anything else here
    } catch (error: any) {
      console.error('LinkedIn sign-in error:', error);
      toast.error('LinkedIn Authentication Failed', {
        description: error.message || 'Failed to initiate LinkedIn authentication. Please try again.',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthCallback = async () => {
    try {
      setIsLoading(true);
      const tokenResponse = await authService.handleOAuthCallback();
      
      // Construct user object from token response
      const user: User = {
        user_id: tokenResponse.user_id,
        name: '', // Will be loaded from profile
        email: tokenResponse.email,
        account_type: tokenResponse.account_type as 'job_seeker' | 'employer' | 'admin' | 'freelancer'
      };
      
      authService.setStoredUser(user);
      setUser(user);
      await loadUserProfile();
      
      toast.success('Welcome!', {
        description: 'You have been successfully logged in with LinkedIn.',
      });
      
      // Redirect to dashboard or intended page
      window.location.href = '/';
    } catch (error: any) {
      console.error('OAuth callback error:', error);
      toast.error('Authentication Failed', {
        description: error.message || 'Failed to complete LinkedIn authentication. Please try again.',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    profile,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    refreshProfile,
    hasRole,
    isAdmin,
    isEmployer,
    isJobSeeker,
    isFreelancer,
    setTokens,
    signInWithLinkedIn,
    handleOAuthCallback,
    impersonateUser,
    stopImpersonation,
    isImpersonating,
    originalUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
