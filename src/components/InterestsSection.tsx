import SectionBlock from "@/components/SectionBlock";

const interests = [
  "Epic fantasy",
  "Psychology",
  "German",
  "Personal brands",
  "Writing",
  "Kuala Lumpur",
];

const InterestsSection = () => {
  return (
    <SectionBlock id="off-hours" label="Off hours">
      <div className="flex flex-wrap gap-2">
        {interests.map((item) => (
          <span
            key={item}
            className="cursor-default rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground/80"
          >
            {item}
          </span>
        ))}
      </div>
    </SectionBlock>
  );
};

export default InterestsSection;
