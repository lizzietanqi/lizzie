import { useState } from "react";
import SectionBlock from "@/components/SectionBlock";
import { proseColumnClassName } from "@/lib/layout";

const inlineLinkClassName = "text-primary underline-offset-4 transition-colors hover:underline";

const preview = [
  "I'm Lizzie. I live in Kuala Lumpur.",
  <>
    I studied psychology at HELP University on the Merit Award and graduated with First Class Honours. The part I still use is ordinary and stubborn: people trust what they can remember, and they remember the person who was actually listening.
  </>,
  <>
    I co-founded{" "}
    <a href="https://cleve.ai" target="_blank" rel="noopener noreferrer" className={inlineLinkClassName}>
      Cleve
    </a>
    , an AI workspace and knowledge base for teams. Ashvin Praveen is CEO. Muhammad Fathy Rashad is CTO. I am CMO. Antler Malaysia backed us. My job is the story, the product's point of view, and whether any of it sounds like a person.
  </>,
];

const expanded = [
  {
    title: "Whacked",
    paragraphs: [
      "Before Cleve, Ashvin and I ran Whacked, a personal branding agency we started while I was still in university. It began as small freelance gigs and grew into a studio for founders who needed a public voice: the positioning, the posts, the version of them that could travel without them in the room.",
      "At 23 the agency had done 600K in revenue with a small team. The work I remember most is the stressful kind. Client context lived in one person's head, and when that person left, the brand left with them.",
    ],
  },
  {
    title: "Earlier",
    paragraphs: [
      "I can't code to save my life, so I learned the parts around the product. Copy, Figma, how a room of non-technical people actually hears a demo. At HELP I ran the Start-It-Up interview series and talked to founders across Malaysia's startup scene. I also spent a stretch at Naluri, turning mental-health ideas into daily explainers during the pandemic.",
      "Away from the docs I read, mostly epic fantasy. I studied German through C1 at the Goethe-Institut. At home I move between English, Chinese, Malay, and Cantonese.",
    ],
  },
];

const AboutSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <SectionBlock id="about" label="About">
      <div className={`${proseColumnClassName} text-base leading-relaxed text-foreground/90 md:text-[17px]`}>
        <div className="space-y-4">
          {preview.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {isExpanded && (
          <div className="mt-8 space-y-8">
            {expanded.map((section) => (
              <div key={section.title} className="space-y-3">
                <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {section.title}
                </h3>
                <div className="space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsExpanded((value) => !value)}
          className="mt-6 font-mono text-sm text-primary underline-offset-4 transition-colors hover:underline"
          aria-expanded={isExpanded}
        >
          {isExpanded ? "Show less" : "See more"}
        </button>
      </div>
    </SectionBlock>
  );
};

export default AboutSection;
