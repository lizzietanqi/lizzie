const SITE_URL = "https://ashvinpraveen.com";

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function urlEntry({ loc, lastmod, changefreq, priority }) {
  return [
    "  <url>",
    `    <loc>${escapeXml(loc)}</loc>`,
    lastmod ? `    <lastmod>${escapeXml(lastmod)}</lastmod>` : "",
    changefreq ? `    <changefreq>${escapeXml(changefreq)}</changefreq>` : "",
    priority ? `    <priority>${escapeXml(priority)}</priority>` : "",
    "  </url>",
  ]
    .filter(Boolean)
    .join("\n");
}

async function fetchNotes() {
  const proxyBase = process.env.VITE_CONVEX_SITE_URL;
  if (!proxyBase) return [];

  const response = await fetch(`${proxyBase}/cleve-proxy?resource=notes`);
  if (!response.ok) return [];

  const notes = await response.json();
  return Array.isArray(notes) ? notes : [];
}

export default async function handler(_req, res) {
  const notes = await fetchNotes().catch(() => []);
  const urls = [
    {
      loc: `${SITE_URL}/`,
      changefreq: "weekly",
      priority: "1.0",
    },
    {
      loc: `${SITE_URL}/blog`,
      changefreq: "daily",
      priority: "0.8",
    },
    ...notes.map((note) => ({
      loc: `${SITE_URL}/blog/${note.id}`,
      lastmod: note.updatedAt
        ? new Date(note.updatedAt).toISOString()
        : note.createdAt
          ? new Date(note.createdAt).toISOString()
          : undefined,
      changefreq: "monthly",
      priority: "0.7",
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(urlEntry).join("\n")}
</urlset>`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=3600");
  res.status(200).send(xml);
}
