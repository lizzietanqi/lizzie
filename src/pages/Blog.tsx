import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";
import ActivityMap from "@/components/ActivityMap";
import Seo from "@/components/Seo";
import { fetchNotes } from "@/lib/cleve";
import { contentColumnClassName, pageShellClassName } from "@/lib/layout";

const formatNoteDate = (timestamp: number | null | undefined) => {
  if (!timestamp) return "Updated recently";

  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const PostSkeleton = () => (
  <li className="space-y-2">
    <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
    <div className="h-3 w-1/4 bg-muted animate-pulse rounded" />
  </li>
);

const Blog = () => {
  const { data: notes, isLoading, isError, refetch } = useQuery({
    queryKey: ["cleve-notes"],
    queryFn: fetchNotes,
  });

  return (
    <>
      <Seo
        title="Writing — Ashvin Praveen"
        description="Essays, notes, and build-in-public updates from Ashvin Praveen on AI, writing, startups, and community."
        path="/blog"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Writing — Ashvin Praveen",
          url: "https://ashvinpraveen.com/blog",
          description:
            "Essays, notes, and build-in-public updates from Ashvin Praveen on AI, writing, startups, and community.",
          author: {
            "@type": "Person",
            name: "Ashvin Praveen",
            url: "https://ashvinpraveen.com/",
          },
          blogPost: notes?.slice(0, 10).map((note) => ({
            "@type": "BlogPosting",
            headline: note.title || "Untitled",
            url: `https://ashvinpraveen.com/blog/${note.id}`,
            datePublished: note.createdAt ? new Date(note.createdAt).toISOString() : undefined,
            dateModified: note.updatedAt ? new Date(note.updatedAt).toISOString() : undefined,
          })),
        }}
      />
      <SiteNav />
      <main className={`${pageShellClassName} pb-20 pt-24`}>
        <div className={contentColumnClassName}>
          <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-8">
            Writing
          </p>

          {isLoading && (
            <ul className="space-y-8">
              {[...Array(5)].map((_, i) => (
                <PostSkeleton key={i} />
              ))}
            </ul>
          )}

          {isError && (
            <div className="space-y-3">
              <p className="font-mono text-sm text-destructive">
                Couldn't load posts right now.
              </p>
              <button
                onClick={() => refetch()}
                className="font-mono text-xs text-primary hover:underline underline-offset-4 transition-colors"
              >
                Try again →
              </button>
            </div>
          )}

          {!isLoading && !isError && notes && notes.length > 0 && (
            <ActivityMap notes={notes} />
          )}

          {notes && notes.length === 0 && (
            <p className="font-mono text-sm text-muted-foreground">No posts yet.</p>
          )}

          {notes && notes.length > 0 && (
            <ul className="space-y-8">
              {notes.map((note) => (
                <li key={note.id}>
                  <Link
                    to={`/blog/${note.id}`}
                    className="group block space-y-1"
                  >
                    <h2 className="text-base font-medium text-foreground group-hover:text-primary transition-colors">
                      {note.title || "Untitled"}
                    </h2>
                    <p className="font-mono text-xs text-muted-foreground">
                      {formatNoteDate(note.createdAt)}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <Footer />
        </div>
      </main>
    </>
  );
};

export default Blog;
