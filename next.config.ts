// const withTM = require("next-transpile-modules")([
//   "three",
//   "react-three-fiber",
//   "drei",
// ]);

// const withMDX = require("@next/mdx")({
//   extension: /\.mdx?$/,
// });

// module.exports = withTM(
//   withMDX({
//     pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
//     images: {
//       domains: ["storage.cloud.google.com", "storage.googleapis.com"],
//     },
//   })
// );

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;