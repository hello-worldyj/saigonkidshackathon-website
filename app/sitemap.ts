import type { MetadataRoute } from "next";

// required for the static-export (Firebase) build — this route has no
// per-request data, so it's safe to freeze at build time
export const dynamic = "force-static";

const SITE_URL = "https://saigonkidshackathon.web.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/rules`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/parents`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  ];
}
