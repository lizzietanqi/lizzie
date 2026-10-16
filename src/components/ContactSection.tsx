import SectionBlock from "@/components/SectionBlock";
import { proseColumnClassName } from "@/lib/layout";

const ContactSection = () => {
  return (
    <SectionBlock id="contact" label="Hello">
      <div className={`${proseColumnClassName} space-y-6`}>
        <p className="text-base leading-relaxed text-foreground/90">
          Building a team that keeps losing the thread, or just want to say hello? Write to me.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm">
          <a
            href="mailto:lizzie@cleve.ai"
            className="text-primary underline-offset-4 transition-colors hover:underline"
          >
            lizzie@cleve.ai
          </a>
          <a
            href="https://linkedin.com/in/lizzietan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline-offset-4 transition-colors hover:underline"
          >
            LinkedIn
          </a>
          <a
            href="https://cleve.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline-offset-4 transition-colors hover:underline"
          >
            cleve.ai
          </a>
        </div>
      </div>
    </SectionBlock>
  );
};

export default ContactSection;
