import type { Metadata } from "next";
import Blog from "@/screens/Blog";
import { fetchNotes } from "@/lib/cleve";
import { absoluteUrl, createMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

const title = "Writing — Lizzie Tan";
const description =
  "Essays, notes, and build-in-public updates from Lizzie Tan on AI, writing, startups, and community.";

export const metadata: Metadata = createMetadata({
  title,
  description,
  path: "/blog",
});

export default async function BlogPage() {
  const notes = await fetchNotes().catch(() => undefined);
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: title,
    url: absoluteUrl("/blog"),
    description,
    author: {
      "@type": "Person",
      name: "Lizzie Tan",
      url: absoluteUrl("/"),
    },
    blogPost: notes?.slice(0, 10).map((note) => ({
      "@type": "BlogPosting",
      headline: note.title || "Untitled",
      url: absoluteUrl(`/blog/${note.id}`),
      datePublished: note.createdAt ? new Date(note.createdAt).toISOString() : undefined,
      dateModified: note.updatedAt ? new Date(note.updatedAt).toISOString() : undefined,
    })),
  };

  return (
    <>
      <script
        id="blog-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <Blog initialNotes={notes} />
    </>
  );
}
