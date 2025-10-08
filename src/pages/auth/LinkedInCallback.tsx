import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

const LinkedInCallback: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { handleOAuthCallback } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        console.log("🔍 LinkedInCallback: Starting callback handling");

        if (!isSupabaseConfigured() || !supabase) {
          throw new Error("Supabase is not configured");
        }

        await handleOAuthCallback();
      } catch (error: any) {
        console.error("Callback handling failed:", error);
        toast.error("Authentication failed", {
          description:
            error.message ||
            "Failed to complete LinkedIn login. Please try again.",
        });
        navigate("/login?error=auth_failed");
      }
    };

    handleCallback();
  }, [location, navigate, handleOAuthCallback]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-career-blue" />
        <h2 className="mt-4 text-lg font-semibold">
          Completing LinkedIn authentication...
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Please wait while we process your login.
        </p>
      </div>
    </div>
  );
};

export default LinkedInCallback;
