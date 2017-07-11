var cacheName = 'v1';
var cacheFiles = [
    '/',
    'index.html',
    'style.css',
    'app.js',
    'https://fonts.googleapis.com/css?family=Montserrat',
    'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
    'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js',
    'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'
]

self.addEventListener('install', function(e){
    console.log("Service worker installed");

    e.waitUntil(

        caches.open(cacheName).then(function(cache){

            console.log("Service worker caching files");
            return cache.addAll(cacheFiles);
        })
    )
})

self.addEventListener('activate', function(e){
    console.log("Service worker activated");

    e.waitUntil(

        caches.keys().then(function(cacheNames){

            return Promise.all(cacheNames.map(function(thisCacheName){

                if(thisCacheName !== cacheName){

                    console.log("Service worker removing cached files from", thisCacheName);
                    return caches.delete(thisCacheName);
                }
            }))

        })
    );
});



self.addEventListener('fetch', function(e){
    console.log("Service worker fetching", e.request.url);

    e.respondWith(

        caches.match(e.request).then(function(response){

            if(response){

                console.log("Service worker: found in cache", e.request.url);
                return response;
            }

            var requestClone = e.request.clone();

            fetch(requestClone)
                .then(function(response){

                if(!response){
                    console.log("Service Worker: No response from from fetch");
                    return response;
                }

                var responseClone = response.clone();

                caches.open(cacheName).then(function(cache){
                    cache.put(e.request, responseClone);
                    return response;
                });

            }).catch(function(err){
               console.log("Service worker: Error fetching and caching new files");
            })

        })
    )
})
