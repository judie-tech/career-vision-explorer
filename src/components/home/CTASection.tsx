
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-16 bg-career-blue text-white animated-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold sm:text-4xl neon-text">
          Ready to Transform Your Career?
        </h2>
        <p className="mt-4 text-xl opacity-90 max-w-2xl mx-auto">
          Join thousands of professionals who are navigating their career paths with confidence.
        </p>
        <div className="mt-8">
          <Link to="/signup">
            <Button className="bg-white text-career-blue hover:bg-gray-100 futuristic-btn high-contrast-text">
              <Rocket className="h-5 w-5 mr-2" />
              Get Started Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
