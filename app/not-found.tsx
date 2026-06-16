import type { Metadata } from "next";
import NotFound from "@/screens/NotFound";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Page not found — Ashvin Praveen",
  description: "This page does not exist. Head back to Ashvin Praveen's personal website.",
  path: "/404",
  noIndex: true,
});

export default function NotFoundPage() {
  return <NotFound />;
}
