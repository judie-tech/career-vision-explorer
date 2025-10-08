
const CACHE_NAME = 'career-vision-v1';
const urlsToCache = [
  '/',
  '/placeholder.svg',
  '/favicon.ico'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  // Skip caching for API requests, auth requests, development URLs, and external services
  if (event.request.url.includes('/api/') || 
      event.request.url.includes('localhost:8000') ||
      event.request.url.includes('localhost:8080') ||
      event.request.url.includes('/auth/') ||
      event.request.url.includes('/src/') ||
      event.request.url.includes('linkedin.com') ||
      event.request.url.includes('platform-telemetry') ||
      event.request.url.includes('gpteng.co')) {
    // Don't intercept these requests, let them go through normally
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request).catch(function() {
          // If fetch fails, return a basic response
          return new Response('Network error', { status: 408 });
        });
      }
    )
  );
});
