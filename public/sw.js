
const CACHE_NAME = 'career-vision-v1';
const urlsToCache = [
  '/',
  '/src/index.css',
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
  // Skip caching for API requests and handle CORS properly
  if (event.request.url.includes('/api/') || event.request.url.includes('localhost:8000')) {
    // Don't intercept API requests, let them go through normally
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
