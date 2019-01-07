var APP_PREFIX = 'ApplicationName_'     // Identifier for this app (this needs to be consistent across every cache update)
var VERSION = 'version_01'              // Version of the off-line cache (change this value everytime you want to update cache)
var CACHE_NAME = APP_PREFIX + VERSION
var URLS = [                            // Add URL you want to cache in this list.
	'/template/web/',                     // If you have separate JS/CSS files,
	'/template/web/index.html',            // add path to those files here
	'/template/web/css/layout.css',
	'/template/web/css/slide-min.css',
	'/template/web/css/style.css',
	'/template/web/js/jquery-min.js',
	'/template/web/js/swiper-min.js',
	'/template/web/js/olw-min.js',
	'/template/web/js/main.js',
	'/template/web/images/bg1.jpg',
	'/template/web/images/bg1-sp.jpg',
	'/template/web/images/bg2.jpg',
	'/template/web/images/bg2-sp.jpg',
	'/template/web/images/women.jpg',
	'/template/web/images/shortcut-01.jpg',
	'/template/web/images/shortcut-02.jpg',
	'/template/web/images/article.jpg',
	'/template/web/images/article-sp.jpg',
	'/template/web/images/news-01.jpg',
	'/template/web/images/news-02.jpg',
	'/template/web/images/news-03.jpg',
	'/template/web/images/news-04.jpg',
	'/template/web/images/news-05.jpg',
	'/template/web/images/icon-booster.png',
	'/template/web/images/icon-essence.png',
	'/template/web/images/icon-proof.png',
	'/template/web/images/icon-soap.png',
	'/template/web/images/product02.png',
	'/template/web/images/product03.png',
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