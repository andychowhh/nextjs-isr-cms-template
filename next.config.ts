import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en',
        permanent: false, // or true for 308 permanent redirect
      },
    ];
  },
};

export default nextConfig;
