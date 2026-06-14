import SectionBlock from "@/components/SectionBlock";

const FactsSection = () => {
  const facts = [
    "Born in Sarawak. Studied in Sheffield. Based in KL.",
    "Music is always on.",
    "Used to run competitively. Still lace up most mornings.",
  ];

  return (
    <SectionBlock label="A Few Things">
      <ul className="max-w-prose space-y-3">
        {facts.map((fact, i) => (
          <li key={i} className="flex gap-3 text-base leading-relaxed text-foreground/90">
            <span className="text-muted-foreground mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
            <span>{fact}</span>
          </li>
        ))}
      </ul>
    </SectionBlock>
  );
};

export default FactsSection;
