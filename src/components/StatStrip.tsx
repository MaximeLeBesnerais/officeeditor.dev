import { useT } from "../lib/i18n";
import { useCountUp, useInView } from "../lib/reveal";

type Stat = {
  target: number;
  suffix: string;
  label: string;
  sub: string;
};

// Numbers and suffixes are data, not copy; labels/subs come from the dictionary.
const STAT_VALUES: { target: number; suffix: string }[] = [
  { target: 38, suffix: "×" },
  { target: 3200, suffix: "+" },
  { target: 3, suffix: "" },
  { target: 20, suffix: " ms" },
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
  const t = useT();

  const stats: Stat[] = [
    { ...STAT_VALUES[0], ...t.stats.speed },
    { ...STAT_VALUES[1], ...t.stats.tests },
    { ...STAT_VALUES[2], ...t.stats.formats },
    { ...STAT_VALUES[3], ...t.stats.perSlide },
  ];

  return (
    <section ref={ref} className="border-y border-ink-700 bg-ink-900/50">
      <div className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4 md:divide-x md:divide-ink-700">
        {stats.map((stat) => (
          <StatCell key={stat.label} stat={stat} start={inView} />
        ))}
      </div>
    </section>
  );
}
