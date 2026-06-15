import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";

type RichMarkdownProps = {
  children: string;
};

const sanitizeSchema = {
  ...defaultSchema,
  tagNames: [
    ...(defaultSchema.tagNames ?? []),
    "iframe",
    "mark",
    "sub",
    "sup",
    "u",
  ],
  attributes: {
    ...defaultSchema.attributes,
    a: [
      ...(defaultSchema.attributes?.a ?? []),
      "target",
      "rel",
      "title",
    ],
    iframe: [
      "allow",
      "allowFullScreen",
      "allowfullscreen",
      "loading",
      "referrerPolicy",
      "src",
      "title",
    ],
  },
  protocols: {
    ...defaultSchema.protocols,
    src: ["http", "https"],
  },
};

const RichMarkdown = ({ children }: RichMarkdownProps) => (
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeSchema]]}
    components={{
      a: ({ children, href, ...props }) => (
        <a href={href} target="_blank" rel="noreferrer" {...props}>
          {children}
        </a>
      ),
      img: ({ alt, src, ...props }) => (
        <img
          alt={alt ?? ""}
          className="my-6 rounded-lg border border-border"
          loading="lazy"
          src={src ?? ""}
          {...props}
        />
      ),
      iframe: ({ src, title, ...props }) => {
        if (!src) return null;

        return (
          <span className="my-6 block aspect-video overflow-hidden rounded-lg border border-border">
            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              src={src}
              title={title ?? "Embedded content"}
              {...props}
            />
          </span>
        );
      },
      table: ({ children, ...props }) => (
        <div className="my-6 overflow-x-auto">
          <table {...props}>{children}</table>
        </div>
      ),
    }}
  >
    {children}
  </ReactMarkdown>
);

export default RichMarkdown;
