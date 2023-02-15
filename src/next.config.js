/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  fallbacks: {
    // image: "/static/images/fallback.png",
    document: "/offline.html", // if you want to fallback to a custom    page other than /_offline
    // font: '/static/font/fallback.woff2',
    // audio: ...,
    // video: ...,
  },
});

module.exports = withPWA({
  i18n: {
    locales: ["de", "en", "es", "fr", "hi", "it", "nl", "ru"],
    defaultLocale: "en",
  },
});
