import { contentColumnClassName } from "@/lib/layout";

const Footer = () => {
  return (
    <footer className={`${contentColumnClassName} space-y-3 border-t border-border pt-8 pb-12`}>
      <p className="font-mono text-xs leading-relaxed text-muted-foreground">
        This website is{" "}
        <a
          href="https://github.com/ashvinpraveen/ashvinpersonalwebsite"
          target="_blank"
          rel="noreferrer"
          className="text-primary underline-offset-4 hover:underline"
        >
          open source
        </a>
        . Copy the code, tweak it however you'd like, make it yours.
      </p>
      <p className="font-mono text-xs text-muted-foreground">
        © {new Date().getFullYear()} Ashvin Praveen
      </p>
    </footer>
  );
};

export default Footer;
