# officeeditor.dev

Static site for the `officeeditor.dev` domain — hosts the OfficeEditor
JSON Schemas so their `$id` references resolve, plus a minimal landing page.

## Layout

```text
officeeditor.dev/
├── public/
│   ├── index.html                  # placeholder landing page
│   └── schemas/
│       └── deck-2.0.json           # PPTX generation vocabulary schema
```

## Deployment (Cloudflare Pages)

1. Push this repo to GitHub (e.g. `MaximeLeBesnerais/officeeditor.dev`).
2. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → *Connect to Git*.
3. Select the repo, **Framework preset: None**, **Build output directory: `public`**.
4. **Custom domain:** add `officeeditor.dev` (and `www` redirect if wanted).
5. Deploy — the schema resolves at `https://officeeditor.dev/schemas/deck-2.0.json`.

The schema `$id` in `PptxEditor.Core/Generation/Schema/deck.schema.json` is
`https://officeeditor.dev/schemas/deck-2.0.json`, which matches this path.

## Keeping the schema in sync

The source of truth is `decks/…/deck.schema.json` in the
[OfficeEditor](https://github.com/MaximeLeBesnerais/OfficeEditor) repo
(`PptxEditor.Core/Generation/Schema/deck.schema.json`). When the vocabulary
changes, copy the updated file here (or add a GitHub Action later that
pulls it on release tags).
