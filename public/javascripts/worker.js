// change this
const cacheName = 'pwa-boilerplate-1';

// on *, app.js serves our index file
// we can be lazy and request /index.html
// this gets redirected to our layout file
const toCache = [
  '/',
  '/index.html',
  // bundle contains all of our CSS
  '/public/bundle.js',
  // for when we're offline
  '/offline.html',
];

/**
 * check that we're making a request to a webpage
 * because this boilerplate is intended for SPAs
 */
const reqPage = request => {
  const { mode, method, headers } = request;
  const acceptsHTML = headers.get('accept').includes('text/html');
  return (mode === 'navigate' || (method === 'GET' && acceptsHTML));
};

/**
 * setup a cache and add items
 */
self.addEventListener('install', async event => {
  event.waitUntil((async function installEvent() {
    const cache = await caches.open(cacheName);
    console.log(`Adding ${toCache} to cache.`);
    return cache.addAll(toCache);
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
    // if we're offline and requesting a page, return the index file. this mimics the express.js setup.
    if (!navigator.onLine && reqPage(request)) return caches.match('index.html');
    return fetch(event.request).catch(err => {
      console.log('Fetch failed; returning offline page instead.', err);
      return caches.match('/offline.html');
    });
  }());
});
