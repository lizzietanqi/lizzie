import Link from "next/link";
import SectionBlock from "@/components/SectionBlock";

const GameTeaser = () => {
  return (
    <SectionBlock id="game" label="A small game">
      <Link
        href="/game"
        className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/35 sm:flex-row sm:items-end sm:justify-between md:p-6"
      >
        <div className="max-w-xl">
          <p className="text-lg font-semibold tracking-tight">23 Tabs</p>
          <p className="mt-2 text-base leading-relaxed text-foreground/85">
            Eight thoughts show up. File each one: keep the context, shape it into something public, or close the tab. It takes about a minute, and it works on your phone.
          </p>
        </div>
        <span className="font-mono text-sm text-primary underline-offset-4 group-hover:underline">
          Play →
        </span>
      </Link>
    </SectionBlock>
  );
};

export default GameTeaser;
