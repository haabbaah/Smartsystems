'use strict';
importScripts('libs/sw-toolbox.js');
toolbox.precache(['index.html', 'css/main.css', 'css/fonts.css', 'css/media.css']);
toolbox.router.get('/img/*', toolbox.cacheFirst);
toolbox.router.get('/*', toolbox.networkFirst, {networkTimeoutSeconds: 5});