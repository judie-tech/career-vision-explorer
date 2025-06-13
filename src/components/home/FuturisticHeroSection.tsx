
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FuturisticCard } from "@/components/ui/futuristic-card";
import { 
  Rocket, 
  Sparkles, 
  Zap, 
  Target, 
  TrendingUp, 
  Brain,
  ArrowRight,
  Play
} from "lucide-react";

const FuturisticHeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden cyber-grid">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 holographic opacity-30"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 floating-animation">
        <div className="p-4 glass-card">
          <Brain className="h-8 w-8 text-blue-400" />
        </div>
      </div>
      <div className="absolute top-40 right-20 floating-animation" style={{ animationDelay: '2s' }}>
        <div className="p-4 glass-card">
          <Target className="h-8 w-8 text-purple-400" />
        </div>
      </div>
      <div className="absolute bottom-40 left-20 floating-animation" style={{ animationDelay: '4s' }}>
        <div className="p-4 glass-card">
          <TrendingUp className="h-8 w-8 text-green-400" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="fade-in-up">
          {/* Hero Badge */}
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-8">
            <Sparkles className="h-5 w-5 text-yellow-400" />
            <span className="text-white/90 font-medium">AI-Powered Career Navigation</span>
            <Zap className="h-5 w-5 text-blue-400" />
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 text-glow">
            <span className="block">Future of</span>
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Career Discovery
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Harness the power of AI to navigate your career journey, discover hidden opportunities, 
            and unlock your true potential in the digital age.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/signup">
              <Button className="glass-button-primary text-lg px-8 py-4 group">
                <Rocket className="h-5 w-5 mr-2 group-hover:animate-bounce" />
                Start Your Journey
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button className="glass-button text-lg px-8 py-4 group">
              <Play className="h-5 w-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <FuturisticCard className="scale-in text-left" animated>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <Brain className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-white font-semibold">AI Matching</h3>
              </div>
              <p className="text-white/70 text-sm">
                Advanced algorithms match your skills with perfect opportunities
              </p>
            </FuturisticCard>

            <FuturisticCard className="scale-in text-left" animated style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <Target className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-white font-semibold">Smart Goals</h3>
              </div>
              <p className="text-white/70 text-sm">
                Set and track personalized career milestones with AI guidance
              </p>
            </FuturisticCard>

            <FuturisticCard className="scale-in text-left" animated style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <TrendingUp className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-white font-semibold">Growth Tracking</h3>
              </div>
              <p className="text-white/70 text-sm">
                Monitor your progress and adapt to market trends in real-time
              </p>
            </FuturisticCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FuturisticHeroSection;
