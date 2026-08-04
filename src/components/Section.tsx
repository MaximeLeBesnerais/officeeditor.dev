import type { ReactNode } from "react";
import { Reveal } from "../lib/reveal";

/**
 * Shared section shell: mono eyebrow label, big display heading, intro copy.
 * Keeps vertical rhythm identical across the page.
 */
export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = "",
}: {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`mx-auto w-full max-w-6xl px-6 py-24 sm:py-32 ${className}`}
    >
      <Reveal>
        <p className="mb-4 font-mono text-xs tracking-[0.25em] text-amber-500 uppercase">
          {`// ${eyebrow}`}
        </p>
        <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
          {title}
        </h2>
        {intro && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-mute">
            {intro}
          </p>
        )}
      </Reveal>
      <div className="mt-12">{children}</div>
    </section>
  );
}
