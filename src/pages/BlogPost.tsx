import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { fetchNote } from "@/lib/cleve";
import { contentColumnClassName, pageShellClassName } from "@/lib/layout";

const formatNoteDate = (timestamp: number | null | undefined) => {
  if (!timestamp) return "Updated recently";

  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const excerpt = (content: string | null | undefined) => {
  const text = content
    ?.replace(/[#*_`>\-[\]()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!text) return "Writing by Ashvin Praveen on AI, startups, building, and learning in public.";
  if (text.length <= 155) return text;

  return `${text.slice(0, 152).trim()}...`;
};

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ["cleve-note", id],
    queryFn: () => fetchNote(id!),
    enabled: !!id,
  });

  return (
    <>
      <Seo
        title={note?.title ? `${note.title} — Ashvin Praveen` : "Writing — Ashvin Praveen"}
        description={excerpt(note?.content)}
        path={id ? `/blog/${id}` : "/blog"}
        type="article"
        jsonLd={
          note && id
            ? {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                headline: note.title || "Untitled",
                description: excerpt(note.content),
                url: `https://ashvinpraveen.com/blog/${id}`,
                image: "https://ashvinpraveen.com/og-image.png",
                datePublished: note.createdAt ? new Date(note.createdAt).toISOString() : undefined,
                dateModified: note.updatedAt ? new Date(note.updatedAt).toISOString() : undefined,
                author: {
                  "@type": "Person",
                  name: "Ashvin Praveen",
                  url: "https://ashvinpraveen.com/",
                },
                publisher: {
                  "@type": "Person",
                  name: "Ashvin Praveen",
                  url: "https://ashvinpraveen.com/",
                },
                mainEntityOfPage: {
                  "@type": "WebPage",
                  "@id": `https://ashvinpraveen.com/blog/${id}`,
                },
              }
            : undefined
        }
      />
      <SiteNav />
      <main className={`${pageShellClassName} pb-20 pt-24`}>
        <div className={contentColumnClassName}>
          <Link
            to="/blog"
            className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            ← All posts
          </Link>

          {isLoading && (
            <p className="font-mono text-sm text-muted-foreground mt-8">Loading...</p>
          )}

          {isError && (
            <p className="font-mono text-sm text-destructive mt-8">Failed to load post.</p>
          )}

          {note && (
            <article className="mt-8 space-y-4">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                {note.title || "Untitled"}
              </h1>
              <p className="font-mono text-xs text-muted-foreground">
                {formatNoteDate(note.createdAt)}
              </p>
              <div className="prose prose-sm dark:prose-invert max-w-none pt-4">
                <ReactMarkdown>{note.content ?? ""}</ReactMarkdown>
              </div>
            </article>
          )}

          <Footer />
        </div>
      </main>
    </>
  );
};

export default BlogPost;
