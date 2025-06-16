
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
}

export const OptimizedImage = ({
  src,
  alt,
  className,
  placeholder = '/placeholder.svg',
  width,
  height,
  loading = 'lazy',
  priority = false
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority && imgRef.current) {
      const img = new Image();
      img.onload = () => setIsLoaded(true);
      img.onerror = () => setHasError(true);
      img.src = src;
    }
  }, [src, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {!isLoaded && !hasError && (
        <img
          src={placeholder}
          alt=""
          className={cn('absolute inset-0 w-full h-full object-cover blur-sm', className)}
          aria-hidden="true"
        />
      )}
      <img
        ref={imgRef}
        src={hasError ? placeholder : src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
        decoding="async"
      />
    </div>
  );
};
