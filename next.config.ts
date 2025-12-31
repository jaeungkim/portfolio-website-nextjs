import { NextConfig } from "next";
import withPlaiceholder from "@plaiceholder/next";

const nextConfig: NextConfig = {
  transpilePackages: ["three"],
  experimental: {
    scrollRestoration: true,
    optimizePackageImports: ["lucide-react"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.jaeungkim.com",
        pathname: "/**",
      },
    ],
  },
};

export default withPlaiceholder(nextConfig);
