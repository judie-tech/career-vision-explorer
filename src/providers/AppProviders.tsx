
import { LearningPathsProvider } from "@/hooks/use-learning-paths";
import { UserProfileProvider } from "@/hooks/use-user-profile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

const queryClient = new QueryClient();

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <UserProfileProvider>
          <LearningPathsProvider>
            {children}
            <Toaster />
            <Sonner />
          </LearningPathsProvider>
        </UserProfileProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
