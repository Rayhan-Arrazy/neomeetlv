import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    // ... konfigurasi lainnya
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': './',
    };
    return config;
  },
};

export default nextConfig;
