import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://tropimix.vercel.app";
  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/cardapio`, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/checkout`, changeFrequency: "monthly", priority: 0.3 },
  ];
}
