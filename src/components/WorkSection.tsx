type WorkItem = {
  name: string;
  href: string;
  sourceHref?: string;
  cta: string;
  description: string[];
  logo?: string;
  alt?: string;
  initials?: string;
};

const work: WorkItem[] = [
  {
    name: "Cleve.ai",
    href: "https://cleve.ai",
    logo: "/logo-cleve.png",
    alt: "Cleve",
    cta: "Try it free",
    description: [
      "AI workspace for writing and thinking. All the major models in one place, with memory that carries across sessions.",
      "40,000+ users. Backed by Antler.",
    ],
  },
  {
    name: "Malaysian.ai",
    href: "https://www.malaysian.ai/",
    sourceHref: "https://github.com/ashvinpraveen/malaysianai",
    logo: "/logo-malaysian-ai.png",
    alt: "Malaysian.ai",
    cta: "Visit Malaysian.ai",
    description: [
      "Built the website for Malaysia's AI builder community, backed by 500 Global.",
      "I also host regular community runs on Mondays and Thursdays.",
    ],
  },
  {
    name: "RakanTutor.org",
    href: "https://rakantutor.org",
    sourceHref: "https://github.com/ashvinpraveen/rakantutor",
    initials: "RT",
    cta: "Visit Rakan Tutor",
    description: [
      "Built the website for Rakan Tutor, a student-led education nonprofit.",
      "Currently directing the National AI Competition with Rakan Tutor and Sunway University.",
    ],
  },
  {
    name: "Build for Public",
    href: "https://buildforpublic.com",
    sourceHref: "https://github.com/mfrashad/buildforpublic",
    initials: "BP",
    cta: "Visit Build for Public",
    description: [
      "Joining a community of builders working on useful public-interest projects.",
      "The kind of place that turns good intent into shipped tools, not just nice intentions.",
    ],
  },
];

const WorkSection = () => {
  return (
    <section id="work" className="py-16 md:py-20 border-t border-border">
      <div className="flex items-center gap-3 mb-8">
        <span className="h-px w-6 bg-primary shrink-0" />
        <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">What I'm Building</p>
      </div>
      <div className="max-w-prose space-y-4">
        {work.map((item) => (
          <div
            key={item.href}
            className="rounded-xl border border-border bg-muted/40 p-5 hover:border-primary/40 hover:bg-muted/60 transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              {item.logo ? (
                <img
                  src={item.logo}
                  alt={item.alt ?? item.name}
                  className="w-9 h-9 rounded-lg object-contain shrink-0"
                />
              ) : (
                <span className="flex w-9 h-9 items-center justify-center rounded-lg border border-border bg-background font-mono text-xs font-semibold text-primary shrink-0">
                  {item.initials}
                </span>
              )}
              <h3 className="text-lg font-semibold">
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  {item.name} ↗
                </a>
              </h3>
            </div>
            <div className="space-y-3 text-base leading-relaxed text-foreground/90">
              {item.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-primary hover:underline underline-offset-4 transition-colors"
              >
                {item.cta} →
              </a>
              {item.sourceHref && (
                <a
                  href={item.sourceHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-4 transition-colors"
                >
                  Source →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkSection;
