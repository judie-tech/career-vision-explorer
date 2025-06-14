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
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Linkedin } from "lucide-react";
import OnboardingWizard from "@/components/onboarding/OnboardingWizard";
import ProfileImageUpload from "@/components/auth/ProfileImageUpload";
import PhoneNumberInput from "@/components/auth/PhoneNumberInput";
import LinkedInImportDialog from "@/components/auth/LinkedInImportDialog";

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
  role: z.enum(["jobseeker", "employer"], {
    required_error: "Please select your role.",
  }),
  countryCode: z.string().optional(),
  phoneNumber: z.string().optional(),
  profileImage: z.string().min(1, {
    message: "Profile image is required.",
  }),
}).refine((data) => {
  // Phone number is required only for job seekers
  if (data.role === "jobseeker") {
    return data.countryCode && data.countryCode.length > 0 && 
           data.phoneNumber && data.phoneNumber.length > 0 && 
           /^\d+$/.test(data.phoneNumber);
  }
  return true;
}, {
  message: "Phone number is required for job seekers.",
  path: ["phoneNumber"],
});

const Signup = () => {
  const { toast } = useToast();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [linkedInImportOpen, setLinkedInImportOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string>("");
  const [linkedInDataImported, setLinkedInDataImported] = useState(false);
  
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "jobseeker",
      countryCode: "+254",
      phoneNumber: "",
      profileImage: "",
    },
  });

  const selectedRole = form.watch("role");

  const handleImageChange = (imageUrl: string) => {
    setProfileImage(imageUrl);
    form.setValue('profileImage', imageUrl);
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
      title: "LinkedIn Data Imported",
      description: selectedRole === "jobseeker" 
        ? "Please add your phone number to complete registration."
        : "Registration complete! Setting up your profile...",
    });
    
    setTimeout(() => {
      setIsLoading(false);
      setLinkedInImportOpen(false);
      setLinkedInDataImported(true);
      
      // Pre-fill form with LinkedIn data including profile image
      form.setValue('name', 'John Doe');
      form.setValue('email', 'john.doe@example.com');
      form.setValue('password', 'linkedinpass123');
      form.setValue('profileImage', 'https://via.placeholder.com/150'); // Simulate LinkedIn profile image
      setProfileImage('https://via.placeholder.com/150');
      
      if (selectedRole === "employer") {
        // For employers, complete registration immediately since no phone needed
        setTimeout(() => {
          toast({
            title: "Account created!",
            description: "Let's set up your profile to find the perfect opportunities.",
          });
          setShowOnboarding(true);
        }, 500);
      } else {
        toast({
          title: "LinkedIn Import Complete",
          description: "Profile information and photo imported. Please add your phone number to continue.",
        });
      }
    }, 1500);
  };
  
  return (
    <Layout>
      <div className="max-w-md mx-auto px-4 py-12">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
            <CardDescription className="text-center">
              {linkedInDataImported 
                ? selectedRole === "jobseeker"
                  ? "Add your phone number to complete registration"
                  : "Complete your profile to finish registration"
                : "Join Visiondrill to explore career opportunities tailored to your skills and goals."
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <ProfileImageUpload
                  profileImage={profileImage}
                  onImageChange={handleImageChange}
                />

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
                          disabled={linkedInDataImported}
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
                          disabled={linkedInDataImported}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>I am a</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled={linkedInDataImported}>
                        <FormControl>
                          <SelectTrigger className="transition-all focus:ring-2 focus:ring-career-blue">
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="jobseeker">Job Seeker</SelectItem>
                          <SelectItem value="employer">Employer</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {selectedRole === "jobseeker" && (
                  <PhoneNumberInput
                    control={form.control}
                    countryCodeName="countryCode"
                    phoneNumberName="phoneNumber"
                  />
                )}
                
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
                          disabled={linkedInDataImported}
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
                
                {!linkedInDataImported && (
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
                )}
                
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
        
        <LinkedInImportDialog
          open={linkedInImportOpen}
          onOpenChange={setLinkedInImportOpen}
          onConnect={handleLinkedInConnect}
          isLoading={isLoading}
          selectedRole={selectedRole}
        />
      </div>
    </Layout>
  );
};

export default Signup;
