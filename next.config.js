const withPWA = require("next-pwa");

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
    domains: ["robohash.org", "res.cloudinary.com","i.ibb.co"],
  },
  pwa: {
    dest: "public",
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  },
});
