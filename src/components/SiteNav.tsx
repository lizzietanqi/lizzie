import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { pageShellClassName } from "@/lib/layout";

const links = [
  { href: "/game", label: "Game" },
  { href: "/postcard", label: "Postcards" },
  { href: "/blog", label: "Writing" },
];

const SiteNav = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/85 backdrop-blur-sm">
      <div className={`${pageShellClassName} flex min-h-12 items-center justify-between gap-3 py-2`}>
        <Link href="/" className="text-sm font-semibold tracking-tight text-foreground hover:text-primary transition-colors">
          Lizzie
        </Link>
        <div className="flex flex-wrap items-center justify-end gap-x-3 gap-y-1 font-mono text-xs sm:gap-x-5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default SiteNav;
