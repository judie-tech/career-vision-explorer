import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { interviewService, InterviewQuestion } from '../../services/interview.service';
import { Brain, Clock, Target, BookOpen, PlayCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface InterviewPreparationProps {
  jobTitle?: string;
  jobDescription?: string;
}

export const InterviewPreparation: React.FC<InterviewPreparationProps> = ({
  jobTitle = '',
  jobDescription = ''
}) => {
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [practiceSession, setPracticeSession] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [practiceResults, setPracticeResults] = useState<any>(null);
  const [formData, setFormData] = useState({
    role: jobTitle,
    experience_level: 'mid' as 'entry' | 'mid' | 'senior',
    skills: '',
    question_count: 5,
    difficulty: 'medium' as 'easy' | 'medium' | 'hard'
  });

  const generateQuestions = async () => {
    setLoading(true);
    try {
      const response = await interviewService.getInterviewQuestions({
        role: formData.role,
        experience_level: formData.experience_level,
        skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean)
      });
      setQuestions(response.questions);
      toast.success(`Generated ${response.questions.length} interview questions!`);
    } catch (error: any) {
      toast.error('Failed to generate questions: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const startPracticeSession = async () => {
    setLoading(true);
    try {
      const session = await interviewService.startPracticeSession({
        role: formData.role,
        difficulty: formData.difficulty,
        question_count: formData.question_count
      });
      setPracticeSession(session);
      setCurrentQuestionIndex(0);
      setAnswers({});
      setPracticeResults(null);
      toast.success('Practice session started!');
    } catch (error: any) {
      toast.error('Failed to start practice session: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const submitPracticeSession = async () => {
    if (!practiceSession) return;
    
    setLoading(true);
    try {
      const practiceAnswers = practiceSession.questions.map((q: any, index: number) => ({
        question_id: `q_${index}`,
        answer: answers[index] || '',
        time_taken: 300 // Default 5 minutes per question
      }));

      const results = await interviewService.submitPracticeAnswers(
        practiceSession.session_id,
        practiceAnswers
      );
      setPracticeResults(results);
      toast.success('Practice session completed!');
    } catch (error: any) {
      toast.error('Failed to submit practice session: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'technical': return <Brain className="w-4 h-4" />;
      case 'behavioral': return <Target className="w-4 h-4" />;
      case 'situational': return <BookOpen className="w-4 h-4" />;
      default: return <Brain className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Interview Preparation
          </CardTitle>
          <CardDescription>
            Prepare for your interviews with AI-generated questions tailored to your role
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="generate" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="generate">Generate Questions</TabsTrigger>
              <TabsTrigger value="practice">Practice Session</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
            </TabsList>

            <TabsContent value="generate" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Job Role</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g., Frontend Developer"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience Level</Label>
                  <Select 
                    value={formData.experience_level} 
                    onValueChange={(value: 'entry' | 'mid' | 'senior') => 
                      setFormData({ ...formData, experience_level: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Entry Level</SelectItem>
                      <SelectItem value="mid">Mid Level</SelectItem>
                      <SelectItem value="senior">Senior Level</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="skills">Skills (comma-separated)</Label>
                  <Input
                    id="skills"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    placeholder="React, JavaScript, Node.js, Python"
                  />
                </div>
              </div>

              <Button 
                onClick={generateQuestions} 
                disabled={loading || !formData.role}
                className="w-full"
              >
                {loading ? 'Generating...' : 'Generate Interview Questions'}
              </Button>

              {questions.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-semibold">Generated Questions ({questions.length})</h3>
                  <div className="space-y-3">
                    {questions.map((question, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            {getTypeIcon(question.type)}
                            <Badge variant="secondary" className={getDifficultyColor(question.difficulty)}>
                              {question.difficulty}
                            </Badge>
                            <Badge variant="outline">{question.type}</Badge>
                          </div>
                        </div>
                        <p className="text-sm font-medium mb-2">{question.question}</p>
                        {(question.job_seeker_guidance || question.employer_guidance) && (
                          <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                              <AccordionTrigger>View Guidance</AccordionTrigger>
                              <AccordionContent>
                                {question.job_seeker_guidance && (
                                  <div className="text-xs text-gray-600 mt-2">
                                    <strong>Guidance for Job Seeker:</strong> {question.job_seeker_guidance}
                                  </div>
                                )}
                                {question.employer_guidance && (
                                  <div className="text-xs text-gray-600 mt-2">
                                    <strong>Guidance for Employer:</strong> {question.employer_guidance}
                                  </div>
                                )}
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        )}
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="practice" className="space-y-4">
              {!practiceSession ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="difficulty">Difficulty Level</Label>
                      <Select 
                        value={formData.difficulty} 
                        onValueChange={(value: 'easy' | 'medium' | 'hard') => 
                          setFormData({ ...formData, difficulty: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="count">Number of Questions</Label>
                      <Select 
                        value={formData.question_count.toString()} 
                        onValueChange={(value) => 
                          setFormData({ ...formData, question_count: parseInt(value) })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3 Questions</SelectItem>
                          <SelectItem value="5">5 Questions</SelectItem>
                          <SelectItem value="10">10 Questions</SelectItem>
                          <SelectItem value="15">15 Questions</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button 
                    onClick={startPracticeSession} 
                    disabled={loading || !formData.role}
                    className="w-full"
                  >
                    <PlayCircle className="w-4 h-4 mr-2" />
                    {loading ? 'Starting...' : 'Start Practice Session'}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Practice Session</h3>
                    <Badge variant="secondary">
                      Question {currentQuestionIndex + 1} of {practiceSession.questions.length}
                    </Badge>
                  </div>
                  
                  <Progress 
                    value={((currentQuestionIndex + 1) / practiceSession.questions.length) * 100} 
                    className="w-full"
                  />

                  {practiceSession.questions[currentQuestionIndex] && (
                    <Card className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                          {getTypeIcon(practiceSession.questions[currentQuestionIndex].type)}
                          <Badge variant="outline">
                            {practiceSession.questions[currentQuestionIndex].type}
                          </Badge>
                          <Badge className={getDifficultyColor(practiceSession.questions[currentQuestionIndex].difficulty)}>
                            {practiceSession.questions[currentQuestionIndex].difficulty}
                          </Badge>
                        </div>
                        <p className="font-medium">
                          {practiceSession.questions[currentQuestionIndex].question}
                        </p>
                        <Textarea
                          placeholder="Type your answer here..."
                          value={answers[currentQuestionIndex] || ''}
                          onChange={(e) => setAnswers({ 
                            ...answers, 
                            [currentQuestionIndex]: e.target.value 
                          })}
                          className="min-h-[120px]"
                        />
                      </div>
                    </Card>
                  )}

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                      disabled={currentQuestionIndex === 0}
                    >
                      Previous
                    </Button>
                    
                    {currentQuestionIndex < practiceSession.questions.length - 1 ? (
                      <Button
                        onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        onClick={submitPracticeSession}
                        disabled={loading}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {loading ? 'Submitting...' : 'Submit Practice'}
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="results" className="space-y-4">
              {practiceResults ? (
                <div className="space-y-4">
                  <Card className="p-4">
                    <h3 className="font-semibold mb-2">Overall Score</h3>
                    <div className="flex items-center gap-4">
                      <div className="text-3xl font-bold text-green-600">
                        {practiceResults.score}%
                      </div>
                      <Progress value={practiceResults.score} className="flex-1" />
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h3 className="font-semibold mb-2">Overall Feedback</h3>
                    <p className="text-sm text-gray-600">{practiceResults.overall_feedback}</p>
                  </Card>

                  {practiceResults.areas_for_improvement && practiceResults.areas_for_improvement.length > 0 && (
                    <Card className="p-4">
                      <h3 className="font-semibold mb-2">Areas for Improvement</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {practiceResults.areas_for_improvement.map((area: string, index: number) => (
                          <li key={index} className="text-sm text-gray-600">{area}</li>
                        ))}
                      </ul>
                    </Card>
                  )}

                  {practiceResults.feedback && practiceResults.feedback.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="font-semibold">Question-by-Question Feedback</h3>
                      {practiceResults.feedback.map((feedback: any, index: number) => (
                        <Card key={index} className="p-4">
                          <div className="space-y-2">
                            <div className="flex justify-between items-start">
                              <p className="font-medium text-sm">{feedback.question}</p>
                              <Badge variant={feedback.score >= 80 ? 'default' : 'secondary'}>
                                {feedback.score}%
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-600"><strong>Your Answer:</strong> {feedback.your_answer}</p>
                            <p className="text-xs text-gray-700"><strong>Feedback:</strong> {feedback.feedback}</p>
                            {feedback.suggestions && feedback.suggestions.length > 0 && (
                              <div className="text-xs">
                                <strong>Suggestions:</strong>
                                <ul className="list-disc list-inside ml-2">
                                  {feedback.suggestions.map((suggestion: string, i: number) => (
                                    <li key={i}>{suggestion}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Complete a practice session to see your results here.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};