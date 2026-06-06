import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
   * Disable framework-level request/data caching as much as possible.
   * (Note: Next.js caching behavior is also influenced by route-level `dynamic`
   * and `no-store` headers in route handlers.)
   */
  images: {
    domains: ["res.cloudinary.com"],
  },

};




export default nextConfig;
