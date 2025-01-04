import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['storage.googleapis.com'], // Add the domain here
  },
  /* other config options here */
};

export default nextConfig;