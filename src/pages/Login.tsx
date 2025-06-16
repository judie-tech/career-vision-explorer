
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { toast } from "@/components/ui/sonner";
import Layout from "@/components/layout/Layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Linkedin } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

const Login = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
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
      await login({
        email: values.email,
        password: values.password
      });
      
      toast.success("Welcome back!", {
        description: "You've been successfully logged in.",
      });
      
      // Simple redirect to home page - let user navigate where they want
      navigate("/");
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error("Login Failed", {
        description: error.message || "Invalid email or password. Please check your credentials.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLinkedInLogin = () => {
    setIsLoading(true);
    toast.info("LinkedIn Authentication", {
      description: "Please complete authorization in the popup window.",
    });
    // In a real app, this would trigger OAuth flow
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Login Successful", {
        description: "You've been logged in with LinkedIn.",
      });
      navigate("/jobs");
    }, 1500);
  };
  
  return (
    <Layout>
      <div className="max-w-md mx-auto px-4 py-12">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Log In</CardTitle>
            <CardDescription className="text-center">
              Sign in to your Visiondrill account to continue your career journey.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="john@example.com" 
                          {...field}
                          className="transition-all focus:ring-2 focus:ring-career-blue"
                        />
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
                        <Input 
                          type="password" 
                          placeholder="••••••••" 
                          {...field}
                          className="transition-all focus:ring-2 focus:ring-career-blue"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-career-blue hover:bg-career-blue/90 transition-colors" 
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Log In"}
                </Button>
                
                <div className="text-center">
                  <p className="text-sm text-gray-500">Or sign in with</p>
                  <div className="mt-2">
                    <Button 
                      variant="outline" 
                      className="w-full flex items-center justify-center gap-2 transition-colors hover:bg-gray-50"
                      onClick={handleLinkedInLogin}
                      disabled={isLoading}
                      type="button"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </Button>
                  </div>
                </div>
                
                <div className="text-center mt-4 space-y-2">
                  <p className="text-sm text-gray-500">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-career-blue hover:underline transition-colors">
                      Sign up
                    </Link>
                  </p>
                  <p className="text-sm text-gray-500">
                    <Link to="/forgot-password" className="text-career-blue hover:underline transition-colors">
                      Forgot your password?
                    </Link>
                  </p>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;
