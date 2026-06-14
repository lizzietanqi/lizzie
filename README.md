# Ashvin's Personal Website

A minimal personal website for builders who want their writing, projects, and story in one place.

This site is built with React, Vite, Tailwind, shadcn/ui, Convex, and [Cleve](https://cleve.ai). The interesting part is the writing system: blog posts are not stored in this repo. They are published from a public Cleve profile and pulled into the website automatically through a small Convex HTTP proxy.

That means you can use this as a personal website template where:

- your homepage is edited in code
- your blog is powered by Cleve
- new public Cleve notes show up without redeploying
- the whole thing can run on free tiers

## Demo Shape

The site includes:

- Hero with profile links
- Work and projects
- Expandable About section
- Writing section powered by Cleve
- Activity heatmap for recent writing habits
- `/blog` writing index
- `/blog/:id` individual post pages
- A side panel preview when clicking writing activity cells

## Tech Stack

| Layer | Tool |
| --- | --- |
| App | React 18 + Vite |
| Styling | Tailwind CSS + shadcn/ui |
| Routing | React Router |
| Data fetching | TanStack Query |
| Backend proxy | Convex HTTP actions |
| Writing source | Cleve public profile |
| Analytics | Vercel Analytics |
| Hosting | Vercel |

## Quickstart

```bash
git clone https://github.com/ashvinpraveen/ashvinpersonalwebsite.git
cd ashvinpersonalwebsite
npm install
npm run dev
```

Open:

```text
http://localhost:8080
```

The frontend will load, but the Writing section needs Convex environment variables before it can fetch Cleve notes.

## Environment Variables

Create `.env.local` in the project root:

```bash
VITE_CONVEX_URL=your_convex_cloud_url
VITE_CONVEX_SITE_URL=your_convex_site_url
```

Do not commit `.env.local`.

`VITE_CONVEX_URL` is the normal Convex deployment URL.

`VITE_CONVEX_SITE_URL` is the Convex HTTP Actions URL. It usually looks like:

```text
https://your-deployment.convex.site
```

The frontend calls:

```text
${VITE_CONVEX_SITE_URL}/cleve-proxy?resource=notes
${VITE_CONVEX_SITE_URL}/cleve-proxy?resource=note&id=<note_id>
```

## Set Up Convex

This project uses Convex only as a public proxy for Cleve writing. It does not store private user data.

Start Convex locally:

```bash
npx convex dev
```

The Convex function is in:

```text
convex/http.ts
```

It exposes:

```text
GET /cleve-proxy?resource=notes
GET /cleve-proxy?resource=note&id=<note_id>
```

By default, the proxy reads from Ashvin's public Cleve profile:

```text
https://app.cleve.ai/user/ashvinpraveen
```

To use your own Cleve profile, set this Convex environment variable:

```bash
npx convex env set CLEVE_PUBLIC_PROFILE_SLUG your_cleve_username
```

For example, if your public Cleve profile is:

```text
https://app.cleve.ai/user/janedoe
```

set:

```bash
npx convex env set CLEVE_PUBLIC_PROFILE_SLUG janedoe
```

Then publish your Convex functions:

```bash
npx convex dev --once
```

## How Cleve Powers The Blog

Cleve is the writing source of truth.

The flow is:

```text
Public Cleve profile
  -> Convex HTTP action at /cleve-proxy
  -> src/lib/cleve.ts
  -> WritingSection, ActivityMap, /blog, /blog/:id
```

When you publish notes on your public Cleve profile:

1. The homepage Writing section updates.
2. The `/blog` page updates.
3. The activity map updates.
4. Individual posts are available at `/blog/:id`.

You do not need to edit markdown files or redeploy the site for new writing.

## Make This Your Own

The fastest way to use this template is:

1. Fork the repo.
2. Create your own Convex deployment.
3. Point `CLEVE_PUBLIC_PROFILE_SLUG` at your Cleve username.
4. Replace the homepage content with your own story.
5. Deploy to Vercel.

### 1. Fork Or Clone

Click **Use this template** or fork the repo on GitHub.

Or clone manually:

```bash
git clone https://github.com/ashvinpraveen/ashvinpersonalwebsite.git my-personal-site
cd my-personal-site
npm install
```

### 2. Create Your Cleve Writing Profile

Create a free Cleve account:

```text
https://cleve.ai
```

Write notes in Cleve and publish the ones you want to show on your site.

Your public writing profile should look like:

```text
https://app.cleve.ai/user/your_username
```

Use `your_username` as `CLEVE_PUBLIC_PROFILE_SLUG` in Convex.

### 3. Customize The Homepage

Most of the personal content lives in small React components:

| Section | File |
| --- | --- |
| Navigation | `src/components/SiteNav.tsx` |
| Hero | `src/components/HeroSection.tsx` |
| Work | `src/components/WorkSection.tsx` |
| Involvement | `src/components/InvolvementSection.tsx` |
| About | `src/components/AboutSection.tsx` |
| Writing preview | `src/components/WritingSection.tsx` |
| Interests | `src/components/InterestsSection.tsx` |
| Resources | `src/components/ResourcesSection.tsx` |
| Contact | `src/components/ContactSection.tsx` |
| Footer | `src/components/Footer.tsx` |

Shared layout primitives live in:

```text
src/lib/layout.ts
src/components/SectionBlock.tsx
```

The Cleve writing client lives in:

```text
src/lib/cleve.ts
```

### 4. Replace Images And Links

Add your images to:

```text
public/
```

Then update references in:

```text
src/components/HeroSection.tsx
```

Also update:

- social profile links
- work/project links
- contact email
- Cal.com link, if you use one
- resources you want to recommend

### 5. Run Locally

In one terminal:

```bash
npm run dev
```

In another terminal:

```bash
npx convex dev
```

Open:

```text
http://localhost:8080
```

## Deploy For Free

You can run this on free tiers:

- Cleve for public writing
- Convex for the HTTP proxy
- Vercel for hosting

### Deploy Convex

Make sure your Cleve username is set:

```bash
npx convex env set CLEVE_PUBLIC_PROFILE_SLUG your_cleve_username
```

Deploy Convex:

```bash
npx convex deploy
```

Copy your Convex URLs into your production environment variables:

```bash
VITE_CONVEX_URL=your_convex_cloud_url
VITE_CONVEX_SITE_URL=your_convex_site_url
```

### Deploy Vercel

Import the GitHub repo into [Vercel](https://vercel.com).

Use the default Vite settings:

```text
Build command: npm run build
Output directory: dist
```

Add these Vercel environment variables:

```bash
VITE_CONVEX_URL=your_convex_cloud_url
VITE_CONVEX_SITE_URL=your_convex_site_url
```

Deploy.

## How The Writing UI Works

### Homepage

`src/components/WritingSection.tsx` fetches public Cleve notes and shows:

- activity heatmap
- three latest posts
- links to all writing and LinkedIn

### Blog Index

`src/pages/Blog.tsx` fetches the same public notes and renders all posts at:

```text
/blog
```

### Blog Post

`src/pages/BlogPost.tsx` fetches one note by ID and renders it at:

```text
/blog/:id
```

### Activity Map

`src/components/ActivityMap.tsx` groups posts by publish date and renders a year-long writing heatmap.

On small screens, the chart starts scrolled to the recent end so the focus is on current habit building. You can still scroll backward to older months.

Hovering a filled cell previews the post. Clicking opens the post in a side panel.

## Commands

```bash
npm run dev        # start local Vite dev server
npm run build      # production build
npm run lint       # lint project
npm run test       # run tests
npx convex dev     # run Convex locally
npx convex deploy  # deploy Convex functions
```

## Troubleshooting

### Writing section says it cannot load posts

Check that `.env.local` includes:

```bash
VITE_CONVEX_URL=...
VITE_CONVEX_SITE_URL=...
```

Then check your Convex HTTP action:

```text
https://your-deployment.convex.site/cleve-proxy?resource=notes
```

It should return JSON with a `data` array.

### It still shows Ashvin's posts

Set your own Cleve profile slug in Convex:

```bash
npx convex env set CLEVE_PUBLIC_PROFILE_SLUG your_cleve_username
```

Then redeploy or restart Convex:

```bash
npx convex dev --once
```

### My Cleve posts do not show up

Make sure the notes are published to your public Cleve profile. Private notes will not appear.

### The frontend works but `/cleve-proxy` does not

Run:

```bash
npx convex dev
```

or deploy your Convex functions:

```bash
npx convex deploy
```

### Vercel deploy works but writing is broken

Make sure Vercel has:

```bash
VITE_CONVEX_URL
VITE_CONVEX_SITE_URL
```

And make sure Convex has:

```bash
CLEVE_PUBLIC_PROFILE_SLUG
```

## Project Structure

```text
convex/
  http.ts                    # Cleve public notes proxy

src/
  components/
    ActivityMap.tsx           # writing heatmap + post side panel
    HeroSection.tsx
    AboutSection.tsx
    WritingSection.tsx
    ...
  lib/
    cleve.ts                  # frontend client for /cleve-proxy
    layout.ts                 # shared width/layout classes
  pages/
    Blog.tsx
    BlogPost.tsx
    Index.tsx
```

## Philosophy

Most personal websites go stale because publishing requires too much ceremony.

This setup keeps the stable parts in code and the living parts in Cleve:

- code owns layout and identity
- Cleve owns thinking and writing
- Convex safely connects them

Write in Cleve. Publish when ready. Your website becomes a public record of what you are learning and building.

## Credits

Built by [Ashvin Praveen](https://ashvinpraveen.com), co-founder and CEO of [Cleve](https://cleve.ai).

Use it, remix it, and make it yours.
