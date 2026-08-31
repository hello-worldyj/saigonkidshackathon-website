import type { NextConfig } from "next";

// STATIC_EXPORT=true builds a pure static site (for Firebase Hosting, which
// can't run the API routes) — those live only in the normal Vercel build,
// where the app/api directory is present. See scripts/build-static.sh.
const nextConfig: NextConfig = {
  ...(process.env.STATIC_EXPORT === "true"
    ? { output: "export", images: { unoptimized: true } }
    : {}),
};

export default nextConfig;
