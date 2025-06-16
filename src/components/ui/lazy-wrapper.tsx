
import { lazy, Suspense, ReactNode } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface LazyWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
}

const DefaultFallback = () => (
  <div className="space-y-4">
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
    <Skeleton className="h-8 w-1/4" />
  </div>
);

export const LazyWrapper = ({ 
  children, 
  fallback = <DefaultFallback />,
  className 
}: LazyWrapperProps) => {
  return (
    <div className={className}>
      <Suspense fallback={fallback}>
        {children}
      </Suspense>
    </div>
  );
};

// HOC for lazy loading components
export const withLazyLoading = <P = {}>(
  componentLoader: () => Promise<{ default: React.ComponentType<P> }>,
  fallback?: ReactNode
) => {
  const LazyComponent = lazy(componentLoader);
  
  return (props: P) => (
    <LazyWrapper fallback={fallback}>
      <LazyComponent {...props} />
    </LazyWrapper>
  );
};
