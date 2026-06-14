import SectionBlock from "@/components/SectionBlock";

const interests = [
  "Music",
  "Running",
  "Design",
  "Building in public",
  "Writing",
  "Badminton",
  "Squash",
];

const InterestsSection = () => {
  return (
    <SectionBlock id="interests" label="Interests">
      <div className="flex flex-wrap gap-2">
        {interests.map((item, i) => (
          <span
            key={i}
            className="px-4 py-2 rounded-full border border-border bg-muted/60 text-sm font-medium text-foreground/80 hover:border-primary/40 hover:bg-muted transition-colors cursor-default"
          >
            {item}
          </span>
        ))}
      </div>
    </SectionBlock>
  );
};

export default InterestsSection;
