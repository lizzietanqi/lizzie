import SectionBlock from "@/components/SectionBlock";
import { proseColumnClassName } from "@/lib/layout";

const ContactSection = () => {
  return (
    <SectionBlock id="contact" label="Get in Touch">
      <div className={`${proseColumnClassName} space-y-6`}>
        <p className="text-base leading-relaxed text-foreground/90">
          Building something, or want to try Cleve? Reach out.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm">
          <a
            href="https://cleve.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline underline-offset-4 transition-colors"
          >
            cleve.ai
          </a>
          <a
            href="mailto:lizzie@cleve.ai"
            className="text-primary hover:underline underline-offset-4 transition-colors"
          >
            lizzie@cleve.ai
          </a>
          <a
            href="https://cal.com/ashvinpraveen"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline underline-offset-4 transition-colors"
          >
            Book a call
          </a>
          <a
            href="https://linkedin.com/in/ashvinpraveen"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline underline-offset-4 transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </SectionBlock>
  );
};

export default ContactSection;
