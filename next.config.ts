// next.config.ts
import { withSentryConfig } from "@sentry/nextjs";
import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

// Base Next.js config
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/jaeungkim/**",
      },
    ],
  },
};

// Add next-intl
const withNextIntl = createNextIntlPlugin({
  // localePath: './src/locales', // optional
});

const sentryWebpackOptions = {
  org: "jaeung-kim",
  project: "personal-portfolio",
  silent: !process.env.CI,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  widenClientFileUpload: true,
};

// Compose all plugins
const configWithIntl = withNextIntl(nextConfig);

// Add custom headers after all wrapping
const configWithSentry = withSentryConfig(configWithIntl, sentryWebpackOptions);

// Append headers to final config
export default {
  ...configWithSentry,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Document-Policy",
            value: "js-profiling",
          },
        ],
      },
    ];
  },
};
