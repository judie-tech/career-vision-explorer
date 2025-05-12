
import { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { toast as sonnerToast } from "@/components/ui/sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useAuth } from "@/hooks/use-auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
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
  
  // Pre-fill form based on selected tab
  useEffect(() => {
    const credentials = getLoginCredentials();
    form.setValue('email', credentials.email);
    form.setValue('password', credentials.password);
  }, [loginType, form]);
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          <CardDescription>
            Sign in to access the Visiondrill administration panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={loginType} onValueChange={(v) => setLoginType(v as any)} className="mb-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="admin">Main Admin</TabsTrigger>
              <TabsTrigger value="employer">Employer</TabsTrigger>
              <TabsTrigger value="jobseeker">Job Seeker</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="admin@visiondrill.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
              
              <div className="mt-4 text-sm text-gray-500">
                <p>Demo Credentials for {loginType} login:</p>
                <p><strong>Email:</strong> {getLoginCredentials().email}</p>
                <p><strong>Password:</strong> {getLoginCredentials().password}</p>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
