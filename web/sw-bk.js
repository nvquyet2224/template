var APP_PREFIX = 'ApplicationName_'     // Identifier for this app (this needs to be consistent across every cache update)
var VERSION = 'version_01'              // Version of the off-line cache (change this value everytime you want to update cache)
var CACHE_NAME = APP_PREFIX + VERSION
var URLS = [                            // Add URL you want to cache in this list.
  '/nvquyet2224.github.io/template/web/',                     // If you have separate JS/CSS files,
  '/nvquyet2224.github.io/template/web/index.html'            // add path to those files here
]

// Respond with cached resources
self.addEventListener('fetch', function (e) {
  console.log('fetch request : ' + e.request.url)
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) { // if cache is available, respond with cache
        console.log('responding with cache : ' + e.request.url)
        return request
      } else {       // if there are no cache, try fetching request
        console.log('file is not cached, fetching : ' + e.request.url)
        return fetch(e.request)
      }

      // You can omit if/else for console.log & put one line below like this too.
      // return request || fetch(e.request)
    })
  )
});

// Cache resources
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('installing cache : ' + CACHE_NAME)
      return cache.addAll(URLS)
    })
  )
});

// Delete outdated caches
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      // `keyList` contains all cache names under your username.github.io
      // filter out ones that has this app prefix to create white list
      var cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX)
      })
      // add current cache name to white list
      cacheWhitelist.push(CACHE_NAME)

      return Promise.all(keyList.map(function (key, i) {
        if (cacheWhitelist.indexOf(key) === -1) {
          console.log('deleting cache : ' + keyList[i] )
          return caches.delete(keyList[i])
        }
      }))
    })
  )
});


/*
var CACHE_NAME = 'template-cache-v1';
var urlsToCache = [
	'/',
	'css/layout.css',
	'css/slide-min.css',
	'css/style.css',
	'js/jquery-min.js',
	'js/swiper-min.js',
	'js/olw-min.js',
	'js/main.js',
	'images/bg1.jpg',
	'images/bg1-sp.jpg',
	'images/bg2.jpg',
	'images/bg2-sp.jpg',
	'images/women.jpg',
	'images/shortcut-01.jpg',
	'images/shortcut-02.jpg',
	'images/article.jpg',
	'images/article-sp.jpg',
	'images/news-01.jpg',
	'images/news-02.jpg',
	'images/news-03.jpg',
	'images/news-04.jpg',
	'images/news-05.jpg',
	'images/icon-booster.png',
	'images/icon-essence.png',
	'images/icon-proof.png',
	'images/icon-soap.png',
	'images/product02.png',
	'images/product03.png',
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});*/