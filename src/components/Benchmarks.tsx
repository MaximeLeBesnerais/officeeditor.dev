import { Section } from "./Section";
import { useInView } from "../lib/reveal";

type Deck = {
  name: string;
  slides: number;
  oeMs: number;
  loMs: number;
  speedup: string;
};

const DECKS: Deck[] = [
  {
    name: "sales_acceleration_deck",
    slides: 16,
    oeMs: 329.4,
    loMs: 5924.0,
    speedup: "~18.0×",
  },
  {
    name: "AetherLink shareholder overview",
    slides: 15,
    oeMs: 417.4,
    loMs: 15940.3,
    speedup: "~38.2×",
  },
  {
    name: "northwind-launch-review",
    slides: 12,
    oeMs: 102.5,
    loMs: 2034.2,
    speedup: "~19.8×",
  },
  {
    name: "northwind-investor-40",
    slides: 40,
    oeMs: 322.2,
    loMs: 5629.7,
    speedup: "~17.5×",
  },
];

const MAX_LO = 15940.3;

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
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  return (
    <Section
      id="benchmarks"
      eyebrow="benchmarks"
      title="Native rendering, measured"
      intro="OfficeEditor's Typst pipeline vs headless LibreOffice: same decks, same artifacts, warm medians on Apple Silicon. LibreOffice can't rasterize PPTX, so its total includes pdftoppm."
    >
      <div ref={ref}>
        {DECKS.map((deck) => (
          <div
            key={deck.name}
            className="border-b border-ink-800 py-5 last:border-0"
          >
            <div className="mb-3 flex items-baseline gap-3">
              <span className="font-mono text-sm text-paper">{deck.name}</span>
              <span className="text-xs text-faint">
                {deck.slides} slides
              </span>
              <span className="ml-auto rounded-md border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 font-mono text-xs text-amber-400">
                {deck.speedup}
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <Bar
                label="OfficeEditor"
                ms={deck.oeMs}
                widthPct={(deck.oeMs / MAX_LO) * 100}
                fill="bg-gradient-to-r from-amber-500 to-amber-400"
                inView={inView}
              />
              <Bar
                label="LibreOffice"
                ms={deck.loMs}
                widthPct={(deck.loMs / MAX_LO) * 100}
                fill="bg-ink-600"
                inView={inView}
              />
            </div>
          </div>
        ))}
        <p className="mt-6 font-mono text-[11px] text-faint">
          median of 5 warm runs · whole-deck render incl. rasterization ·
          reproduce: dotnet run --project tools/pptx-benchmark
        </p>
      </div>
    </Section>
  );
}
