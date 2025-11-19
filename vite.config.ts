import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 5173, // Changed to 5173 to avoid port conflict with httpd
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => {
          // Add trailing slash only to routes that need it
          // Auth endpoints (/auth/*) and some others don't use trailing slashes
          const [pathname, query] = path.split('?');
          
          // Routes that should NOT have trailing slash
          const noSlashPatterns = [
            /\/auth\//,
            /\/ai\//,
            /\/skill-gap\//,
            /\/unified\//,
            /\/vector\//,
            /\/v2\//,
            /\/match\//,
            /\/cache\//,
            /\/gemini\//,
            /\/interview\//,
            /\/freelancers\//,
            /\/insights\//,
            /\/roles\//,
            /\/oauth\//,
            /\/applications\/my/,
            /\/applications\/job\//,
            /\/applications\/stats/,
            /\/applications\/\w+\/review/
          ];
          
          const shouldSkipSlash = noSlashPatterns.some(pattern => pattern.test(pathname)) || pathname.includes('.');
          const needsSlash = !pathname.endsWith('/') && !shouldSkipSlash;
          const newPath = needsSlash ? pathname + '/' : pathname;
          return query ? `${newPath}?${query}` : newPath;
        }
      }
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
