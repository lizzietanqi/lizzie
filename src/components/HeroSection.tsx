const socials = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/lizzietan",
    icon: "/social-icons/LinkedIn_logo.svg",
    iconDark: null,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/lizzietanqi",
    icon: "/social-icons/Instagram_logo.svg",
    iconDark: null,
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@lizzietanqi",
    icon: "/social-icons/TikTok_logo.svg",
    iconDark: null,
  },
  {
    label: "X",
    href: "https://x.com/lizzietanqi",
    icon: "/social-icons/X_Twitter_logo.svg",
    iconDark: null,
  },
  {
    label: "Threads",
    href: "https://threads.net/@lizzietanqi",
    icon: "/social-icons/Threads_logo_black.svg",
    iconDark: "/social-icons/Threads_logo_white.svg",
  },
  {
    label: "GitHub",
    href: "https://github.com/lizzietanqi",
    icon: "/social-icons/GitHub_logo_black.svg",
    iconDark: "/social-icons/GitHub_logo_white.svg",
  },
];

const HeroSection = () => {
  return (
    <section id="hero" className="pb-16 pt-16 md:pb-24 md:pt-24">
      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_16rem] md:items-start">
        <div className="max-w-prose">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
            Kuala Lumpur
          </p>
          <h1 className="mb-4 text-5xl font-semibold tracking-tight leading-[1.02] md:text-6xl">
            Lizzie Tan
          </h1>
          <p className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-sm">
            <span className="font-medium text-primary">CMO & co-founder</span>
            <span className="text-muted-foreground">·</span>
            <a
              href="https://cleve.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              Cleve.ai
            </a>
          </p>
          <p className="text-lg leading-relaxed text-foreground/90 md:text-xl">
            I help teams keep what they know, and say it in a voice that still sounds like them.
          </p>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-2 transition-colors hover:border-primary/40 hover:bg-accent"
              >
                <img
                  src={social.icon}
                  alt={`${social.label} profile`}
                  className={`h-4 w-4 object-contain${social.iconDark ? " dark:hidden" : ""}`}
                />
                {social.iconDark && (
                  <img
                    src={social.iconDark}
                    alt=""
                    aria-hidden="true"
                    className="hidden h-4 w-4 object-contain dark:block"
                  />
                )}
                <span className="text-sm font-medium text-foreground/80 transition-colors group-hover:text-foreground">
                  {social.label}
                </span>
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <img
            src="/lizzie-profile.png"
            alt="Lizzie Tan"
            className="h-32 w-32 shrink-0 rounded-2xl object-cover object-top ring-1 ring-border md:aspect-square md:h-auto md:w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
