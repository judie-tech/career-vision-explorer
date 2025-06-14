
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useUserProfile } from "@/hooks/use-user-profile";

export const ProfileSettings = () => {
  const { toast } = useToast();
  const { userProfile, updateProfile } = useUserProfile();
  
  const [firstName, setFirstName] = useState(userProfile?.name?.split(' ')[0] || "");
  const [lastName, setLastName] = useState(userProfile?.name?.split(' ')[1] || "");
  const [email, setEmail] = useState(userProfile?.email || "");
  const [phone, setPhone] = useState(userProfile?.phone || "");
  const [location, setLocation] = useState(userProfile?.location || "");

  const handleSaveProfile = async () => {
    const profileData = {
      name: `${firstName} ${lastName}`.trim(),
      email,
      phone,
      location,
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
            <Label htmlFor="firstName">First Name</Label>
            <Input 
              id="firstName" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input 
              id="lastName" 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input 
            id="phone" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input 
            id="location" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <Button onClick={handleSaveProfile}>
          Save Profile Changes
        </Button>
      </CardContent>
    </Card>
  );
};
