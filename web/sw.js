
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
});