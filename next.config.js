const runtimeCaching = require('next-pwa/cache')  
const withPWA = require('next-pwa')({
  dest: "public",
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
    runtimeCaching
})
module.exports = withPWA({
  i18n: {
    locales: ["en", "ar"],
    defaultLocale: "en",
  },
  reactStrictMode: true,
  compiler: {
    removeConsole: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "i.ibb.co",
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: "res.cloudinary.com",
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: "robohash.org",
        pathname: '**',
      },
    ],
  },
});
