import { contentColumnClassName } from "@/lib/layout";

const Footer = () => {
  return (
    <footer
      className={`${contentColumnClassName} mt-28 flex flex-col gap-4 border-t border-border py-12 md:mt-36 md:flex-row md:items-end md:justify-between md:py-16`}
    >
      <p className="max-w-xl font-mono text-xs leading-relaxed text-muted-foreground">
        <a
          href="https://github.com/lizzietanqi/lizzie"
          target="_blank"
          rel="noreferrer"
          className="text-primary underline-offset-4 hover:underline"
        >
          Open source
        </a>
        . Copy the code, tweak it, make it yours.
      </p>
      <p className="font-mono text-xs text-muted-foreground">
        © {new Date().getFullYear()} Lizzie Tan
      </p>
    </footer>
  );
};

export default Footer;
