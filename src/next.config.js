/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA({
  i18n: {
    locales: ["de", "en", "es", "fr", "hi", "it", "nl", "ru"],
    defaultLocale: "en",
  },
});
