import { Section } from "./Section";
import { useInView } from "../lib/reveal";
import { useT } from "../lib/i18n";
import {
  BENCHMARKS,
  MAX_LO_TOTAL_MS,
  conversionSpeedup,
  fullPathSpeedup,
} from "../lib/benchmarks";

function formatMs(ms: number) {
  return `${Math.round(ms).toLocaleString("en-US")} ms`;
}

function Bar({
  label,
  ms,
  widthPct,
  fill,
  inView,
}: {
  label: string;
  ms: number;
  widthPct: number;
  fill: string;
  inView: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-20 font-mono text-[10px] text-faint">{label}</span>
      <div className="h-5 flex-1 overflow-hidden rounded-sm bg-ink-800">
        <div
          className={`h-full rounded-sm ${fill} motion-safe:transition-[width] motion-safe:duration-1000 motion-safe:ease-out`}
          style={{ width: `${inView ? widthPct : 0}%` }}
        />
      </div>
      <span className="w-24 text-right font-mono text-xs text-mute">
        {formatMs(ms)}
      </span>
    </div>
  );
}

export default function Benchmarks() {
  const t = useT();
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  return (
    <Section
      id="benchmarks"
      eyebrow={t.benchmarks.eyebrow}
      title={t.benchmarks.title}
      intro={t.benchmarks.intro}
    >
      <div ref={ref}>
        {BENCHMARKS.map((deck) => (
          <div
            key={deck.slug}
            className="border-b border-ink-800 py-5 last:border-0"
          >
            <div className="mb-3 flex flex-wrap items-baseline gap-3">
              <span className="font-mono text-sm text-paper">
                {deck.displayName}
              </span>
              <span className="text-xs text-faint">
                {deck.slideCount} {t.benchmarks.slidesUnit}
              </span>
              <span className="ml-auto flex flex-wrap gap-2">
                <span className="rounded-md border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 font-mono text-xs text-amber-400">
                  {fullPathSpeedup(deck).toFixed(1)}×
                </span>
                <span className="rounded-md border border-ink-600 px-2 py-0.5 font-mono text-xs text-mute">
                  {conversionSpeedup(deck).toFixed(1)}×{" "}
                  {t.benchmarks.chipConversion}
                </span>
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <Bar
                label="OfficeEditor"
                ms={deck.oePngTotalMs}
                widthPct={(deck.oePngTotalMs / MAX_LO_TOTAL_MS) * 100}
                fill="bg-gradient-to-r from-amber-500 to-amber-400"
                inView={inView}
              />
              <Bar
                label="LibreOffice"
                ms={deck.loTotalMs}
                widthPct={(deck.loTotalMs / MAX_LO_TOTAL_MS) * 100}
                fill="bg-ink-600"
                inView={inView}
              />
            </div>
          </div>
        ))}

        {/* SVG preview path callout */}
        <div className="mt-6 rounded-md border border-amber-500/30 bg-amber-500/5 p-5">
          <p className="font-mono text-xs text-amber-400">
            {t.benchmarks.svg.label}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-mute">
            {t.benchmarks.svg.body}
          </p>
        </div>

        {/* Fidelity note */}
        <p className="mt-5 font-mono text-[11px] text-faint">
          {t.benchmarks.fidelity.label}
        </p>
        <p className="mt-1 text-sm text-mute">{t.benchmarks.fidelity.body}</p>

        <p className="mt-6 font-mono text-[11px] text-faint">
          {t.benchmarks.footnote}
        </p>
      </div>
    </Section>
  );
}
