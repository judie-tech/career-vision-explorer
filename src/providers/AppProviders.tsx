
import { LearningPathsProvider } from "@/hooks/use-learning-paths";
import { CareerPathsProvider } from "@/hooks/use-career-paths";
import { UserProfileProvider } from "@/hooks/use-user-profile";
import { UsersProvider } from "@/hooks/use-users";
import { InsightsProvider } from "@/hooks/use-insights-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

const queryClient = new QueryClient();

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <UsersProvider>
          <UserProfileProvider>
            <LearningPathsProvider>
              <CareerPathsProvider>
                <InsightsProvider>
                  {children}
                  <Toaster />
                  <Sonner />
                </InsightsProvider>
              </CareerPathsProvider>
            </LearningPathsProvider>
          </UserProfileProvider>
        </UsersProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
