import { useEffect, useState, type ReactNode } from "react";
import { Reveal, useInView } from "../lib/reveal";
import { Section } from "./Section";

type Tool = { name: string; desc: string };

const TOOLS: Tool[] = [
  { name: "deck_anatomize", desc: "inspect deck structure" },
  { name: "deck_replace_element", desc: "swap content surgically" },
  { name: "deck_render_slide", desc: "slide → PNG/SVG" },
  { name: "deck_generate", desc: "JSON → full deck" },
];

/** One line of the mock JSON-RPC exchange: a styled row of text runs. */
type TermLine = { runs: { text: string; className: string }[] } | null;

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
        text: "# validated, laid out, emitted. In one call",
        className: "italic text-faint",
      },
    ],
  },
];

function MockTerminal() {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  const [visible, setVisible] = useState(0);

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
        <span className="ml-3 font-mono text-xs text-mute">mcp · stdio</span>
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
  const chips: ReactNode = (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {TOOLS.map((t) => (
        <div
          key={t.name}
          className="rounded-md border border-ink-700 bg-ink-900 px-3 py-2"
        >
          <div className="font-mono text-xs text-amber-400">{t.name}</div>
          <div className="mt-1 text-xs text-faint">{t.desc}</div>
        </div>
      ))}
    </div>
  );

  return (
    <Section
      id="agents"
      eyebrow="built for agents"
      title="Your AI agent can ship decks."
      intro="OfficeEditor speaks MCP over stdio. Point Claude, Codex, or any MCP client at the host and it gains four document tools."
    >
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <div>
            <p className="leading-relaxed text-mute">
              The MCP host exposes{" "}
              <code className="font-mono text-sm text-paper">deck_anatomize</code>,{" "}
              <code className="font-mono text-sm text-paper">deck_replace_element</code>,{" "}
              <code className="font-mono text-sm text-paper">deck_render_slide</code>{" "}
              and{" "}
              <code className="font-mono text-sm text-paper">deck_generate</code>{" "}
              as JSON-RPC tools. An agent can inspect a deck's structure, swap
              content, and render slides, with the same loud validation humans
              get.
            </p>
            <div className="mt-8">{chips}</div>
            <p className="mt-8 font-mono text-xs text-faint">
              $ dotnet run --project OfficeEditor.Mcp
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
