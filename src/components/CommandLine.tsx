import { useState } from "react";
import { useT } from "../lib/i18n";

/**
 * Compact single-command terminal strip with a copy button.
 * `command` is passed WITHOUT the leading "$ " prompt.
 */
export function CommandLine({
  command,
  className = "",
}: {
  command: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const t = useT();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable; ignore */
    }
  };

  return (
    <div
      className={`flex items-center gap-2 rounded-md border border-ink-700 bg-ink-900 px-3 py-2 ${className}`}
    >
      <span className="font-mono text-xs text-amber-500 select-none">$</span>
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-xs text-paper/85">
        {command}
      </code>
      <button
        type="button"
        onClick={copy}
        className="shrink-0 font-mono text-xs text-faint transition-colors hover:text-amber-400"
        aria-label="Copy command"
      >
        {copied ? t.codeblock.copied : t.codeblock.copy}
      </button>
    </div>
  );
}
