
import { useEffect, useCallback } from 'react';

export const usePerformanceOptimizations = () => {
  // Debounced scroll handler
  const createDebouncedHandler = useCallback((fn: () => void, delay: number) => {
    let timeout: NodeJS.Timeout;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(fn, delay);
    };
  }, []);

  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload fonts
      const fontLink = document.createElement('link');
      fontLink.rel = 'preload';
      fontLink.as = 'font';
      fontLink.type = 'font/woff2';
      fontLink.crossOrigin = 'anonymous';
      fontLink.href = '/fonts/inter.woff2'; // Adjust path as needed
      document.head.appendChild(fontLink);

      // Preload critical CSS
      const cssLink = document.createElement('link');
      cssLink.rel = 'preload';
      cssLink.as = 'style';
      cssLink.href = '/src/index.css';
      document.head.appendChild(cssLink);
    };

    // Optimize images with intersection observer
    const optimizeImages = () => {
      const images = document.querySelectorAll('img[data-src]');
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              img.classList.add('fade-in');
            }
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });

      images.forEach((img) => imageObserver.observe(img));
      
      return () => imageObserver.disconnect();
    };

    // Prefetch next likely routes
    const prefetchRoutes = () => {
      const currentPath = window.location.pathname;
      const routesToPrefetch: string[] = [];
      
      // Define likely next routes based on current path
      switch (currentPath) {
        case '/':
          routesToPrefetch.push('/jobs', '/freelancer/1', '/career-paths');
          break;
        case '/jobs':
          routesToPrefetch.push('/profile', '/job/1');
          break;
        case '/admin':
          routesToPrefetch.push('/admin/users', '/admin/jobs', '/admin/freelancers');
          break;
        case '/admin/freelancers':
          routesToPrefetch.push('/freelancer/1', '/admin/interviews');
          break;
        default:
          // Prefetch common routes
          routesToPrefetch.push('/jobs', '/profile');
      }
      
      routesToPrefetch.forEach(route => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = route;
        document.head.appendChild(link);
      });
    };

    // Optimize scroll performance
    const optimizeScrolling = () => {
      let ticking = false;
      
      const handleScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            // Scroll handling logic here
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    };

    // Service worker registration for caching
    const registerServiceWorker = () => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('SW registered:', registration);
          })
          .catch(error => {
            console.log('SW registration failed:', error);
          });
      }
    };

    // Memory cleanup for large lists
    const optimizeMemory = () => {
      // Clean up any large objects or listeners
      const handleVisibilityChange = () => {
        if (document.hidden) {
          // Page is hidden, clean up resources
          const videos = document.querySelectorAll('video');
          videos.forEach(video => video.pause());
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);
      return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    };

    // Initialize optimizations
    preloadCriticalResources();
    const cleanupImages = optimizeImages();
    prefetchRoutes();
    const cleanupScroll = optimizeScrolling();
    registerServiceWorker();
    const cleanupMemory = optimizeMemory();

    // Cleanup function
    return () => {
      cleanupImages?.();
      cleanupScroll?.();
      cleanupMemory?.();
    };
  }, []);

  // Return utility functions
  return {
    createDebouncedHandler,
  };
};
