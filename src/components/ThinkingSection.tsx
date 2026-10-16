import SectionBlock from "@/components/SectionBlock";

const ThinkingSection = () => {
  const models = [
    {
      idea: "A full head is not a bad communicator.",
      detail: "The useful thoughts are usually under the noise. Give them a place before you ask them to be public.",
    },
    {
      idea: "A brand is a memory other people can hold.",
      detail: "If the context lives in one person's head, the voice leaves when they do.",
    },
    {
      idea: "Psychology was the job training.",
      detail: "How people notice, remember, and decide is the whole of marketing, and most of product.",
    },
  ];

  return (
    <SectionBlock label="What I keep coming back to">
      <div className="max-w-prose">
        <div className="space-y-8">
          {models.map((model, i) => (
            <div key={model.idea} className="flex gap-4">
              <span className="mt-0.5 shrink-0 font-mono text-sm text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="border-l border-border pl-4">
                <p className="mb-1.5 text-base font-medium leading-snug text-foreground">
                  {model.idea}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {model.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionBlock>
  );
};

export default ThinkingSection;
