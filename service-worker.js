const CACHE_NAME = "app-cache-v5"; // ⬅️ Subí este número cada vez que subas cambios

const ASSETS_TO_CACHE = ["index.html", "manifest.json", "icon-192.png", "icon-512.png", "service-worker.js"];

// Guardar archivos en caché
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE)));
});

// Limpiar caches viejos
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))));
});

// Atender solicitudes desde caché o red
self.addEventListener("fetch", (e) => {
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});

// Escuchar pedido de skipWaiting desde la app
self.addEventListener("message", (event) => {
  if (event.data.action === "skipWaiting") {
    self.skipWaiting();
  }
});
