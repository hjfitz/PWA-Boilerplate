// change this
const cacheName = 'pwa-YOURNAMEHERE-1';

// on *, app.js serves our index file
// we can be lazy and request /index.html
// this gets redirected to our layout file
const toCache = [
  // bundle contains all of our CSS
  '/public/javascripts/bundle.js',
  // for when we're offline
  '/offline.html',
];

const log = (...sauce) => console.log('[WORKER]', ...sauce);
/**
 * setup a cache and add items
 */
self.addEventListener('install', async event => {
  event.waitUntil((async function installEvent() {
    const cache = await caches.open(cacheName);
    log(`Adding ${toCache} to cache.`);
    await cache.addAll(toCache);
    return self.skipWaiting();
  }()));
});

/**
 * intercept fetch requests
 * and attempt to serve from cache
 */
self.addEventListener('fetch', event => {
  const { request } = event;
  // Prevent the default, and handle the request ourselves.
  event.respondWith(async function fetchEvent() {
    // Try to get the response from a cache.
    const cachedResponse = await caches.match(request, { cacheName });
    if (cachedResponse) return cachedResponse;
    // if nothing's in the cache, return a fetch request
    // catch an error to serve offline pages
    return fetch(event.request).catch(err => {
      log('Fetch failed; returning offline page instead.', err);
      return caches.match('/offline.html');
    });
  }());
});
