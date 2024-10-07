// config-overrides.js
const { override, addWebpackPlugin } = require('customize-cra');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

module.exports = override(
    // Add WorkboxWebpackPlugin for service worker
    addWebpackPlugin(new WorkboxWebpackPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
        // Define caching strategies
        runtimeCaching: [
            {
                urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
                handler: 'CacheFirst',
            },
            {
                urlPattern: /\.(?:js|css)$/,
                handler: 'StaleWhileRevalidate',
            },
            // Cache audio files
            {
                urlPattern: /\.(?:mp3|wav|ogg)$/,
                handler: 'CacheFirst',
            },
            // Cache index.html
            {
                urlPattern: /\/$/,
                handler: 'StaleWhileRevalidate',
            },
            // Cache custom offline page
            {
                urlPattern: /\/offline\.html$/,
                handler: 'StaleWhileRevalidate',
            },
            // Cache other resources
            {
                urlPattern: /.*/,
                handler: 'NetworkFirst',
                options: {
                    cacheName: 'others-cache',
                    expiration: {
                        maxEntries: 100,
                        maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
                    },
                },
            },
        ]
    }))
);
