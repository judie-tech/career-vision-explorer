
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, User, Book, MessageCircle } from "lucide-react";

const FeatureSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            How Visiondrill Careers Works
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-500">
            Our intelligent platform combines AI technology with personalized career development to help you find and succeed in your dream job.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* AI-Powered Job Matching */}
          <div className="flex flex-col items-center text-center p-6 hover-scale glassmorphism">
            <div className="bg-blue-50 p-4 rounded-lg mb-5">
              <Search className="h-8 w-8 text-career-blue" />
            </div>
            <h3 className="text-xl font-bold mb-3">AI-Powered Job Matching</h3>
            <p className="text-gray-600">
              Our intelligent system finds the perfect job matches based on your skills, experience, and preferences.
            </p>
          </div>

          {/* Skills Assessment */}
          <div className="flex flex-col items-center text-center p-6 hover-scale glassmorphism">
            <div className="bg-blue-50 p-4 rounded-lg mb-5">
              <User className="h-8 w-8 text-career-blue" />
            </div>
            <h3 className="text-xl font-bold mb-3">Skills Assessment</h3>
            <p className="text-gray-600">
              Identify your strengths and areas for improvement through integrated assessments and get a personalized readiness score.
            </p>
          </div>

          {/* Microlearning Paths */}
          <div className="flex flex-col items-center text-center p-6 hover-scale glassmorphism">
            <div className="bg-blue-50 p-4 rounded-lg mb-5">
              <Book className="h-8 w-8 text-career-blue" />
            </div>
            <h3 className="text-xl font-bold mb-3">Microlearning Paths</h3>
            <p className="text-gray-600">
              Fill skill gaps with personalized learning recommendations and track your progress toward career goals.
            </p>
          </div>

          {/* AI Interview Practice */}
          <div className="flex flex-col items-center text-center p-6 hover-scale glassmorphism">
            <div className="bg-blue-50 p-4 rounded-lg mb-5">
              <MessageCircle className="h-8 w-8 text-career-blue" />
            </div>
            <h3 className="text-xl font-bold mb-3">AI Interview Practice</h3>
            <p className="text-gray-600">
              Practice interviews with our AI coach that provides feedback on your responses, tone, and delivery.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link to="/jobs">
            <Button variant="outline" className="glowing-border">Discover More</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
