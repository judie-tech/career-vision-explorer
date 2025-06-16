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
  hasRole: (role: 'job_seeker' | 'employer' | 'admin') => boolean;
  isAdmin: () => boolean;
  isEmployer: () => boolean;
  isJobSeeker: () => boolean;
  // Impersonation functionality for admin users
  impersonateUser: (targetUser: User) => void;
  stopImpersonation: () => void;
  isImpersonating: boolean;
  originalUser: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
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
      if (storedUser && authService.isAuthenticated()) {
        setUser(storedUser);
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
      const userProfile = await profileService.getProfile();
      setProfile(userProfile);
    } catch (error) {
      console.error('Error loading profile:', error);
      // If profile fails to load, try to refresh token
      try {
        await authService.refreshToken();
        const userProfile = await profileService.getProfile();
        setProfile(userProfile);
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        // If refresh fails, logout user
        await logout();
      }
    }
  };

  const login = async (credentials: UserLogin) => {
    try {
      setIsLoading(true);
      const response = await authService.login(credentials);
      setUser(response.user);
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
      const response = await authService.register(userData);
      setUser(response.user);
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
      await loadUserProfile();
    }
  };

  const hasRole = (role: 'job_seeker' | 'employer' | 'admin'): boolean => {
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

  const value: AuthContextType = {
    user,
    profile,
    isAuthenticated: !!user && authService.isAuthenticated(),
    isLoading,
    login,
    register,
    logout,
    refreshProfile,
    hasRole,
    isAdmin,
    isEmployer,
    isJobSeeker,
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

// For backwards compatibility with existing code
export const authenticateUser = async (email: string, password: string): Promise<User | null> => {
  try {
    const response = await authService.login({ email, password });
    return response.user;
  } catch (error) {
    console.error('Authentication failed:', error);
    return null;
  }
};

export const createUser = async (userData: {
  name: string;
  email: string;
  password: string;
  role: string;
}): Promise<User | null> => {
  try {
    const accountType = userData.role === 'jobseeker' ? 'job_seeker' : 
                       userData.role === 'employer' ? 'employer' : 'admin';
    
    const response = await authService.register({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      account_type: accountType
    });
    return response.user;
  } catch (error) {
    console.error('User creation failed:', error);
    throw error;
  }
};

export const getCurrentUser = (): User | null => {
  return authService.getStoredUser();
};

export const isAuthenticated = (): boolean => {
  return authService.isAuthenticated();
};

export const logoutUser = async (): Promise<void> => {
  await authService.logout();
};

export const getUserById = (id: string): User | null => {
  // This would need to be implemented as an API call in a real system
  const currentUser = getCurrentUser();
  return currentUser?.user_id === id ? currentUser : null;
};
