"use client";

import { useState } from "react";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";
import { pageShellClassName } from "@/lib/layout";
import {
  filingMeta,
  filingOrder,
  mentalTabs,
  resultForScore,
  shuffleTabs,
  type Filing,
  type MentalTab,
} from "@/lib/tabs";
import { cn } from "@/lib/utils";

type Phase = "ready" | "choose" | "reveal" | "done";

const actionClassName: Record<Filing, string> = {
  keep: "border-sage/40 hover:border-sage hover:bg-accent",
  shape: "border-warm/40 hover:border-warm hover:bg-warm/10",
  close: "border-hot/40 hover:border-hot hover:bg-hot/10",
};

const Game = () => {
  const [phase, setPhase] = useState<Phase>("ready");
  const [deck, setDeck] = useState<MentalTab[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [choice, setChoice] = useState<Filing | null>(null);

  const tab = deck[index];
  const total = deck.length;

  const start = () => {
    setDeck(shuffleTabs(mentalTabs));
    setIndex(0);
    setScore(0);
    setChoice(null);
    setPhase("choose");
  };

  const choose = (next: Filing) => {
    if (phase !== "choose" || !tab) return;
    setChoice(next);
    if (next === tab.answer) setScore((value) => value + 1);
    setPhase("reveal");
  };

  const advance = () => {
    if (index + 1 >= total) {
      setPhase("done");
      return;
    }
    setIndex((value) => value + 1);
    setChoice(null);
    setPhase("choose");
  };

  const result = resultForScore(score, total);

  return (
    <>
      <SiteNav />
      <main className={`${pageShellClassName} pb-16 pt-20`}>
        <div className="mx-auto w-full max-w-xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            A minute in a full head
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">23 Tabs</h1>

          {phase === "ready" && (
            <div className="mt-8 space-y-6">
              <p className="text-base leading-relaxed text-foreground/90 sm:text-lg">
                Eight thoughts show up, the way they do between a client call and the LRT. File each one.
              </p>
              <ul className="space-y-3 text-sm leading-relaxed text-foreground/85">
                <li><span className="font-semibold text-sage">Keep</span> — raw context the team will need again.</li>
                <li><span className="font-semibold text-warm">Shape</span> — a thought that should become something public.</li>
                <li><span className="font-semibold text-hot">Close</span> — noise, or a tab that isn’t yours to hold.</li>
              </ul>
              <button
                type="button"
                onClick={start}
                className="min-h-12 w-full rounded-xl bg-primary px-5 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
              >
                Open the first tab
              </button>
            </div>
          )}

          {(phase === "choose" || phase === "reveal") && tab && (
            <div className="mt-8">
              <div className="mb-4 flex items-center justify-between gap-3 font-mono text-xs text-muted-foreground">
                <span>
                  Tab {index + 1} of {total}
                </span>
                <span>{score} filed cleanly</span>
              </div>
              <div
                className="h-1 overflow-hidden rounded-full bg-muted"
                role="progressbar"
                aria-valuemin={1}
                aria-valuemax={total}
                aria-valuenow={index + 1}
                aria-label="Tabs filed"
              >
                <div
                  className="h-full bg-primary transition-[width] duration-300"
                  style={{ width: `${((index + (phase === "reveal" ? 1 : 0)) / total) * 100}%` }}
                />
              </div>

              <article className="mt-5 rounded-2xl border border-border bg-card p-5 sm:p-6">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">{tab.kicker}</p>
                <p className="mt-3 text-lg leading-relaxed text-foreground sm:text-xl">{tab.text}</p>
              </article>

              <div className="mt-4 grid gap-2.5" role="group" aria-label="File this tab">
                {filingOrder.map((action) => {
                  const selected = choice === action;
                  const correct = tab.answer === action;
                  const revealed = phase === "reveal";
                  return (
                    <button
                      key={action}
                      type="button"
                      disabled={revealed}
                      onClick={() => choose(action)}
                      className={cn(
                        "flex min-h-14 w-full items-center justify-between gap-3 rounded-xl border bg-card px-4 text-left transition-colors disabled:cursor-default",
                        actionClassName[action],
                        revealed && correct && "border-sage bg-accent",
                        revealed && selected && !correct && "border-hot bg-hot/10",
                        revealed && !selected && !correct && "opacity-55",
                      )}
                    >
                      <span>
                        <span className="block text-base font-semibold">{filingMeta[action].label}</span>
                        <span className="block text-sm text-muted-foreground">{filingMeta[action].hint}</span>
                      </span>
                      {revealed && correct && (
                        <span className="font-mono text-xs text-primary">Right place</span>
                      )}
                      {revealed && selected && !correct && (
                        <span className="font-mono text-xs text-hot">Elsewhere</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {phase === "reveal" && (
                <div className="mt-4 space-y-4" aria-live="polite">
                  <p className="text-base leading-relaxed text-foreground/90">{tab.why}</p>
                  <button
                    type="button"
                    onClick={advance}
                    className="min-h-12 w-full rounded-xl bg-primary px-5 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    {index + 1 >= total ? "See the score" : "Next tab"}
                  </button>
                </div>
              )}
            </div>
          )}

          {phase === "done" && (
            <div className="mt-8 rounded-2xl border border-border bg-card p-5 sm:p-6">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                {score} of {total}
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">{result.title}</h2>
              <p className="mt-3 text-base leading-relaxed text-foreground/90">{result.detail}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={start}
                  className="min-h-12 rounded-xl bg-primary px-5 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Play again
                </button>
                <Link
                  href="/"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border px-5 text-base font-medium transition-colors hover:bg-accent"
                >
                  Back home
                </Link>
              </div>
            </div>
          )}

          <Footer />
        </div>
      </main>
    </>
  );
};

export default Game;
