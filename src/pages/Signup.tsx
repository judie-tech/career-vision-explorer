
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout/Layout";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Linkedin, Upload, Video } from "lucide-react";
import OnboardingWizard from "@/components/onboarding/OnboardingWizard";

const signupSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const Signup = () => {
  const { toast } = useToast();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [linkedInImportOpen, setLinkedInImportOpen] = useState(false);
  
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  
  const onSubmit = (values: z.infer<typeof signupSchema>) => {
    console.log(values);
    toast({
      title: "Account created!",
      description: "Let's set up your profile to find the perfect opportunities.",
    });
    setShowOnboarding(true);
  };
  
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Card className="cyber-card fade-in-scale">
            <CardHeader className="text-center space-y-4">
              <CardTitle className="text-3xl font-bold gradient-text">Join Visiondrill</CardTitle>
              <CardDescription className="text-gray-600">
                Create your account to explore career opportunities tailored to your skills and goals.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">Full Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="John Doe" 
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
                  
                  <Button type="submit" className="w-full futuristic-btn">Create Account</Button>
                  
                  <div className="text-center space-y-4">
                    <p className="text-sm text-gray-500">Or sign up with</p>
                    <Button 
                      variant="outline" 
                      onClick={() => setLinkedInImportOpen(true)}
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </Button>
                  </div>
                  
                  <div className="text-center mt-6">
                    <p className="text-sm text-gray-500">
                      Already have an account?{" "}
                      <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
                        Log in
                      </Link>
                    </p>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          {showOnboarding && <OnboardingWizard onComplete={() => setShowOnboarding(false)} />}
          
          <Dialog open={linkedInImportOpen} onOpenChange={setLinkedInImportOpen}>
            <DialogContent className="cyber-card">
              <DialogHeader>
                <DialogTitle className="gradient-text">Import LinkedIn Profile</DialogTitle>
                <DialogDescription>
                  We'll use your LinkedIn profile data to automatically create your Visiondrill profile.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-gray-600">Authorize Visiondrill to access your LinkedIn profile data:</p>
                <Button 
                  className="w-full bg-[#0077B5] hover:bg-[#0077B5]/90 futuristic-btn"
                  onClick={() => {
                    toast({
                      title: "LinkedIn Import Initiated",
                      description: "Please complete authorization in the popup window.",
                    });
                    // In a real app, this would trigger OAuth flow
                    setTimeout(() => {
                      setLinkedInImportOpen(false);
                      setShowOnboarding(true);
                    }, 1500);
                  }}
                >
                  <Linkedin className="mr-2 h-4 w-4" /> Connect with LinkedIn
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => setLinkedInImportOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
