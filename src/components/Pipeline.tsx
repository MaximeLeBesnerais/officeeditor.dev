import { useT } from "../lib/i18n";
import { Reveal } from "../lib/reveal";
import { Section } from "./Section";

function Node({
  name,
  sub,
  accent = false,
}: {
  name: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-md border px-5 py-4 ${
        accent
          ? "border-amber-500/40 bg-ink-900"
          : "border-ink-700 bg-ink-900"
      }`}
    >
      <p
        className={`font-mono text-sm ${accent ? "text-amber-400" : "text-paper"}`}
      >
        {name}
      </p>
      {sub && <p className="mt-1 text-xs text-faint">{sub}</p>}
    </div>
  );
}

function OutputChip({
  children,
  variant,
}: {
  children: string;
  variant: "amber" | "neutral";
}) {
  return (
    <span
      className={`rounded-md border px-4 py-2 font-mono text-xs ${
        variant === "amber"
          ? "border-amber-500/40 bg-amber-500/10 text-amber-300"
          : "border-ink-600 bg-ink-800 text-paper"
      }`}
    >
      {children}
    </span>
  );
}

/** Thin connector line with an amber arrowhead; vertical on mobile. */
function Arrow() {
  return (
    <div
      aria-hidden="true"
      className="flex flex-col items-center justify-center py-1 lg:flex-row lg:px-1 lg:py-0"
    >
      <span className="h-6 w-px bg-ink-600 lg:h-px lg:w-8" />
      <span className="-mt-0.5 font-mono text-sm text-amber-500 lg:mt-0 lg:-ml-0.5">
        <span className="lg:hidden">↓</span>
        <span className="hidden lg:inline">→</span>
      </span>
    </div>
  );
}

/**
 * "How it works": the single-layout-pass / dual-emitter pipeline as a pure
 * flexbox flow diagram (no image, no SVG paths).
 */
export default function Pipeline() {
  const t = useT();
  const nodes = t.pipeline.nodes;

  return (
    <Section
      id="how-it-works"
      eyebrow={t.pipeline.eyebrow}
      title={t.pipeline.title}
      intro={t.pipeline.intro}
    >
      <div className="flex flex-col items-center justify-center lg:flex-row">
        <Reveal delay={0}>
          <Node name={nodes.json.name} accent />
        </Reveal>
        <Reveal delay={60}>
          <Arrow />
        </Reveal>
        <Reveal delay={100}>
          <Node name={nodes.validator.name} sub={nodes.validator.sub} />
        </Reveal>
        <Reveal delay={160}>
          <Arrow />
        </Reveal>
        <Reveal delay={200}>
          <Node name={nodes.layout.name} sub={nodes.layout.sub} />
        </Reveal>
        <Reveal delay={260}>
          <Arrow />
        </Reveal>

        {/* Fork: two parallel emitter branches */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center lg:flex-row">
            <Reveal delay={350}>
              <Node name={nodes.ooxml.name} />
            </Reveal>
            <Reveal delay={420}>
              <Arrow />
            </Reveal>
            <Reveal delay={500}>
              <OutputChip variant="amber">{t.pipeline.outputs.office}</OutputChip>
            </Reveal>
          </div>
          <div className="flex flex-col items-center lg:flex-row">
            <Reveal delay={500}>
              <Node name={nodes.typst.name} />
            </Reveal>
            <Reveal delay={570}>
              <Arrow />
            </Reveal>
            <Reveal delay={650}>
              <OutputChip variant="neutral">{t.pipeline.outputs.preview}</OutputChip>
            </Reveal>
          </div>
        </div>
      </div>

      <Reveal delay={750}>
        <p className="mt-12 text-center font-mono text-xs text-faint">
          {t.pipeline.caption}
        </p>
      </Reveal>
    </Section>
  );
}
