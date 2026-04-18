import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/louis-ar",
  images: { unoptimized: true },
  experimental: { optimizePackageImports: ["motion"] },
};

export default nextConfig;
