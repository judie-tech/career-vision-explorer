
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-12 sm:py-16 bg-career-blue text-white animated-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold sm:text-4xl neon-text">
          Ready to Transform Your Career?
        </h2>
        <p className="mt-3 sm:mt-4 text-lg sm:text-xl opacity-90 max-w-2xl mx-auto px-2">
          Join thousands of professionals who are navigating their career paths with confidence.
        </p>
        <div className="mt-6 sm:mt-8">
          <Link to="/signup">
            <Button className="bg-gray-900 text-white hover:bg-gray-800 font-bold text-base sm:text-lg py-3 px-6 sm:px-8 shadow-lg border-2 border-gray-900">
              <Rocket className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Get Started Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
