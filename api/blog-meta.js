import fs from "node:fs";
import path from "node:path";

const SITE_URL = "https://ashvinpraveen.com";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;
const DEFAULT_TITLE = "Writing — Ashvin Praveen";
const DEFAULT_DESCRIPTION =
  "Essays, notes, and build-in-public updates from Ashvin Praveen on AI, writing, startups, and community.";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function stripMarkdown(value) {
  return String(value ?? "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_~\-[\]()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function excerpt(content) {
  const text = stripMarkdown(content);
  if (!text) return DEFAULT_DESCRIPTION;
  if (text.length <= 155) return text;
  return `${text.slice(0, 152).trim()}...`;
}

function readIndexHtml() {
  const candidates = [
    path.join(process.cwd(), "dist", "index.html"),
    path.join(process.cwd(), "index.html"),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return fs.readFileSync(candidate, "utf8");
  }

  return '<!doctype html><html lang="en"><head></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>';
}

function stripStaticSeo(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<link\s+rel=["']canonical["'][^>]*>/gi, "")
    .replace(/<meta\s+name=["']description["'][^>]*>/gi, "")
    .replace(/<meta\s+name=["']twitter:[^"']+["'][^>]*>/gi, "")
    .replace(/<meta\s+property=["']og:[^"']+["'][^>]*>/gi, "")
    .replace(/<script\s+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, "");
}

function seoTags({ title, description, path: routePath, type = "article", jsonLd }) {
  const url = `${SITE_URL}${routePath}`;
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);
  const safeUrl = escapeHtml(url);
  const safeImage = escapeHtml(DEFAULT_IMAGE);

  return `
    <title>${safeTitle}</title>
    <link rel="canonical" href="${safeUrl}" />
    <meta name="description" content="${safeDescription}" />
    <meta property="og:title" content="${safeTitle}" />
    <meta property="og:description" content="${safeDescription}" />
    <meta property="og:type" content="${escapeHtml(type)}" />
    <meta property="og:url" content="${safeUrl}" />
    <meta property="og:site_name" content="Ashvin Praveen" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:image" content="${safeImage}" />
    <meta property="og:image:secure_url" content="${safeImage}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Ashvin Praveen" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:creator" content="@ashvinpk" />
    <meta name="twitter:title" content="${safeTitle}" />
    <meta name="twitter:description" content="${safeDescription}" />
    <meta name="twitter:image" content="${safeImage}" />
    <meta name="twitter:image:alt" content="Ashvin Praveen" />
    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
  `;
}

function injectSeo(html, metadata) {
  return stripStaticSeo(html).replace("<head>", `<head>${seoTags(metadata)}`);
}

async function fetchNote(id) {
  const proxyBase = process.env.VITE_CONVEX_SITE_URL;
  if (!proxyBase) return null;

  const response = await fetch(`${proxyBase}/cleve-proxy?resource=note&id=${encodeURIComponent(id)}`);
  if (!response.ok) return null;

  return response.json();
}

export default async function handler(req, res) {
  const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
  const note = id ? await fetchNote(id).catch(() => null) : null;
  const routePath = id ? `/blog/${id}` : "/blog";
  const title = note?.title ? `${note.title} — Ashvin Praveen` : DEFAULT_TITLE;
  const description = excerpt(note?.content);
  const url = `${SITE_URL}${routePath}`;
  const published = note?.createdAt ? new Date(note.createdAt).toISOString() : undefined;
  const modified = note?.updatedAt ? new Date(note.updatedAt).toISOString() : undefined;

  const jsonLd = note
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: note.title || "Untitled",
        description,
        url,
        image: DEFAULT_IMAGE,
        datePublished: published,
        dateModified: modified,
        author: {
          "@type": "Person",
          name: "Ashvin Praveen",
          url: SITE_URL,
        },
        publisher: {
          "@type": "Person",
          name: "Ashvin Praveen",
          url: SITE_URL,
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
        },
      }
    : {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "Writing — Ashvin Praveen",
        url: `${SITE_URL}/blog`,
        description: DEFAULT_DESCRIPTION,
      };

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=3600");
  res.status(200).send(injectSeo(readIndexHtml(), { title, description, path: routePath, jsonLd }));
}
