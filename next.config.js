/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  trailingSlash: false,
  async rewrites() {
    return [{ source: '/ai', destination: '/ai.html' }];
  },
};
module.exports = nextConfig;
