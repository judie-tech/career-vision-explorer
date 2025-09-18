import React, { useState, useRef, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Globe,
  Github,
  Linkedin,
  Whatsapp,
  Twitter,
  Instagram,
  Edit3,
  Save,
  X,
  UploadCloud,
  DollarSign,
  Building,
  FileText,
  Download,
  Settings,
  Plus
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { profileService } from "@/services/profile.service";
import { toast } from "sonner";
import { Profile as ProfileType, ProfileUpdate } from "@/types/api";
import { useNavigate } from "react-router-dom";
import { useEffect as useEffectNavigate } from "react";
import whatsapp from '/src/assets/whatsapp.png';
import stackoverflow from '/src/assets/stackoverflow.png'
const Profile: React.FC = () => {
  const { user, isAuthenticated, profile: authProfile } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<ProfileUpdate>>({});
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [localCompletionPercentage, setLocalCompletionPercentage] = useState(0);

  // Input refs for scrolling to sections
  const nameInputRef = useRef<HTMLInputElement>(null);
  const bioInputRef = useRef<HTMLTextAreaElement>(null);
  const linkedinInputRef = useRef<HTMLInputElement>(null);
  const skillsInputRef = useRef<HTMLTextAreaElement>(null);
  const workExperienceInputRef = useRef<HTMLTextAreaElement>(null);
  const educationInputRef = useRef<HTMLTextAreaElement>(null);
  const preferencesInputRef = useRef<HTMLTextAreaElement>(null);
  const salaryInputRef = useRef<HTMLTextAreaElement>(null);
  const dobInputRef = useRef<HTMLTextAreaElement>(null);
  const phoneInputRef = useRef<HTMLTextAreaElement>(null);
  const locationInputRef = useRef<HTMLTextAreaElement>(null);
  const jobInputRef = useRef<HTMLTextAreaElement>(null);
  const experience_yearsInputRef = useRef<HTMLTextAreaElement>(null);
  const twitterInputRef = useRef<HTMLTextAreaElement>(null);
  const resumeInputRef = useRef<HTMLTextAreaElement>(null);
  const stackoverflowInputRef = useRef<HTMLTextAreaElement>(null);
  const projectsInputRef = useRef<HTMLTextAreaElement>(null);


  // Redirect employers to their dashboard
  useEffectNavigate(() => {
    if (isAuthenticated && user?.account_type === 'employer') {
      navigate('/employer/dashboard');
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    if (isAuthenticated && authProfile) {
      setProfile(authProfile);
      setEditForm(authProfile);
      setLocalCompletionPercentage(authProfile.profile_completion_percentage || calculateProfileCompletion(authProfile));

      setLoading(false);
    } else if (isAuthenticated && !authProfile) {
      loadProfile();
    }
    else {
      setLoading(false);
    }
  }, [isAuthenticated, user, authProfile]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const profileData = await profileService.getProfile();
      setProfile(profileData);
      setEditForm(profileData);
      setLocalCompletionPercentage(profileData.profile_completion_percentage || calculateProfileCompletion(profileData));
    } catch (error) {
      console.error('Error loading profile:', error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (dataToSave?: Partial<ProfileUpdate>) => {

    const payload = dataToSave || editForm;
    if (!payload || Object.keys(payload).length === 0) {
      toast.info("No changes to save.");
      setEditing(false);
      return;
    }

    try {
      const updatedProfile = await profileService.updateProfile(payload);
      setProfile(updatedProfile);
      setEditForm(updatedProfile);
      setLocalCompletionPercentage(updatedProfile.profile_completion_percentage || calculateProfileCompletion(updatedProfile));

      setEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error("Failed to update profile");
    }
  };

  const handleCancel = () => {
    setEditForm(profile as ProfileType);
    setLocalCompletionPercentage(profile?.profile_completion_percentage || calculateProfileCompletion(profile));

    setEditing(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setResumeFile(event.target.files[0]);
    }
  };

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-green-300 text-green-800 border-green-500';
      case 'Not Available':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Available in 2 weeks':
      case 'Available in 1 month':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }

  const calculateProfileCompletion = (profile: ProfileType | null): number => {
    if (!profile) return 0;
    const fields: Array<keyof ProfileType> = [
      'name', 'email', 'bio', 'linkedin_url', 'skills', 'work_experience',
      'phone', 'location', 'date_of_birth', 'salary_expectation', 'preferred_job_type',
      'work_authorization', 'availability', 'experience_years', 'github_url',
      'twitter_url', 'portfolio_url', 'resume_link', 'education',
      'projects', 'languages', 'certifications', 'preferences'
    ];

    const totalFields = fields.length;
    const completedFields = fields.reduce((count, field) => {
      const value = profile[field];
      if (Array.isArray(value)) return value.length > 0 ? count + 1 : count;
      if (typeof value == 'object' && value !== null) return Object.keys(value).length > 0 ? count + 1 : count;
      return value ? count + 1 : count;
    }, 0);
    return Math.round((completedFields / totalFields) * 100);
  };
  // update local completion percentage when editing form
  useEffect(() => {
    setLocalCompletionPercentage(calculateProfileCompletion(editForm));
  }, [editForm]);

  const handleJumpToField = (field: string) => {
    setEditing(true);
    const refs: Record<string, React.RefObject<HTMLElement>> = {
      name: nameInputRef,
      bio: bioInputRef,
      linkedin_url: linkedinInputRef,
      skills: skillsInputRef,
      work_experience: workExperienceInputRef,
      education: educationInputRef,
      preferences: preferencesInputRef,
      salary: salaryInputRef,
      dob: dobInputRef,
      resume: resumeInputRef,
      location: locationInputRef,
      twitter: twitterInputRef,
      phone: phoneInputRef,
      job_type: jobInputRef,
      stackoverflow: stackoverflowInputRef,
      experience_years: experience_yearsInputRef,
      projects: projectsInputRef
    };
    const ref = refs[field];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
      ref.current.focus();
    }
  };

  const handleResumeParse = async () => {
    if (!resumeFile) {
      toast.error("Please select a resume file to parse.");
      return;
    }

    setIsParsing(true);
    try {
      const response = await profileService.parseResume(resumeFile);
      console.log('Resume parse response:', response);

      // Check if response has the expected structure
      if (!response || !response.parsed_data) {
        throw new Error('Invalid response structure from CV parser');
      }

      const updatedProfile = response.updated_profile;
      const parsedData = response.parsed_data;

      // Log the parsed data for debugging
      console.log('Parsed data:', parsedData);

      // Create a comprehensive update object with safe access
      const updatePayload = {
        ...profile,
        // Safely spread personal_info if it exists
        ...(parsedData.personal_info && typeof parsedData.personal_info === 'object'
          ? parsedData.personal_info
          : {}),
        // Safely spread professional_summary if it exists
        ...(parsedData.professional_summary && typeof parsedData.professional_summary === 'object'
          ? parsedData.professional_summary
          : {}),
        // Update arrays with fallbacks
        skills: parsedData.skills || profile?.skills || [],
        work_experience: parsedData.work_experience || profile?.work_experience || [],
        education: parsedData.education || profile?.education || '',
        projects: parsedData.projects || profile?.projects || [],
        certifications: parsedData.certifications || profile?.certifications || [],
        languages: parsedData.languages || profile?.languages || [],
        // Safely spread additional_info if it exists
        ...(parsedData.additional_info && typeof parsedData.additional_info === 'object'
          ? parsedData.additional_info
          : {}),
        resume_link: response.cv_file_url || profile?.resume_link,
      };

      setProfile(updatePayload as ProfileType);
      setEditForm(updatePayload);
      await handleSave(updatePayload);
      toast.success("Resume parsed successfully! Profile has been updated.");
    } catch (error) {
      console.error("Error parsing resume:", error);
      if (error instanceof Error) {
        toast.error(`Failed to parse resume: ${error.message}`);
      } else {
        toast.error("Failed to parse resume. Please try again.");
      }
    } finally {
      setIsParsing(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Access Required</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Please log in to view your profile.
              </p>
              <Button asChild className="w-full">
                <a href="/login">Log In</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        <div className="container py-8 max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">My Profile</h1>
            {!editing ? (
              <Button onClick={() => setEditing(true)} className="flex items-center gap-2">
                <Edit3 className="h-4 w-4" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={() => handleSave()} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save
                </Button>
                <Button variant="outline" onClick={handleCancel} className="flex items-center gap-2">
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Basic Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Profile Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <Avatar className="h-24 w-24 mx-auto mb-4">
                      <AvatarImage src={profile?.profile_image_url} />
                      <AvatarFallback className="text-2xl">
                        {profile?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    {editing ? (
                      <div className="space-y-3">
                        <Input
                          value={editForm.name || ''}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="text-center font-semibold"
                        />
                        <Textarea
                          value={editForm.bio || ''}
                          onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                          placeholder="Tell us about yourself..."
                          className="text-center"
                        />
                      </div>
                    ) : (
                      <>
                        <h2 className="text-2xl font-bold mb-2">{profile?.name}</h2>
                        <p className="text-muted-foreground mb-4">{profile?.bio}</p>
                      </>
                    )}

                    <Badge variant="secondary" className="mb-4">
                      {profile?.account_type?.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>

                  <Separator className="my-4" />

                  {/* Contact Info */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{profile?.email}</span>
                    </div>

                    {editing ? (
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <Input
                          value={editForm.phone || ''}
                          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                          placeholder="Phone number"
                          className="text-sm"
                        />
                      </div>
                    ) : profile?.phone ? (
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{profile.phone}</span>
                      </div>
                    ) : null}

                    {editing ? (
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <Input
                          value={editForm.location || ''}
                          onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                          placeholder="Location"
                          className="text-sm"
                        />
                      </div>
                    ) : profile?.location ? (
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{profile.location}</span>
                      </div>
                    ) : null}

                    {editing ? (
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <Input
                          type="date"
                          value={editForm.date_of_birth || ''}
                          onChange={(e) => setEditForm({ ...editForm, date_of_birth: e.target.value })}
                          className="text-sm"
                        />
                      </div>
                    ) : profile?.date_of_birth ? (
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Born {new Date(profile.date_of_birth).toLocaleDateString()}</span>
                      </div>
                    ) : null}

                    {editing ? (
                      <div className="flex items-center gap-3">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <Input
                          value={editForm.salary_expectation || ''}
                          onChange={(e) => setEditForm({ ...editForm, salary_expectation: e.target.value })}
                          placeholder="Salary expectation"
                          className="text-sm"
                        />
                      </div>
                    ) : profile?.salary_expectation ? (
                      <div className="flex items-center gap-3">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{profile.salary_expectation}</span>
                      </div>
                    ) : null}

                    {editing ? (
                      <div className="flex items-center gap-3">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <Select value={editForm.preferred_job_type || ''} onValueChange={(value) => setEditForm({ ...editForm, preferred_job_type: value as any })}>
                          <SelectTrigger className="text-sm">
                            <SelectValue placeholder="Preferred job type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Full-time">Full-time</SelectItem>
                            <SelectItem value="Part-time">Part-time</SelectItem>
                            <SelectItem value="Contract">Contract</SelectItem>
                            <SelectItem value="Internship">Internship</SelectItem>
                            <SelectItem value="Remote">Remote</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    ) : profile?.preferred_job_type ? (
                      <div className="flex items-center gap-3">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{profile.preferred_job_type}</span>
                      </div>
                    ) : null}

                    {editing ? (
                      <div className="flex items-center gap-3">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <Input
                          value={editForm.work_authorization || ''}
                          onChange={(e) => setEditForm({ ...editForm, work_authorization: e.target.value })}
                          placeholder="Work authorization status"
                          className="text-sm"
                        />
                      </div>
                    ) : profile?.work_authorization ? (
                      <div className="flex items-center gap-3">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{profile.work_authorization}</span>
                      </div>
                    ) : null}

                    {editing ? (
                      <div className="flex items-center gap-3">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <Select value={editForm.availability || ''} onValueChange={(value) => setEditForm({ ...editForm, availability: value as any })}>
                          <SelectTrigger className="text-sm">
                            <SelectValue placeholder="Availability status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Available">Available</SelectItem>
                            <SelectItem value="Not Available">Not Available</SelectItem>
                            <SelectItem value="Available in 2 weeks">Available in 2 weeks</SelectItem>
                            <SelectItem value="Available in 1 month">Available in 1 month</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    ) : profile?.availability ? (
                      <div className="flex items-center gap-3">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <span className={`text-sm px-2 py-1 rounded border ${getAvailabilityColor(profile.availability || '')}`}>
                          {profile.availability}
                        </span>
                      </div>
                    ) : null}

                    {editing ? (
                      <div className="flex items-center gap-3">
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        <Input
                          type="number"
                          value={editForm.experience_years || ''}
                          onChange={(e) => setEditForm({ ...editForm, experience_years: parseInt(e.target.value) || 0 })}
                          placeholder="Years of experience"
                          className="text-sm"
                        />
                      </div>
                    ) : profile?.experience_years ? (
                      <div className="flex items-center gap-3">
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{profile.experience_years} years experience</span>
                      </div>
                    ) : null}

                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        Joined {new Date(profile?.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  {/* Social Links */}
                  <div className="space-y-3">
                    {editing ? (
                      <>
                        <div className="flex items-center gap-3">
                          <Linkedin className="h-4 w-4 text-muted-foreground" />
                          <Input
                            value={editForm.linkedin_url || ''}
                            onChange={(e) => setEditForm({ ...editForm, linkedin_url: e.target.value })}
                            placeholder="LinkedIn URL"
                            className="text-sm"
                          />
                        </div>
                        <div className="flex items-center gap-3">
                          <Github className="h-4 w-4 text-muted-foreground" />
                          <Input
                            value={editForm.github_url || ''}
                            onChange={(e) => setEditForm({ ...editForm, github_url: e.target.value })}
                            placeholder="GitHub URL"
                            className="text-sm"
                          />
                        </div>
                        <div className="flex items-center gap-3">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <Input
                            value={editForm.portfolio_url || ''}
                            onChange={(e) => setEditForm({ ...editForm, portfolio_url: e.target.value })}
                            placeholder="Portfolio URL"
                            className="text-sm"
                          />
                        </div>
                        <div className="flex items-center gap-3">
                          <Twitter className="h-4 w-4 text-muted-foreground" />
                          <Input
                            value={editForm.twitter_url || ''}
                            onChange={(e) => setEditForm({ ...editForm, twitter_url: e.target.value })}
                            placeholder="twitter url"
                            className="text-sm"
                          />
                        </div>
                        <div className="flex items-center gap-3">
                          <Instagram className="h-4 w-4 text-muted-foreground" />
                          <Input
                            value={editForm.instagram_url || ''}
                            onChange={(e) => setEditForm({ ...editForm, instagram_url: e.target.value })}
                            placeholder="Instagram url"
                            className="text-sm"
                          />
                        </div>
                        <div className="flex items-center gap-3">
                          <img src={whatsapp} className="h-4 w-4 text-muted-foreground" />
                          <Input
                            value={editForm.whatsapp_dm || ''}
                            onChange={(e) => setEditForm({ ...editForm, whatsapp_dm: e.target.value })}
                            placeholder="Whatsapp dm"
                            className="text-sm"
                          />
                        </div>
                        <div className="flex items-center gap-3">
                          <img src={stackoverflow} className="h-4 w-4 text-muted-foreground" />
                          <Input
                            value={editForm.stackoverflow_url || ''}
                            onChange={(e) => setEditForm({ ...editForm, stackoverflow_url: e.target.value })}
                            placeholder="Stackoverflow url"
                            className="text-sm"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        {profile?.linkedin_url && (
                          <div className="flex items-center gap-3">
                            <Linkedin className="h-4 w-4 text-muted-foreground" />
                            <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline">
                              LinkedIn
                            </a>
                          </div>
                        )}
                        {profile?.github_url && (
                          <div className="flex items-center gap-3">
                            <Github className="h-4 w-4 text-muted-foreground" />
                            <a href={profile.github_url} target="_blank" rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline">
                              GitHub
                            </a>
                          </div>
                        )}
                        {profile?.portfolio_url && (
                          <div className="flex items-center gap-3">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <a href={profile.portfolio_url} target="_blank" rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline">
                              Portfolio
                            </a>
                          </div>
                        )}
                        {profile?.twitter_url && (
                          <div className="flex items-center gap-3">
                            <Twitter className="h-4 w-4 text-muted-foreground" />
                            <a href={profile.twitter_url} target="_blank" rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline">
                              Twitter
                            </a>
                          </div>
                        )}
                        {profile?.instagram_url && (
                          <div className="flex items-center gap-3">
                            <Twitter className="h-4 w-4 text-muted-foreground" />
                            <a href={profile.instagram_url} target="_blank" rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline">
                              Instagram
                            </a>
                          </div>

                        )}
                        {profile?.whatsapp_dm && (
                          <div className="flex items-center gap-3">
                            <img src={whatsapp} className="h-4 w-4 text-muted-foreground" />
                            <a href={profile.whatsapp_dm} target="_blank" rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline">
                              Whatsapp Dm
                            </a>
                          </div>
                        )}
                        {profile?.stackoverflow_url && (
                          <div className="flex items-center gap-3">
                            <img src={stackoverflow} className="h-4 w-4 text-muted-foreground" />
                            <a href={profile.stackoverflow_url} target="_blank" rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline">
                              Stackoverflow
                            </a>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resume Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Current Resume Link */}
                    {profile?.resume_link && (
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-medium text-blue-800">Current Resume</span>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" asChild>
                              <a href={profile.resume_link} target="_blank" rel="noopener noreferrer">
                                <Download className="h-3 w-3 mr-1" />
                                Download
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Resume Upload/Parse */}
                    <div className="border-t pt-4">
                      <p className="text-sm text-muted-foreground mb-3">
                        Upload your resume (PDF or DOCX) to automatically fill in your profile details.
                      </p>
                      <Input type="file" onChange={handleFileChange} accept=".pdf,.docx" />
                      <Button onClick={handleResumeParse} disabled={isParsing || !resumeFile} className="w-full mt-2">
                        {isParsing ? "Extracting..." : "Extract from CV"}
                        <UploadCloud className="ml-2 h-4 w-4" />
                      </Button>
                    </div>

                    {/* Manual Resume Link */}
                    {editing && (
                      <div className="border-t pt-4">
                        <label className="text-sm font-medium mb-2 block">Resume Link (URL)</label>
                        <Input
                          value={editForm.resume_link || ''}
                          onChange={(e) => setEditForm({ ...editForm, resume_link: e.target.value })}
                          placeholder="https://your-resume-url.com"
                          className="text-sm"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Add a direct link to your resume (Google Drive, Dropbox, etc.)
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Experience</span>
                      <span className="font-medium">{profile?.experience_years || 0} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Skills</span>
                      <span className="font-medium">{profile?.skills?.length || 0} skills</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Projects</span>
                      <span className="font-medium">{profile?.projects?.length || 0} projects</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Availability</span>
                      <Badge variant="outline" className={`text-sm ${getAvailabilityColor(profile.availability)}`}>{profile?.availability}</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Profile Complete</span>
                        <span className="font-medium">{localCompletionPercentage}%</span>
                      </div>
                      <Progress
                        value={localCompletionPercentage}
                        className={`w-full h-2 ${localCompletionPercentage < 50 ? 'bg-red-500' : localCompletionPercentage < 75 ? 'bg-yellow-500' : 'bg-green-500'}`}
                        aria-label="Profile completion progress"
                      />
                      {localCompletionPercentage < 100 && (
                        <div className="text-xs text-muted-foreground">
                          <p>Complete your profile by adding:</p>
                          <ul className="list-disc pl-4">
                            {!profile?.name && (
                              <li>
                                <Button
                                  variant="link"
                                  className="text-xs p-0 h-auto"
                                  onClick={() => handleJumpToField('name')}
                                  aria-label="Add name"
                                >
                                  Name
                                </Button>
                              </li>
                            )}
                            {!profile?.bio && (
                              <li>
                                <Button
                                  variant="link"
                                  className="text-xs p-0 h-auto"
                                  onClick={() => handleJumpToField('bio')}
                                  aria-label="Add bio"
                                >
                                  Bio
                                </Button>
                              </li>
                            )}
                            {!profile?.linkedin_url && (
                              <li>
                                <Button
                                  variant="link"
                                  className="text-xs p-0 h-auto"
                                  onClick={() => handleJumpToField('linkedin_url')}
                                  aria-label="Add LinkedIn URL"
                                >
                                  LinkedIn URL
                                </Button>
                              </li>
                            )}
                            {!profile?.skills?.length && (
                              <li>
                                <Button
                                  variant="link"
                                  className="text-xs p-0 h-auto"
                                  onClick={() => handleJumpToField('skills')}
                                  aria-label="Add skills"
                                >
                                  Skills
                                </Button>
                              </li>
                            )}
                            {!profile?.work_experience?.length && (
                              <li>
                                <Button
                                  variant="link"
                                  className="text-xs p-0 h-auto"
                                  onClick={() => handleJumpToField('work_experience')}
                                  aria-label="Add work experience"
                                >
                                  Work Experience
                                </Button>
                              </li>
                            )}
                            {!profile?.education && (
                              <li>
                                <Button
                                  variant="link"
                                  className="text-xs p-0 h-auto"
                                  onClick={() => handleJumpToField('education')}
                                  aria-label="Add education"
                                >
                                  Education
                                </Button>
                              </li>
                            )}
                            {!profile?.preferences && (
                              <li>
                                <Button
                                  variant="link"
                                  className="text-xs p-0 h-auto"
                                  onClick={() => handleJumpToField('preferences')}
                                  aria-label="Add job preferences"
                                >
                                  Job Preferences
                                </Button>
                              </li>
                            )}
                            {!profile?.salary_expectation && (
                              <li>
                                <Button
                                  variant="link"
                                  className="text-xs p-0 h-auto"
                                  onClick={() => handleJumpToField('salary')}
                                  aria-label="Add your expected salary">
                                  Salary Expectation
                                </Button>
                              </li>
                            )}
                            {!profile?.date_of_birth && (
                              <li>
                                <Button
                                  variant="link"
                                  className="text-xs p-0 h-auto"
                                  onClick={() => handleJumpToField('dob')}
                                  aria-label="Add your date of birth">
                                  Date of Birth
                                </Button>
                              </li>
                            )}
                            {!profile?.location && (
                              <li>
                                <Button
                                  variant="link"
                                  className="text-xs p-0 h-auto"
                                  onClick={() => handleJumpToField('location')}
                                  aria-label="Add your location">
                                  Location
                                </Button>
                              </li>
                            )}
                            {!profile?.experience_years && (
                              <li>
                                <Button
                                  variant="link"
                                  className="text-xs p-0 h-auto"
                                  onClick={() => handleJumpToField('experience_years')}
                                  aria-label="Years of experience"
                                >
                                  Years of Experience
                                </Button>

                              </li>
                            )}
                            {!profile?.preferred_job_type && (
                              <li>
                                <Button
                                  variant="link"
                                  className="text-xs p-0 h-auto"
                                  onClick={() => handleJumpToField('job_type')}
                                  aria-label="Preferred job type">
                                  Preferred Job Type
                                </Button>
                              </li>
                            )}
                            {!profile?.phone && (
                              <li>
                                <Button
                                  variant="link"
                                  className="text-xs p-0 h-auto"
                                  onClick={() => handleJumpToField('phone')}
                                  aria-label="Phone Number">
                                  Phone Number
                                </Button>
                              </li>
                            )}
                            {!profile?.twitter_url && (
                              <li>
                                <Button
                                  variant="link"
                                  className="text-xs p-0 h-auto"
                                  onClick={() => handleJumpToField('twitter')}
                                  aria-label="Your twitter handle url"
                                >
                                  Twitter
                                </Button>
                              </li>
                            )}
                            {!profile?.stackoverflow_url && (
                              <li>
                                <Button
                                  variant="link"
                                  className="text-xs p-0 h-auto"
                                  onClick={() => handleJumpToField('stackoverflow')}
                                  aria-label="Your twitter handle url"
                                >
                                  Stackoverflow
                                </Button>
                              </li>
                            )}
                            {!profile?.resume_link && (
                              <li>
                                <Button
                                  variant="link"
                                  className="text-xs p-0 h-auto"
                                  onClick={() => handleJumpToField('resume')}
                                  aria-label="resume link"
                                >Resume Link</Button>
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                    {profile?.updated_at && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Updated</span>
                        <span className="text-xs">{new Date(profile.updated_at).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Detailed Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Skills */}
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profile?.skills?.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Work Experience */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Work Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {profile?.work_experience?.map((exp, index) => (
                      <div key={index} className="border-l-2 border-primary/20 pl-4">
                        <h4 className="font-semibold">{exp.position}</h4>
                        <p className="text-muted-foreground">{exp.company}</p>
                        <p className="text-sm text-muted-foreground">{exp.duration}</p>
                        <p className="text-sm mt-2">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Education */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {editing ? (
                    <Textarea
                      value={editForm.education || ''}
                      onChange={(e) => setEditForm({ ...editForm, education: e.target.value })}
                      placeholder="Your education background..."
                    />
                  ) : (
                    <p>{profile?.education || "No education information provided"}</p>
                  )}
                </CardContent>
              </Card>

              {/* Projects */}
              <Card>
                <CardHeader>
                  <CardTitle>Projects</CardTitle>
                </CardHeader>
                <CardContent ref={projectsInputRef}>
                  {editing ? (
                    <div className="space-y-6">
                      {editForm.projects && editForm.projects.length > 0 && editForm.projects.map((project, index) => (
                        <div key={index} className="border rounded-lg p-4 space-y-4">
                          <Input
                            value={project.name || ''}
                            onChange={(e) => {
                              const newProjects = [...(editForm.projects || [])];
                              newProjects[index] = { ...newProjects[index], name: e.target.value };
                              setEditForm({ ...editForm, projects: newProjects });

                            }}
                            placeholder="Project Name"
                            className="w-full" />
                          <Textarea
                            value={project.description || ''}
                            onChange={(e) => {
                              const newProjects = [...(editForm.projects || [])];
                              newProjects[index] = { ...newProjects[index], description: e.target.value };
                              setEditForm({ ...editForm, projects: newProjects });
                            }}
                            placeholder="Description"
                            rows={3}
                          />
                          <Input
                            value={project.url || ''}
                            onChange={(e) => {
                              const newProjects = [...(editForm.projects || [])];
                              newProjects[index] = { ...newProjects[index], url: e.target.value };
                              setEditForm({ ...editForm, projects: newProjects });

                            }}
                            placeholder="project url (optional)"
                            className="w-full"
                          />
                          <Input
                            value={project.tech_stack?.join(', ') || ''}
                            onChange={(e) => {
                              const newProjects = [...(editForm.projects || [])];
                              newProjects[index] = { ...newProjects[index], tech_stack: e.target.value.split(',').map(tech => tech.trim()) };
                              setEditForm({ ...editForm, projects: newProjects });
                            }}
                            onBlur={(e) => {
                              // Clean up empty entries when user finishes editing
                              const newProjects = [...(editForm.projects || [])];
                              newProjects[index] = {
                                ...newProjects[index],
                                tech_stack: e.target.value.split(',').map(tech => tech.trim()).filter(tech => tech)
                              };
                              setEditForm({ ...editForm, projects: newProjects });
                            }}

                            placeholder="Tech Stack (comma-separated)"
                            className="w-full"
                          />

                        </div>
                      ))}
                      <Button
                        variant="outline"
                        onClick={() => {
                          const newProjects = [...(editForm.projects || []), { name: '', description: '', url: '', tech_stack: [] }];
                          setEditForm({ ...editForm, projects: newProjects })
                        }}
                        className="w-full"

                      />
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Project
                    </div>
                  ) :
                    (<div className="space-y-4">
                      {profile?.projects?.map((project, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold">{project.name}</h4>
                            {project.url && (
                              <a href={project.url} target="_blank" rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:underline">
                                View Project
                              </a>
                            )}
                          </div>
                          <p className="text-muted-foreground text-sm mb-2">{project.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {project.tech_stack?.map((tech, techIndex) => (
                              <Badge key={techIndex} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>)}
                </CardContent>
              </Card>

              {/* Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Languages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {editing ? (
                      <Textarea
                        value={editForm.languages?.join(', ') || ''}
                        onChange={(e) => setEditForm({
                          ...editForm,
                          languages: e.target.value.split(',').map(lang => lang.trim()).filter(lang => lang)
                        })}
                        placeholder="Languages (comma-separated)"
                      />
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {profile?.languages?.map((lang, index) => (
                          <Badge key={index} variant="outline">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Certifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {editing ? (
                      <Textarea
                        value={editForm.certifications?.join('\n') || ''}
                        onChange={(e) => setEditForm({
                          ...editForm,
                          certifications: e.target.value.split('\n').map(cert => cert.trim()).filter(cert => cert)
                        })}
                        placeholder="Certifications (one per line)"
                      />
                    ) : (
                      <div className="space-y-2">
                        {profile?.certifications?.map((cert, index) => (
                          <div key={index} className="text-sm">
                            {cert}
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Job Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {editing ? (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Job Search Preferences</label>
                        <Textarea
                          value={JSON.stringify(editForm.preferences || {}, null, 2)}
                          onChange={(e) => {
                            try {
                              const preferences = JSON.parse(e.target.value);
                              setEditForm({ ...editForm, preferences });
                            } catch {
                              // Handle invalid JSON gracefully
                            }
                          }}
                          placeholder='{\n  "remote_work": true,\n  "travel_willingness": "low",\n  "company_size": "startup",\n  "industry_preferences": ["tech", "finance"]\n}'
                          rows={6}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          JSON format for complex preferences (remote work, company size, industry, etc.)
                        </p>
                      </div>
                    </div>
                  ) : profile?.preferences && Object.keys(profile.preferences).length > 0 ? (
                    <div className="space-y-2">
                      {Object.entries(profile.preferences).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-muted-foreground capitalize">{key.replace('_', ' ')}</span>
                          <span className="font-medium">
                            {Array.isArray(value) ? value.join(', ') : String(value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">No job preferences set</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;