
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, LayoutGrid, Briefcase } from "lucide-react";

const CareerJourneySection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Your Career Journey with Us
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Follow these simple steps to kickstart your professional growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
          {/* Step 1: Create Your Profile */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-career-blue text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  1
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <User className="h-10 w-10 text-career-blue p-2 bg-white rounded-full border-2 border-career-blue" />
                </div>
              </div>
            </div>
            <h3 className="text-xl font-bold mt-6 mb-3">Create Your Profile</h3>
            <p className="text-gray-600">
              Build your comprehensive profile with our AI-powered onboarding wizard.
            </p>
            <div className="mt-6">
              <Link to="/signup">
                <Button className="bg-career-blue text-white hover:bg-career-blue/90 shadow-md">Get Started</Button>
              </Link>
            </div>
          </div>

          {/* Step 2: Explore Your Dashboard */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-career-blue text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  2
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <LayoutGrid className="h-10 w-10 text-career-blue p-2 bg-white rounded-full border-2 border-career-blue" />
                </div>
              </div>
            </div>
            <h3 className="text-xl font-bold mt-6 mb-3">Explore Your Dashboard</h3>
            <p className="text-gray-600">
              Get insights on your career readiness, skill gaps, and personalized recommendations.
            </p>
            <div className="mt-6">
              <Link to="/profile">
                <Button className="bg-career-blue text-white hover:bg-career-blue/90 shadow-md">View Dashboard</Button>
              </Link>
            </div>
          </div>

          {/* Step 3: Apply to Top Jobs */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-career-blue text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  3
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <Briefcase className="h-10 w-10 text-career-blue p-2 bg-white rounded-full border-2 border-career-blue" />
                </div>
              </div>
            </div>
            <h3 className="text-xl font-bold mt-6 mb-3">Apply to Top Jobs</h3>
            <p className="text-gray-600">
              Get matched with opportunities aligned with your skills and career goals.
            </p>
            <div className="mt-6">
              <Link to="/jobs">
                <Button className="bg-career-blue text-white hover:bg-career-blue/90 shadow-md">Find Jobs</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerJourneySection;
