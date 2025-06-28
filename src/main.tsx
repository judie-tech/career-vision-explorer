
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

// Enhanced preloading strategy
const preloadCriticalResources = () => {
  // Preload critical route components
  const routes = [
    () => import('./pages/Index.tsx'),
    () => import('./pages/Login.tsx'),
    () => import('./pages/Jobs.tsx'),
    () => import('./pages/CareerPaths.tsx'),
    () => import('./pages/Profile.tsx')
  ];

  // Preload in priority order with staggered timing
  routes.forEach((routeLoader, index) => {
    setTimeout(() => {
      routeLoader().catch(() => {
        // Silently fail - preloading is not critical
      });
    }, index * 100);
  });

  // Preload critical UI components
  setTimeout(() => {
    import('./components/layout/Layout.tsx').catch(() => {});
    import('./components/layout/Navbar.tsx').catch(() => {});
  }, 200);
};

// Optimize font loading
const optimizeFonts = () => {
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = 'https://fonts.googleapis.com';
  document.head.appendChild(link);

  const link2 = document.createElement('link');
  link2.rel = 'preconnect';
  link2.href = 'https://fonts.gstatic.com';
  link2.crossOrigin = 'anonymous';
  document.head.appendChild(link2);
};

// Service Worker registration for caching
const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(() => {
          console.log('SW registered');
        })
        .catch(() => {
          console.log('SW registration failed');
        });
    });
  }
};

const root = createRoot(document.getElementById("root")!);

// Start optimizations immediately
optimizeFonts();
registerServiceWorker();

root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Start preloading after the main app has mounted
setTimeout(preloadCriticalResources, 50);
