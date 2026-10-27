/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Netlify's legacy Next runtime (used for Next < 13.5) serves the image
  // optimizer via a callback-style function that fails on Node 24 (502s).
  images: { unoptimized: true },
}

module.exports = nextConfig
