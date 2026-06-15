import { FormEvent, PointerEvent, useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import SiteNav from "@/components/SiteNav";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { contentColumnClassName, pageShellClassName } from "@/lib/layout";
import { cn } from "@/lib/utils";

const MAX_MESSAGE_LENGTH = 500;
const CLIENT_ID_KEY = "postcard-client-id";
const drawingPlacements = [
  { left: "8%", top: "18%", width: "28%", rotate: "-4deg" },
  { left: "36%", top: "8%", width: "24%", rotate: "3deg" },
  { left: "66%", top: "22%", width: "22%", rotate: "-2deg" },
  { left: "18%", top: "54%", width: "20%", rotate: "5deg" },
  { left: "48%", top: "48%", width: "30%", rotate: "-3deg" },
  { left: "73%", top: "60%", width: "18%", rotate: "4deg" },
];

function formatPostcardDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getOrCreateClientId() {
  const existingClientId = window.localStorage.getItem(CLIENT_ID_KEY);
  if (existingClientId) return existingClientId;

  const clientId =
    typeof window.crypto?.randomUUID === "function"
      ? window.crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  window.localStorage.setItem(CLIENT_ID_KEY, clientId);
  return clientId;
}

const DrawingPad = ({
  hasDrawing,
  onHasDrawingChange,
  resetKey,
}: {
  hasDrawing: boolean;
  onHasDrawingChange: (hasDrawing: boolean) => void;
  resetKey: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    canvas.width = Math.floor(rect.width * ratio);
    canvas.height = Math.floor(rect.height * ratio);

    const context = canvas.getContext("2d");
    if (!context) return;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineWidth = 3;
    context.strokeStyle = "#000000";
  };

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    onHasDrawingChange(false);
  }, [onHasDrawingChange, resetKey]);

  function getPoint(event: PointerEvent<HTMLCanvasElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  function startDrawing(event: PointerEvent<HTMLCanvasElement>) {
    const context = event.currentTarget.getContext("2d");
    if (!context) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    const point = getPoint(event);
    isDrawingRef.current = true;
    context.beginPath();
    context.moveTo(point.x, point.y);
  }

  function draw(event: PointerEvent<HTMLCanvasElement>) {
    if (!isDrawingRef.current) return;

    const context = event.currentTarget.getContext("2d");
    if (!context) return;

    const point = getPoint(event);
    context.lineTo(point.x, point.y);
    context.stroke();
    onHasDrawingChange(true);
  }

  function stopDrawing(event: PointerEvent<HTMLCanvasElement>) {
    isDrawingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function clearDrawing() {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    onHasDrawingChange(false);
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={clearDrawing}
          className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
        >
          Clear
        </button>
      </div>
      <div
        className={cn(
          "rounded-[12px] border border-border bg-background p-3 dark:bg-muted",
          hasDrawing && "border-primary/70",
        )}
      >
        <canvas
          ref={canvasRef}
          id="postcard-drawing"
          className="h-64 w-full touch-none dark:invert"
          onPointerDown={startDrawing}
          onPointerMove={draw}
          onPointerUp={stopDrawing}
          onPointerCancel={stopDrawing}
          aria-label="Drawing canvas"
        />
      </div>
    </div>
  );
};

const DrawingField = ({
  postcards,
}: {
  postcards:
    | Array<{
        _id: string;
        drawingDataUrl: string | null;
        name: string;
        location: string;
      }>
    | undefined;
}) => {
  const drawings = postcards?.filter((postcard) => postcard.drawingDataUrl) ?? [];

  return (
    <section className="space-y-5 border-t border-border pt-12">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
        Drawing field
      </h2>

      <div className="relative min-h-[22rem] overflow-hidden rounded-[12px] border border-border bg-card">
        <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-border" />
        <div className="absolute inset-y-0 left-1/2 border-l border-dashed border-border" />

        {drawings.length === 0 && (
          <div className="grid h-[22rem] place-items-center px-6 text-center font-mono text-xs text-muted-foreground">
            Drawings will collect here.
          </div>
        )}

        {drawings.map((postcard, index) => {
          const placement = drawingPlacements[index % drawingPlacements.length];
          return (
            <div
              key={postcard._id}
              className="absolute rounded-[12px] border border-border bg-background/80 p-3 dark:bg-muted"
              style={{
                left: placement.left,
                top: placement.top,
                width: placement.width,
                transform: `rotate(${placement.rotate})`,
              }}
            >
              <img
                src={postcard.drawingDataUrl ?? ""}
                alt={`Drawing from ${postcard.name || postcard.location || "a postcard"}`}
                className="h-full w-full object-contain dark:invert"
                loading="lazy"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

const Postcard = () => {
  const [clientId, setClientId] = useState("");
  const postcards = useQuery(
    api.postcards.list,
    clientId ? { clientId } : "skip",
  );
  const createPostcard = useMutation(api.postcards.create);
  const togglePostcardLike = useMutation(api.postcards.toggleLike);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [hasDrawing, setHasDrawing] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [likingPostcardId, setLikingPostcardId] = useState<Id<"postcards"> | null>(null);

  useEffect(() => {
    setClientId(getOrCreateClientId());
  }, []);

  function getDrawingDataUrl() {
    const canvas = document.querySelector<HTMLCanvasElement>("#postcard-drawing");
    canvasRef.current = canvas;
    if (!canvas || !hasDrawing) return null;
    return canvas.toDataURL("image/png");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!message.trim()) {
      toast.error("Write a line first.");
      return;
    }

    setIsSubmitting(true);
    try {
      await createPostcard({
        name,
        location,
        message,
        drawingDataUrl: getDrawingDataUrl(),
      });
      setName("");
      setLocation("");
      setMessage("");
      setResetKey((value) => value + 1);
      toast.success("Postcard added.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not add postcard.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleLike(postcardId: Id<"postcards">) {
    if (!clientId) return;

    setLikingPostcardId(postcardId);
    try {
      await togglePostcardLike({ postcardId, clientId });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save like.");
    } finally {
      setLikingPostcardId(null);
    }
  }

  return (
    <>
      <Seo
        title="Postcards — Ashvin Praveen"
        description="Leave a public postcard for Ashvin Praveen. Write a note, draw something small, and see it appear on the site."
        path="/postcard"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Postcards — Ashvin Praveen",
          url: "https://ashvinpraveen.com/postcard",
          description:
            "Leave a public postcard for Ashvin Praveen. Write a note, draw something small, and see it appear on the site.",
        }}
      />
      <SiteNav />
      <main className={`${pageShellClassName} pb-28 pt-24`}>
        <div className={contentColumnClassName}>
          <section className="space-y-12">
            <div className="max-w-2xl space-y-3">
              <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Drop a thought
              </h1>
              <p className="text-base leading-relaxed text-muted-foreground">
                What's something you learned today? Or something random you're thinking about? Share a thought, a story, or a tiny drawing. I read and reply to everything.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="relative overflow-hidden rounded-[12px] border border-border bg-card"
            >
              <div className="grid md:grid-cols-[0.95fr_1.05fr]">
                <div className="border-b border-dashed border-border p-4 md:border-b-0 md:border-r md:p-6">
                  <DrawingPad
                    hasDrawing={hasDrawing}
                    onHasDrawingChange={setHasDrawing}
                    resetKey={resetKey}
                  />
                </div>

                <div className="relative flex min-h-[28rem] flex-col p-4 md:p-6">
                  <label htmlFor="postcard-message" className="sr-only">
                    Message
                  </label>
                  <Textarea
                    id="postcard-message"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    maxLength={MAX_MESSAGE_LENGTH}
                    placeholder="Write something..."
                    className="min-h-56 flex-1 resize-none border-0 bg-transparent px-0 py-0 text-lg leading-8 shadow-none ring-offset-0 placeholder:text-muted-foreground/60 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />

                  <div className="mt-8 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="border-b border-border pb-2">
                        <label htmlFor="postcard-name" className="sr-only">
                          Name
                        </label>
                        <input
                          id="postcard-name"
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                          maxLength={40}
                          placeholder="Name"
                          className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                        />
                      </div>
                      <div className="border-b border-border pb-2">
                        <label htmlFor="postcard-location" className="sr-only">
                          Location
                        </label>
                        <input
                          id="postcard-location"
                          value={location}
                          onChange={(event) => setLocation(event.target.value)}
                          maxLength={60}
                          placeholder="Location"
                          className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-border pt-4">
                      <p className="font-mono text-[10px] text-muted-foreground">
                        {message.length}/{MAX_MESSAGE_LENGTH}
                      </p>
                      <Button type="submit" disabled={isSubmitting} className="rounded-[8px] font-mono text-xs">
                        {isSubmitting ? "Sharing..." : "Share →"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            <DrawingField postcards={postcards} />

            <section className="space-y-6 border-t border-border pt-12">
              <div className="max-w-2xl space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  Wall
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Thoughts, lessons, stories, and little sketches from people passing through. Heart the ones you like; the wall floats them higher.
                </p>
              </div>

              {postcards && postcards.length === 0 && (
                <div className="rounded-[12px] border border-dashed border-border p-8 text-sm text-muted-foreground">
                  The wall is quiet. Be first.
                </div>
              )}

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {postcards?.map((postcard) => (
                  <article
                    key={postcard._id}
                    className="flex min-h-64 flex-col justify-between rounded-[12px] border border-border bg-card p-4"
                  >
                    <div className="space-y-4">
                      {postcard.drawingDataUrl && (
                        <div className="h-36 w-full rounded-[12px] border border-border bg-background p-2 dark:bg-muted">
                          <img
                            src={postcard.drawingDataUrl}
                            alt=""
                            className="h-full w-full object-contain dark:invert"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <p className="whitespace-pre-wrap text-base leading-relaxed text-foreground/95">
                        {postcard.message}
                      </p>
                    </div>
                    {postcard.reply && (
                      <div className="mt-5 rounded-[8px] border border-border bg-background/70 p-4 dark:bg-muted/70">
                        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-primary">
                          Ashvin replied
                        </p>
                        <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
                          {postcard.reply}
                        </p>
                      </div>
                    )}
                    <footer className="mt-6 flex items-end justify-between gap-4 border-t border-dashed border-border pt-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {postcard.name || "Anonymous"}
                        </p>
                        {postcard.location && (
                          <p className="font-mono text-[10px] text-muted-foreground">
                            {postcard.location}
                          </p>
                        )}
                      </div>
                      <time className="font-mono text-[10px] text-muted-foreground">
                        {formatPostcardDate(postcard.createdAt)}
                      </time>
                    </footer>
                    <button
                      type="button"
                      onClick={() => handleLike(postcard._id)}
                      disabled={likingPostcardId === postcard._id}
                      aria-pressed={postcard.isLiked}
                      className={cn(
                        "mt-5 flex w-fit items-center gap-2 rounded-full border border-border px-3 py-1.5 font-mono text-[10px] transition-colors",
                        postcard.isLiked
                          ? "border-primary/70 bg-primary/10 text-primary"
                          : "text-muted-foreground hover:border-primary/50 hover:text-foreground",
                      )}
                    >
                      <Heart
                        className={cn("h-3.5 w-3.5", postcard.isLiked && "fill-current")}
                        aria-hidden="true"
                      />
                      <span>{postcard.likeCount ?? 0}</span>
                    </button>
                  </article>
                ))}
              </div>
            </section>
          </section>

          <Footer />
        </div>
      </main>
    </>
  );
};

export default Postcard;
