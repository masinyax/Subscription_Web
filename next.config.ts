import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // สั่งให้ Next.js รับรู้ว่าเราเปิดใช้งาน Turbopack ควบคู่ด้วย
  turbopack: {},
  serverExternalPackages: ['@coinbase/cdp-sdk'],
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
};

export default nextConfig;