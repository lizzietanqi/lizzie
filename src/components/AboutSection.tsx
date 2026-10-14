import { useState } from "react";
import SectionBlock from "@/components/SectionBlock";
import { proseColumnClassName } from "@/lib/layout";

const inlineLinkClassName = "text-primary hover:underline underline-offset-4 transition-colors";

const preview = [
  <>
    I'm Lizzie, based in Kuala Lumpur. I'm the CMO and co-founder of{" "}
    <a
      href="https://cleve.ai"
      target="_blank"
      rel="noopener noreferrer"
      className={inlineLinkClassName}
    >
      Cleve
    </a>
    , an AI workspace that helps people write with their own context and publish fast.
  </>,
  "I'm probably the most non-technical founder out there. I can't code to save my life, so my job is everything around the product: the story, the content, and getting it in front of the people it's for.",
  "When I'm not working, I'm reading. Mostly epic fantasy.",
];

const expanded = [
  {
    title: "Cleve",
    paragraphs: [
      "We started Cleve in December 2023. There are three co-founders: Ashvin as CEO, Rashad as CTO, and me as CMO. Antler backed us early.",
    ],
  },
  {
    title: "Before Cleve",
    paragraphs: [
      "I studied at HELP University on the HELP Merit Award Scholarship and graduated with First Class Honours.",
      "While I was there, I ran the Start-It-Up Interview Series. I interviewed founders across Malaysia's startup scene and shared their stories, hoping more young Malaysians would see starting something as a real option. I also organised networking events that brought university students and startups together.",
    ],
  },
];

const AboutSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <SectionBlock id="about" label="About">
      <div className={`${proseColumnClassName} text-base md:text-[17px] leading-relaxed text-foreground/90`}>
        <div className="space-y-4">
          {preview.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {isExpanded && (
          <div className="mt-8 space-y-8">
            {expanded.map((section) => (
              <div key={section.title} className="space-y-3">
                <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {section.title}
                </h3>
                <div className="space-y-4">
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsExpanded((value) => !value)}
          className="mt-6 font-mono text-sm text-primary hover:underline underline-offset-4 transition-colors"
          aria-expanded={isExpanded}
        >
          {isExpanded ? "Show less" : "See more"}
        </button>
      </div>
    </SectionBlock>
  );
};

export default AboutSection;
