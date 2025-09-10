import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'loodibee.com',
      },
      {
        protocol: 'https',
        hostname: 'fbref.com',
      },
    ],
  },
};

export default nextConfig;
