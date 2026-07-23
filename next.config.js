/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  trailingSlash: false,
  async rewrites() {
    return [
      { source: '/ai', destination: 'https://unbox-ai-foundry.vercel.app/ai' },
      { source: '/ai/:path*', destination: 'https://unbox-ai-foundry.vercel.app/ai/:path*' },
    ];
  },
};
module.exports = nextConfig;
