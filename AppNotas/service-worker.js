// Nombre del caché que almacenará los archivos del PWA.
// Este nombre debe cambiarse cada vez que se actualizan los archivos para evitar problemas con versiones antiguas.
const CACHE_NAME = 'pwa-notes-cache-v2'; // Aumenta el número de versión

// Lista de rutas de archivos que se deben almacenar en el caché.
// Estos archivos son necesarios para que la aplicación funcione sin conexión a internet.

const urlsToCache = [
    '/',
    // La raíz de la aplicación
    'index.html', 
    // El archivo HTML principal
    'app.js', 
    // El archivo JavaScript de la aplicación
    'manifest.json', 
    // El archivo de configuración del PWA
    '/imágenes/clip-128x128.png', 
    // Icono para el PWA de 192x192
    '/imágenes/clip-512x512.png' 
    // Icono para el PWA de 512x512
];

// Evento de instalación del Service Worker.
// Se activa cuando el navegador registra por primera vez el Service Worker o cuando hay una actualización.

self.addEventListener('install', event => {

// Espera hasta que los archivos se agreguen al caché antes de completar la instalación.

    event.waitUntil(
        caches.open(CACHE_NAME) // Abre el caché con el nombre definido en CACHE NAME

        .then(cache => {
            console.log('Archivos cacheados'); // Mensaje en consola cuando se han cacheado los archivos

        return cache.addAll(urlsToCache); // Agrega todos los archivos de urlsToCache al caché

        })
    );

});
// Evento de activación del Service Worker.
// Se activa después de la instalación y es útil para eliminar versiones antiguas del caché.

self.addEventListener('activate', event => {
    // Elimina cachés antiguos que ya no son necesarios para liberar espacio.
    event.waitUntil(
      caches.keys().then(cacheNames => { // Obtiene todos los nombres de caché almacenados  
        return Promise.all(    
        cacheNames.map(cache => { // Recorre cada caché almacenado
    
        if (cache !== CACHE_NAME) {   // Si el caché no es el actual, se elimina            
            console.log('Cache antiguo eliminado:', cache); // Muestra qué caché se eliminó           
            return caches.delete(cache);// Elimina el caché antiguo
    
             }
            })
          );
         })
        );
    });
    
    // Evento de "fetch" para interceptar solicitudes de red.    
    // Se activa cada vez que la aplicación solicita un archivo (ej. imágenes, scripts, etc.).
    
self.addEventListener('fetch', event => {   
    // Responde con un archivo en caché si está disponible, o lo descarga de la red si no está en caché. 
    event.respondWith(
    caches.match(event.request) 
    // Busca en el caché si el archivo solicitado ya está almacenado   
        .then(response => {
          return response || fetch(event.request);
    
    // Si está en caché, lousa; si no, lo descarga de la red
       })
    );
});