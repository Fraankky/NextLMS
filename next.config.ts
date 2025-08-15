
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-555074032f474ac49d1128248c4e55b7.r2.dev",
        pathname: "/**"
      }
    ],
    // Tambahkan konfigurasi ini untuk handle SSL issues
    unoptimized: process.env.NODE_ENV === 'development', // Bypass optimization di development
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;