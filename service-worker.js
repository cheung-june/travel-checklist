const CACHE_NAME = "travel-checklist-v1";

const urlsToCache = [
"/",
"/index.html",
"/style.css",
"/app.js",
"/manifest.json"
];

/* ===== 安装阶段：缓存资源 ===== */
self.addEventListener("install", (event) => {
event.waitUntil(
caches.open(CACHE_NAME).then((cache) => {
return cache.addAll(urlsToCache);
})
);
self.skipWaiting();
});

/* ===== 激活阶段：清理旧缓存 ===== */
self.addEventListener("activate", (event) => {
event.waitUntil(
caches.keys().then((cacheNames) => {
return Promise.all(
cacheNames.map((cache) => {
if (cache !== CACHE_NAME) {
return caches.delete(cache);
}
})
);
})
);
self.clients.claim();
});

/* ===== 请求拦截（缓存优先） ===== */
self.addEventListener("fetch", (event) => {
event.respondWith(
caches.match(event.request).then((response) => {
return response || fetch(event.request);
})
);
});
