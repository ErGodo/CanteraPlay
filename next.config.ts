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
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/club-service/:path*',
        destination: 'https://cp-club-nestjs-605024846890.us-central1.run.app/:path*',
      },
      {
        source: '/api/athlete-service/:path*',
        destination: 'https://cp-athlete-nestjs-605024846890.us-central1.run.app/:path*',
      },
    ];
  },
};

export default nextConfig;
