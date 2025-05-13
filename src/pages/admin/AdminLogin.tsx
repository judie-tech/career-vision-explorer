
import { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { toast as sonnerToast } from "@/components/ui/sonner";
import * as z from "zod";
import { useAuth } from "@/hooks/use-auth";
import { Shield, Briefcase, User, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LoginForm } from "@/components/auth/LoginForm";
import { LoginTabs } from "@/components/auth/LoginTabs";
import { DemoCredentials } from "@/components/auth/DemoCredentials";

const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const { login, hasRole, isAuthenticated, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState<'admin' | 'jobseeker' | 'employer'>('admin');
  
  // Handle returnUrl from query params
  const returnUrl = searchParams.get('returnUrl') || null;
  
  // Check if user is already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      const dashboardUrl = getDashboardForRole(user.role);
      navigate(dashboardUrl);
      
      sonnerToast.success("Already Logged In", {
        description: `You're already logged in as ${user.name}`,
      });
    }
  }, [isAuthenticated, user, navigate]);
  
  // Helper function to get the dashboard URL based on role
  const getDashboardForRole = (role: string) => {
    switch (role) {
      case 'admin':
        return '/admin';
      case 'employer':
        return '/employer/dashboard';
      case 'jobseeker':
        return '/jobseeker/dashboard';
      default:
        return '/';
    }
  };
  
  const getLoginCredentials = () => {
    switch (loginType) {
      case 'admin':
        return { email: 'admin@visiondrill.com', password: 'admin123' };
      case 'employer':
        return { email: 'employer@visiondrill.com', password: 'employer123' };
      case 'jobseeker':
        return { email: 'jobseeker@visiondrill.com', password: 'jobseeker123' };
    }
  };
  
  const getRoleIcon = () => {
    switch (loginType) {
      case 'admin':
        return <Shield className="h-6 w-6 text-blue-600" />;
      case 'employer':
        return <Briefcase className="h-6 w-6 text-purple-600" />;
      case 'jobseeker':
        return <User className="h-6 w-6 text-green-600" />;
    }
  };
  
  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    
    try {
      const success = await login(values.email, values.password);
      
      if (success) {
        // Check if the user has the correct role for the selected login type
        if (loginType === 'admin' && !hasRole('admin')) {
          sonnerToast.error("Access Denied", {
            description: "You don't have admin permissions",
          });
          
          toast({
            title: "Access Denied",
            description: "You don't have admin permissions",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        
        if (loginType === 'employer' && !hasRole('employer')) {
          sonnerToast.error("Access Denied", {
            description: "You don't have employer permissions",
          });
          
          toast({
            title: "Access Denied",
            description: "You don't have employer permissions",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        
        if (loginType === 'jobseeker' && !hasRole('jobseeker')) {
          sonnerToast.error("Access Denied", {
            description: "You don't have job seeker permissions",
          });
          
          toast({
            title: "Access Denied",
            description: "You don't have job seeker permissions",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        
        sonnerToast.success("Login Successful", {
          description: `Welcome to the ${loginType} dashboard`,
        });
        
        toast({
          title: "Login Successful",
          description: `Welcome to the ${loginType} dashboard`,
        });
        
        // Redirect to returnUrl if available, otherwise to default dashboard
        if (returnUrl) {
          navigate(returnUrl);
        } else {
          // Redirect based on role
          if (loginType === 'admin') {
            navigate("/admin");
          } else if (loginType === 'employer') {
            navigate("/employer/dashboard");
          } else {
            navigate("/jobseeker/dashboard");
          }
        }
      } else {
        sonnerToast.error("Login Failed", {
          description: "Invalid email or password",
        });
        
        toast({
          title: "Login Failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
      }
    } catch (error) {
      sonnerToast.error("Login Error", {
        description: "An error occurred while logging in",
      });
      
      toast({
        title: "Login Error",
        description: "An error occurred while logging in",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
        
        <Card className="w-full">
          <CardHeader className="space-y-2">
            <div className="flex items-center space-x-2">
              {getRoleIcon()}
              <CardTitle className="text-2xl font-bold">Visiondrill Portal</CardTitle>
            </div>
            <CardDescription>
              Sign in to access your Visiondrill dashboard
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <LoginTabs loginType={loginType} setLoginType={setLoginType} />
            <LoginForm 
              onSubmit={onSubmit}
              isLoading={isLoading}
              loginType={loginType}
              defaultValues={getLoginCredentials()}
            />
          </CardContent>
          
          <CardFooter>
            <DemoCredentials loginType={loginType} />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
