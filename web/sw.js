var APP_PREFIX = 'ApplicationName_';
var VERSION = 'version_01';
var CACHE_NAME = APP_PREFIX + VERSION;
var URLS = [
	'/template/web/',
	'/template/web/index.html',
	'/template/web/css/layout-min.css',
	'/template/web/css/slide-min.css',
	'/template/web/css/style-min.css',
	'/template/web/css/font-min.css',
	'/template/web/js/jquery-min.js',
	'/template/web/js/swiper-min.js',
	'/template/web/js/olw-min.js',
	'/template/web/js/main.js',
	'/template/web/images/logo.png',
	'/template/web/images/prev.svg',
	'/template/web/images/next.svg',
	'/template/web/images/prev.png',
	'/template/web/images/next.png',
	'/template/web/images/icon-top.png',
	'/template/web/images/favicon.png',
	'/template/web/images/icons-192.png',
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
	'/template/web/images/bg1-light.jpg',
	'/template/web/images/bg1-sp-light.jpg',
	'/template/web/images/bg2-light.jpg',
	'/template/web/images/bg2-sp-light.jpg',
	'/template/web/fonts/VL_Sofia_Pro_Soft_Light.otf',
	'/template/web/fonts/SofiaPro-Bold.otf',
	'/template/web/manifest.json',
	'/template/web/sw.js'
];

// Respond with cached resources
self.addEventListener('fetch', function (e) {
	e.respondWith(
		caches.match(e.request).then(function(response) {
			return response || fetch(e.request);
		})
	);
});

// Cache resources
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('installing cache : ' + CACHE_NAME)
      return cache.addAll(URLS)
    })
  );
});

// Delete outdated caches
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      var cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX)
      })
	  
	  cacheWhitelist.push(CACHE_NAME)

      return Promise.all(keyList.map(function (key, i) {
        if (cacheWhitelist.indexOf(key) === -1) {
          console.log('deleting cache : ' + keyList[i] )
          return caches.delete(keyList[i])
        }
      }))
    })
  );
});