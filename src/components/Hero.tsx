import { useEffect, useState } from "react";
import { useT } from "../lib/i18n";

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

const THUMBNAILS = [
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
 * Hero: product pitch on the left, signature "JSON → rendered slide"
 * composition on the right. The JSON types itself in on mount (skipping the
 * animation entirely under prefers-reduced-motion), then the rendered slide
 * fades in over the code frame.
 */
export default function Hero() {
  const t = useT();
  const [typedChars, setTypedChars] = useState(0);
  const [showSlide, setShowSlide] = useState(false);
  const typingDone = typedChars >= DECK_JSON.length;

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
        <div>
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

          <p className="mt-5 font-mono text-xs text-faint">
            {t.hero.cliHint}
          </p>
        </div>

        {/* Right: JSON → slide composition */}
        <div className="relative">
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
              {DECK_JSON.slice(0, typedChars)}
              {!typingDone && <span className="typing-caret" />}
            </pre>
          </div>

          {/* Rendered slide, overlapping the code frame's bottom edge */}
          <div
            className={`relative z-10 -mt-8 ml-6 -rotate-1 transition-all duration-700 sm:ml-12 ${
              showSlide ? "opacity-100 scale-100" : "opacity-0 scale-[0.97]"
            }`}
          >
            <div className="relative overflow-hidden rounded-md border border-ink-700 shadow-[0_0_80px_-20px_rgba(245,165,36,0.35)]">
              <img
                src="/assets/slides/slide-001.webp"
                alt="Cover slide rendered by OfficeEditor: Fleet intelligence that pays for itself"
                width={1440}
                height={810}
                className="aspect-video w-full"
              />
              <span className="absolute right-2 bottom-2 rounded-md border border-ink-700 bg-ink-950/85 px-2 py-1 font-mono text-[10px] text-amber-300">
                {t.hero.slideCaption}
              </span>
            </div>
          </div>

          {/* Decorative thumbnails of other rendered slides */}
          <div className="mt-5 flex gap-2">
            {THUMBNAILS.map((t) => (
              <img
                key={t.src}
                src={t.src}
                alt={t.alt}
                width={1440}
                height={810}
                loading="lazy"
                className="h-14 w-auto rounded border border-ink-700 opacity-70 transition hover:opacity-100"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
