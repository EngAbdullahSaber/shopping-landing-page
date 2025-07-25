import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com"], // 👈 add this line
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: false, // or true if you want a 308 redirect
      },
    ];
  },
};

export default nextConfig;
