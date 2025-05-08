
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { GraduationCap, Award, ArrowRight } from "lucide-react";

interface Question {
  id: number;
  text: string;
  options: {
    id: string;
    text: string;
  }[];
  correctAnswer: string;
  explanation: string;
}

interface Assessment {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  questions: Question[];
  skillCategory: string;
}

interface AssessmentResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  strengths: string[];
  improvements: string[];
  recommendedResources: {
    title: string;
    type: string;
    link: string;
  }[];
}

const mockAssessment: Assessment = {
  id: "web-dev-1",
  title: "Front-End Development Fundamentals",
  description: "Assess your knowledge of HTML, CSS, and JavaScript fundamentals",
  duration: 15,
  skillCategory: "Web Development",
  questions: [
    {
      id: 1,
      text: "Which of the following is NOT a valid way to declare a variable in JavaScript?",
      options: [
        { id: "a", text: "var name = 'John';" },
        { id: "b", text: "let name = 'John';" },
        { id: "c", text: "const name = 'John';" },
        { id: "d", text: "variable name = 'John';" },
      ],
      correctAnswer: "d",
      explanation: "JavaScript has three ways to declare variables: var, let, and const. 'variable' is not a valid keyword."
    },
    {
      id: 2,
      text: "Which CSS property is used to control the space between elements?",
      options: [
        { id: "a", text: "margin" },
        { id: "b", text: "padding" },
        { id: "c", text: "spacing" },
        { id: "d", text: "gap" },
      ],
      correctAnswer: "a",
      explanation: "Margin controls the space outside elements, creating space between elements. Padding controls the space inside an element."
    },
    {
      id: 3,
      text: "What is the correct HTML element for the largest heading?",
      options: [
        { id: "a", text: "<heading>" },
        { id: "b", text: "<h6>" },
        { id: "c", text: "<h1>" },
        { id: "d", text: "<head>" },
      ],
      correctAnswer: "c",
      explanation: "<h1> defines the largest heading in HTML. Heading elements range from <h1> (largest) to <h6> (smallest)."
    },
    {
      id: 4,
      text: "Which function is used to parse a string to an integer in JavaScript?",
      options: [
        { id: "a", text: "Integer.parse()" },
        { id: "b", text: "parseInt()" },
        { id: "c", text: "parseInteger()" },
        { id: "d", text: "Number.toInteger()" },
      ],
      correctAnswer: "b",
      explanation: "parseInt() is the correct function to parse a string and return an integer."
    },
    {
      id: 5,
      text: "Which property is used to change the text color in CSS?",
      options: [
        { id: "a", text: "text-color" },
        { id: "b", text: "font-color" },
        { id: "c", text: "color" },
        { id: "d", text: "text-style" },
      ],
      correctAnswer: "c",
      explanation: "The 'color' property is used to set the color of text in CSS."
    }
  ]
};

const SkillsAssessment = () => {
  const { toast } = useToast();
  const [isAssessmentActive, setIsAssessmentActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [timeLeft, setTimeLeft] = useState(mockAssessment.duration * 60); // in seconds
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  
  const startAssessment = () => {
    setIsAssessmentActive(true);
    setCurrentQuestion(0);
    setAnswers({});
    setAssessmentResult(null);
    setTimeLeft(mockAssessment.duration * 60);
    
    // Start timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          submitAssessment();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Clean up timer
    return () => clearInterval(timer);
  };
  
  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId);
    setAnswers(prev => ({
      ...prev,
      [mockAssessment.questions[currentQuestion].id]: answerId
    }));
  };
  
  const handleNext = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    
    if (currentQuestion < mockAssessment.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      submitAssessment();
    }
  };
  
  const submitAssessment = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Calculate score
      let correctCount = 0;
      Object.entries(answers).forEach(([questionId, answerId]) => {
        const question = mockAssessment.questions.find(q => q.id === parseInt(questionId));
        if (question && question.correctAnswer === answerId) {
          correctCount++;
        }
      });
      
      const score = (correctCount / mockAssessment.questions.length) * 100;
      
      // Generate result
      const result: AssessmentResult = {
        score,
        totalQuestions: mockAssessment.questions.length,
        correctAnswers: correctCount,
        strengths: [
          "Understanding of basic HTML structure",
          "Knowledge of CSS styling properties"
        ],
        improvements: [
          "JavaScript variable declarations",
          "Advanced CSS layout techniques"
        ],
        recommendedResources: [
          {
            title: "JavaScript Fundamentals",
            type: "Course",
            link: "#"
          },
          {
            title: "CSS Mastery",
            type: "Tutorial",
            link: "#"
          },
          {
            title: "Modern Web Development",
            type: "E-Book",
            link: "#"
          }
        ]
      };
      
      setAssessmentResult(result);
      setIsSubmitting(false);
      setIsAssessmentActive(false);
      
      toast({
        title: "Assessment Completed",
        description: `You scored ${Math.round(score)}% on the assessment.`,
      });
    }, 1500);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const getCurrentQuestion = () => {
    return mockAssessment.questions[currentQuestion];
  };
  
  const getProgressPercentage = () => {
    return ((currentQuestion + 1) / mockAssessment.questions.length) * 100;
  };
  
  return (
    <div className="space-y-6">
      {!isAssessmentActive && !assessmentResult && (
        <Card>
          <CardHeader>
            <CardTitle>{mockAssessment.title}</CardTitle>
            <CardDescription>
              {mockAssessment.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 bg-blue-50 p-4 rounded-md">
              <GraduationCap className="h-8 w-8 text-blue-500" />
              <div>
                <h3 className="font-medium">Skill Category</h3>
                <p className="text-sm text-gray-600">{mockAssessment.skillCategory}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-amber-50 p-4 rounded-md">
              <Award className="h-8 w-8 text-amber-500" />
              <div>
                <h3 className="font-medium">Earn a Skill Badge</h3>
                <p className="text-sm text-gray-600">
                  Complete this assessment to earn a verified skill badge for your profile.
                </p>
              </div>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-md">
              <ul className="space-y-2">
                <li className="flex items-center text-sm">
                  <span className="h-5 w-5 rounded-full bg-gray-200 flex items-center justify-center text-xs mr-2">
                    {mockAssessment.questions.length}
                  </span>
                  Questions
                </li>
                <li className="flex items-center text-sm">
                  <span className="h-5 w-5 rounded-full bg-gray-200 flex items-center justify-center text-xs mr-2">
                    {mockAssessment.duration}
                  </span>
                  Minutes to complete
                </li>
                <li className="flex items-center text-sm">
                  <span className="h-5 w-5 rounded-full bg-gray-200 flex items-center justify-center text-xs mr-2">
                    70%
                  </span>
                  Passing score required
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={startAssessment} className="w-full">
              Start Assessment
            </Button>
          </CardFooter>
        </Card>
      )}
      
      {isAssessmentActive && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Question {currentQuestion + 1} of {mockAssessment.questions.length}</CardTitle>
              <div className="text-sm font-medium bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                Time Left: {formatTime(timeLeft)}
              </div>
            </div>
            <Progress value={getProgressPercentage()} className="h-1" />
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="text-lg font-medium">{getCurrentQuestion().text}</h3>
            
            <RadioGroup 
              value={selectedAnswer || ""} 
              onValueChange={handleAnswerSelect}
            >
              <div className="space-y-3">
                {getCurrentQuestion().options.map(option => (
                  <div
                    key={option.id}
                    className={`flex items-center border rounded-md p-3 ${
                      showExplanation && option.id === getCurrentQuestion().correctAnswer
                        ? "bg-green-50 border-green-200"
                        : showExplanation && selectedAnswer === option.id && option.id !== getCurrentQuestion().correctAnswer
                        ? "bg-red-50 border-red-200" 
                        : selectedAnswer === option.id 
                        ? "bg-blue-50 border-blue-200"
                        : ""
                    }`}
                  >
                    <RadioGroupItem value={option.id} id={`option-${option.id}`} className="mr-3" />
                    <Label htmlFor={`option-${option.id}`} className="flex-1 cursor-pointer">
                      {option.text}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
            
            {showExplanation && (
              <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mt-4">
                <p className="text-sm font-medium">Explanation:</p>
                <p className="text-sm mt-1">{getCurrentQuestion().explanation}</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {!showExplanation && selectedAnswer && (
              <Button 
                variant="outline" 
                onClick={() => setShowExplanation(true)}
              >
                Check Answer
              </Button>
            )}
            <div className={showExplanation ? "w-full" : "ml-auto"}>
              <Button 
                onClick={handleNext} 
                disabled={!selectedAnswer}
                className={showExplanation ? "w-full" : ""}
              >
                {currentQuestion < mockAssessment.questions.length - 1 ? (
                  <>
                    Next Question
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  'Submit Assessment'
                )}
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
      
      {assessmentResult && (
        <Card>
          <CardHeader>
            <CardTitle>Assessment Results</CardTitle>
            <CardDescription>
              See how you performed and get recommendations for improvement
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center py-4">
              <div className="relative inline-block">
                <svg className="w-32 h-32">
                  <circle
                    className="text-gray-200"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="56"
                    cx="64"
                    cy="64"
                  />
                  <circle
                    className={`${
                      assessmentResult.score >= 70 ? "text-green-500" : "text-amber-500"
                    }`}
                    strokeWidth="8"
                    strokeDasharray={360}
                    strokeDashoffset={360 - (360 * assessmentResult.score) / 100}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="56"
                    cx="64"
                    cy="64"
                    style={{ transformOrigin: "center", transform: "rotate(-90deg)" }}
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <p className="text-3xl font-bold">{Math.round(assessmentResult.score)}%</p>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                {assessmentResult.correctAnswers} out of {assessmentResult.totalQuestions} correct
              </p>
              <div className="mt-2">
                <span 
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    assessmentResult.score >= 70 
                      ? "bg-green-100 text-green-800" 
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {assessmentResult.score >= 70 ? "Passed" : "Not Passed"}
                </span>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">Strengths</h3>
                <ul className="space-y-1">
                  {assessmentResult.strengths.map((item, index) => (
                    <li key={index} className="text-sm flex items-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500 mr-2"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Areas for Improvement</h3>
                <ul className="space-y-1">
                  {assessmentResult.improvements.map((item, index) => (
                    <li key={index} className="text-sm flex items-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mr-2"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Recommended Learning Resources</h3>
              <div className="space-y-3">
                {assessmentResult.recommendedResources.map((resource, index) => (
                  <div 
                    key={index} 
                    className="border rounded-md p-3 flex justify-between items-center hover:bg-gray-50"
                  >
                    <div>
                      <p className="font-medium">{resource.title}</p>
                      <p className="text-xs text-gray-500">{resource.type}</p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href={resource.link}>
                        View
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button className="w-full" onClick={startAssessment}>
              Retake Assessment
            </Button>
            <Button variant="outline" className="w-full" onClick={() => setAssessmentResult(null)}>
              Try Another Assessment
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default SkillsAssessment;
