// Single source of truth for the published benchmark numbers. Re-baselines
// should only touch this file; components and translations reference these
// values (or derive from them). Warm medians (N=50; cold runs N=10),
// Apple Silicon, LibreOffice 26.2.5.2, poppler 26.07.0.

export interface DeckBenchmark {
  /** File-safe deck identifier. */
  slug: string;
  /** Human-readable deck name shown in the Benchmarks section. */
  displayName: string;
  slideCount: number;
  /** OfficeEditor: ExportToPdf, warm median (ms). */
  oePdfMs: number;
  /** OfficeEditor: open + PNG thumbnails, warm median (ms). */
  oePngTotalMs: number;
  /** OfficeEditor: whole-deck SVG emission, warm median (ms). */
  oeSvgTotalMs: number;
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
    oePdfMs: 26.0,
    oePngTotalMs: 368.4,
    oeSvgTotalMs: 36.2,
    loConvertMs: 1433.2,
    loRasterMs: 4875.3,
    loTotalMs: 6308.5,
    svgPerSlideMs: 2.3,
  },
  {
    slug: "aetherlink-shareholder-overview",
    displayName: "AetherLink shareholder overview",
    slideCount: 15,
    oePdfMs: 25.0,
    oePngTotalMs: 722.1,
    oeSvgTotalMs: 36.6,
    loConvertMs: 2547.3,
    loRasterMs: 13528.5,
    loTotalMs: 16075.9,
    svgPerSlideMs: 2.4,
  },
  {
    slug: "northwind-launch-review",
    displayName: "northwind-launch-review",
    slideCount: 12,
    oePdfMs: 11.6,
    oePngTotalMs: 100.2,
    oeSvgTotalMs: 20.9,
    loConvertMs: 731.6,
    loRasterMs: 1363.0,
    loTotalMs: 2094.6,
    svgPerSlideMs: 1.7,
  },
  {
    slug: "northwind-investor-40",
    displayName: "northwind-investor-40",
    slideCount: 40,
    oePdfMs: 39.8,
    oePngTotalMs: 371.2,
    oeSvgTotalMs: 65.3,
    loConvertMs: 885.7,
    loRasterMs: 4996.5,
    loTotalMs: 5882.2,
    svgPerSlideMs: 1.6,
  },
  {
    slug: "northwind-demo",
    displayName: "northwind-demo",
    slideCount: 15,
    oePdfMs: 15.2,
    oePngTotalMs: 141.9,
    oeSvgTotalMs: 23.9,
    loConvertMs: 772.7,
    loRasterMs: 1970.0,
    loTotalMs: 2742.7,
    svgPerSlideMs: 1.6,
  },
];

const round1 = (n: number) => Math.round(n * 10) / 10;

/** LO full path (convert + raster) vs OE open+png total, 1 decimal. */
export function fullPathSpeedup(deck: DeckBenchmark): number {
  return round1(deck.loTotalMs / deck.oePngTotalMs);
}

/** LO convert-to-PDF vs OE ExportToPdf, 1 decimal. */
export function pdfSpeedup(deck: DeckBenchmark): number {
  return round1(deck.loConvertMs / deck.oePdfMs);
}

/** Largest LO total across decks; bar widths are proportional to this. */
export const MAX_LO_TOTAL_MS = Math.max(
  ...BENCHMARKS.map((d) => d.loTotalMs),
);

/** Headline "faster than LibreOffice" integer for the stat strip (PNG duel). */
export const MAX_FULL_PATH_SPEEDUP = Math.round(
  Math.max(...BENCHMARKS.map(fullPathSpeedup)),
);

/** Headline "faster than LibreOffice" integer for the stat strip (PDF duel). */
export const MAX_PDF_SPEEDUP = Math.round(
  Math.max(...BENCHMARKS.map(pdfSpeedup)),
);

/** Representative SVG preview cost per slide (rounded mean). */
export const SVG_PER_SLIDE_MS = Math.round(
  BENCHMARKS.reduce((sum, d) => sum + d.svgPerSlideMs, 0) / BENCHMARKS.length,
);
