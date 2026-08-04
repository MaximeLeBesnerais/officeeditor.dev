# officeeditor.dev

Landing page for the `officeeditor.dev` domain. Introduces OfficeEditor
(one JSON in, real Office files out: DOCX/PPTX/XLSX generation & rendering)
and hosts the OfficeEditor JSON Schemas so their `$id` references resolve.

## Stack

Vite 7 + React 19 + TypeScript + Tailwind CSS v4 (`@tailwindcss/vite`),
with [Shiki](https://shiki.style) for syntax highlighting and self-hosted
Inter / JetBrains Mono via [fontsource](https://fontsource.org). Built with
[bun](https://bun.sh) (`npm` works too).

## Layout

```text
officeeditor.dev/
├── index.html                      # Vite entry
├── src/                            # App.tsx, components/, lib/
├── public/                         # static assets, copied verbatim to dist/
│   ├── schemas/
│   │   └── deck-2.0.json           # PPTX generation vocabulary schema
│   ├── assets/slides/*.webp        # demo deck renders
│   └── favicon.svg
├── scripts/
│   └── verify-schema.mjs           # post-build schema checksum guard
└── dist/                           # build output (gitignored)
```

The slide images in `public/assets/slides/` are real renders produced by
OfficeEditor itself (demo deck → PPTX → PNG via TypstBridge, converted to WebP).

## Commands

```bash
bun install        # install dependencies
bun run dev        # dev server
bun run build      # tsc -b + vite build + schema verification
bun run preview    # preview the production build
```

`bun run build` ends with `scripts/verify-schema.mjs`, which sha256-compares
`dist/schemas/deck-2.0.json` against `public/schemas/deck-2.0.json` and
**fails the build** if the file is missing or different.

## Deployment (Cloudflare Pages)

1. Push this repo to GitHub (e.g. `MaximeLeBesnerais/officeeditor.dev`).
2. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → *Connect to Git*.
3. Select the repo, **Framework preset: Vite**, **Build command: `bun run build`**,
   **Build output directory: `dist`**.
4. **Custom domain:** add `officeeditor.dev` (and `www` redirect if wanted).
5. Deploy. The schema resolves at `https://officeeditor.dev/schemas/deck-2.0.json`
   because `public/` is copied verbatim into `dist/`.

If Pages doesn't auto-detect bun, set the `BUN_VERSION` environment variable
or switch the build command to `npm run build`.

The schema `$id` in `PptxEditor.Core/Generation/Schema/deck.schema.json` is
`https://officeeditor.dev/schemas/deck-2.0.json`, which matches this path.

## Keeping the schema in sync

The source of truth is `decks/…/deck.schema.json` in the
[OfficeEditor](https://github.com/MaximeLeBesnerais/OfficeEditor) repo
(`PptxEditor.Core/Generation/Schema/deck.schema.json`). When the vocabulary
changes, copy the updated file here (or add a GitHub Action later that
pulls it on release tags). The post-build checksum guard in
`scripts/verify-schema.mjs` is an extra safety net ensuring the deployed
schema always matches the committed one.
