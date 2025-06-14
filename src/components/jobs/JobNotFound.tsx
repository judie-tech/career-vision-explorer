
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const JobNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="container py-20 text-center">
        <div className="max-w-md mx-auto space-y-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-full blur-xl opacity-20"></div>
            <div className="relative bg-slate-800/50 border border-red-500/20 rounded-2xl p-8">
              <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                Job Not Found
              </h1>
              <p className="text-slate-400 mb-8">The job you're looking for doesn't exist or has been removed.</p>
              <Button 
                onClick={() => navigate('/jobs')}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Jobs
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
