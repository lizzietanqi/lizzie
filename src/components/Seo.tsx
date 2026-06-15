import { useEffect } from "react";

const SITE_URL = "https://ashvinpraveen.com";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

type SeoProps = {
  title: string;
  description: string;
  image?: string;
  path?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

function setMeta(selector: string, attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.content = content;
}

function setCanonical(url: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.appendChild(element);
  }

  element.href = url;
}

function setJsonLd(jsonLd: SeoProps["jsonLd"]) {
  const id = "structured-data";
  let element = document.head.querySelector<HTMLScriptElement>(`script#${id}`);

  if (!jsonLd) {
    element?.remove();
    return;
  }

  if (!element) {
    element = document.createElement("script");
    element.id = id;
    element.type = "application/ld+json";
    document.head.appendChild(element);
  }

  element.text = JSON.stringify(jsonLd);
}

const Seo = ({
  title,
  description,
  image = DEFAULT_IMAGE,
  path = "/",
  type = "website",
  noIndex = false,
  jsonLd,
}: SeoProps) => {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;

    document.title = title;
    setCanonical(url);

    setMeta('meta[name="description"]', "name", "description", description);

    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:type"]', "property", "og:type", type);
    setMeta('meta[property="og:url"]', "property", "og:url", url);
    setMeta('meta[property="og:image"]', "property", "og:image", image);
    setMeta('meta[property="og:image:secure_url"]', "property", "og:image:secure_url", image);
    setMeta('meta[property="og:image:type"]', "property", "og:image:type", "image/png");
    setMeta('meta[property="og:image:width"]', "property", "og:image:width", "1200");
    setMeta('meta[property="og:image:height"]', "property", "og:image:height", "630");
    setMeta('meta[property="og:image:alt"]', "property", "og:image:alt", "Ashvin Praveen");

    setMeta('meta[name="twitter:creator"]', "name", "twitter:creator", "@ashvinpk");
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", image);
    setMeta('meta[name="twitter:image:alt"]', "name", "twitter:image:alt", "Ashvin Praveen");
    if (noIndex) {
      setMeta('meta[name="robots"]', "name", "robots", "noindex,nofollow");
    } else {
      document.head.querySelector<HTMLMetaElement>('meta[name="robots"]')?.remove();
    }
    setJsonLd(jsonLd);
  }, [description, image, jsonLd, noIndex, path, title, type]);

  return null;
};

export default Seo;
