import * as Sentry from "@sentry/nextjs";

const { nodeProfilingIntegration } = require("@sentry/profiling-node");

Sentry.init({
  dsn: "https://c2a39b78478f3088404df05dc7736443@o4509416298840064.ingest.us.sentry.io/4509416304148480",
  integrations: [nodeProfilingIntegration()],
  // Tracing must be enabled for profiling to work
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set sampling rate for profiling - this is evaluated only once per SDK.init call
  profileSessionSampleRate: 1.0,
  // Trace lifecycle automatically enables profiling during active traces
  profileLifecycle: "trace",
});

// Profiling happens automatically after setting it up with `Sentry.init()`.
// All spans (unless those discarded by sampling) will have profiling data attached to them.
Sentry.startSpan(
  {
    name: "My Span",
  },
  () => {
    // The code executed here will be profiled
  }
);
