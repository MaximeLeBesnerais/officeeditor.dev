import type { ReactNode } from "react";

/**
 * Docs page section shell: mono amber eyebrow, heading, optional intro.
 * More compact than the landing `Section` — docs pages keep a tighter rhythm.
 */
export function DocsSection({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <p className="mb-3 font-mono text-xs tracking-[0.25em] text-amber-500 uppercase">
        {`// ${eyebrow}`}
      </p>
      <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl">
        {title}
      </h2>
      {intro && (
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-mute sm:text-base">
          {intro}
        </p>
      )}
      <div className="mt-8 space-y-8">{children}</div>
    </section>
  );
}
