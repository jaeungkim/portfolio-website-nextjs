import { withSentryConfig } from "@sentry/nextjs";
import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import withPlaiceholder from "@plaiceholder/next";

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

const withNextIntl = createNextIntlPlugin();

export default withSentryConfig(withNextIntl(withPlaiceholder(nextConfig)), {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "jaeung-kim",
  project: "personal-portfolio",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  // automaticVercelMonitors: true,
});
