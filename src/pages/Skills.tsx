
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { SkillsAssessmentInterface } from "@/components/assessments/SkillsAssessmentInterface";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Course {
  id: number;
  title: string;
  description: string;
  platform: string;
  duration: string;
  level: string;
  progress?: number;
}

const recommendedCourses: Course[] = [
  {
    id: 1,
    title: "Advanced React Patterns",
    description: "Learn advanced React patterns and best practices for building scalable applications",
    platform: "Visiondrill",
    duration: "4 hours",
    level: "Advanced"
  },
  {
    id: 2,
    title: "JavaScript Algorithms and Data Structures",
    description: "Master the fundamental algorithms and data structures in JavaScript",
    platform: "Visiondrill",
    duration: "8 hours",
    level: "Intermediate"
  },
  {
    id: 3,
    title: "TypeScript for React Developers",
    description: "Learn how to use TypeScript effectively with React",
    platform: "Udemy",
    duration: "6 hours",
    level: "Intermediate"
  }
];

const inProgressCourses: Course[] = [
  {
    id: 4,
    title: "Intro to Web Development",
    description: "Learn the basics of HTML, CSS, and JavaScript",
    platform: "Visiondrill",
    duration: "10 hours",
    level: "Beginner",
    progress: 60
  },
  {
    id: 5,
    title: "UI/UX Design Fundamentals",
    description: "Learn the fundamentals of user interface and experience design",
    platform: "Visiondrill",
    duration: "5 hours",
    level: "Beginner",
    progress: 25
  }
];

const Skills = () => {
  const [showAssessment, setShowAssessment] = useState(false);
  
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-2">Skills Development</h1>
        <p className="text-gray-500 mb-8">
          Take assessments, learn new skills, and track your progress towards your career goals.
        </p>
        
        {showAssessment ? (
          <div className="flex justify-center mb-8">
            <SkillsAssessmentInterface />
          </div>
        ) : (
          <Tabs defaultValue="courses">
            <TabsList className="mb-6">
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="assessments">Assessments</TabsTrigger>
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
            </TabsList>
            
            <TabsContent value="courses">
              <div className="space-y-6">
                <h2 className="text-xl font-medium">In Progress</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {inProgressCourses.map(course => (
                    <Card key={course.id}>
                      <CardHeader>
                        <CardTitle>{course.title}</CardTitle>
                        <CardDescription>{course.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="mb-4" />
                        <div className="flex justify-between">
                          <div className="text-sm">
                            <p><span className="font-medium">Duration:</span> {course.duration}</p>
                            <p><span className="font-medium">Level:</span> {course.level}</p>
                          </div>
                          <Button>Continue</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <h2 className="text-xl font-medium mt-8">Recommended for You</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {recommendedCourses.map(course => (
                    <Card key={course.id}>
                      <CardHeader>
                        <div className="flex justify-between">
                          <CardTitle>{course.title}</CardTitle>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {course.platform}
                          </span>
                        </div>
                        <CardDescription>{course.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between mb-4">
                          <div className="text-sm">
                            <p><span className="font-medium">Duration:</span> {course.duration}</p>
                            <p><span className="font-medium">Level:</span> {course.level}</p>
                          </div>
                          <Button>Enroll</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="assessments">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-medium">Available Assessments</h2>
                  <Button onClick={() => setShowAssessment(true)}>Take New Assessment</Button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Technical Skills Assessment</CardTitle>
                      <CardDescription>
                        Evaluate your coding, problem-solving, and technical knowledge
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div className="text-sm">
                          <p><span className="font-medium">Duration:</span> 30 minutes</p>
                          <p><span className="font-medium">Questions:</span> 25</p>
                        </div>
                        <Button onClick={() => setShowAssessment(true)}>Start</Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Soft Skills Assessment</CardTitle>
                      <CardDescription>
                        Evaluate your communication, teamwork, and emotional intelligence
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div className="text-sm">
                          <p><span className="font-medium">Duration:</span> 20 minutes</p>
                          <p><span className="font-medium">Questions:</span> 15</p>
                        </div>
                        <Button onClick={() => setShowAssessment(true)}>Start</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="certificates">
              <div className="text-center p-10">
                <h3 className="text-lg font-medium mb-2">No Certificates Yet</h3>
                <p className="text-gray-500 mb-4">
                  Complete courses and assessments to earn certificates
                </p>
                <Button onClick={() => setShowAssessment(true)}>Take an Assessment</Button>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </Layout>
  );
};

export default Skills;
