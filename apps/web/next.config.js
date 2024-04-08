/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@repo/ui"],
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "images.unsplash.com",
      },
    ],
  },
  compiler: {
    relay: {
      src: "./",
      language: "typescript",
      artifactDirectory: "__generated__",
    },
  },
};
