import type { Metadata } from "next";

export const SITE_URL = "https://lizzietan.com";
export const SITE_NAME = "Lizzie Tan";
export const DEFAULT_OG_IMAGE = "/og-image.png";

export const homeTitle = "Lizzie Tan — CMO & co-founder of Cleve.ai";
export const homeDescription =
  "Lizzie Tan is CMO and co-founder of Cleve.ai, an AI workspace and knowledge base for teams in Kuala Lumpur. She studied psychology and previously ran the personal branding agency Whacked.";

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function createMetadata({
  title,
  description,
  path = "/",
  type = "website",
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      type,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      images: [
        {
          url: imageUrl,
          secureUrl: imageUrl,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@lizzietanqi",
      title,
      description,
      images: [
        {
          url: imageUrl,
          alt: SITE_NAME,
        },
      ],
    },
  };
}

export function excerpt(content: string | null | undefined) {
  const text = content
    ?.replace(/<[^>]+>/g, " ")
    ?.replace(/[#*_`>\-[\]()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!text) return "Writing by Lizzie Tan on Cleve, thinking, and building in public.";
  if (text.length <= 155) return text;

  return `${text.slice(0, 152).trim()}...`;
}
