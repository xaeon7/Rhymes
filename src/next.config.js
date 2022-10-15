/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;

const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

if (!(process.env.NODE_ENV === "development")) {
  nextConfigWithPWA = withPWA({
    pwa: {
      dest: "public",
      register: true,
      skipWaiting: true,
      runtimeCaching,
      buildExcludes: [/manifest.json$/],
      maximumFileSizeToCacheInBytes: 5000000,
    },
    ...nextConfig,
  });
}

// module.exports = withPWA({
//   pwa: {
//     dest: "public",
//     register: true,
//     disable: process.env.NODE_ENV === "development",
//     skipWaiting: true,
//   },
// });
