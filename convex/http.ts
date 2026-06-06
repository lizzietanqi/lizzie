import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";

const http = httpRouter();

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

type CleveNote = {
  _id?: unknown;
  title?: unknown;
  content?: unknown;
  publishedAt?: unknown;
  updatedAt?: unknown;
  snapshot?: {
    content?: unknown;
  };
};

type SiteNote = {
  id: string;
  title: string;
  content: string;
  createdAt: number | null;
  updatedAt: number | null;
};

const CLEVE_CONVEX_URL = "https://earnest-chicken-856.convex.cloud";
const CLEVE_PUBLIC_PROFILE_SLUG = process.env.CLEVE_PUBLIC_PROFILE_SLUG ?? "ashvinpraveen";

const jsonResponse = (body: unknown, init?: ResponseInit) => {
  const headers = new Headers(init?.headers);
  Object.entries(corsHeaders).forEach(([key, value]) => headers.set(key, value));
  headers.set("Content-Type", "application/json");

  return new Response(JSON.stringify(body), {
    ...init,
    headers,
  });
};

const unwrapData = (payload: unknown): unknown => {
  if (payload && typeof payload === "object" && "data" in payload) {
    return (payload as { data: unknown }).data;
  }
  return payload;
};

const parseList = <T,>(payload: unknown): T[] => {
  const data = unwrapData(payload);
  return Array.isArray(data) ? (data as T[]) : [];
};

const parseTimestamp = (value: unknown): number | null => {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = Date.parse(value);
    return Number.isNaN(parsed) ? null : parsed;
  }
  return null;
};

const normalizeNote = (note: CleveNote): SiteNote | null => {
  const id = typeof note._id === "string" ? note._id : null;
  if (!id) return null;

  return {
    id,
    title: typeof note.title === "string" ? note.title : "Untitled",
    content: typeof note.content === "string" ? note.content : "",
    createdAt: parseTimestamp(note.publishedAt),
    updatedAt: parseTimestamp(note.updatedAt),
  };
};

const cleveQuery = async <T,>(path: string, args: Record<string, unknown>): Promise<T> => {
  const res = await fetch(`${CLEVE_CONVEX_URL}/api/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Convex-Client": "npm-1.34.0",
    },
    body: JSON.stringify({
      path,
      format: "convex_encoded_json",
      args: [args],
    }),
  });

  const payload = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(`Cleve published notes query failed: ${res.status}`);
  }

  if (!payload || typeof payload !== "object" || !("status" in payload)) {
    throw new Error("Invalid Cleve published notes response.");
  }

  if ((payload as { status: unknown }).status !== "success") {
    throw new Error("Cleve published notes query returned an error.");
  }

  return (payload as { value: T }).value;
};

const listPublicNotes = async () => {
  const notesPayload = await cleveQuery<CleveNote[]>("notes/api/publishing:getPublishedNotes", {
    slug: CLEVE_PUBLIC_PROFILE_SLUG,
  });

  const notes = parseList<CleveNote>(notesPayload)
    .map(normalizeNote)
    .filter((note): note is SiteNote => note !== null)
    .sort((a, b) => (b.createdAt ?? b.updatedAt ?? 0) - (a.createdAt ?? a.updatedAt ?? 0));

  return notes;
};

const getPublicNote = async (noteId: string) => {
  const note = await cleveQuery<CleveNote | null>("notes/api/publishing:getPublishedNote", {
    slug: CLEVE_PUBLIC_PROFILE_SLUG,
    noteId,
  });

  return note ? normalizeNote(note) : null;
};

http.route({
  path: "/cleve-proxy",
  method: "OPTIONS",
  handler: httpAction(async () => new Response(null, { headers: corsHeaders })),
});

http.route({
  path: "/cleve-proxy",
  method: "GET",
  handler: httpAction(async (_, req) => {
    const url = new URL(req.url);
    const resource = url.searchParams.get("resource") ?? "notes";

    try {
      if (resource === "notes") {
        const notes = await listPublicNotes();
        return jsonResponse({ data: notes.map(({ content, ...note }) => note) });
      }

      if (resource === "note") {
        const noteId = url.searchParams.get("id");
        if (!noteId) return jsonResponse({ error: "Missing note id" }, { status: 400 });
        const note = await getPublicNote(noteId);
        if (!note) return jsonResponse({ error: "Note not found" }, { status: 404 });
        return jsonResponse({ data: note });
      }

      return jsonResponse({ error: "Unsupported Cleve proxy resource" }, { status: 400 });
    } catch (error) {
      return jsonResponse(
        { error: error instanceof Error ? error.message : "Cleve proxy error" },
        { status: 500 },
      );
    }
  }),
});

export default http;
