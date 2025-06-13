
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
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Linkedin } from "lucide-react";

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
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Welcome back!",
        description: "You've been successfully logged in.",
      });
      navigate("/jobs");
    }, 1000);
  };
  
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Card className="cyber-card fade-in-scale">
            <CardHeader className="text-center space-y-4">
              <CardTitle className="text-3xl font-bold gradient-text">Welcome Back</CardTitle>
              <CardDescription className="text-gray-600">
                Sign in to your Visiondrill account to continue your career journey.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="john@example.com" 
                            className="futuristic-input"
                            {...field} 
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
                        <FormLabel className="font-semibold">Password</FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="••••••••" 
                            className="futuristic-input"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full futuristic-btn" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Log In"}
                  </Button>
                  
                  <div className="text-center space-y-4">
                    <p className="text-sm text-gray-500">Or sign in with</p>
                    <Button 
                      variant="outline" 
                      className="w-full flex items-center justify-center gap-2"
                      onClick={() => {
                        toast({
                          title: "LinkedIn Authentication",
                          description: "Please complete authorization in the popup window.",
                        });
                        // In a real app, this would trigger OAuth flow
                        setTimeout(() => {
                          toast({
                            title: "Login Successful",
                            description: "You've been logged in with LinkedIn.",
                          });
                          navigate("/jobs");
                        }, 1500);
                      }}
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </Button>
                  </div>
                  
                  <div className="text-center mt-6 space-y-2">
                    <p className="text-sm text-gray-500">
                      Don't have an account?{" "}
                      <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
                        Sign up
                      </Link>
                    </p>
                    <p className="text-sm text-gray-500">
                      <Link to="/forgot-password" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
                        Forgot your password?
                      </Link>
                    </p>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
