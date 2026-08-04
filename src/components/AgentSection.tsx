import { useEffect, useState, type ReactNode } from "react";
import { useT } from "../lib/i18n";
import { Reveal, useInView } from "../lib/reveal";
import { Section } from "./Section";

type ToolSlug = "anatomize" | "replaceElement" | "renderSlide" | "generate";

// Tool names stay hardcoded; subs come from t.agents.tools.
const TOOLS: { name: string; slug: ToolSlug }[] = [
  { name: "deck_anatomize", slug: "anatomize" },
  { name: "deck_replace_element", slug: "replaceElement" },
  { name: "deck_render_slide", slug: "renderSlide" },
  { name: "deck_generate", slug: "generate" },
];

/** One line of the mock JSON-RPC exchange: a styled row of text runs. */
type TermLine = { runs: { text: string; className: string }[] } | null;

function MockTerminal() {
  const t = useT();
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  const [visible, setVisible] = useState(0);

  // Built inside the component so the final comment line is translatable.
  const LINES: TermLine[] = [
    {
      runs: [
        { text: "→ ", className: "text-amber-500" },
        {
          text: '{"method": "tools/call", "params": {"name": "deck_generate",',
          className: "text-paper",
        },
      ],
    },
    {
      runs: [
        {
          text: '    "input": {"archetype": "kpi_row", "title": "Q4 traction", ...',
          className: "text-paper",
        },
      ],
    },
    {
      runs: [{ text: "}}}", className: "text-mute" }],
    },
    null,
    {
      runs: [
        { text: "← ", className: "text-mute" },
        {
          text: '{"result": {"slides": 1, "isValid": true,',
          className: "text-paper",
        },
      ],
    },
    {
      runs: [
        {
          text: '    "generationMilliseconds": 47, "bytes": 144225}}}',
          className: "text-amber-400",
        },
      ],
    },
    null,
    {
      runs: [
        {
          text: t.agents.terminalComment,
          className: "italic text-faint",
        },
      ],
    },
  ];

  useEffect(() => {
    if (!inView) return;
    // Reduced motion: show the full exchange immediately.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(LINES.length);
      return;
    }
    const id = window.setInterval(() => {
      setVisible((v) => {
        if (v >= LINES.length) {
          window.clearInterval(id);
          return v;
        }
        return v + 1;
      });
    }, 700);
    return () => window.clearInterval(id);
  }, [inView]);

  const done = visible >= LINES.length;

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-md border border-ink-700 bg-ink-900"
    >
      <div className="flex items-center border-b border-ink-700 bg-ink-850 px-4 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-ink-600" />
        <span className="ml-2 h-2.5 w-2.5 rounded-full bg-ink-600" />
        <span className="ml-2 h-2.5 w-2.5 rounded-full bg-amber-500/70" />
        <span className="ml-3 font-mono text-xs text-mute">
          {t.agents.terminalTitle}
        </span>
      </div>
      <div className="min-h-[17rem] overflow-x-auto p-5 font-mono text-[12px] leading-loose">
        {LINES.slice(0, visible).map((line, i) =>
          line === null ? (
            <div key={i} className="h-[1.5em]" />
          ) : (
            <div key={i} className="whitespace-pre">
              {line.runs.map((run, j) => (
                <span key={j} className={run.className}>
                  {run.text}
                </span>
              ))}
            </div>
          ),
        )}
        {inView && (
          <div>
            <span className={done ? "typing-caret" : "typing-caret opacity-60"} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function AgentSection() {
  const t = useT();

  const chips: ReactNode = (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {TOOLS.map((tool) => (
        <div
          key={tool.name}
          className="rounded-md border border-ink-700 bg-ink-900 px-3 py-2"
        >
          <div className="font-mono text-xs text-amber-400">{tool.name}</div>
          <div className="mt-1 text-xs text-faint">
            {t.agents.tools[tool.slug].sub}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <Section
      id="agents"
      eyebrow={t.agents.eyebrow}
      title={t.agents.title}
      intro={t.agents.intro}
    >
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <div>
            <p className="leading-relaxed text-mute">{t.agents.body}</p>
            <div className="mt-8">{chips}</div>
            <p className="mt-8 font-mono text-xs text-faint">
              {t.agents.cliHint}
            </p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <MockTerminal />
        </Reveal>
      </div>
    </Section>
  );
}
