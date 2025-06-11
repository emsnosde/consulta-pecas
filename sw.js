const CACHE_NAME = 'agenda-pecas-v1';
const assets = [
  '/', '/index.html', '/manifest.json', '/sw.js',
  '/data/Tabela_de_Pecas.csv',
  'https://cdn.jsdelivr.net/npm/papaparse@5.3.2/papaparse.min.js',
  '/images/placeholder.png',
  // Liste aqui todas as imagens de peças que quiser cachear:
  '/images/pecas/AC11527.png',
  '/images/pecas/AC15416.png',
  // ...  
];

self.addEventListener('install', e =>
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(assets))
  )
);

self.addEventListener('fetch', e =>
  e.respondWith(
    caches.match(e.request)
      .then(r => r || fetch(e.request))
  )
);

self.addEventListener('activate', e =>
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  )
);
