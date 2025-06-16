
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { toast } from "@/components/ui/sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Linkedin } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
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
  profileImage: z.string().optional(),
}).refine((data) => {
  if (data.role === 'jobseeker') {
    return !!data.phoneNumber && data.phoneNumber.length > 0;
  }
  return true;
}, {
  message: 'Phone number is required for job seekers.',
  path: ['phoneNumber'],
});

const Signup = () => {
  const navigate = useNavigate();
  const { register, login } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [linkedInImportOpen, setLinkedInImportOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string>("");
  const [linkedInDataImported, setLinkedInDataImported] = useState(false);
  const [newUserData, setNewUserData] = useState<any>(null);
  
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
  
  const onSubmit = async (values: z.infer<typeof signupSchema>) => {
    console.log('🚀 Form submitted with values:', values);
    setIsLoading(true);
    
    try {
      // Use default profile image if none provided
      const finalProfileImage = values.profileImage || 'https://via.placeholder.com/150/4F46E5/FFFFFF?text=' + values.name.charAt(0);

      console.log('📝 Registering user with data:', {
        name: values.name,
        email: values.email,
        role: values.role,
        finalProfileImage
      });

      // Map frontend role to backend role
      const accountType = values.role === 'jobseeker' ? 'job_seeker' : 'employer';

      // Register the new user using the real backend
      await register({
        name: values.name,
        email: values.email,
        password: values.password,
        account_type: accountType
      });

      console.log('✅ User registered successfully');

      // Store new user data for onboarding
      setNewUserData({...values, profileImage: finalProfileImage});
      
      // Show success message
      toast.success("Account Created Successfully!", {
        description: "Welcome to Visiondrill! Let's set up your profile.",
      });
      
      console.log('✅ Registration includes auto-login');
      toast.success("Welcome to Visiondrill!", {
        description: "Let's set up your profile to find the perfect opportunities.",
      });
      setShowOnboarding(true);
    } catch (error: any) {
      console.error('💥 Signup error:', error);
      toast.error("Registration Failed", {
        description: error.message || "Failed to create account. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitError = (errors: any) => {
    console.log('🚨 Form validation errors:', errors);
    // Show specific validation errors to user
    Object.keys(errors).forEach(field => {
      const error = errors[field];
      if (error?.message) {
        console.log(`❌ Validation error for ${field}:`, error.message);
        toast.error("Form Validation Error", {
          description: `${field}: ${error.message}`,
        });
      }
    });
  };

  // Add form state debugging
  const formValues = form.watch();
  console.log('📊 Current form values:', formValues);

  const handleLinkedInSignup = () => {
    setLinkedInImportOpen(true);
  };

  const handleLinkedInConnect = async () => {
    setIsLoading(true);
    
    try {
      // Generate unique email to avoid conflicts
      const timestamp = Date.now();
      const linkedInData = {
        name: 'John Doe',
        email: `john.doe${timestamp}@example.com`,
        password: 'linkedinpass123',
        profileImage: 'https://via.placeholder.com/150',
        role: selectedRole
      };
      
      // Note: Backend will handle email validation
      
      toast.success("LinkedIn Data Imported", {
        description: selectedRole === "jobseeker"
          ? "Please add your phone number to complete registration."
          : "Registration complete! Setting up your profile...",
      });
      
      // Pre-fill form with LinkedIn data
      form.setValue('name', linkedInData.name);
      form.setValue('email', linkedInData.email);
      form.setValue('password', linkedInData.password);
      form.setValue('profileImage', linkedInData.profileImage);
      setProfileImage(linkedInData.profileImage);
      
      setLinkedInImportOpen(false);
      setLinkedInDataImported(true);
      
      if (selectedRole === "employer") {
        // For employers, complete registration immediately since no phone needed
        try {
          await register({
            name: linkedInData.name,
            email: linkedInData.email,
            password: linkedInData.password,
            account_type: 'employer'
          });

          toast.success("Account created successfully!", {
            description: "Let's set up your profile to find the perfect opportunities.",
          });
          setNewUserData(linkedInData);
          setShowOnboarding(true);
        } catch (error: any) {
          toast.error("Registration Failed", {
            description: error.message || "Failed to create account. Please try again.",
          });
        }
      } else {
        toast.info("LinkedIn Import Complete", {
          description: "Profile information and photo imported. Please add your phone number to continue.",
        });
      }
    } catch (error) {
      console.error('LinkedIn signup error:', error);
      toast.error("LinkedIn Import Failed", {
        description: "Failed to import LinkedIn data. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    
    // Redirect based on user role
    if (newUserData?.role === 'employer') {
      navigate('/employer/dashboard');
    } else {
      navigate('/jobseeker/dashboard');
    }
    
    toast.success("Welcome to Visiondrill!", {
      description: "Your profile has been set up successfully.",
    });
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
              <form onSubmit={form.handleSubmit(onSubmit, onSubmitError)} className="space-y-4">
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
                  onClick={() => console.log('🔘 Create Account button clicked')}
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
        
        {showOnboarding && (
          <OnboardingWizard onComplete={handleOnboardingComplete} />
        )}
        
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
