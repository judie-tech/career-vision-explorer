
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import Layout from "@/components/layout/Layout";

const Skills = () => {
  const [category, setCategory] = useState("");
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  // Mock skill categories
  const skillCategories = [
    {
      id: "technical",
      name: "Technical Skills",
      description: "Programming languages, tools, and technologies",
    },
    {
      id: "soft",
      name: "Soft Skills",
      description: "Communication, leadership, and interpersonal abilities",
    },
    {
      id: "business",
      name: "Business Skills",
      description: "Management, strategy, and domain knowledge",
    },
  ];

  // Mock skills data
  const skills = [
    {
      id: 1,
      name: "React",
      category: "technical",
      level: 65,
      popularity: "High",
      resources: [
        { name: "React Documentation", url: "#" },
        { name: "React Fundamentals Course", url: "#" },
        { name: "Advanced React Patterns", url: "#" },
      ],
    },
    {
      id: 2,
      name: "TypeScript",
      category: "technical",
      level: 72,
      popularity: "High",
      resources: [
        { name: "TypeScript Handbook", url: "#" },
        { name: "TypeScript Deep Dive", url: "#" },
        { name: "Advanced Types Workshop", url: "#" },
      ],
    },
    {
      id: 3,
      name: "Communication",
      category: "soft",
      level: 85,
      popularity: "Very High",
      resources: [
        { name: "Effective Communication Strategies", url: "#" },
        { name: "Public Speaking Fundamentals", url: "#" },
        { name: "Writing for Technical Audiences", url: "#" },
      ],
    },
    {
      id: 4,
      name: "Leadership",
      category: "soft",
      level: 78,
      popularity: "High",
      resources: [
        { name: "Leadership Essentials", url: "#" },
        { name: "Team Management Course", url: "#" },
        { name: "Servant Leadership", url: "#" },
      ],
    },
    {
      id: 5,
      name: "Product Strategy",
      category: "business",
      level: 70,
      popularity: "Medium",
      resources: [
        { name: "Product Strategy Fundamentals", url: "#" },
        { name: "Market Research Techniques", url: "#" },
        { name: "Competitive Analysis", url: "#" },
      ],
    },
    {
      id: 6,
      name: "Data Analysis",
      category: "technical",
      level: 60,
      popularity: "High",
      resources: [
        { name: "Data Analysis with Python", url: "#" },
        { name: "Statistical Methods", url: "#" },
        { name: "Visualizing Data", url: "#" },
      ],
    },
  ];

  // Mock assessment questions
  const assessmentQuestions = [
    {
      id: 1,
      question: "How comfortable are you with React's functional components and hooks?",
      options: [
        "I'm a beginner, just learning the basics",
        "I can build simple applications with guidance",
        "I can independently develop moderately complex applications",
        "I'm an expert and can architect complex React applications",
      ],
    },
    {
      id: 2,
      question: "How would you rate your ability to communicate technical concepts to non-technical stakeholders?",
      options: [
        "I struggle to explain technical concepts in simple terms",
        "I can communicate basic concepts but complex ideas are challenging",
        "I'm good at translating technical concepts for non-technical audiences",
        "I excel at making complex technical ideas accessible to everyone",
      ],
    },
    {
      id: 3,
      question: "How experienced are you with TypeScript's advanced type system?",
      options: [
        "I'm new to TypeScript",
        "I understand basic types but struggle with generics and advanced features",
        "I'm comfortable with generics and most advanced type features",
        "I'm an expert with deep knowledge of the type system",
      ],
    },
    {
      id: 4,
      question: "How would you evaluate your project management skills?",
      options: [
        "I have limited experience managing projects",
        "I can manage simple projects with some guidance",
        "I can independently manage medium-sized projects",
        "I excel at managing complex projects with multiple stakeholders",
      ],
    },
    {
      id: 5,
      question: "How proficient are you with data analysis and visualization?",
      options: [
        "I have basic understanding of data analysis concepts",
        "I can perform simple data analysis tasks with guidance",
        "I'm comfortable analyzing datasets independently",
        "I can derive complex insights and create advanced visualizations",
      ],
    },
  ];

  const filteredSkills = category
    ? skills.filter((skill) => skill.category === category)
    : skills;

  const handleStartAssessment = () => {
    setAssessmentStarted(true);
    setCurrentQuestion(0);
    setAnswers({});
  };

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
    
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Assessment completed
      setAssessmentStarted(false);
      // In a real app, we would calculate and display results here
    }
  };

  const renderAssessment = () => {
    const question = assessmentQuestions[currentQuestion];
    
    return (
      <Card className="mt-8">
        <CardContent className="p-6">
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Question {currentQuestion + 1} of {assessmentQuestions.length}</span>
              <span>{Math.round(((currentQuestion + 1) / assessmentQuestions.length) * 100)}% Complete</span>
            </div>
            <Progress value={((currentQuestion + 1) / assessmentQuestions.length) * 100} />
          </div>
          
          <h3 className="text-xl font-bold mb-6">{question.question}</h3>
          
          <div className="space-y-3">
            {question.options.map((option, idx) => (
              <Button
                key={idx}
                variant="outline"
                className="w-full justify-start text-left h-auto py-3 px-4"
                onClick={() => handleAnswer(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Skills Assessment & Development
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Identify your strengths, discover areas for improvement, and access resources to grow your skills.
          </p>
        </div>

        {assessmentStarted ? (
          renderAssessment()
        ) : (
          <>
            {/* Assessment CTA */}
            <div className="bg-gradient-to-r from-career-blue to-career-purple rounded-lg shadow-lg text-white p-8 mb-12">
              <div className="md:flex items-center justify-between">
                <div className="md:w-2/3">
                  <h2 className="text-2xl font-bold">Evaluate Your Skills</h2>
                  <p className="mt-2 text-white/90">
                    Take our comprehensive skills assessment to identify your strengths and
                    discover areas for improvement. Get personalized recommendations for
                    skill development.
                  </p>
                </div>
                <div className="mt-6 md:mt-0">
                  <Button
                    onClick={handleStartAssessment}
                    className="bg-white text-career-blue hover:bg-gray-100"
                    size="lg"
                  >
                    Start Assessment
                  </Button>
                </div>
              </div>
            </div>

            {/* Skills Browser */}
            <div className="mt-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Browse Skills</h2>
                <div className="w-48">
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Categories</SelectItem>
                      <SelectItem value="technical">Technical Skills</SelectItem>
                      <SelectItem value="soft">Soft Skills</SelectItem>
                      <SelectItem value="business">Business Skills</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Tabs defaultValue="grid">
                <div className="flex justify-end mb-4">
                  <TabsList>
                    <TabsTrigger value="grid">Grid View</TabsTrigger>
                    <TabsTrigger value="table">Table View</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="grid">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSkills.map((skill) => (
                      <Card key={skill.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-gray-900">{skill.name}</h3>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {skill.popularity}
                            </span>
                          </div>
                          
                          <div className="mb-4">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium text-gray-700">Proficiency</span>
                              <span className="text-sm font-medium text-gray-700">{skill.level}%</span>
                            </div>
                            <Progress value={skill.level} className="h-2" />
                          </div>
                          
                          <h4 className="font-semibold text-gray-800 mt-6 mb-2">Learning Resources</h4>
                          <ul className="space-y-1">
                            {skill.resources.map((resource, idx) => (
                              <li key={idx}>
                                <a href={resource.url} className="text-career-blue hover:underline text-sm">
                                  {resource.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                          
                          <div className="mt-6">
                            <Link to={`/skills/${skill.id}`}>
                              <Button variant="outline" className="w-full">
                                Improve This Skill
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="table">
                  <div className="border rounded-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Skill
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Category
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Proficiency
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Popularity
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredSkills.map((skill) => (
                          <tr key={skill.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {skill.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                              {skill.category}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex items-center">
                                <Progress value={skill.level} className="h-2 w-24 mr-2" />
                                <span>{skill.level}%</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {skill.popularity}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <Link to={`/skills/${skill.id}`}>
                                <Button variant="outline" size="sm">
                                  Details
                                </Button>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Skill Categories */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Skill Categories</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {skillCategories.map((category) => (
                  <Card key={category.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                      <p className="text-gray-600 mb-4">{category.description}</p>
                      <Button
                        variant="outline"
                        className="w-full mt-2"
                        onClick={() => setCategory(category.id)}
                      >
                        Browse {category.name}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Skills;
