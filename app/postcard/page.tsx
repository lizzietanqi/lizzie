import type { Metadata } from "next";
import Postcard from "@/screens/Postcard";
import { absoluteUrl, createMetadata } from "@/lib/seo";

const title = "Postcards — Lizzie Tan";
const description =
  "Leave a public postcard for Lizzie Tan. Write a note, draw something small, and see it appear on the site.";

export const metadata: Metadata = createMetadata({
  title,
  description,
  path: "/postcard",
});

export default function PostcardPage() {
  const postcardJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    url: absoluteUrl("/postcard"),
    description,
  };

  return (
    <>
      <script
        id="postcard-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postcardJsonLd) }}
      />
      <Postcard />
    </>
  );
}
