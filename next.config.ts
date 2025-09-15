import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
  // Allowed quality values for next/image; include 85 because several images request quality=85.
  qualities: [75, 85],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
