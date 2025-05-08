
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { TrendingUp, BookOpen, Award, Calendar, Clock } from "lucide-react";

interface CareerStep {
  id: string;
  title: string;
  description: string;
  timeframe: string;
  salaryRange: string;
  skillsRequired: {
    name: string;
    level: "basic" | "intermediate" | "advanced";
  }[];
  education: {
    level: string;
    field: string;
    required: boolean;
  };
  certifications: string[];
}

interface CareerPath {
  id: string;
  title: string;
  description: string;
  steps: CareerStep[];
}

const CareerPathVisualizer = () => {
  const { toast } = useToast();
  const [selectedPath, setSelectedPath] = useState<CareerPath | null>(null);
  const [activeStep, setActiveStep] = useState<string | null>(null);
  
  // Mock career paths
  const careerPaths: CareerPath[] = [
    {
      id: "software-dev",
      title: "Software Development",
      description: "Progress from a junior developer to a senior technical leader",
      steps: [
        {
          id: "junior-dev",
          title: "Junior Developer",
          description: "Build foundational skills in software development by working on supervised projects and learning core technologies.",
          timeframe: "1-2 years",
          salaryRange: "60,000 - 90,000 KES/month",
          skillsRequired: [
            { name: "JavaScript", level: "basic" },
            { name: "HTML/CSS", level: "intermediate" },
            { name: "Git", level: "basic" },
            { name: "Problem Solving", level: "basic" },
          ],
          education: {
            level: "Bachelor's",
            field: "Computer Science or related field",
            required: false
          },
          certifications: ["Optional: Web Development Bootcamp"]
        },
        {
          id: "mid-level-dev",
          title: "Mid-Level Developer",
          description: "Take on more complex projects with less supervision and mentor junior team members. Develop deeper technical specializations.",
          timeframe: "2-4 years",
          salaryRange: "90,000 - 150,000 KES/month",
          skillsRequired: [
            { name: "JavaScript", level: "intermediate" },
            { name: "React/Angular/Vue", level: "intermediate" },
            { name: "Backend Technologies", level: "basic" },
            { name: "Testing", level: "intermediate" },
            { name: "CI/CD", level: "basic" },
          ],
          education: {
            level: "Bachelor's",
            field: "Computer Science or related field",
            required: false
          },
          certifications: ["AWS Developer Associate", "Microsoft Certified: JavaScript Developer"]
        },
        {
          id: "senior-dev",
          title: "Senior Developer",
          description: "Lead technical decisions, architect solutions, and mentor other developers. Drive best practices and technical excellence.",
          timeframe: "3-5 years",
          salaryRange: "150,000 - 250,000 KES/month",
          skillsRequired: [
            { name: "JavaScript", level: "advanced" },
            { name: "System Design", level: "intermediate" },
            { name: "Architecture Patterns", level: "intermediate" },
            { name: "Technical Leadership", level: "intermediate" },
            { name: "Performance Optimization", level: "intermediate" },
          ],
          education: {
            level: "Bachelor's",
            field: "Computer Science or related field",
            required: false
          },
          certifications: ["AWS Solutions Architect", "Google Cloud Professional Developer"]
        },
        {
          id: "lead-architect",
          title: "Tech Lead / Architect",
          description: "Define technical vision, lead cross-functional teams, and make critical architectural decisions for complex systems.",
          timeframe: "5+ years",
          salaryRange: "250,000 - 400,000 KES/month",
          skillsRequired: [
            { name: "System Architecture", level: "advanced" },
            { name: "Technical Strategy", level: "advanced" },
            { name: "Team Leadership", level: "advanced" },
            { name: "Stakeholder Management", level: "intermediate" },
            { name: "Distributed Systems", level: "advanced" },
          ],
          education: {
            level: "Bachelor's or Master's",
            field: "Computer Science or related field",
            required: true
          },
          certifications: ["AWS Solutions Architect Professional", "Azure Solutions Architect"]
        }
      ]
    },
    {
      id: "data-science",
      title: "Data Science",
      description: "Grow from a data analyst to a data science leader",
      steps: [
        {
          id: "data-analyst",
          title: "Data Analyst",
          description: "Collect, process, and analyze data to identify trends and insights for business decision-making.",
          timeframe: "1-2 years",
          salaryRange: "70,000 - 100,000 KES/month",
          skillsRequired: [
            { name: "SQL", level: "intermediate" },
            { name: "Excel/Sheets", level: "advanced" },
            { name: "Data Visualization", level: "intermediate" },
            { name: "Basic Statistics", level: "intermediate" },
          ],
          education: {
            level: "Bachelor's",
            field: "Statistics, Mathematics, Economics, or related field",
            required: false
          },
          certifications: ["Microsoft Power BI Data Analyst", "Google Data Analytics Certificate"]
        },
        {
          id: "data-scientist",
          title: "Data Scientist",
          description: "Apply statistical methods and machine learning to extract actionable insights and build predictive models.",
          timeframe: "2-4 years",
          salaryRange: "120,000 - 200,000 KES/month",
          skillsRequired: [
            { name: "Python/R", level: "intermediate" },
            { name: "Machine Learning", level: "intermediate" },
            { name: "Statistical Analysis", level: "advanced" },
            { name: "Data Wrangling", level: "advanced" },
            { name: "SQL", level: "advanced" },
          ],
          education: {
            level: "Master's",
            field: "Statistics, Computer Science, or related field",
            required: true
          },
          certifications: ["IBM Data Science Professional", "TensorFlow Developer Certificate"]
        },
        {
          id: "senior-data-scientist",
          title: "Senior Data Scientist",
          description: "Lead data science initiatives, develop complex models, and translate business problems into data questions.",
          timeframe: "3-5 years",
          salaryRange: "200,000 - 300,000 KES/month",
          skillsRequired: [
            { name: "Advanced ML Algorithms", level: "advanced" },
            { name: "Deep Learning", level: "intermediate" },
            { name: "Big Data Tools", level: "intermediate" },
            { name: "Project Management", level: "intermediate" },
            { name: "Business Acumen", level: "intermediate" },
          ],
          education: {
            level: "Master's or PhD",
            field: "Statistics, Computer Science, or related field",
            required: true
          },
          certifications: ["Google Professional Data Engineer", "AWS Certified Data Analytics"]
        },
        {
          id: "data-science-director",
          title: "Data Science Director",
          description: "Define data strategy, lead teams of data scientists, and drive organization-wide data initiatives.",
          timeframe: "5+ years",
          salaryRange: "300,000 - 500,000 KES/month",
          skillsRequired: [
            { name: "Team Leadership", level: "advanced" },
            { name: "Data Strategy", level: "advanced" },
            { name: "Stakeholder Management", level: "advanced" },
            { name: "Executive Communication", level: "advanced" },
            { name: "Business Strategy", level: "intermediate" },
          ],
          education: {
            level: "Master's or PhD",
            field: "Statistics, Computer Science, or related field",
            required: true
          },
          certifications: ["TOGAF Certification", "Project Management Professional (PMP)"]
        }
      ]
    }
  ];
  
  const handleSelectPath = (path: CareerPath) => {
    setSelectedPath(path);
    setActiveStep(path.steps[0].id);
    
    toast({
      title: `${path.title} Career Path`,
      description: "Explore each step in this career progression to plan your journey.",
    });
  };
  
  const handleSelectStep = (stepId: string) => {
    setActiveStep(stepId);
  };
  
  const getActiveStepDetails = () => {
    if (!selectedPath || !activeStep) return null;
    return selectedPath.steps.find(step => step.id === activeStep);
  };
  
  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case "basic": return "bg-blue-100 text-blue-800";
      case "intermediate": return "bg-purple-100 text-purple-800";
      case "advanced": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  const activeStepDetails = getActiveStepDetails();
  
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {careerPaths.map((path) => (
          <Card 
            key={path.id} 
            className={`cursor-pointer hover:shadow-md transition-shadow ${selectedPath?.id === path.id ? 'ring-2 ring-primary' : ''}`}
            onClick={() => handleSelectPath(path)}
          >
            <CardHeader>
              <CardTitle>{path.title}</CardTitle>
              <CardDescription>{path.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-500 mb-4">
                {path.steps.length} career progression steps
              </div>
              <div className="space-y-1">
                {path.steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm">{step.title}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {selectedPath && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>{selectedPath.title} Career Path</CardTitle>
            <CardDescription>{selectedPath.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-8">
              <div className="relative">
                <div className="absolute top-3 left-0 right-0 h-1 bg-gray-200 z-0"></div>
                <div className="flex justify-between relative z-10">
                  {selectedPath.steps.map((step, index) => (
                    <div 
                      key={step.id}
                      className="flex flex-col items-center cursor-pointer"
                      onClick={() => handleSelectStep(step.id)}
                    >
                      <div 
                        className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-medium ${
                          step.id === activeStep 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {index + 1}
                      </div>
                      <span className={`text-xs mt-2 font-medium ${step.id === activeStep ? 'text-blue-600' : 'text-gray-500'}`}>
                        {step.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {activeStepDetails && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold">{activeStepDetails.title}</h3>
                  <p className="mt-2 text-gray-600">{activeStepDetails.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Calendar className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Typical Duration</h4>
                        <p className="text-sm text-gray-600">{activeStepDetails.timeframe}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <TrendingUp className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Expected Salary Range</h4>
                        <p className="text-sm text-gray-600">{activeStepDetails.salaryRange}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <BookOpen className="h-5 w-5 text-purple-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Education</h4>
                        <p className="text-sm text-gray-600">
                          {activeStepDetails.education.level} in {activeStepDetails.education.field}
                          {activeStepDetails.education.required ? ' (Required)' : ' (Preferred)'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Award className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Recommended Certifications</h4>
                        <ul className="text-sm text-gray-600 mt-1 space-y-1">
                          {activeStepDetails.certifications.map((cert, index) => (
                            <li key={index}>{cert}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Skills Required</h4>
                    <div className="space-y-3">
                      {activeStepDetails.skillsRequired.map((skill) => (
                        <div key={skill.name} className="flex justify-between items-center">
                          <span className="text-sm">{skill.name}</span>
                          <Badge className={getSkillLevelColor(skill.level)}>
                            {skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-4 mt-4 border-t">
                      <h4 className="font-medium mb-2">Learning Resources</h4>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start">
                          <BookOpen className="mr-2 h-4 w-4" />
                          Recommended Courses
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Clock className="mr-2 h-4 w-4" />
                          Learning Path Timeline
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CareerPathVisualizer;
