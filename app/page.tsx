import Index from "@/screens/Index";
import { homeDescription } from "@/lib/seo";

const homeJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Lizzie Tan",
    url: "https://ashvinpraveen.com/",
    image: "https://ashvinpraveen.com/ashvin-profile.png",
    jobTitle: "CMO & Co-founder",
    worksFor: {
      "@type": "Organization",
      name: "Cleve.ai",
      url: "https://cleve.ai",
    },
    sameAs: [
      "https://linkedin.com/in/ashvinpraveen",
      "https://instagram.com/ashvinpraveen",
      "https://tiktok.com/@ashvinpraveen",
      "https://x.com/ashvinpk",
      "https://youtube.com/@ashvinpraveen",
      "https://threads.net/@ashvinpraveen",
      "https://github.com/lizzietanqi",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Lizzie Tan",
    url: "https://ashvinpraveen.com/",
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
