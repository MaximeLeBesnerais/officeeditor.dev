import type { ReactNode } from "react";

/**
 * Reference table for the docs pages: ink-bordered rows, amber mono headers.
 */
export function DocsTable({
  head,
  rows,
  className = "",
}: {
  head: ReactNode[];
  rows: ReactNode[][];
  className?: string;
}) {
  return (
    <div className={`overflow-x-auto rounded-md border border-ink-700 ${className}`}>
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-ink-700 bg-ink-900">
            {head.map((h, i) => (
              <th
                key={i}
                className="px-4 py-2.5 font-mono text-xs font-medium whitespace-nowrap text-amber-400"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-ink-800 last:border-0">
              {r.map((c, j) => (
                <td
                  key={j}
                  className="px-4 py-2.5 align-top text-[13px] leading-relaxed text-mute"
                >
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
