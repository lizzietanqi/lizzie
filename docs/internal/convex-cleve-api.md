# Convex and Cleve Public Notes Setup

Last updated: 2026-06-16

## Current Convex Dev Deployment

This repo is configured to use a dedicated Convex dev project for the personal website.

Local `.env.local` contains:

```bash
CONVEX_DEPLOYMENT=dev:your-deployment # team: your-team, project: ashvinpersonalwebsite
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
NEXT_PUBLIC_CONVEX_SITE_URL=https://your-deployment.convex.site
```

`.env.local` is gitignored. Do not commit it.

## Published Notes Source

The public profile page at:

```text
https://app.cleve.ai/user/ashvinpraveen
```

loads published notes from Cleve's public Convex deployment:

```text
https://earnest-chicken-856.convex.cloud
```

The profile list query is:

```text
notes/api/publishing:getPublishedNotes
```

with:

```json
{ "slug": "ashvinpraveen" }
```

The note detail query is:

```text
notes/api/publishing:getPublishedNote
```

with:

```json
{ "slug": "ashvinpraveen", "noteId": "<note_id>" }
```

These are the same public queries used by Cleve's own profile UI, so the personal website no longer needs a private `CLEVE_API_KEY`, a folder ID, or an allowlist to show already-published notes.

## Personal Site Proxy

The personal site uses a Convex HTTP action at `/cleve-proxy`.

It exposes:

```text
GET /cleve-proxy?resource=notes
GET /cleve-proxy?resource=note&id=<note_id>
```

The proxy normalizes Cleve fields into:

```ts
{
  id: string;
  title: string;
  content?: string;
  createdAt: number | null;
  updatedAt?: number | null;
}
```

By default it uses the `ashvinpraveen` public profile. To point a fork at another Cleve profile, set this Convex env var:

```bash
CLEVE_PUBLIC_PROFILE_SLUG=your_cleve_username
```

## Useful Commands

Push Convex functions to the configured dev deployment:

```bash
npx convex dev --once --typecheck enable
```

Verify the deployed proxy:

```bash
node - <<'NODE'
const site = "https://acrobatic-perch-899.eu-west-1.convex.site";
const res = await fetch(`${site}/cleve-proxy?resource=notes`);
const json = await res.json();
console.log(JSON.stringify({ ok: res.ok, status: res.status, count: json.data?.length, first: json.data?.[0] }, null, 2));
NODE
```

Expected result as of this update: `count` is `27`, with the first note titled `The Cognitive Divide: Human Behavior vs. Large Language Models`.
