
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App.tsx'
import './index.css'

// Preload critical resources
const preloadCriticalResources = () => {
  // Preload the most common route components
  import('./pages/Index.tsx');
  import('./pages/Login.tsx');
  import('./pages/Jobs.tsx');
};

// Start preloading after the main app has mounted
setTimeout(preloadCriticalResources, 100);

const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
