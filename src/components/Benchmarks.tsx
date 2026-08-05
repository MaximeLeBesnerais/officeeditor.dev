import { Section } from "./Section";
import { useInView } from "../lib/reveal";
import { useT } from "../lib/i18n";
import {
  BENCHMARKS,
  fullPathSpeedup,
  pdfSpeedup,
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
  qualifier,
}: {
  label: string;
  ms: number;
  widthPct: number;
  fill: string;
  inView: boolean;
  /** Optional tiny note rendered under the bar label. */
  qualifier?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-20 font-mono text-[10px] text-faint">
        {label}
        {qualifier && (
          <span className="mt-0.5 block font-mono text-[10px] text-faint">
            {qualifier}
          </span>
        )}
      </span>
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

/**
 * One like-for-like comparison: LO bar pinned at 100%, OE bar proportional.
 * The drama is how tiny the OE bars are, so each duel scales to itself.
 */
function Duel({
  label,
  oeMs,
  loMs,
  ratio,
  inView,
  loQualifier,
  oeQualifier,
}: {
  label: string;
  oeMs: number;
  loMs: number;
  ratio: number;
  inView: boolean;
  loQualifier?: string;
  oeQualifier?: string;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline gap-3">
        <span className="font-mono text-[10px] text-faint">{label}</span>
        <span className="ml-auto rounded-md border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 font-mono text-xs text-amber-400">
          {ratio.toFixed(1)}×
        </span>
      </div>
      <div className="flex flex-col gap-1.5">
        <Bar
          label="OfficeEditor"
          ms={oeMs}
          widthPct={(oeMs / loMs) * 100}
          fill="bg-gradient-to-r from-amber-500 to-amber-400"
          inView={inView}
          qualifier={oeQualifier}
        />
        <Bar
          label="LibreOffice"
          ms={loMs}
          widthPct={100}
          fill="bg-ink-600"
          inView={inView}
          qualifier={loQualifier}
        />
      </div>
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
            </div>
            <div className="flex flex-col gap-4">
              <Duel
                label="PDF"
                oeMs={deck.oePdfMs}
                loMs={deck.loConvertMs}
                ratio={pdfSpeedup(deck)}
                inView={inView}
              />
              <Duel
                label="PNG @150dpi"
                oeMs={deck.oePngTotalMs}
                loMs={deck.loTotalMs}
                ratio={fullPathSpeedup(deck)}
                inView={inView}
                loQualifier={t.benchmarks.duelQualifiers.lo}
                oeQualifier={t.benchmarks.duelQualifiers.oe}
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
