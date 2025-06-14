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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Linkedin, Upload, Video, User, Camera } from "lucide-react";
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
  profileImage: z.string().optional(),
});

const Signup = () => {
  const { toast } = useToast();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [linkedInImportOpen, setLinkedInImportOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string>("");
  
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      profileImage: "",
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select a valid image file",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image size must be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setProfileImage(result);
      form.setValue('profileImage', result);
    };
    reader.readAsDataURL(file);
  };
  
  const onSubmit = (values: z.infer<typeof signupSchema>) => {
    setIsLoading(true);
    console.log(values);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account created!",
        description: "Let's set up your profile to find the perfect opportunities.",
      });
      setShowOnboarding(true);
    }, 1000);
  };

  const handleLinkedInSignup = () => {
    setLinkedInImportOpen(true);
  };

  const handleLinkedInConnect = () => {
    setIsLoading(true);
    toast({
      title: "LinkedIn Import Initiated",
      description: "Please complete authorization in the popup window.",
    });
    setTimeout(() => {
      setIsLoading(false);
      setLinkedInImportOpen(false);
      setShowOnboarding(true);
    }, 1500);
  };
  
  return (
    <Layout>
      <div className="max-w-md mx-auto px-4 py-12">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
            <CardDescription className="text-center">
              Join Visiondrill to explore career opportunities tailored to your skills and goals.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Profile Image Upload */}
                <div className="flex flex-col items-center space-y-4 pb-4">
                  <div className="relative">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={profileImage} alt="Profile" />
                      <AvatarFallback className="bg-gray-100">
                        <User className="h-8 w-8 text-gray-500" />
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      type="button"
                      size="sm"
                      className="absolute bottom-0 right-0 rounded-full h-8 w-8 p-0"
                      onClick={() => document.getElementById('signup-image-input')?.click()}
                    >
                      <Camera className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 text-center">
                    Add a profile photo (optional)
                  </p>
                  <input
                    id="signup-image-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="John Doe" 
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
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
                
                <div className="text-center">
                  <p className="text-sm text-gray-500">Or sign up with</p>
                  <div className="mt-2">
                    <Button 
                      variant="outline" 
                      onClick={handleLinkedInSignup}
                      className="w-full flex items-center justify-center gap-2 transition-colors hover:bg-gray-50"
                      disabled={isLoading}
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </Button>
                  </div>
                </div>
                
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link to="/login" className="text-career-blue hover:underline transition-colors">
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
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Import LinkedIn Profile</DialogTitle>
              <DialogDescription>
                We'll use your LinkedIn profile data to automatically create your Visiondrill profile.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Authorize Visiondrill to access your LinkedIn profile data:
              </p>
              <Button 
                className="w-full bg-[#0077B5] hover:bg-[#0077B5]/90 transition-colors"
                onClick={handleLinkedInConnect}
                disabled={isLoading}
              >
                <Linkedin className="mr-2 h-4 w-4" /> 
                {isLoading ? "Connecting..." : "Connect with LinkedIn"}
              </Button>
              <Button 
                variant="outline" 
                className="w-full transition-colors" 
                onClick={() => setLinkedInImportOpen(false)}
                disabled={isLoading}
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
