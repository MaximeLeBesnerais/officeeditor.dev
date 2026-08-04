import { Reveal } from "../lib/reveal";
import { Section } from "./Section";

type Feature = {
  glyph: string;
  title: string;
  body: string;
};

const FEATURES: Feature[] = [
  {
    glyph: "{}",
    title: "Declarative generation",
    body: "Loudly validated JSON vocabularies for PPTX, DOCX and XLSX. Slide archetypes (cover, section, kpi_row, two_col, table_slide) expand into real OOXML, with field-path errors and spelling suggestions when input is wrong.",
  },
  {
    glyph: "{{}}",
    title: "Variables & mail merge",
    body: "{{variable}} detection and replacement across all three formats, plus batch DOCX merge. Templates stay templates; data stays data.",
  },
  {
    glyph: "¶",
    title: "Markdown → DOCX",
    body: "Rich styled conversion via Markdig: headings, tables, footnotes, task lists, images, safe hyperlinks, custom style maps.",
  },
  {
    glyph: "◐",
    title: "Brand profiles",
    body: "Mine theme colors and fonts from existing decks into reusable design token sets. House style, enforced by the schema.",
  },
  {
    glyph: "ƒ",
    title: "Fluent C# builders",
    body: "DocumentBuilder, PresentationBuilder, WorkbookBuilder. File, stream, or in-memory byte[] for services and serverless.",
  },
  {
    glyph: "✎",
    title: "Instruction sets",
    body: "JSON/YAML edit operations that mutate existing documents without ever touching their style definitions.",
  },
];

export default function Features() {
  return (
    <Section
      id="features"
      eyebrow="capabilities"
      title="Everything between JSON and a finished document"
      intro="Three formats, one model. Create from scratch or edit existing files with full style preservation."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} delay={i * 80}>
            <div className="h-full rounded-md border border-ink-700 bg-ink-900 p-6 transition-all duration-300 hover:border-amber-500/40 hover:shadow-[0_0_40px_-16px_rgba(245,165,36,0.4)]">
              <span className="font-mono text-lg text-amber-500">
                {f.glyph}
              </span>
              <h3 className="mt-3 font-medium text-paper">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mute">{f.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
