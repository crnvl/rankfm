import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["lastfm.freetls.fastly.net"],
  },
  reactStrictMode: false,
  output: "standalone",
};

export default nextConfig;
