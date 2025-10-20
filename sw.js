const CACHE_NAME = 'notfall-site-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/styles.css',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  // network-first for dynamic content could be better; hier: cache-first
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request).catch(()=>caches.match('/')))
  );
});
