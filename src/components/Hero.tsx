import { useCallback, useEffect, useState } from "react";
import { useT } from "../lib/i18n";
import { CommandLine } from "./CommandLine";

const GITHUB_URL = "https://github.com/MaximeLeBesnerais/OfficeEditor";

const DECK_JSON = `{
  "version": "2.0",
  "slides": [
    {
      "type": "container",
      "fill": "ink",
      "children": [
        { "type": "text",
          "text": "{{DECK_TITLE}}",
          "font": "display",
          "fontSize": 58 },
        { "type": "badge",
          "content": { "text": "WIND" } }
      ]
    }
  ]
}`;

const TYPING_MS_PER_CHAR = 18;
const SLIDE_REVEAL_DELAY_MS = 200;

// All rendered slides shown in the hero; index 0 is the main cover slide,
// the rest are the thumbnails. Clicking any of them opens the lightbox at
// that index.
const SLIDES = [
  {
    src: "/assets/slides/slide-001.webp",
    alt: "Cover slide rendered by OfficeEditor: Fleet intelligence that pays for itself",
  },
  { src: "/assets/slides/slide-005.webp", alt: "KPI cards slide" },
  { src: "/assets/slides/slide-010.webp", alt: "Bar chart slide" },
  { src: "/assets/slides/slide-013.webp", alt: "Roadmap slide" },
];

function Chip({ children, accent = false }: { children: string; accent?: boolean }) {
  return (
    <span
      className={`rounded-md border px-2.5 py-1 font-mono text-xs ${
        accent
          ? "border-amber-500/50 text-amber-400"
          : "border-ink-700 text-mute"
      }`}
    >
      {children}
    </span>
  );
}

/**
 * Full-screen slide viewer. Wraps around at the ends, closes on ESC or
 * overlay click, and locks body scroll while open. Under
 * prefers-reduced-motion it appears instantly without the fade.
 */
function SlideLightbox({
  index,
  onClose,
  onNavigate,
}: {
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const slide = SLIDES[index];
  // Lazy init: reduced-motion users start settled, so no transition plays.
  const [settled, setSettled] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const raf = window.requestAnimationFrame(() => setSettled(true));
    return () => window.cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft")
        onNavigate((index - 1 + SLIDES.length) % SLIDES.length);
      else if (e.key === "ArrowRight")
        onNavigate((index + 1) % SLIDES.length);
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [index, onClose, onNavigate]);

  const navButtonClass =
    "absolute top-1/2 z-10 -translate-y-1/2 rounded-md border border-ink-700 bg-ink-950/70 px-2.5 py-2 font-mono text-sm text-mute transition-colors hover:border-amber-500/50 hover:text-amber-400";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={slide.alt}
      onClick={onClose}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-ink-950/90 backdrop-blur-sm transition-opacity duration-200 ${
        settled ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`w-full max-w-5xl px-4 transition-transform duration-200 ${
          settled ? "scale-100" : "scale-[0.98]"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img
            src={slide.src}
            alt={slide.alt}
            width={1440}
            height={810}
            className="w-full rounded-md border border-ink-700 shadow-[0_0_80px_-20px_rgba(245,165,36,0.35)]"
          />
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() =>
              onNavigate((index - 1 + SLIDES.length) % SLIDES.length)
            }
            className={`${navButtonClass} left-2`}
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => onNavigate((index + 1) % SLIDES.length)}
            className={`${navButtonClass} right-2`}
          >
            →
          </button>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute top-2 right-2 rounded-md border border-ink-700 bg-ink-950/85 px-2 py-0.5 font-mono text-sm text-mute transition-colors hover:border-amber-500/50 hover:text-amber-400"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Hero: product pitch on the left, signature "JSON → rendered slide"
 * composition on the right. The JSON types itself in on mount (skipping the
 * animation entirely under prefers-reduced-motion), then the rendered slide
 * fades in over the code frame.
 */
export default function Hero() {
  const t = useT();
  const [typedChars, setTypedChars] = useState(0);
  const [showSlide, setShowSlide] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const typingDone = typedChars >= DECK_JSON.length;

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTypedChars(DECK_JSON.length);
      setShowSlide(true);
      return;
    }
    let i = 0;
    let slideTimer = 0;
    const interval = window.setInterval(() => {
      i += 1;
      setTypedChars(i);
      if (i >= DECK_JSON.length) {
        window.clearInterval(interval);
        slideTimer = window.setTimeout(
          () => setShowSlide(true),
          SLIDE_REVEAL_DELAY_MS,
        );
      }
    }, TYPING_MS_PER_CHAR);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(slideTimer);
    };
  }, []);

  return (
    <section className="mx-auto flex min-h-[92vh] w-full max-w-6xl items-center px-6 py-20">
      <div className="grid w-full items-center gap-14 lg:grid-cols-2">
        {/* Left: copy */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Chip accent>v0.7.1</Chip>
            <Chip>.NET 9</Chip>
            <Chip>MIT</Chip>
          </div>

          <h1 className="mt-6 text-5xl font-semibold tracking-tight text-paper sm:text-6xl">
            {t.hero.headlineLine1}
            <br />
            <span className="bg-gradient-to-r from-amber-400 to-ember-500 bg-clip-text text-transparent">
              {t.hero.headlineLine2}
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-mute">
            {t.hero.sub}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 font-mono text-xs text-mute">
            {t.hero.formats.map((fmt) => (
              <span key={fmt} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-amber-500" />
                {fmt}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#quickstart"
              className="rounded-md bg-amber-500 px-5 py-2.5 font-medium text-ink-950 transition hover:bg-amber-400"
            >
              {t.hero.ctaPrimary}
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-ink-700 px-5 py-2.5 text-paper transition hover:border-amber-500/60 hover:text-amber-400"
            >
              {t.hero.ctaGithub}
            </a>
          </div>

          <CommandLine
            command="dotnet tool install -g MaximeLB.OfficeEditor.Cli"
            className="mt-5 max-w-xl"
          />
        </div>

        {/* Right: JSON → slide composition */}
        <div className="relative min-w-0">
          {/* Code frame (same chrome as CodeBlock, minus copy button) */}
          <div className="overflow-hidden rounded-md border border-ink-700 bg-ink-900">
            <div className="flex items-center border-b border-ink-700 bg-ink-850 px-4 py-2">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-ink-600" />
                <span className="h-2.5 w-2.5 rounded-full bg-ink-600" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
                <span className="ml-3 font-mono text-xs text-mute">
                  {t.hero.codeFrameTitle}
                </span>
              </div>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[12px] leading-relaxed text-paper/75">
              <span className="relative block">
                {/* Invisible full text reserves the final size from first
                    paint, so the typing overlay never shifts layout. */}
                <span aria-hidden="true" className="invisible">
                  {DECK_JSON}
                </span>
                <span className="absolute inset-0">
                  {DECK_JSON.slice(0, typedChars)}
                  {!typingDone && <span className="typing-caret" />}
                </span>
              </span>
            </pre>
          </div>

          {/* Rendered slide, overlapping the code frame's bottom edge */}
          <div
            className={`relative z-10 -mt-8 ml-6 -rotate-1 transition-all duration-700 sm:ml-12 ${
              showSlide ? "opacity-100 scale-100" : "opacity-0 scale-[0.97]"
            }`}
          >
            <div className="relative overflow-hidden rounded-md border border-ink-700 shadow-[0_0_80px_-20px_rgba(245,165,36,0.35)] transition-colors hover:border-amber-500/50">
              <button
                type="button"
                onClick={() => setLightboxIndex(0)}
                className="block w-full cursor-zoom-in rounded-md focus-visible:outline-2 focus-visible:outline-amber-500"
              >
                <img
                  src={SLIDES[0].src}
                  alt={SLIDES[0].alt}
                  width={1440}
                  height={810}
                  className="aspect-video w-full"
                />
              </button>
              <span className="absolute right-2 bottom-2 rounded-md border border-ink-700 bg-ink-950/85 px-2 py-1 font-mono text-[10px] text-amber-300">
                {t.hero.slideCaption}
              </span>
            </div>
          </div>

          {/* Thumbnails of the other rendered slides; click opens lightbox */}
          <div className="mt-5 flex flex-wrap gap-2">
            {SLIDES.slice(1).map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => setLightboxIndex(i + 1)}
                className="cursor-pointer rounded focus-visible:outline-2 focus-visible:outline-amber-500"
              >
                <img
                  src={slide.src}
                  alt={slide.alt}
                  width={1440}
                  height={810}
                  loading="lazy"
                  className="h-14 w-auto rounded border border-ink-700 opacity-70 transition hover:border-amber-500/50 hover:opacity-100"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <SlideLightbox
          index={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  );
}
