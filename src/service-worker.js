self.addEventListener('fetch', function(event) {
        
    if (event.request.url.includes("localhost:4200", 0) === false) {
        event.respondWith(
            caches.match(event.request).then(function(response) {
                return response || fetch(event.request);
            })
        );
    } else {
        event.respondWith(
            fetch(event.request)
        );
    }
});