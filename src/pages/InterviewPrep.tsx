import React from 'react';
import Layout from '@/components/layout/Layout';
import { InterviewPreparation } from '../components/interview/InterviewPreparation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Target, BookOpen, TrendingUp } from 'lucide-react';

const InterviewPrep: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Interview Preparation Hub
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Prepare for your dream job with AI-powered interview questions, practice sessions, and personalized feedback
        </p>
      </div>

      {/* Features Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="text-center p-4">
          <CardContent className="pt-4">
            <Brain className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <h3 className="font-semibold mb-1">AI-Generated Questions</h3>
            <p className="text-sm text-gray-600">Tailored questions based on your role and experience</p>
          </CardContent>
        </Card>
        
        <Card className="text-center p-4">
          <CardContent className="pt-4">
            <Target className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <h3 className="font-semibold mb-1">Practice Sessions</h3>
            <p className="text-sm text-gray-600">Simulate real interviews with timed practice</p>
          </CardContent>
        </Card>
        
        <Card className="text-center p-4">
          <CardContent className="pt-4">
            <BookOpen className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <h3 className="font-semibold mb-1">Detailed Feedback</h3>
            <p className="text-sm text-gray-600">Get AI-powered feedback on your answers</p>
          </CardContent>
        </Card>
        
        <Card className="text-center p-4">
          <CardContent className="pt-4">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-orange-600" />
            <h3 className="font-semibold mb-1">Performance Tracking</h3>
            <p className="text-sm text-gray-600">Track your progress over multiple sessions</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Interview Preparation Component */}
      <InterviewPreparation />

      {/* Tips Section */}
      <Card>
        <CardHeader>
          <CardTitle>Interview Success Tips</CardTitle>
          <CardDescription>Expert advice to help you excel in your interviews</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-blue-600">Before the Interview</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Research the company and role thoroughly</li>
                <li>• Practice your elevator pitch</li>
                <li>• Prepare specific examples using the STAR method</li>
                <li>• Review common interview questions</li>
                <li>• Plan your outfit and route to the interview</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-green-600">During the Interview</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Arrive 10-15 minutes early</li>
                <li>• Maintain good eye contact and posture</li>
                <li>• Listen carefully and ask clarifying questions</li>
                <li>• Provide specific examples to support your answers</li>
                <li>• Show enthusiasm for the role and company</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
    </Layout>
  );
};

export default InterviewPrep;