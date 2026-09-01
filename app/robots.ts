import type { MetadataRoute } from "next";

// required for the static-export (Firebase) build — this route has no
// per-request data, so it's safe to freeze at build time
export const dynamic = "force-static";

const SITE_URL = "https://saigonkidshackathon.web.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
