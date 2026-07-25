import type { CSSProperties } from "react";

/* Splits a string into per-word spans for the staggered "rise" text
   animation. Server-safe (no client hooks) — the reveal is triggered by the
   global ScrollReveal observer adding `.is-in` to an ancestor `[data-reveal="words"]`.
   `start` offsets the stagger index so a second run (e.g. a highlighted
   phrase) continues the sequence instead of restarting it. */
export function Words({ text, start = 0 }: { text: string; start?: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <span
          className="word"
          key={`${w}-${i}`}
          style={{ "--i": start + i } as CSSProperties}
        >
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}
