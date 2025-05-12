
// Mock authentication system
// In a production app, this would be replaced with a real authentication system

type UserRole = 'admin' | 'jobseeker' | 'employer';

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// Mock users for demonstration
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@visiondrill.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as UserRole,
  },
  {
    id: '2',
    email: 'employer@visiondrill.com',
    password: 'employer123',
    name: 'Employer User',
    role: 'employer' as UserRole,
  },
  {
    id: '3',
    email: 'jobseeker@visiondrill.com',
    password: 'jobseeker123',
    name: 'Jobseeker User',
    role: 'jobseeker' as UserRole,
  },
];

// Initialize auth state from localStorage if available
const getInitialAuthState = (): AuthState => {
  const storedUser = localStorage.getItem('visiondrillUser');
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      return { user, isAuthenticated: true };
    } catch (e) {
      localStorage.removeItem('visiondrillUser');
    }
  }
  return { user: null, isAuthenticated: false };
};

// Authenticate user with email and password
export const authenticateUser = (email: string, password: string): User | null => {
  const user = MOCK_USERS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    // Store user in localStorage
    localStorage.setItem('visiondrillUser', JSON.stringify(userWithoutPassword));
    return userWithoutPassword;
  }

  return null;
};

// Log out current user
export const logoutUser = (): void => {
  localStorage.removeItem('visiondrillUser');
};

// Get current user
export const getCurrentUser = (): User | null => {
  const { user } = getInitialAuthState();
  return user;
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const { isAuthenticated } = getInitialAuthState();
  return isAuthenticated;
};

// Check if user has specific role
export const hasRole = (role: UserRole): boolean => {
  const user = getCurrentUser();
  return user !== null && user.role === role;
};
