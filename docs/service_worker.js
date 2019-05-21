// キャッシュファイルの指定
var CACHE_NAME = 'pwa-sample-caches';
var urlsToCache = [
    '/tttamano.github.io/pwa_test/',
];

//インストール処理
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(function(cache) {
              // return cache.addAll(urlsToCache);
              return cache.addAll(urlsToCache.map(url => new Request(url, {credentials: 'same-origin'})));
            })
    );
});

// self.addEventListener('install', function(event) {
//   event.waitUntil(
//     caches.open('v1').then(function(cache) {
//       return cache.addAll([
//         '/sw-test/',
//         '/sw-test/index.html',
//         '/sw-test/style.css',
//         '/sw-test/app.js',
//         '/sw-test/image-list.js',
//         '/sw-test/star-wars-logo.jpg',
//         '/sw-test/gallery/',
//         '/sw-test/gallery/bountyHunters.jpg',
//         '/sw-test/gallery/myLittleVader.jpg',
//         '/sw-test/gallery/snowTroopers.jpg'
//       ]);
//     })
//   );
// });

// リソースフェッチ時のキャッシュロード処理
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches
            .match(event.request)
            .then(function(response) {
                return response ? response : fetch(event.request);
            })
    );
});
