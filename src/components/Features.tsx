import { useT } from "../lib/i18n";
import { Reveal } from "../lib/reveal";
import { Section } from "./Section";

type FeatureSlug =
  | "declarative"
  | "variables"
  | "markdown"
  | "brand"
  | "builders"
  | "instructions";

// Glyphs stay in the component; copy comes from t.features.items.
// Order matters: keep declarative, variables, markdown, brand, builders, instructions.
const FEATURE_GLYPHS: { slug: FeatureSlug; glyph: string }[] = [
  { slug: "declarative", glyph: "{}" },
  { slug: "variables", glyph: "{{}}" },
  { slug: "markdown", glyph: "¶" },
  { slug: "brand", glyph: "◐" },
  { slug: "builders", glyph: "ƒ" },
  { slug: "instructions", glyph: "✎" },
];

export default function Features() {
  const t = useT();

  return (
    <Section
      id="features"
      eyebrow={t.features.eyebrow}
      title={t.features.title}
      intro={t.features.intro}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURE_GLYPHS.map((f, i) => {
          const item = t.features.items[f.slug];
          return (
            <Reveal key={f.slug} delay={i * 80}>
              <div className="h-full rounded-md border border-ink-700 bg-ink-900 p-6 transition-all duration-300 hover:border-amber-500/40 hover:shadow-[0_0_40px_-16px_rgba(245,165,36,0.4)]">
                <span className="font-mono text-lg text-amber-500">
                  {f.glyph}
                </span>
                <h3 className="mt-3 font-medium text-paper">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mute">
                  {item.body}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
