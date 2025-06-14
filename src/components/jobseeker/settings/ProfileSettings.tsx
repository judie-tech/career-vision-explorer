
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useUserProfile } from "@/hooks/use-user-profile";

export const ProfileSettings = () => {
  const { toast } = useToast();
  const { userProfile, updateProfile, isLoading } = useUserProfile();
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (userProfile) {
      const nameParts = userProfile.name?.split(' ') || ['', ''];
      setFirstName(nameParts[0] || "");
      setLastName(nameParts.slice(1).join(' ') || "");
      setEmail(userProfile.email || "");
      setPhone(userProfile.phone || "");
      setLocation(userProfile.location || "");
      setBio(userProfile.bio || "");
      setRole(userProfile.role || "");
    }
  }, [userProfile]);

  const handleSaveProfile = async () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (First Name, Last Name, Email).",
        variant: "destructive",
      });
      return;
    }

    const profileData = {
      name: `${firstName.trim()} ${lastName.trim()}`,
      email: email.trim(),
      phone: phone.trim(),
      location: location.trim(),
      bio: bio.trim(),
      role: role.trim(),
    };
    
    const success = await updateProfile(profileData);
    if (success) {
      toast({
        title: "Profile Updated",
        description: "Your profile information has been saved successfully.",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          Update your personal information and contact details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input 
              id="firstName" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name *</Label>
            <Input 
              id="lastName" 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input 
            id="email" 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Role/Title</Label>
          <Input 
            id="role" 
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g., Software Engineer, Marketing Manager"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input 
            id="phone" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input 
            id="location" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your location"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea 
            id="bio" 
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us about yourself..."
            rows={4}
          />
        </div>
        <Button 
          onClick={handleSaveProfile}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? "Saving..." : "Save Profile Changes"}
        </Button>
      </CardContent>
    </Card>
  );
};
