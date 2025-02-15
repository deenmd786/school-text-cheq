import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ 
      protocol: 'https', 
      hostname: 'storage.googleapis.com', 
      port: '' 
    }],
  },
  /* other config options here */
};

export default nextConfig;