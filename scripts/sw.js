const e=["./"];self.addEventListener("install",(t=>{t.waitUntil(caches.open("shebang-v2").then((t=>t.addAll(e))))})),self.addEventListener("activate",(e=>(e.waitUntil(caches.keys().then((e=>Promise.all(e.map((e=>"shebang-v2"!==e?caches.delete(e):e)))))),self.clients.claim()))),self.addEventListener("fetch",(e=>{e.respondWith(caches.match(e.request).then((t=>{const s=e.request.url.match(/amp\//i)?e.request.url.replace(/amp\//i,""):e.request;return t||fetch(s)})))}));
