import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: process.env.GITHUB_PAGES ? '/agedleadstore' : '',
  assetPrefix: process.env.GITHUB_PAGES ? '/agedleadstore/' : '',
};

export default nextConfig;