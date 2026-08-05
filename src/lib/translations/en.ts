// English source-of-truth dictionary. Every user-facing string on the site
// lives here, grouped by section. Code snippets (bash, C#, JSON) are NOT
// translated and stay in the components.

export const en = {
  meta: {
    title: "OfficeEditor · One JSON in. Real Office files out.",
    repoUrl: "https://github.com/MaximeLeBesnerais/OfficeEditor",
  },
  nav: {
    howItWorks: "how it works",
    features: "features",
    agents: "agents",
    benchmarks: "benchmarks",
    github: "GitHub ↗",
  },
  hero: {
    headlineLine1: "One JSON in.",
    headlineLine2: "Real Office files out.",
    sub: "OfficeEditor is a .NET 9 suite that creates, edits, generates and renders DOCX, PPTX and XLSX: declarative JSON vocabularies in, genuine Office documents out. No Office, no LibreOffice, no cloud round-trip.",
    formats: ["DOCX", "PPTX", "XLSX"],
    ctaPrimary: "Get started",
    ctaGithub: "GitHub ↗",
    codeFrameTitle: "deck.json",
    slideCaption: "rendered by TypstBridge · 34 ms/slide",
  },
  stats: {
    speed: { label: "faster than LibreOffice", sub: "full pipeline, warm median" },
    tests: { label: "automated tests", sub: "83% coverage CI gate" },
    formats: { label: "Office formats", sub: "one generation model" },
    perSlide: { label: "per slide, SVG preview", sub: "native Typst bridge" },
  },
  pipeline: {
    eyebrow: "how it works",
    title: "Layout once. Emit twice.",
    intro:
      "A single pure-C# layout pass feeds two emitters: OOXML for delivery, Typst for preview. No second layout engine, no drift between what you ship and what you see.",
    nodes: {
      json: { name: "JSON vocabulary" },
      validator: { name: "Loud validator", sub: "field-path errors + suggestions" },
      layout: { name: "Layout resolver", sub: "pure C#, once" },
      ooxml: { name: "OOXML emitter" },
      typst: { name: "Typst emitter" },
    },
    outputs: {
      office: ".pptx · .docx · .xlsx",
      preview: "PDF · PNG · SVG",
    },
    caption: "Every primitive ships with both emitters + a parity fixture. No half-tested features.",
  },
  features: {
    eyebrow: "capabilities",
    title: "Everything between JSON and a finished document",
    intro: "Three formats, one model. Create from scratch or edit existing files with full style preservation.",
    items: {
      declarative: {
        title: "Declarative generation",
        body: "Loudly validated JSON vocabularies for PPTX, DOCX and XLSX. Slide archetypes (cover, section, kpi_row, two_col, table_slide) expand into real OOXML, with field-path errors and spelling suggestions when input is wrong.",
      },
      variables: {
        title: "Variables & mail merge",
        body: "{{variable}} detection and replacement across all three formats, plus batch DOCX merge. Templates stay templates; data stays data.",
      },
      markdown: {
        title: "Markdown → DOCX",
        body: "Rich styled conversion via Markdig: headings, tables, footnotes, task lists, images, safe hyperlinks, custom style maps.",
      },
      brand: {
        title: "Brand profiles",
        body: "Mine theme colors and fonts from existing decks into reusable design token sets. House style, enforced by the schema.",
      },
      builders: {
        title: "Fluent C# builders",
        body: "DocumentBuilder, PresentationBuilder, WorkbookBuilder. File, stream, or in-memory byte[] for services and serverless.",
      },
      instructions: {
        title: "Instruction sets",
        body: "JSON/YAML edit operations that mutate existing documents without ever touching their style definitions.",
      },
    },
  },
  agents: {
    eyebrow: "built for agents",
    title: "Your AI agent can ship decks.",
    intro: "OfficeEditor speaks MCP over stdio. Point Claude, Codex, or any MCP client at the host and it gains four document tools.",
    body: "The MCP host exposes deck_anatomize, deck_replace_element, deck_render_slide and deck_generate as JSON-RPC tools. An agent can inspect a deck's structure, swap content, and render slides, with the same loud validation humans get.",
    tools: {
      anatomize: { sub: "inspect deck structure" },
      replaceElement: { sub: "swap content surgically" },
      renderSlide: { sub: "slide → PNG/SVG" },
      generate: { sub: "JSON → full deck" },
    },
    terminalTitle: "mcp · stdio",
    terminalComment: "# validated, laid out, emitted. In one call",
  },
  quickstart: {
    eyebrow: "quickstart",
    title: "From zero to a rendered document in a minute",
    frameTitles: {
      terminal: "terminal",
      program: "Program.cs",
      kpiSlide: "kpi-row slide",
    },
    nuget: "on NuGet →",
  },
  benchmarks: {
    eyebrow: "benchmarks",
    title: "Native rendering, measured",
    intro: "OfficeEditor's Typst pipeline vs headless LibreOffice: same decks, same PNG artifacts, measured warm medians on Apple Silicon. Rasterization is 78–85% of LibreOffice's time, and pdftoppm gets no benefit from warm-up: a flat ~450 ms-per-slide tax. Even LibreOffice's conversion leg alone, the part it is designed for, runs 2.4–6.7× slower.",
    slidesUnit: "slides",
    chipConversion: "vs conversion alone",
    svg: {
      label: "SVG preview path",
      body: "The same layout emits SVG at 2.4–3.5 ms per slide, flat across decks: 76–411× faster than LibreOffice's full path, in a vector format LibreOffice can't produce natively. This is the artifact web previews and agent loops actually want.",
    },
    fidelity: {
      label: "// fidelity",
      body: "Every generation primitive ships with a parity fixture: one layout, emitted as OOXML and Typst, gated on per-primitive normalized-RMSE thresholds (4–12%) against PowerPoint ground-truth renders.",
    },
    footnote: "warm medians, N=20 (OfficeEditor) / N=5 (LibreOffice) · Apple Silicon · LibreOffice 26.2.5.2, poppler 26.07.0 · LO total = PDF conversion + pdftoppm rasterization at 150dpi · reproduce: dotnet run --project tools/pptx-benchmark",
  },
  footer: {
    tagline: "One JSON in. Real Office files out.",
    version: "v0.7.1 · MIT License",
    resourcesTitle: "Resources",
    resources: {
      github: "GitHub",
      nuget: "NuGet packages",
      schema: "PPTX generation schema",
      security: "Report a security issue",
    },
    surfacesTitle: "Surfaces",
    surfaces: [
      "officeeditor CLI (dotnet tool)",
      "ASP.NET Core API",
      "MCP stdio host",
      "Fluent C# builders",
    ],
    copyright: "© 2026 Maxime Le Besnerais",
    backToTop: "↑ top",
    schemaTagline: "schemas resolve at officeeditor.dev/schemas/. Machine-readable, forever",
  },
  codeblock: {
    copy: "copy",
    copied: "copied ✓",
  },
};

export type Translations = typeof en;
