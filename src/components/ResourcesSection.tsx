import SectionBlock from "@/components/SectionBlock";

const resources = [
  {
    label: "Cleve.ai",
    href: "https://cleve.ai",
    description: "The workspace. A team knowledge base the models can actually read.",
  },
  {
    label: "Cleve's founding thesis",
    href: "https://www.cleve.ai/blog/founding-thesis",
    description: "Why we build it: messy thoughts, clearer words, conversations that scale.",
  },
  {
    label: "Malaysian.ai",
    href: "https://www.malaysian.ai/",
    description: "Where AI builders in Malaysia find each other.",
  },
  {
    label: "Antler",
    href: "https://www.antler.co/",
    description: "The day-zero firm that backed Cleve out of Malaysia.",
  },
];

const ResourcesSection = () => {
  return (
    <SectionBlock id="resources" label="Reading">
      <div className="grid gap-3 md:grid-cols-2">
        {resources.map((resource) => (
          <a
            key={resource.href}
            href={resource.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-h-32 items-start justify-between gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/35 hover:bg-accent/60"
          >
            <div>
              <p className="text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                {resource.label}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {resource.description}
              </p>
            </div>
            <span className="mt-0.5 shrink-0 text-sm text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-primary">
              →
            </span>
          </a>
        ))}
      </div>
    </SectionBlock>
  );
};

export default ResourcesSection;
