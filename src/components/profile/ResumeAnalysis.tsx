
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, Check, X } from "lucide-react";

interface Skill {
  name: string;
  level: number;
  category: "technical" | "soft" | "language";
}

interface ResumeAnalysisResult {
  jobTitle: string;
  experience: number;
  education: string[];
  skills: Skill[];
  strengths: string[];
  improvements: string[];
  suggestedRoles: string[];
}

const ResumeAnalysis = () => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resume, setResume] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<ResumeAnalysisResult | null>(null);
  
  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setResume(file);
      parseResume(file);
    }
  };
  
  const parseResume = (file: File) => {
    setIsUploading(true);
    
    // Simulate file upload
    let uploadProgress = 0;
    const uploadInterval = setInterval(() => {
      uploadProgress += 20;
      setProgress(uploadProgress);
      
      if (uploadProgress >= 100) {
        clearInterval(uploadInterval);
        setIsUploading(false);
        setIsAnalyzing(true);
        
        // Simulate AI analysis
        setTimeout(() => {
          setIsAnalyzing(false);
          
          // Mock analysis result
          const mockResult: ResumeAnalysisResult = {
            jobTitle: "Senior Software Engineer",
            experience: 5,
            education: ["BSc Computer Science, University of Nairobi", "MSc Data Science, Strathmore University"],
            skills: [
              { name: "JavaScript", level: 90, category: "technical" },
              { name: "React", level: 85, category: "technical" },
              { name: "Node.js", level: 80, category: "technical" },
              { name: "Python", level: 75, category: "technical" },
              { name: "Communication", level: 85, category: "soft" },
              { name: "Problem Solving", level: 90, category: "soft" },
              { name: "Team Leadership", level: 80, category: "soft" },
              { name: "English", level: 95, category: "language" },
              { name: "Swahili", level: 90, category: "language" },
            ],
            strengths: [
              "Strong technical background in web development",
              "Proven leadership experience",
              "Excellent problem-solving abilities",
              "Advanced communication skills"
            ],
            improvements: [
              "Consider adding more data science projects to portfolio",
              "Certification in cloud technologies would be beneficial",
              "More emphasis on quantitative achievements"
            ],
            suggestedRoles: [
              "Senior Frontend Developer",
              "Technical Team Lead",
              "Full Stack Engineer",
              "Software Engineering Manager"
            ]
          };
          
          setAnalysisResult(mockResult);
          toast({
            title: "Resume Analysis Complete",
            description: "We've analyzed your resume and extracted key information."
          });
        }, 2000);
      }
    }, 500);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Resume Analysis</CardTitle>
          <CardDescription>
            Upload your resume for AI-powered analysis and receive personalized insights.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!resume ? (
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
              <FileText className="h-8 w-8 mx-auto text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Upload your resume</h3>
              <p className="mt-1 text-sm text-gray-500">PDF, DOCX or TXT up to 5MB</p>
              <div className="mt-4">
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.docx,.doc,.txt"
                    onChange={handleResumeUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Select File
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between border rounded-md p-3 mb-4">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-sm font-medium">{resume.name}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setResume(null)}
                  disabled={isUploading || isAnalyzing}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {isUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uploading...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} />
                </div>
              )}
              
              {isAnalyzing && (
                <div className="space-y-2">
                  <p className="text-sm">Analyzing your resume with AI...</p>
                  <Progress value={65} />
                </div>
              )}
            </div>
          )}
          
          {analysisResult && (
            <div className="mt-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium">Profile Summary</h3>
                <div className="mt-2 bg-gray-50 rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{analysisResult.jobTitle}</p>
                    <p className="text-sm text-gray-500">{analysisResult.experience} years experience</p>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm font-medium">Education</p>
                    <ul className="mt-1 text-sm text-gray-600">
                      {analysisResult.education.map((edu, index) => (
                        <li key={index}>{edu}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Skills Assessment</h3>
                <div className="mt-2 space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Technical Skills</h4>
                    <div className="space-y-2">
                      {analysisResult.skills
                        .filter(skill => skill.category === "technical")
                        .map(skill => (
                          <div key={skill.name} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{skill.name}</span>
                              <span>{skill.level}%</span>
                            </div>
                            <Progress value={skill.level} />
                          </div>
                        ))
                      }
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Soft Skills</h4>
                    <div className="space-y-2">
                      {analysisResult.skills
                        .filter(skill => skill.category === "soft")
                        .map(skill => (
                          <div key={skill.name} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{skill.name}</span>
                              <span>{skill.level}%</span>
                            </div>
                            <Progress value={skill.level} />
                          </div>
                        ))
                      }
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Languages</h4>
                    <div className="space-y-2">
                      {analysisResult.skills
                        .filter(skill => skill.category === "language")
                        .map(skill => (
                          <div key={skill.name} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{skill.name}</span>
                              <span>{skill.level}%</span>
                            </div>
                            <Progress value={skill.level} />
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Strengths</h3>
                  <ul className="space-y-2">
                    {analysisResult.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span className="text-sm">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Areas for Improvement</h3>
                  <ul className="space-y-2">
                    {analysisResult.improvements.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="h-5 w-5 text-blue-500 mr-2 shrink-0 flex items-center justify-center">
                          <span className="text-sm font-bold">+</span>
                        </div>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Suggested Roles</h3>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.suggestedRoles.map((role, index) => (
                    <div 
                      key={index} 
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                    >
                      {role}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-2">
                <Button className="w-full">Find Matching Jobs</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumeAnalysis;
