import SectionBlock from "@/components/SectionBlock";

type WorkItem = {
  name: string;
  href: string;
  cta: string;
  description: string[];
  logo?: string;
  alt?: string;
};

const work: WorkItem[] = [
  {
    name: "Cleve.ai",
    href: "https://cleve.ai",
    logo: "/logo-cleve.png",
    alt: "Cleve",
    cta: "Try it free",
    description: [
      "An AI workspace for writing and thinking, built as a knowledge base a whole team can use. The models are shared. The memory is yours: notes, docs, tone, and the decisions that usually vanish into chat.",
      "We started it in Kuala Lumpur after Antler Malaysia. Three co-founders: Ashvin Praveen as CEO, Muhammad Fathy Rashad as CTO, and me on the story and the point of view.",
    ],
  },
];

const WorkSection = () => {
  return (
    <SectionBlock id="work" label="Now">
      <div className="space-y-4">
        {work.map((item) => (
          <div
            key={item.href}
            className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/35 md:p-6"
          >
            <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <img
                    src={item.logo}
                    alt={item.alt ?? item.name}
                    className="h-10 w-10 shrink-0 rounded-lg object-contain"
                  />
                  <h3 className="text-lg font-semibold">
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-primary"
                    >
                      {item.name} ↗
                    </a>
                  </h3>
                </div>
                <div className="max-w-2xl space-y-3 text-base leading-relaxed text-foreground/90">
                  {item.description.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-primary underline-offset-4 transition-colors hover:underline"
              >
                {item.cta} →
              </a>
            </div>
          </div>
        ))}
      </div>
    </SectionBlock>
  );
};

export default WorkSection;
