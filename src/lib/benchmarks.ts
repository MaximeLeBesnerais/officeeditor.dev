// Single source of truth for the published benchmark numbers. Re-baselines
// should only touch this file; components and translations reference these
// values (or derive from them). Warm medians, Apple Silicon,
// LibreOffice 26.2.5.2, poppler 26.07.0.

export interface DeckBenchmark {
  /** File-safe deck identifier. */
  slug: string;
  /** Human-readable deck name shown in the Benchmarks section. */
  displayName: string;
  slideCount: number;
  /** OfficeEditor: open + PNG thumbnails, warm median (ms). */
  oePngTotalMs: number;
  /** LibreOffice: PPTX → PDF conversion, warm median (ms). */
  loConvertMs: number;
  /** pdftoppm rasterization at 150dpi, warm median (ms). */
  loRasterMs: number;
  /** loConvertMs + loRasterMs, warm median (ms). */
  loTotalMs: number;
  /** OfficeEditor SVG preview emission per slide (ms). */
  svgPerSlideMs: number;
}

export const BENCHMARKS: DeckBenchmark[] = [
  {
    slug: "sales_acceleration_deck",
    displayName: "sales_acceleration_deck",
    slideCount: 16,
    oePngTotalMs: 541.8,
    loConvertMs: 2065.5,
    loRasterMs: 7279.5,
    loTotalMs: 9345.0,
    svgPerSlideMs: 3.2,
  },
  {
    slug: "aetherlink-shareholder-overview",
    displayName: "AetherLink shareholder overview",
    slideCount: 15,
    oePngTotalMs: 1075.8,
    loConvertMs: 3805.6,
    loRasterMs: 20949.5,
    loTotalMs: 24755.1,
    svgPerSlideMs: 3.5,
  },
  {
    slug: "northwind-launch-review",
    displayName: "northwind-launch-review",
    slideCount: 12,
    oePngTotalMs: 158.6,
    loConvertMs: 1065.3,
    loRasterMs: 2083.0,
    loTotalMs: 3148.3,
    svgPerSlideMs: 2.9,
  },
  {
    slug: "northwind-investor-40",
    displayName: "northwind-investor-40",
    slideCount: 40,
    oePngTotalMs: 544.2,
    loConvertMs: 1279.5,
    loRasterMs: 7520.2,
    loTotalMs: 8799.6,
    svgPerSlideMs: 2.4,
  },
  {
    slug: "northwind-demo",
    displayName: "northwind-demo",
    slideCount: 15,
    oePngTotalMs: 209.7,
    loConvertMs: 1139.2,
    loRasterMs: 3014.0,
    loTotalMs: 4153.3,
    svgPerSlideMs: 2.4,
  },
];

const round1 = (n: number) => Math.round(n * 10) / 10;

/** LO full path (convert + raster) vs OE open+png total, 1 decimal. */
export function fullPathSpeedup(deck: DeckBenchmark): number {
  return round1(deck.loTotalMs / deck.oePngTotalMs);
}

/** LO conversion leg alone vs OE open+png total, 1 decimal. */
export function conversionSpeedup(deck: DeckBenchmark): number {
  return round1(deck.loConvertMs / deck.oePngTotalMs);
}

/** Largest LO total across decks; bar widths are proportional to this. */
export const MAX_LO_TOTAL_MS = Math.max(
  ...BENCHMARKS.map((d) => d.loTotalMs),
);

/** Headline "faster than LibreOffice" integer for the stat strip. */
export const MAX_FULL_PATH_SPEEDUP = Math.round(
  Math.max(...BENCHMARKS.map(fullPathSpeedup)),
);

/** Representative SVG preview cost per slide (rounded mean). */
export const SVG_PER_SLIDE_MS = Math.round(
  BENCHMARKS.reduce((sum, d) => sum + d.svgPerSlideMs, 0) / BENCHMARKS.length,
);
