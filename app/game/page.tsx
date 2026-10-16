import type { Metadata } from "next";
import Game from "@/screens/Game";
import { absoluteUrl, createMetadata } from "@/lib/seo";

const title = "23 Tabs — Lizzie Tan";
const description =
  "A one-minute game from Lizzie Tan. File eight thoughts: keep the context, shape it into something public, or close the tab.";

export const metadata: Metadata = createMetadata({
  title,
  description,
  path: "/game",
});

export default function GamePage() {
  const gameJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    url: absoluteUrl("/game"),
    description,
  };

  return (
    <>
      <script
        id="game-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gameJsonLd) }}
      />
      <Game />
    </>
  );
}
