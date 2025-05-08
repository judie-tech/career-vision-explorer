
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import ResumeAnalysis from "@/components/profile/ResumeAnalysis";
import SkillsAssessment from "@/components/assessments/SkillsAssessment";
import { 
  User, 
  Settings, 
  FileText, 
  Briefcase, 
  Award, 
  BookOpen, 
  TrendingUp,
  CheckCircle, 
  Star,
  GraduationCap
} from "lucide-react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const profileCompletionScore = 75;
  const recentAssessments = [
    {
      title: "Front-End Development",
      score: 85,
      date: "3 days ago",
      badgeEarned: true
    },
    {
      title: "Communication Skills",
      score: 92,
      date: "1 week ago",
      badgeEarned: true
    },
    {
      title: "Agile Methodology",
      score: 78,
      date: "2 weeks ago",
      badgeEarned: false
    }
  ];
  
  const skills = [
    { name: "JavaScript", level: 90, verified: true },
    { name: "React", level: 85, verified: true },
    { name: "Node.js", level: 80, verified: false },
    { name: "UI/UX Design", level: 75, verified: false },
    { name: "Communication", level: 92, verified: true },
    { name: "Problem Solving", level: 88, verified: true }
  ];
  
  const applicationStats = {
    total: 12,
    active: 5,
    interviews: 3,
    offers: 1
  };
  
  const learningPaths = [
    {
      title: "Full Stack Web Development",
      progress: 68,
      modules: 15,
      modulesCompleted: 10
    },
    {
      title: "UI/UX Design Fundamentals",
      progress: 45,
      modules: 12,
      modulesCompleted: 5
    }
  ];
  
  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="text-gray-500">Manage your career profile and track your progress</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button variant="outline" className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-8 w-8 text-gray-500" />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-bold">John Doe</h2>
                  <p className="text-gray-500">Senior Software Engineer</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm">
                  <BookOpen className="h-4 w-4 mr-2 text-gray-500" />
                  BSc Computer Science, University of Nairobi
                </div>
                <div className="flex items-center text-sm">
                  <Briefcase className="h-4 w-4 mr-2 text-gray-500" />
                  5+ years experience
                </div>
                <div className="flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                  Looking for new opportunities
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Profile Completion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span className="font-medium">Overall Progress</span>
                    <span>{profileCompletionScore}%</span>
                  </div>
                  <Progress value={profileCompletionScore} />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Personal Information
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Education History
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Skills & Assessments
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <div className="h-4 w-4 mr-2 rounded-full border border-gray-300"></div>
                    Certifications
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <div className="h-4 w-4 mr-2 rounded-full border border-gray-300"></div>
                    Portfolio Items
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Job Application Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-3 rounded-md text-center">
                  <p className="text-2xl font-bold text-blue-700">{applicationStats.total}</p>
                  <p className="text-sm text-gray-500">Total Applications</p>
                </div>
                <div className="bg-amber-50 p-3 rounded-md text-center">
                  <p className="text-2xl font-bold text-amber-700">{applicationStats.active}</p>
                  <p className="text-sm text-gray-500">Active</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-md text-center">
                  <p className="text-2xl font-bold text-purple-700">{applicationStats.interviews}</p>
                  <p className="text-sm text-gray-500">Interviews</p>
                </div>
                <div className="bg-green-50 p-3 rounded-md text-center">
                  <p className="text-2xl font-bold text-green-700">{applicationStats.offers}</p>
                  <p className="text-sm text-gray-500">Offers</p>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  View Applications
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="resume">Resume & Skills</TabsTrigger>
            <TabsTrigger value="assessments">Assessments</TabsTrigger>
            <TabsTrigger value="learning">Learning Paths</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Skills Overview</CardTitle>
                  <CardDescription>Your top skills and proficiency levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {skills.slice(0, 4).map((skill) => (
                      <div key={skill.name} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <span className="text-sm font-medium">{skill.name}</span>
                            {skill.verified && (
                              <Badge variant="outline" className="ml-2 text-xs bg-green-50">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          <span className="text-xs">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} />
                      </div>
                    ))}
                    
                    <Button variant="ghost" className="w-full text-sm">View All Skills</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Assessments</CardTitle>
                  <CardDescription>Results from your latest skill assessments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentAssessments.map((assessment, index) => (
                      <div key={index} className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0">
                        <div>
                          <p className="font-medium">{assessment.title}</p>
                          <p className="text-xs text-gray-500">Completed {assessment.date}</p>
                        </div>
                        <div className="flex items-center">
                          <Badge className={`mr-2 ${assessment.score >= 80 ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                            {assessment.score}%
                          </Badge>
                          {assessment.badgeEarned && (
                            <Star className="h-4 w-4 text-amber-500" />
                          )}
                        </div>
                      </div>
                    ))}
                    
                    <Button variant="ghost" className="w-full text-sm">Take New Assessment</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Career Progress</CardTitle>
                <CardDescription>Track your career journey and milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute top-0 bottom-0 left-7 w-0.5 bg-gray-200"></div>
                  <ul className="space-y-6">
                    <li className="relative pl-14">
                      <div className="absolute left-0 rounded-full bg-green-500 text-white w-14 h-6 flex items-center justify-center text-xs">
                        Current
                      </div>
                      <div className="absolute left-7 -translate-x-1/2 w-4 h-4 rounded-full bg-green-500"></div>
                      <h4 className="text-lg font-medium">Senior Software Engineer</h4>
                      <p className="text-sm text-gray-500">TechNova • 2023 - Present</p>
                      <p className="text-sm mt-1">Leading frontend development and mentoring junior developers.</p>
                    </li>
                    <li className="relative pl-14">
                      <div className="absolute left-7 -translate-x-1/2 w-4 h-4 rounded-full bg-gray-300"></div>
                      <h4 className="text-lg font-medium">Software Engineer</h4>
                      <p className="text-sm text-gray-500">DataViz Solutions • 2020 - 2023</p>
                      <p className="text-sm mt-1">Developed web applications using React and Node.js.</p>
                    </li>
                    <li className="relative pl-14">
                      <div className="absolute left-7 -translate-x-1/2 w-4 h-4 rounded-full bg-gray-300"></div>
                      <h4 className="text-lg font-medium">Junior Developer</h4>
                      <p className="text-sm text-gray-500">StartupX • 2018 - 2020</p>
                      <p className="text-sm mt-1">Worked on frontend development with JavaScript and CSS.</p>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="resume" className="space-y-8">
            <ResumeAnalysis />
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Skill Management</CardTitle>
                <CardDescription>Add, remove, and verify your skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Technical Skills</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {skills.filter(skill => ["JavaScript", "React", "Node.js"].includes(skill.name)).map((skill) => (
                        <div key={skill.name} className="border rounded-md p-3">
                          <div className="flex justify-between">
                            <span className="font-medium">{skill.name}</span>
                            {skill.verified && (
                              <Badge variant="outline" className="text-xs bg-green-50">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          <div className="mt-2 space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Proficiency</span>
                              <span>{skill.level}%</span>
                            </div>
                            <Progress value={skill.level} />
                          </div>
                          <div className="flex gap-2 mt-3">
                            <Button variant="outline" size="sm" className="text-xs flex-1">Edit</Button>
                            {!skill.verified && (
                              <Button size="sm" className="text-xs flex-1">Verify</Button>
                            )}
                          </div>
                        </div>
                      ))}
                      <div className="border border-dashed rounded-md p-3 flex items-center justify-center">
                        <Button variant="ghost" className="text-sm">+ Add Skill</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Soft Skills</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {skills.filter(skill => ["Communication", "Problem Solving"].includes(skill.name)).map((skill) => (
                        <div key={skill.name} className="border rounded-md p-3">
                          <div className="flex justify-between">
                            <span className="font-medium">{skill.name}</span>
                            {skill.verified && (
                              <Badge variant="outline" className="text-xs bg-green-50">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          <div className="mt-2 space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Proficiency</span>
                              <span>{skill.level}%</span>
                            </div>
                            <Progress value={skill.level} />
                          </div>
                          <div className="flex gap-2 mt-3">
                            <Button variant="outline" size="sm" className="text-xs flex-1">Edit</Button>
                            {!skill.verified && (
                              <Button size="sm" className="text-xs flex-1">Verify</Button>
                            )}
                          </div>
                        </div>
                      ))}
                      <div className="border border-dashed rounded-md p-3 flex items-center justify-center">
                        <Button variant="ghost" className="text-sm">+ Add Skill</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="assessments">
            <SkillsAssessment />
          </TabsContent>
          
          <TabsContent value="learning" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">My Learning Paths</CardTitle>
                <CardDescription>Track your progress in various learning programs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {learningPaths.map((path, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                        <div>
                          <h3 className="font-medium flex items-center">
                            <GraduationCap className="h-5 w-5 mr-2 text-blue-500" />
                            {path.title}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {path.modulesCompleted} of {path.modules} modules completed
                          </p>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <Badge className="bg-blue-100 text-blue-800">
                            {path.progress}% Complete
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{path.progress}%</span>
                        </div>
                        <Progress value={path.progress} />
                      </div>
                      
                      <div className="mt-4 flex gap-3">
                        <Button className="flex-1">Continue Learning</Button>
                        <Button variant="outline" className="flex-1">View Details</Button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border border-dashed rounded-lg p-4 flex flex-col items-center justify-center py-8">
                    <BookOpen className="h-8 w-8 text-gray-400 mb-2" />
                    <h3 className="font-medium">Discover New Learning Paths</h3>
                    <p className="text-sm text-gray-500 mt-1 text-center max-w-sm">
                      Explore our curated learning paths to develop new skills and advance your career.
                    </p>
                    <Button className="mt-4">Browse Learning Paths</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recommended Courses</CardTitle>
                <CardDescription>Based on your career goals and skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="border rounded-md overflow-hidden">
                    <div className="h-32 bg-gray-100 flex items-center justify-center">
                      <BookOpen className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium">Advanced React Patterns</h4>
                      <p className="text-xs text-gray-500 mt-1">15 modules • 8 hours</p>
                      <div className="mt-3">
                        <Button variant="outline" size="sm" className="w-full">View Course</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-md overflow-hidden">
                    <div className="h-32 bg-gray-100 flex items-center justify-center">
                      <BookOpen className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium">Leadership Skills</h4>
                      <p className="text-xs text-gray-500 mt-1">12 modules • 6 hours</p>
                      <div className="mt-3">
                        <Button variant="outline" size="sm" className="w-full">View Course</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-md overflow-hidden">
                    <div className="h-32 bg-gray-100 flex items-center justify-center">
                      <BookOpen className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium">Cloud Architecture</h4>
                      <p className="text-xs text-gray-500 mt-1">18 modules • 10 hours</p>
                      <div className="mt-3">
                        <Button variant="outline" size="sm" className="w-full">View Course</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Profile;
