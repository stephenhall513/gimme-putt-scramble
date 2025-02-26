import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gimmeputt.blob.core.windows.net",
        port: "",
        pathname: "/scramble/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "gimmeputt.blob.core.windows.net",
        port: "",
        pathname: "/events/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
