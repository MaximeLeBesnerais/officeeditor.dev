import { useEffect, useState } from "react";
import { getHighlighter } from "../lib/shiki";
import { useT } from "../lib/i18n";

/**
 * Shiki-highlighted code block in a dark chrome window frame, with copy button.
 * Plain-text fallback renders instantly; highlighting swaps in async.
 */
export function CodeBlock({
  code,
  lang,
  title,
  className = "",
}: {
  code: string;
  lang: "csharp" | "json" | "bash";
  title?: string;
  className?: string;
}) {
  const [html, setHtml] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const t = useT();

  useEffect(() => {
    let cancelled = false;
    getHighlighter().then((h) => {
      if (cancelled) return;
      setHtml(
        h.codeToHtml(code.trim(), {
          lang,
          theme: "github-dark-default",
        }),
      );
    });
    return () => {
      cancelled = true;
    };
  }, [code, lang]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable; ignore */
    }
  };

  return (
    <div
      className={`overflow-hidden rounded-md border border-ink-700 bg-ink-900 ${className}`}
    >
      <div className="flex items-center justify-between border-b border-ink-700 bg-ink-850 px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-ink-600" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-600" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
          {title && (
            <span className="ml-3 font-mono text-xs text-mute">{title}</span>
          )}
        </div>
        <button
          onClick={copy}
          className="font-mono text-xs text-faint transition-colors hover:text-amber-400"
          aria-label="Copy code"
        >
          {copied ? t.codeblock.copied : t.codeblock.copy}
        </button>
      </div>
      {html ? (
        <div dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-paper/80">
          {code.trim()}
        </pre>
      )}
    </div>
  );
}
