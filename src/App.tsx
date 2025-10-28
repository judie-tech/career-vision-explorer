import { lazy, Suspense } from "react";
import { AppProviders } from "@/providers/AppProviders";
import { Skeleton } from "@/components/ui/skeleton";
import { useMobileOptimizations } from "@/hooks/use-mobile-optimizations";
import { usePerformanceOptimizations } from "@/hooks/use-performance-optimizations";
import { useAuth } from "@/hooks/use-auth";

const AppRoutes = lazy(() =>
  import("@/routes/AppRoutes").then((m) => ({ default: m.AppRoutes }))
);

const AppLoading = () => (
  <div className="min-h-screen bg-background">
    <div className="h-16 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <Skeleton className="h-8 w-32" />
        <div className="flex gap-4">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="space-y-8">
        <Skeleton className="h-12 w-3/4 mx-auto" />
        <Skeleton className="h-6 w-1/2 mx-auto" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    </div>
  </div>
);

const AppContent = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Skeleton className="h-10 w-40 mx-auto" />
          <Skeleton className="h-6 w-60 mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<AppLoading />}>
      <AppRoutes />
    </Suspense>
  );
};

function App() {
  useMobileOptimizations();
  usePerformanceOptimizations();

  return (
    <AppProviders>
      {/*CRITICAL: NO Layout wrapper here */}
      <AppContent />
    </AppProviders>
  );
}

export default App;
