
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { UserProfileProvider } from "@/hooks/use-user-profile";
import { ProfilesProvider } from "@/hooks/use-profiles";
import { UsersProvider } from "@/hooks/use-users";
import { CareerPathsProvider } from "@/hooks/use-career-paths";
import { AuthProvider } from "@/hooks/use-auth";

const queryClient = new QueryClient();

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <AuthProvider>
          <UserProfileProvider>
            <ProfilesProvider>
              <UsersProvider>
                <CareerPathsProvider>
                  {children}
                </CareerPathsProvider>
              </UsersProvider>
            </ProfilesProvider>
          </UserProfileProvider>
        </AuthProvider>
        <Toaster />
        <SonnerToaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
};
