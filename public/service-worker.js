// service-worker.js

const CACHE_NAME = 'my-cache';

// List the files that you want to cache.
const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/manifest.json',
    '/logo.png',
    '/app.js',
    '/styles.css',
];

// Install the service worker and cache the files.
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(FILES_TO_CACHE);
            })
    );
});

// Serve the cached files.
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});
