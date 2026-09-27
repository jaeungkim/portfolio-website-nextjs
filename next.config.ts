import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    globalNotFound: true,
  },
  async redirects() {
    return [
      {
        source: "/gantt-chart",
        destination: "https://gantt.jaeungkim.com",
        permanent: true,
      },
    ];
  },
  images: {
    deviceSizes: [640, 828, 1080, 1200],
    minimumCacheTTL: 31536000,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.jaeungkim.com",
        port: "",
        pathname: "/blog/**",
        search: "",
      },
    ],
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-frontmatter"],
  },
});

export default withMDX(nextConfig);
