import type { MouseEvent, ReactNode } from "react";
import { CodeBlock } from "../components/CodeBlock";
import { CommandLine } from "../components/CommandLine";
import { DocsSection } from "../components/DocsSection";
import { DocsTable } from "../components/DocsTable";
import { useT } from "../lib/i18n";

/* ────────────────────────────────────────────────────────────────────────────
 * Code samples. Not translated — they live here like the landing snippets.
 * Every payload below is validated against the current engine vocabulary.
 * ────────────────────────────────────────────────────────────────────────── */

const DECK_MINIMAL = `{
  "version": "2.0",
  "slideSize": "16:9",
  "design": {
    "palette": { "ink": "#1F2937", "accent": "#F5A524", "paper": "#FFFFFF" }
  },
  "slides": [
    {
      "type": "container",
      "layout": { "mode": "column", "justify": "center", "align": "center" },
      "children": [
        { "type": "text", "text": "Hello, deck.", "fontSize": 48, "color": "ink" }
      ]
    }
  ]
}`;

const SLIDE_LAYOUTS = `{
  "type": "container",
  "layout": { "mode": "row", "gap": 18, "justify": "space-between", "align": "center" },
  "padding": [43, 43, 43, 43],
  "children": [
    { "type": "text", "text": "Left slot", "size": { "w": 200 } },
    { "type": "text", "text": "Right slot", "size": { "w": 200 } }
  ]
}`;

const FREE_CANVAS = `{
  "type": "container",
  "children": [
    {
      "type": "rect",
      "fill": "accent",
      "at": { "x": 40, "y": 60 },
      "size": { "w": 120, "h": 80 }
    },
    {
      "type": "text",
      "text": "Absolutely placed",
      "at": { "x": 40, "y": 160 },
      "size": { "w": 300 }
    }
  ]
}`;

const KPI_ROW = `{
  "type": "kpi_row",
  "content": {
    "title": "Q4 traction",
    "kpis": [
      { "value": "€18.4M", "label": "ARR", "delta": "+42%" },
      { "value": "1,284",  "label": "Sites live" },
      { "value": "4.1%",   "label": "Logo churn" }
    ]
  },
  "notes": "Lead with ARR growth; the churn drop is the quieter win."
}`;

const NOTES_EXAMPLE = `{
  "type": "container",
  "layout": { "mode": "column", "gap": 12 },
  "children": [
    { "type": "title_block", "content": { "kicker": "Q3", "title": "Traction" } }
  ],
  "notes": "ARR is up 42%. Push the logo-churn drop, keep the growth story short."
}`;

const IMAGE_EXAMPLE = `{
  "type": "image",
  "src": "assets/team-photo.png",
  "fit": "crop",
  "crop": { "left": 10000, "top": 0, "right": 10000, "bottom": 0 },
  "alt": "The founding team at the Berlin offsite",
  "size": { "w": 320, "h": 240 }
}`;

const DOCX_EXAMPLE = `{
  "version": "1.0",
  "design": { "theme": "corporate" },
  "sections": [
    {
      "blocks": [
        { "type": "heading", "level": 1, "text": "Quarterly Report" },
        { "type": "paragraph", "text": "Prepared by {{author}} on {{date}}." },
        {
          "type": "table",
          "rows": [
            { "header": true, "cells": ["Metric", "Value"] },
            { "cells": ["ARR", "€18.4M"] }
          ]
        }
      ]
    }
  ]
}`;

const XLSX_EXAMPLE = `{
  "version": "1.0",
  "styles": [
    {
      "name": "header",
      "font": { "bold": true, "color": "FFFFFF" },
      "fill": { "color": "4472C4", "pattern": "solid" }
    },
    { "name": "money", "numberFormat": "$#,##0.00" }
  ],
  "worksheets": [
    {
      "name": "Summary",
      "headerStyle": "header",
      "columns": [
        { "name": "Region", "width": 16, "type": "string" },
        { "name": "Revenue", "width": 14, "type": "number", "style": "money" }
      ],
      "rows": [
        ["North America", "1250000"],
        ["Europe", "980000"]
      ]
    }
  ]
}`;

const CLI_EXAMPLE = `# run from source, or install the dotnet tool
dotnet tool install -g MaximeLB.OfficeEditor.Cli

# one JSON, three formats — the output extension picks the vocabulary
officeeditor generate deck.json --output deck.pptx          # PPTX vocabulary 2.0
officeeditor generate report.json --output report.docx --theme corporate
officeeditor generate workbook.json --output workbook.xlsx

# render an XLSX instruction set through Typst (PDF = one file, PNG = a folder of page-NNN.png)
officeeditor generate workbook.json --output workbook.pdf
officeeditor generate workbook.json --output workbook.png

# variables: detect, then merge (all three formats)
officeeditor detect template.docx
officeeditor merge template.pptx data.json output.pptx

# quick blank documents (format from the extension)
officeeditor create memo.docx --text "Hello World"
officeeditor create deck.pptx --title "My Presentation"
officeeditor create book.xlsx --sheet "Sales"`;

const MCP_EXAMPLE = `{
  "mcpServers": {
    "officeeditor": {
      "command": "dotnet",
      "args": ["run", "--project", "/path/to/DocxEditor/OfficeEditor.Mcp"]
    }
  }
}`;

/* ────────────────────────────────────────────────────────────────────────────
 * Small building blocks for docs prose (chrome stays on the site palette).
 * ────────────────────────────────────────────────────────────────────────── */

function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-ink-800 px-1.5 py-0.5 font-mono text-[12px] text-amber-300/90">
      {children}
    </code>
  );
}

function H3({ children }: { children: ReactNode }) {
  return <h3 className="pt-2 text-lg font-semibold tracking-tight text-paper">{children}</h3>;
}

function P({ children }: { children: ReactNode }) {
  return <p className="text-sm leading-relaxed text-mute">{children}</p>;
}

function UL({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2 text-sm leading-relaxed text-mute">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5">
          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-amber-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Note({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="rounded-md border border-amber-500/30 bg-amber-500/[0.06] px-4 py-3 text-[13px] leading-relaxed text-mute">
      {title && (
        <span className="mr-2 font-mono text-xs font-semibold tracking-wide text-amber-400 uppercase">
          {title}
        </span>
      )}
      {children}
    </div>
  );
}

function DLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="font-mono text-amber-400 transition-colors hover:text-amber-300">
      {children}
    </a>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * The docs page.
 * ────────────────────────────────────────────────────────────────────────── */

const TOC: { id: string; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "deck-structure", label: "The deck document" },
  { id: "design-tokens", label: "Design tokens" },
  { id: "elements", label: "Elements & layout" },
  { id: "components", label: "Components" },
  { id: "archetypes", label: "Archetypes" },
  { id: "speaker-notes", label: "Speaker notes" },
  { id: "images", label: "Images" },
  { id: "docx", label: "DOCX generation" },
  { id: "xlsx", label: "XLSX generation" },
  { id: "entry-points", label: "Entry points" },
  { id: "schema", label: "Schema reference" },
];

const SHARED_SIZE_ROWS = [
  ["w / h", "Fixed width / height in pt. Any child of a container."],
  ["grow", "Share of remaining space on the layout axis, after fixed children."],
  ["aspect", "\"W:H\" aspect ratio string (e.g. \"16:9\"); resolves against the constrained axis."],
  ["alignSelf", "start | center | end | stretch — overrides the parent's align for this child."],
];

export default function DocsPage() {
  const t = useT();

  const scrollTo = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-6 pt-10 pb-24">
      {/* Docs hero */}
      <div className="max-w-3xl">
        <p className="mb-4 font-mono text-xs tracking-[0.25em] text-amber-500 uppercase">
          {`// ${t.nav.docs}`}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
          Feature usage guide
        </h1>
        <p className="mt-4 text-base leading-relaxed text-mute">
          How to use OfficeEditor: the generation JSON vocabulary for PPTX, DOCX and XLSX,
          speaker notes, images, and every entry point. Everything below is verified against
          the current engine — where a feature has limits, they are called out plainly.
        </p>
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[210px_1fr]">
        {/* Table of contents */}
        <aside className="hidden lg:block">
          <nav className="sticky top-24 space-y-1">
            <p className="mb-3 font-mono text-xs tracking-widest text-faint uppercase">
              On this page
            </p>
            {TOC.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={scrollTo(item.id)}
                className="block border-l border-ink-700 py-1 pl-3 font-mono text-xs text-mute transition-colors hover:border-amber-500 hover:text-amber-400"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <div className="min-w-0 space-y-20">
          {/* ── Overview ─────────────────────────────────────────────── */}
          <DocsSection
            id="overview"
            eyebrow="overview"
            title="One JSON in, real Office files out"
          >
            <P>
              OfficeEditor is a .NET 9 suite that creates, edits, generates and renders
              DOCX, PPTX and XLSX. Three declarative JSON vocabularies exist today:
            </P>
            <UL
              items={[
                <>
                  <b className="text-paper">PPTX — generation vocabulary 2.0</b> (the focus of this
                  guide): design tokens, a container tree of primitives, prebuilt components and
                  whole-slide archetypes, laid out once in C# and emitted twice (OOXML for the
                  .pptx, Typst for PDF/PNG/SVG previews).
                </>,
                <>
                  <b className="text-paper">DOCX — vocabulary 1.0</b>: sections of flow blocks plus a
                  positioned tier, built-in design themes and semantic report archetypes. Documented
                  in the <Code>docx</Code> section below.
                </>,
                <>
                  <b className="text-paper">XLSX — v1 instruction engine</b>: worksheets, named
                  styles, typed cells, formulas, merges and tables. Documented in the{" "}
                  <Code>xlsx</Code> section below.
                </>,
              ]}
            />
            <P>
              Install the unified CLI, then point <Code>generate</Code> at any of the JSON files
              below:
            </P>
            <CommandLine command="dotnet tool install -g MaximeLB.OfficeEditor.Cli" />
            <Note title="grounding">
              This page mirrors the engine, not a wishlist. The <Code>edit</Code> command is not
              supported today — each limitation is called out where it matters.
            </Note>
          </DocsSection>

          {/* ── The deck document ────────────────────────────────────── */}
          <DocsSection
            id="deck-structure"
            eyebrow="pptx vocabulary 2.0"
            title="The deck document"
            intro="A deck is a single JSON object with four root properties. Validation is strict and loud: unknown properties are rejected at every level, and errors carry a JSON path plus a spelling suggestion."
          >
            <DocsTable
              head={["Root property", "Type", "Required", "Meaning"]}
              rows={[
                [
                  <Code key="v">version</Code>,
                  'const "2.0"',
                  "yes",
                  "Vocabulary version. Only 2.0 is accepted.",
                ],
                [
                  <Code key="ss">slideSize</Code>,
                  <>
                    <Code>"16:9" | "4:3"</Code> or <Code>{"{ width, height }"}</Code>
                  </>,
                  "no (default \"16:9\")",
                  "Slide canvas in pt. Presets: 16:9 = 960×540, 4:3 = 720×540; object form takes explicit width/height in pt (each 1–4032, no extra properties).",
                ],
                [
                  <Code key="d">design</Code>,
                  "object",
                  "yes",
                  "Design tokens — palette, fonts, shape, metrics (next section).",
                ],
                [
                  <Code key="s">slides</Code>,
                  "non-empty array",
                  "yes",
                  "Slide roots. Each slide is a container element; archetype slides are sugar over it.",
                ],
              ]}
            />
            <CodeBlock code={DECK_MINIMAL} lang="json" title="deck.json — minimal deck" />
            <Note title="slide size — presets or explicit points">
              <Code>slideSize</Code> is a oneOf: a preset string — <Code>"16:9"</Code> (default,{" "}
              960×540 pt) or <Code>"4:3"</Code> (720×540 pt) — or an object with explicit{" "}
              <Code>width</Code> and <Code>height</Code> in points, each a finite number from 1 to
              4032, with no extra properties. Any other shape fails validation with a loud
              JSON-path error. Square slides are now a one-liner:{" "}
              <Code>{"{ \"width\": 540, \"height\": 540 }"}</Code>.
            </Note>
            <UL
              items={[
                <>Layout units are points (pt) only — percentages are a v1 non-goal.</>,
                <>No wrapping, no z-index, no CSS input, no Tier-3 rendering.</>,
                <>
                  The schema behind this vocabulary is hosted right here at{" "}
                  <DLink href="/schemas/deck-2.0.json">/schemas/deck-2.0.json</DLink> — its{" "}
                  <Code>$id</Code> resolves, so validators and editors can reference it directly.
                </>,
              ]}
            />
          </DocsSection>

          {/* ── Design tokens ────────────────────────────────────────── */}
          <DocsSection
            id="design-tokens"
            eyebrow="design"
            title="Design tokens"
            intro="The design block names colors, fonts, shape treatment and metrics. Content references colors by token name instead of repeating hex values."
          >
            <DocsTable
              head={["Design key", "Properties"]}
              rows={[
                [
                  <Code key="pal">palette</Code>,
                  <>
                    Required. Token name → <Code>#RRGGBB</Code>. Content may also use a raw hex
                    literal — accepted with a warning (off-token drift).
                  </>,
                ],
                [
                  <Code key="fo">fonts</Code>,
                  <>
                    <Code>display</Code> and <Code>body</Code> family names. A text's{" "}
                    <Code>font</Code> field references either slot or a raw family name.
                  </>,
                ],
                [
                  <Code key="sh">shape</Code>,
                  <>
                    <Code>cornerRadius</Code> (default 0) and <Code>cardStyle</Code> —{" "}
                    <Code>flat</Code> | <Code>outline</Code> | <Code>shadow</Code> (default{" "}
                    <Code>flat</Code>).
                  </>,
                ],
                [
                  <Code key="me">metrics</Code>,
                  <>
                    <Code>marginPt</Code> (43), <Code>gutterPt</Code> (18),{" "}
                    <Code>titleSizePt</Code> (30), <Code>bodySizePt</Code> (14).
                  </>,
                ],
              ]}
            />
            <P>
              Everything derives from the tokens: components and archetypes pick their own fonts,
              colors and paddings from <Code>fonts</Code>, <Code>palette</Code> and{" "}
              <Code>metrics</Code>, so swapping a palette restyles a whole deck.
            </P>
          </DocsSection>

          {/* ── Elements & layout ────────────────────────────────────── */}
          <DocsSection
            id="elements"
            eyebrow="layout"
            title="Elements & layout"
            intro="The slide root is a container. Containers lay out their children; leaf elements (text, shapes, images) carry their own style and size. Layout resolves once in pure C#, then feeds both emitters."
          >
            <H3>Containers</H3>
            <DocsTable
              head={["Layout mode", "Behavior"]}
              rows={[
                [
                  <Code key="r">row</Code>,
                  "Children flow along the horizontal axis; gap (pt) between them.",
                ],
                [
                  <Code key="c">column</Code>,
                  "Children flow along the vertical axis; gap (pt) between them.",
                ],
                [
                  <Code key="g">grid</Code>,
                  "Equal columns; grid-only keys cols, rowGap, columnGap.",
                ],
                [
                  <Code key="fc">(no layout key)</Code>,
                  "Free canvas. Children must be absolutely placed with at + fixed size.",
                ],
              ]}
            />
            <DocsTable
              head={["Layout key", "Values"]}
              rows={[
                [
                  <Code key="mode">mode</Code>,
                  <Code key="m">row | column | grid</Code>,
                ],
                [
                  <Code key="gap">gap</Code>,
                  <Code key="g">number ≥ 0 (pt), default 0</Code>,
                ],
                [
                  <Code key="justify">justify</Code>,
                  <Code key="j">start | center | end | space-between | space-evenly</Code>,
                ],
                [
                  <Code key="align">align</Code>,
                  <Code key="a">start | center | end | stretch</Code>,
                ],
              ]}
            />
            <CodeBlock code={SLIDE_LAYOUTS} lang="json" title="row layout with justify" />
            <CodeBlock code={FREE_CANVAS} lang="json" title="free canvas — absolute placement" />
            <P>
              A container without a <Code>layout</Code> is a free canvas whose children require an{" "}
              <Code>at</Code> placement (<Code>x</Code>, <Code>y</Code> in pt) plus a fixed{" "}
              <Code>size</Code>. <Code>overflow</Code> on a container defaults to{" "}
              <Code>error</Code> (loud failure when children don't fit); text defaults to{" "}
              <Code>shrink</Code>.
            </P>

            <H3>Element types</H3>
            <DocsTable
              head={["type", "Key properties"]}
              rows={[
                [
                  <Code key="t1">container</Code>,
                  "layout, padding, overflow, children; plus fill / stroke / radius / shadow.",
                ],
                [
                  <Code key="t2">text</Code>,
                  'text or runs (run = text + font + fontSize + color + bold + italic), textAlign, anchor, insets, overflow (default shrink), shadow.',
                ],
                [
                  <Code key="t3">rect</Code>,
                  "fill, stroke, radius, shadow.",
                ],
                [
                  <Code key="t4">ellipse</Code>,
                  "fill, stroke, shadow.",
                ],
                [
                  <Code key="t5">line / connector</Code>,
                  "orientation horizontal | vertical (default horizontal), stroke. Straight only in v1.",
                ],
                [
                  <Code key="t6">image</Code>,
                  "src (required), fit, crop, alt — see the Images section.",
                ],
                [
                  <Code key="t7">group</Code>,
                  "children placed with at; paint order = document order.",
                ],
              ]}
            />

            <H3>Shared size & placement</H3>
            <DocsTable head={["Size key", "Meaning"]} rows={SHARED_SIZE_ROWS} />
            <UL
              items={[
                <>
                  <Code>fill</Code> accepts a palette token, a <Code>#RRGGBB</Code> literal, or a
                  linear <Code>gradient</Code> (<Code>angle</Code> + <Code>stops</Code> of{" "}
                  <Code>color</Code>/<Code>offset</Code>/<Code>alpha</Code>). Gradients beyond linear
                  are a non-goal.
                </>,
                <>
                  <Code>stroke</Code> is a color or <Code>{"{ color, width }"}</Code> (default width
                  1). <Code>radius</Code> is a single number or a per-corner object.{" "}
                  <Code>shadow</Code> is <Code>{"{ color, dx, dy, blur, alpha }"}</Code> — native in
                  OOXML, approximated in the Typst preview.
                </>,
              ]}
            />
          </DocsSection>

          {/* ── Components ───────────────────────────────────────────── */}
          <DocsSection
            id="components"
            eyebrow="components"
            title="Components"
            intro="Components are prebuilt C# functions over the primitives — not a second layout system. Each takes a strongly typed content payload and strictly validates it."
          >
            <DocsTable
              head={["Component", "Content payload"]}
              rows={[
                [
                  <Code key="c1">card</Code>,
                  <Code key="c1p">title (required), subtitle, body</Code>,
                ],
                [
                  <Code key="c2">kpi</Code>,
                  <Code key="c2p">value (required), label (required), delta</Code>,
                ],
                [
                  <Code key="c3">title_block</Code>,
                  <Code key="c3p">kicker, title (required), subtitle</Code>,
                ],
                [
                  <Code key="c4">bullet_list</Code>,
                  <Code key="c4p">title, items (required), markerColor</Code>,
                ],
                [
                  <Code key="c5">divider</Code>,
                  <Code key="c5p">color, width, orientation</Code>,
                ],
                [
                  <Code key="c6">badge</Code>,
                  <Code key="c6p">text (required), color, textColor</Code>,
                ],
                [
                  <Code key="c7">image_card</Code>,
                  <Code key="c7p">src (required), title, subtitle, fit (default crop), alt, imageGrow</Code>,
                ],
                [
                  <Code key="c8">table_block</Code>,
                  <Code key="c8p">columns (required), rows (required), header (default true), columnWeights, rowHeight</Code>,
                ],
              ]}
            />
            <Note title="payloads are strict">
              A component's <Code>content</Code> is validated like the schema: unknown properties are
              loud errors with "Did you mean …?" suggestions, percentages are rejected (pt only),
              and colors must be palette tokens or <Code>#RRGGBB</Code>.
            </Note>
          </DocsSection>

          {/* ── Archetypes ───────────────────────────────────────────── */}
          <DocsSection
            id="archetypes"
            eyebrow="archetypes"
            title="Archetypes"
            intro="An archetype is a whole slide written as a single marker. It expands into a composed container tree before layout. Archetypes fill the slide — size and at are not allowed on them, and archetypes never nest."
          >
            <DocsTable
              head={["Archetype", "Content payload"]}
              rows={[
                [
                  <Code key="a1">cover</Code>,
                  <Code key="a1p">title (required), subtitle, kicker</Code>,
                ],
                [
                  <Code key="a2">section</Code>,
                  <Code key="a2p">title (required), index, subtitle, kicker</Code>,
                ],
                [
                  <Code key="a3">kpi_row</Code>,
                  <Code key="a3p">title, subtitle, kpis (1–6 of value + label + delta)</Code>,
                ],
                [
                  <Code key="a4">two_col</Code>,
                  <Code key="a4p">title, subtitle, left + right (each one component), weights</Code>,
                ],
                [
                  <Code key="a5">table_slide</Code>,
                  <Code key="a5p">title, subtitle, columns (required), rows (required), header, columnWeights, rowHeight</Code>,
                ],
              ]}
            />
            <CodeBlock code={KPI_ROW} lang="json" title="kpi_row archetype with notes" />
            <P>
              The <Code>two_col</Code> slots are single components (<Code>card</Code>,{" "}
              <Code>kpi</Code>, <Code>bullet_list</Code>, …), each with its own content payload.
              Relative column widths come from <Code>weights</Code> (two grow weights, default{" "}
              <Code>[1, 1]</Code>).
            </P>
          </DocsSection>

          {/* ── Speaker notes ────────────────────────────────────────── */}
          <DocsSection
            id="speaker-notes"
            eyebrow="notes"
            title="Speaker notes"
            intro="Any slide can carry speaker notes. They are metadata, never visual content."
          >
            <DocsTable
              head={["Property", "Type", "Where"]}
              rows={[
                [
                  <Code key="n">notes</Code>,
                  "string, optional",
                  "On the slide root — a plain container slide or an archetype slide. The parser rejects notes on nested containers.",
                ],
              ]}
            />
            <CodeBlock code={NOTES_EXAMPLE} lang="json" title="notes on a container slide" />
            <UL
              items={[
                <>
                  Notes are emitted into the .pptx as a real notes part (a{" "}
                  <Code>NotesSlidePart</Code>) wired to that slide — open the deck in PowerPoint and
                  they appear in the notes pane.
                </>,
                <>
                  Blank or whitespace-only notes skip the part entirely.
                </>,
                <>
                  Previews never render notes: the Typst emitter deliberately ignores them, so what
                  you preview is exactly what the audience sees.
                </>,
              ]}
            />
          </DocsSection>

          {/* ── Images ───────────────────────────────────────────────── */}
          <DocsSection
            id="images"
            eyebrow="images"
            title="Images"
            intro="Image elements require a src. The accepted forms and their limits are fixed and documented."
          >
            <DocsTable
              head={["src form", "Behavior"]}
              rows={[
                [
                  <Code key="i1">data:&lt;mime&gt;;base64,&lt;payload&gt;</Code>,
                  "Inline base64 data URI. Mimes: image/png, image/jpeg, image/gif, image/bmp, image/tiff, image/svg+xml.",
                ],
                [
                  <Code key="i2">/absolute/path.png</Code>,
                  "Rooted filesystem path, taken as-is (callers passing absolute paths are trusted).",
                ],
                [
                  <Code key="i3">relative/path.png</Code>,
                  "Resolved against the JSON document's directory only — no repo-root or CWD fallback. Supported extensions: .png, .jpg, .jpeg, .gif, .bmp, .tiff, .tif, .svg.",
                ],
                [
                  <Code key="i4">http(s)://…</Code>,
                  <>
                    <b className="text-ember-500">Rejected.</b> The emitter fails with "Remote
                    image URLs are not supported in v1; pass a local file path or a data URI."
                    Generation never fetches network assets.
                  </>,
                ],
              ]}
            />
            <DocsTable
              head={["Image key", "Values"]}
              rows={[
                [
                  <Code key="f">fit</Code>,
                  "fill (default) — cover the box with a computed center crop; crop — honor the crop rect (without one it behaves as fill); contain — letterbox, the box shrinks to preserve aspect.",
                ],
                [
                  <Code key="c">crop</Code>,
                  '{ left, top, right, bottom } in 1/1000ths of a percent (0–100000); only meaningful with fit: "crop".',
                ],
                [
                  <Code key="a">alt</Code>,
                  "Accessibility description, optional.",
                ],
              ]}
            />
            <CodeBlock code={IMAGE_EXAMPLE} lang="json" title="image with a 10% source crop" />
            <Note title="relative src is document-relative">
              A relative <Code>src</Code> resolves against the directory of the JSON document
              itself — there is no repo-root or CWD fallback. Keep image files next to the deck
              you generate (or use an absolute path or data URI). On string-only surfaces (the{" "}
              <Code>deck_generate</Code> MCP tool, <Code>/api/decks/generate</Code>) there is no
              document directory, so a relative path fails with a loud error — pass a data URI or
              an absolute path instead.
            </Note>
          </DocsSection>

          {/* ── DOCX ─────────────────────────────────────────────────── */}
          <DocsSection
            id="docx"
            eyebrow="docx vocabulary 1.0"
            title="DOCX generation"
            intro="The DOCX vocabulary describes a complete document: sections of flow blocks plus a positioned tier, resolved against a built-in design theme. It is separate from the DOCX edit-instruction format."
          >
            <CommandLine command="officeeditor generate report.json --output report.docx --theme corporate" />
            <DocsTable
              head={["Root property", "Required", "Meaning"]}
              rows={[
                [
                  <Code key="d1">version</Code>,
                  "yes",
                  'Must be "1.0".',
                ],
                [
                  <Code key="d2">metadata</Code>,
                  "no",
                  "Core document properties: title, author, subject, keywords, description, language.",
                ],
                [
                  <Code key="d3">design</Code>,
                  "no",
                  "Theme reference (editorial | corporate), palette, fonts, typography, spacing, shapes, layout guardrails, page defaults.",
                ],
                [
                  <Code key="d4">template</Code>,
                  "no",
                  "Local .docx template path; the generator copies it and appends generated sections, never mutating the template or its styles.",
                ],
                [
                  <Code key="d5">sections</Code>,
                  "yes",
                  "Non-empty array: each has pageSetup, header/footer blocks, flow blocks and a positioned array.",
                ],
              ]}
            />
            <DocsTable
              head={["Flow block type", "Behavior"]}
              rows={[
                [
                  <Code key="b1">paragraph</Code>,
                  "text or runs, style, token, alignment, spacing.",
                ],
                [
                  <Code key="b2">heading</Code>,
                  "text or runs, level 1–6 (default 1), style, token, alignment.",
                ],
                [
                  <Code key="b3">list</Code>,
                  "items; kind bullet (default) or ordered, start.",
                ],
                [
                  <Code key="b4">table</Code>,
                  "rectangular rows with cells; header row repeats; no merged cells.",
                ],
                [
                  <Code key="b5">image</Code>,
                  "inline image: src, fit, crop, alt, width, height. HTTP(S) sources are rejected.",
                ],
                [
                  <Code key="b6">callout</Code>,
                  "shaded flow callout; tone note | tip | warning | error.",
                ],
                [
                  <Code key="b7">pageBreak</Code>,
                  "hard page break.",
                ],
                [
                  <Code key="b8">group</Code>,
                  "authoring container flattened into the parent flow.",
                ],
              ]}
            />
            <P>
              The <b className="text-paper">positioned tier</b> adds floating primitives scoped to a
              section — <Code>textBox</Code>, <Code>image</Code>, <Code>rect</Code>,{" "}
              <Code>line</Code>, <Code>callout</Code> — with <Code>x/y</Code>,{" "}
              <Code>width/height</Code>, <Code>rotation</Code>, <Code>zOrder</Code>,{" "}
              <Code>anchor</Code> (page, margin, column, paragraph, character) and <Code>wrap</Code>{" "}
              options.
            </P>
            <P>
              Five <b className="text-paper">semantic report archetypes</b> — <Code>cover</Code>,{" "}
              <Code>kpiRow</Code>, <Code>section</Code>, <Code>comparisonTable</Code>,{" "}
              <Code>roadmap</Code> — expand into the flow blocks above using the theme's semantic
              text roles. The <Code>--theme</Code> flag selects <Code>editorial</Code> (default) or{" "}
              <Code>corporate</Code>, and is valid only for a .docx output.
            </P>
            <CodeBlock code={DOCX_EXAMPLE} lang="json" title="report.json — corporate theme" />
            <UL
              items={[
                <>
                  <b className="text-paper">Variables & merge:</b> <Code>{"{{var}}"}</Code>{" "}
                  placeholders are detected (<Code>officeeditor detect</Code>) and replaced (
                  <Code>officeeditor merge</Code>) across all three formats, with DOCX batch merge.
                </>,
                <>
                  <b className="text-paper">Watch the output path:</b> if you omit{" "}
                  <Code>--output</Code>, the unified command defaults to a .pptx output path — always
                  pass <Code>--output &lt;name&gt;.docx</Code> for DOCX generation.
                </>,
                <>
                  Limitations: single-level lists, rectangular tables only (no cell merging), static
                  default headers/footers (no first/even variants, no page-number fields).
                </>,
              ]}
            />
          </DocsSection>

          {/* ── XLSX ─────────────────────────────────────────────────── */}
          <DocsSection
            id="xlsx"
            eyebrow="xlsx v1 instructions"
            title="XLSX generation"
            intro="The v1 XLSX instruction engine builds a workbook from JSON: worksheets, named styles, typed cells, formulas, merges, freeze panes and tables. The same JSON can be rendered to PDF or PNG through the Typst pipeline."
          >
            <CommandLine command="officeeditor generate workbook.json --output workbook.xlsx" />
            <DocsTable
              head={["Root key", "Meaning"]}
              rows={[
                [
                  <Code key="x1">version</Code>,
                  'Must be "1.0".',
                ],
                [
                  <Code key="x2">description</Code>,
                  "Optional human description of the instruction set.",
                ],
                [
                  <Code key="x3">metadata</Code>,
                  "Workbook core properties: title, subject, author, category, keywords, comments.",
                ],
                [
                  <Code key="x4">styles</Code>,
                  "Named styles: font (bold, color, size), fill (color, pattern), alignment (horizontal, vertical), border, numberFormat.",
                ],
                [
                  <Code key="x5">variables</Code>,
                  "Flat {{var}} → value map resolved into cell text before emission.",
                ],
                [
                  <Code key="x6">worksheets</Code>,
                  "Non-empty array of worksheet objects.",
                ],
              ]}
            />
            <DocsTable
              head={["Worksheet key", "Meaning"]}
              rows={[
                [
                  <Code key="w1">name / startRow / headerStyle</Code>,
                  "Sheet name, first data row (default 2), named style for the header row.",
                ],
                [
                  <Code key="w2">columns</Code>,
                  "name, width, type (string | number | boolean | date | datetime), style.",
                ],
                [
                  <Code key="w3">headers / rows</Code>,
                  "Header labels and body rows; each row one cell value per column.",
                ],
                [
                  <Code key="w4">cells</Code>,
                  "Address-scoped cells: value or formula, type, style, numberFormat. Formulas like =SUM(B3:B6) are written as-is; rendering shows cached values, never evaluated results.",
                ],
                [
                  <Code key="w5">merges / rowHeights</Code>,
                  'e.g. "A1:E1"; per-row height in points.',
                ],
                [
                  <Code key="w6">freezePanes / tables / autoFilter</Code>,
                  "Freeze cell, named table ranges, standalone autofilter.",
                ],
              ]}
            />
            <CodeBlock code={XLSX_EXAMPLE} lang="json" title="workbook.json — two styles, one sheet" />
            <UL
              items={[
                <>
                  Rendering: <Code>--output workbook.pdf</Code> produces a single PDF;{" "}
                  <Code>--output workbook.png</Code> produces a directory of{" "}
                  <Code>page-NNN.png</Code> pages.
                </>,
                <>
                  The Typst render path handles typed cells, styles, layouts and tables — images and
                  row-replication are on the roadmap, not yet shipped.
                </>,
              ]}
            />
          </DocsSection>

          {/* ── Entry points ─────────────────────────────────────────── */}
          <DocsSection
            id="entry-points"
            eyebrow="surfaces"
            title="Entry points"
            intro="The same engine is reachable from a unified CLI, an ASP.NET Core API, an MCP stdio host, and the examples project."
          >
            <H3>CLI</H3>
            <CodeBlock code={CLI_EXAMPLE} lang="bash" title="officeeditor" />
            <DocsTable
              head={["Command", "Purpose"]}
              rows={[
                [
                  <Code key="e1">create &lt;output&gt;</Code>,
                  "Blank document, format from the extension (--text / --title / --sheet).",
                ],
                [
                  <Code key="e2">generate &lt;input.json&gt; [--output …] [--theme …]</Code>,
                  "JSON → .pptx / .docx / .xlsx; also renders XLSX JSON to .pdf / .png.",
                ],
                [
                  <Code key="e3">detect &lt;template&gt;</Code>,
                  "List {{variable}} placeholders in a DOCX / PPTX / XLSX.",
                ],
                [
                  <Code key="e4">merge &lt;template&gt; &lt;data.json&gt; &lt;output&gt;</Code>,
                  "Replace variables from a flat string dictionary, all three formats.",
                ],
                [
                  <Code key="e5">edit &lt;file&gt; --instructions &lt;json&gt;</Code>,
                  <>
                    <b className="text-ember-500">Stub.</b> Prints "Edit not yet implemented" and
                    fails. The DOCX/PPTX instruction paths are documented in the engine repo; this
                    command is not wired up.
                  </>,
                ],
              ]}
            />

            <H3>API</H3>
            <CommandLine command="dotnet run --project OfficeEditor.Api --urls http://localhost:5001" />
            <UL
              items={[
                <>
                  Deck sessions: upload (<Code>POST /api/decks</Code>), per-slide previews ({" "}
                  <Code>/api/decks/{"{id}"}/slides/{"{n}"}/preview</Code>, png|svg, ETag-cached),
                  anatomy (<Code>/api/decks/{"{id}"}/anatomy</Code>), JSON generation with timings (
                  <Code>/api/decks/generate</Code>), edit instructions.
                </>,
                <>
                  One-off conversion: <Code>POST /api/convert</Code> (multipart file or sample +
                  targetFormat pdf | png | svg | docx | pptx | xlsx) with{" "}
                  <Code>/api/download/{"{id}"}</Code> and <Code>/api/preview/{"{id}"}</Code>.
                  JSON → DOCX/XLSX goes through the declarative generators; empty JSON makes a blank
                  document.
                </>,
                <>
                  Demo endpoints: timed REF renders, upload render, and the OfficeEditor-vs-
                  LibreOffice compare path (<Code>/api/demo/…</Code>). The API and web demo are
                  local conveniences, not the security boundary.
                </>,
              ]}
            />

            <H3>MCP stdio host</H3>
            <CommandLine command="dotnet run --project OfficeEditor.Mcp" />
            <DocsTable
              head={["Tool", "Purpose"]}
              rows={[
                [
                  <Code key="m1">deck_anatomize</Code>,
                  "Slide/element anatomy of a deck (id, type, name, EMU position, text/table data).",
                ],
                [
                  <Code key="m2">deck_replace_element</Code>,
                  "Batch edit ops: replaceText, replaceImage, replaceTable, moveSlide, duplicateSlide, deleteSlide.",
                ],
                [
                  <Code key="m3">deck_render_slide</Code>,
                  "Render one 1-based slide to PNG/SVG bytes.",
                ],
                [
                  <Code key="m4">deck_generate</Code>,
                  "Generate a deck from a v2.0 generation document; returns pptxBase64 plus per-slide SVG/PNG previews and a deckHandle for the other tools.",
                ],
              ]}
            />
            <CodeBlock code={MCP_EXAMPLE} lang="json" title="claude_desktop_config.json" />

            <H3>Examples project</H3>
            <CommandLine command="dotnet run --project examples" />
            <P>
              The examples project exercises the fluent builders, variables, mail merge and the
              declarative vocabularies for all three formats, writing outputs to{" "}
              <Code>examples/output/</Code>. Ready-to-run JSON inputs live in the engine repo:{" "}
              <Code>demo/deck.json</Code>, <Code>demo/demo-deck.json</Code>,{" "}
              <Code>examples/Docx/generation/comprehensive.json</Code>,{" "}
              <Code>examples/Xlsx/instructions/rich-report.json</Code>.
            </P>
          </DocsSection>

          {/* ── Schema reference ──────────────────────────────────────── */}
          <DocsSection
            id="schema"
            eyebrow="reference"
            title="Schema reference"
            intro="The PPTX generation vocabulary is published as a JSON Schema (draft 2020-12) whose $id resolves on this site — machine-readable, forever."
          >
            <CommandLine command="curl https://officeeditor.dev/schemas/deck-2.0.json" />
            <UL
              items={[
                <>
                  <DLink href="/schemas/deck-2.0.json">/schemas/deck-2.0.json</DLink> — the
                  canonical deck document schema: root props, design tokens, containers, primitives,
                  components, gradients, notes.
                </>,
                <>
                  Validators reject unknown properties at every level (additionalProperties: false),
                  and the engine's validator adds JSON-path errors with spelling suggestions on top.
                </>,
                <>
                  The DOCX (1.0) and XLSX (1.0) vocabularies are documented in the engine repo (
                  <Code>docs/docx-generation.md</Code>) but are not yet published as standalone
                  schemas on this site.
                </>,
              ]}
            />
            <Note title="version">
              OfficeEditor is pre-1.0 (0.7.x). Public APIs may change; the schema published here is
              the contract for the 2.0 deck vocabulary.
            </Note>
          </DocsSection>
        </div>
      </div>
    </div>
  );
}
