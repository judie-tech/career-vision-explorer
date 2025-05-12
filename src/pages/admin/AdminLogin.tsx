
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const { toast } = useToast();
  const { login, hasRole } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState<'admin' | 'jobseeker' | 'employer'>('admin');
  
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
          toast({
            title: "Access Denied",
            description: "You don't have admin permissions",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        
        if (loginType === 'employer' && !hasRole('employer')) {
          toast({
            title: "Access Denied",
            description: "You don't have employer permissions",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        
        if (loginType === 'jobseeker' && !hasRole('jobseeker')) {
          toast({
            title: "Access Denied",
            description: "You don't have job seeker permissions",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        
        toast({
          title: "Login Successful",
          description: `Welcome to the ${loginType} dashboard`,
        });
        
        // Redirect based on role
        if (loginType === 'admin') {
          navigate("/admin");
        } else if (loginType === 'employer') {
          navigate("/employer/dashboard");
        } else {
          navigate("/jobseeker/dashboard");
        }
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: "An error occurred while logging in",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
