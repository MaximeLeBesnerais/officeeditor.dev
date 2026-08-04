import { useCountUp, useInView } from "../lib/reveal";

type Stat = {
  target: number;
  suffix: string;
  label: string;
  sub: string;
};

const STATS: Stat[] = [
  { target: 38, suffix: "×", label: "faster than LibreOffice", sub: "PPTX render, warm median" },
  { target: 3200, suffix: "+", label: "automated tests", sub: "83% coverage CI gate" },
  { target: 3, suffix: "", label: "Office formats", sub: "one generation model" },
  { target: 20, suffix: " ms", label: "per slide rendered", sub: "native Typst bridge" },
];

function StatCell({ stat, start }: { stat: Stat; start: boolean }) {
  const value = useCountUp(stat.target, start);
  const rounded = Math.round(value);
  // Thousands separator only kicks in for 3,200+
  const display =
    stat.target >= 1000 ? rounded.toLocaleString("en-US") : String(rounded);

  return (
    <div className="px-6 py-10 text-center">
      <p className="text-4xl font-semibold text-paper">
        {display}
        {stat.suffix && <span className="text-amber-500">{stat.suffix}</span>}
      </p>
      <p className="mt-2 text-sm text-mute">{stat.label}</p>
      <p className="mt-1 font-mono text-[11px] text-faint">{stat.sub}</p>
    </div>
  );
}

/**
 * Full-width band of headline engineering stats. Numbers count up once the
 * band scrolls into view (instant under prefers-reduced-motion).
 */
export default function StatStrip() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);

  return (
    <section ref={ref} className="border-y border-ink-700 bg-ink-900/50">
      <div className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4 md:divide-x md:divide-ink-700">
        {STATS.map((stat) => (
          <StatCell key={stat.label} stat={stat} start={inView} />
        ))}
      </div>
    </section>
  );
}
