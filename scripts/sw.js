const cacheName = 'shebang-v2';
const root = './';
const filesToCache = [
	`${root}`,
	`${root}styles/styles.css`,
];

window.self.addEventListener('install', (e) => {
	e.waitUntil(
		caches.open(cacheName).then((cache) => cache.addAll(filesToCache)),
	);
});

window.self.addEventListener('activate', (e) => {
	e.waitUntil(
		caches.keys().then((keyList) => Promise.all(keyList.map((key) => {
			if (key !== cacheName) {
				return caches.delete(key);
			}
			return key;
		}))),
	);
	return window.self.clients.claim();
});

window.self.addEventListener('fetch', (e) => {
	e.respondWith(
		caches.match(e.request).then((response) => {
			const alternate = (e.request.url.match(/amp\//i)) ? e.request.url.replace(/amp\//i, '') : e.request;
			return response || fetch(alternate);
		}),
	);
});
