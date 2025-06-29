import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
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
  Edit3,
  Save,
  X,
  UploadCloud,
  DollarSign,
  Building,
  FileText,
  Download,
  Settings
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { profileService } from "@/services/profile.service";
import { toast } from "sonner";
import { Profile as ProfileType, ProfileUpdate } from "@/types/api";

const Profile: React.FC = () => {
  const { user, isAuthenticated, profile: authProfile } = useAuth();
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<ProfileUpdate>>({});
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isParsing, setIsParsing] = useState(false);

  useEffect(() => {
    if (isAuthenticated && authProfile) {
      setProfile(authProfile);
      setEditForm(authProfile);
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
      setEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error("Failed to update profile");
    }
  };

  const handleCancel = () => {
    setEditForm(profile as ProfileType);
    setEditing(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setResumeFile(event.target.files[0]);
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
      const updatedProfile = response.updated_profile;
      const parsedData = response.parsed_data;

      // Create a comprehensive update object
      const updatePayload = {
        ...profile,
        ...parsedData.personal_info,
        ...parsedData.professional_summary,
        skills: parsedData.skills,
        work_experience: parsedData.work_experience,
        education: parsedData.education,
        projects: parsedData.projects,
        certifications: parsedData.certifications,
        languages: parsedData.languages,
        ...parsedData.additional_info,
        resume_link: response.cv_file_url,
      };

      setProfile(updatePayload as ProfileType);
      setEditForm(updatePayload);
      await handleSave(updatePayload);
      toast.success("Resume parsed successfully! Profile has been updated.");
    } catch (error) {
      console.error("Error parsing resume:", error);
      toast.error("Failed to parse resume.");
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
                        <span className="text-sm">{profile.availability}</span>
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
                      <Badge variant="outline">{profile?.availability}</Badge>
                    </div>
                    {profile?.profile_completion_percentage && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Profile Complete</span>
                        <span className="font-medium">{profile.profile_completion_percentage}%</span>
                      </div>
                    )}
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
                <CardContent>
                  <div className="space-y-4">
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
                  </div>
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
