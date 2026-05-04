import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  experimental: { optimizePackageImports: ["motion"] },
};

export default nextConfig;
