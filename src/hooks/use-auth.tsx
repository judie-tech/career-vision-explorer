
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { authenticateUser, logoutUser, getCurrentUser, createUser } from '@/lib/auth';
import { toast } from "@/components/ui/sonner";

type UserRole = 'admin' | 'jobseeker' | 'employer' | 'subadmin';

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    phoneNumber?: string;
    countryCode?: string;
    profileImage?: string;
  }) => Promise<boolean>;
  logout: () => void;
  hasRole: (role: UserRole) => boolean;
  impersonateUser: (user: User) => void;
  stopImpersonation: () => void;
  isImpersonating: boolean;
  originalUser: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [originalUser, setOriginalUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isImpersonating, setIsImpersonating] = useState(false);

  useEffect(() => {
    // Check for existing user on mount
    const currentUser = getCurrentUser();
    console.log('Checking existing user:', currentUser);
    if (currentUser) {
      setUser(currentUser);
      setIsAuthenticated(true);
      
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
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    console.log('Login attempt:', email);
    
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const authenticatedUser = authenticateUser(email, password);
    console.log('Authentication result:', authenticatedUser);
    
    if (authenticatedUser) {
      setUser(authenticatedUser);
      setIsAuthenticated(true);
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const signup = async (userData: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    phoneNumber?: string;
    countryCode?: string;
    profileImage?: string;
  }): Promise<boolean> => {
    setIsLoading(true);
    console.log('Signup attempt:', userData.email);
    
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newUser = createUser(userData);
      console.log('User creation result:', newUser);
      
      if (newUser) {
        // Auto-login the new user
        setUser(newUser);
        setIsAuthenticated(true);
        setIsLoading(false);
        return true;
      }
      
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('Signup error:', error);
      setIsLoading(false);
      throw error;
    }
  };

  const impersonateUser = (targetUser: User) => {
    if (!user || (user.role !== 'admin' && user.role !== 'subadmin')) {
      toast.error("Access Denied", {
        description: "Only admins and subadmins can impersonate users",
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

  const logout = () => {
    logoutUser();
    setUser(null);
    setOriginalUser(null);
    setIsAuthenticated(false);
    setIsImpersonating(false);
    toast.success("Logged out successfully");
  };

  const hasRole = (role: UserRole): boolean => {
    return user !== null && user.role === role;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isLoading, 
      login,
      signup,
      logout,
      hasRole,
      impersonateUser,
      stopImpersonation,
      isImpersonating,
      originalUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
