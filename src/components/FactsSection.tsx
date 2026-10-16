import SectionBlock from "@/components/SectionBlock";

const FactsSection = () => {
  const facts = [
    "Based in Kuala Lumpur. Psychology at HELP, First Class Honours.",
    "Reads epic fantasy. Studied German through C1.",
    "CMO and co-founder of Cleve. Previously ran Whacked with Ashvin.",
  ];

  return (
    <SectionBlock label="A few things">
      <ul className="max-w-prose space-y-3">
        {facts.map((fact) => (
          <li key={fact} className="flex gap-3 text-base leading-relaxed text-foreground/90">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>{fact}</span>
          </li>
        ))}
      </ul>
    </SectionBlock>
  );
};

export default FactsSection;
