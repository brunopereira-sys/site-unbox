const FOUNDRY_URL = process.env.FOUNDRY_URL || 'https://unbox-ai-foundry.vercel.app';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  trailingSlash: false,
  async rewrites() {
    return [
      { source: '/ai', destination: FOUNDRY_URL + '/ai' },
      { source: '/ai/:path*', destination: FOUNDRY_URL + '/ai/:path*' },
    ];
  },
};
module.exports = nextConfig;
