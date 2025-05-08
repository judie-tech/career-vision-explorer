
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
      <div className="max-w-md mx-auto px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
            <CardDescription>
              Join VisionDrill to explore career opportunities tailored to your skills and goals.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" {...field} />
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
                
                <Button type="submit" className="w-full">Create Account</Button>
                
                <div className="text-center">
                  <p className="text-sm text-gray-500">Or sign up with</p>
                  <div className="mt-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setLinkedInImportOpen(true)}
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </Button>
                  </div>
                </div>
                
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link to="/login" className="text-career-blue hover:underline">
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
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Import LinkedIn Profile</DialogTitle>
              <DialogDescription>
                We'll use your LinkedIn profile data to automatically create your VisionDrill profile.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <p>Authorize VisionDrill to access your LinkedIn profile data:</p>
              <Button 
                className="w-full bg-[#0077B5] hover:bg-[#0077B5]/90"
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
    </Layout>
  );
};

export default Signup;
