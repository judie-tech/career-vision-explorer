import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, FileText, Target, TrendingUp, BookOpen } from 'lucide-react';
import { skillAnalysisService, SkillGapAnalysisResponse, ParsedResumeResponse } from '@/services/skill-analysis.service';
import { toast } from 'sonner';

const EnhancedSkillGapAnalysis: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [targetRole, setTargetRole] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [analysisResults, setAnalysisResults] = useState<{
    resume_analysis?: ParsedResumeResponse;
    skill_gaps?: SkillGapAnalysisResponse;
    learning_resources?: any;
  }>({});
  const [activeTab, setActiveTab] = useState('upload');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setResumeFile(file);
        toast.success('Resume uploaded successfully!');
      } else {
        toast.error('Please upload a PDF or DOCX file');
      }
    }
  };

  const analyzeResume = async () => {
    if (!resumeFile) {
      toast.error('Please upload a resume first');
      return;
    }

    setIsLoading(true);
    try {
      const resumeAnalysis = await skillAnalysisService.parseResumeAdvanced(resumeFile);
      setAnalysisResults(prev => ({ ...prev, resume_analysis: resumeAnalysis }));
      setActiveTab('results');
      toast.success('Resume analyzed successfully!');
    } catch (error) {
      console.error('Resume analysis failed:', error);
      toast.error('Failed to analyze resume');
    } finally {
      setIsLoading(false);
    }
  };

  const analyzeSkillGaps = async () => {
    if (!targetRole && !jobDescription) {
      toast.error('Please provide either a target role or job description');
      return;
    }

    setIsLoading(true);
    try {
      let skillGapResponse;
      
      if (jobDescription) {
        skillGapResponse = await skillAnalysisService.analyzeSkillGap({
          job_description: jobDescription
        });
      } else {
        skillGapResponse = await skillAnalysisService.analyzeTargetJob({
          job_title: targetRole
        });
      }
      
      setAnalysisResults(prev => ({ ...prev, skill_gaps: skillGapResponse }));
      setActiveTab('skill-gaps');
      toast.success('Skill gap analysis completed!');
    } catch (error) {
      console.error('Skill gap analysis failed:', error);
      toast.error('Failed to analyze skill gaps');
    } finally {
      setIsLoading(false);
    }
  };

  const getLearningResources = async (skill: string) => {
    try {
      const resources = await skillAnalysisService.getLearningResources(skill);
      setAnalysisResults(prev => ({ 
        ...prev, 
        learning_resources: { ...prev.learning_resources, [skill]: resources }
      }));
      toast.success(`Learning resources loaded for ${skill}`);
    } catch (error) {
      console.error('Failed to load learning resources:', error);
      toast.error('Failed to load learning resources');
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          AI-Powered Skill Gap Analysis
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Upload your resume and analyze your skills against target roles. Get personalized learning 
          recommendations and career insights powered by AI.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="upload">Upload Resume</TabsTrigger>
          <TabsTrigger value="target">Target Analysis</TabsTrigger>
          <TabsTrigger value="results">Resume Analysis</TabsTrigger>
          <TabsTrigger value="skill-gaps">Skill Gaps</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Your Resume
              </CardTitle>
              <CardDescription>
                Upload your resume in PDF or DOCX format for AI-powered analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <div className="space-y-2">
                  <Label htmlFor="resume-upload" className="cursor-pointer">
                    <span className="text-blue-600 hover:text-blue-500 font-medium">
                      Click to upload
                    </span> or drag and drop
                  </Label>
                  <p className="text-sm text-gray-500">PDF or DOCX (max 10MB)</p>
                  <Input
                    id="resume-upload"
                    type="file"
                    accept=".pdf,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </div>
              
              {resumeFile && (
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-green-600" />
                    <span className="text-green-800 font-medium">{resumeFile.name}</span>
                  </div>
                  <Button onClick={analyzeResume} disabled={isLoading}>
                    {isLoading ? 'Analyzing...' : 'Analyze Resume'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="target" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Target Role Analysis
              </CardTitle>
              <CardDescription>
                Specify your target role or paste a job description for skill gap analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="target-role">Target Job Title</Label>
                <Input
                  id="target-role"
                  placeholder="e.g. Senior Software Engineer, Data Scientist"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                />
              </div>
              
              <div className="text-center text-sm text-gray-500">OR</div>
              
              <div className="space-y-2">
                <Label htmlFor="job-description">Job Description</Label>
                <Textarea
                  id="job-description"
                  placeholder="Paste the complete job description here for detailed analysis..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={8}
                />
              </div>
              
              <Button 
                onClick={analyzeSkillGaps} 
                disabled={isLoading || (!targetRole && !jobDescription)}
                className="w-full"
              >
                {isLoading ? 'Analyzing...' : 'Analyze Skill Gaps'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {analysisResults.resume_analysis ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Skills Summary</CardTitle>
                  <CardDescription>
                    {analysisResults.resume_analysis.total_skills_found} skills identified
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(analysisResults.resume_analysis.skill_categories).map(([category, skills]) => (
                      <div key={category}>
                        <h4 className="font-medium text-gray-900 mb-2">{category}</h4>
                        <div className="flex flex-wrap gap-2">
                          {skills.map((skill, index) => (
                            <Badge key={index} variant="secondary">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Experience Analysis</CardTitle>
                  <CardDescription>Career insights from your resume</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Experience Years</span>
                      <span className="text-2xl font-bold text-blue-600">
                        {analysisResults.resume_analysis.experience_years}
                      </span>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium">Analysis Status</span>
                      <Badge variant="outline" className="ml-2">
                        {analysisResults.resume_analysis.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Upload and analyze your resume to see results here</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="skill-gaps" className="space-y-6">
          {analysisResults.skill_gaps ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Overall Match Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Match Percentage</span>
                      <span className="text-2xl font-bold text-green-600">
                        {Math.round(analysisResults.skill_gaps.overall_match * 100)}%
                      </span>
                    </div>
                    <Progress value={analysisResults.skill_gaps.overall_match * 100} />
                  </div>
                </CardContent>
              </Card>

              {analysisResults.skill_gaps.skill_gaps && (
                <Card>
                  <CardHeader>
                    <CardTitle>Skill Gaps by Category</CardTitle>
                    <CardDescription>Skills you need to develop for this role</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(analysisResults.skill_gaps.skill_gaps).map(([category, skills]) => (
                        <div key={category}>
                          <h4 className="font-medium text-gray-900 mb-2">{category}</h4>
                          <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => (
                              <Badge 
                                key={index} 
                                variant="destructive"
                                className="cursor-pointer"
                                onClick={() => getLearningResources(skill)}
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {analysisResults.skill_gaps.learning_roadmap && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Learning Roadmap
                    </CardTitle>
                    <CardDescription>Personalized learning path to bridge skill gaps</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analysisResults.skill_gaps.learning_roadmap.map((step, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-start gap-4">
                            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{step.skill || 'Learning Step'}</h4>
                              <p className="text-gray-600 text-sm mt-1">
                                {`Priority: ${step.priority || 'N/A'}. Resources: ${
                                  step.resources && step.resources.length > 0
                                    ? step.resources.map((r: any) => r.name || r.type).join(', ')
                                    : 'Recommended learning activity'
                                }`}
                              </p>
                              {step.timeline && (
                                <Badge variant="outline" className="mt-2">
                                  {step.timeline}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Analyze skill gaps to see recommendations here</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedSkillGapAnalysis;