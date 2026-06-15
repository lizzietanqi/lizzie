import { lazy, Suspense } from "react";

const RichMarkdown = lazy(() => import("@/components/RichMarkdown"));

type LazyRichMarkdownProps = {
  children: string;
};

const LazyRichMarkdown = ({ children }: LazyRichMarkdownProps) => (
  <Suspense
    fallback={
      <p className="font-mono text-xs text-muted-foreground">Loading content...</p>
    }
  >
    <RichMarkdown>{children}</RichMarkdown>
  </Suspense>
);

export default LazyRichMarkdown;
