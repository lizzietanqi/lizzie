const PROXY_BASE = `${import.meta.env.VITE_CONVEX_SITE_URL}/cleve-proxy`;

export interface CleveNote {
  id: string;
  title: string;
  content?: string;
  createdAt: number | null;
  updatedAt?: number | null;
}

function cleveProxyUrl(params: Record<string, string>) {
  if (!import.meta.env.VITE_CONVEX_SITE_URL) {
    throw new Error("VITE_CONVEX_SITE_URL is not configured");
  }

  const url = new URL(PROXY_BASE);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  return url.toString();
}

async function cleveRequest<T>(params: Record<string, string>): Promise<T> {
  const res = await fetch(cleveProxyUrl(params));
  const payload = await res.json().catch(() => null);

  if (!res.ok) {
    const message =
      payload && typeof payload === "object" && "error" in payload
        ? String((payload as { error: unknown }).error)
        : `Cleve proxy error: ${res.status}`;
    throw new Error(message);
  }

  if (payload && typeof payload === "object" && "data" in payload) {
    return (payload as { data: T }).data;
  }

  return payload as T;
}

export async function fetchNotes(): Promise<CleveNote[]> {
  return cleveRequest<CleveNote[]>({ resource: "notes" });
}

export async function fetchNote(id: string): Promise<CleveNote> {
  return cleveRequest<CleveNote>({ resource: "note", id });
}
