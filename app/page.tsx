import Index from "@/screens/Index";
import { homeDescription } from "@/lib/seo";

const homeJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Lizzie Tan",
    url: "https://lizzietan.com/",
    image: "https://lizzietan.com/lizzie-profile.png",
    jobTitle: "CMO & Co-founder",
    worksFor: {
      "@type": "Organization",
      name: "Cleve.ai",
      url: "https://cleve.ai",
    },
    sameAs: [
      "https://linkedin.com/in/lizzietan",
      "https://instagram.com/lizzietanqi",
      "https://tiktok.com/@lizzietanqi",
      "https://x.com/lizzietanqi",
      "https://threads.net/@lizzietanqi",
      "https://github.com/lizzietanqi",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Lizzie Tan",
    url: "https://lizzietan.com/",
    description: homeDescription,
    publisher: {
      "@type": "Person",
      name: "Lizzie Tan",
    },
  },
];

export default function HomePage() {
  return (
    <>
      <script
        id="home-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <Index />
    </>
  );
}
