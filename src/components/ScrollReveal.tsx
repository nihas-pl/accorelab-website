"use client";

import { useEffect } from "react";

/* One IntersectionObserver drives every scroll animation on the page.
   Elements opt in with a `data-reveal` attribute (see globals.css); when
   they enter the viewport they get `.is-in` and the CSS transition plays.
   Reveals are one-shot. Honors prefers-reduced-motion by showing everything
   immediately. Re-scans on route changes via a MutationObserver so newly
   mounted sections animate too. */
export function ScrollReveal() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      document
        .querySelectorAll("[data-reveal]")
        .forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    const observeAll = () => {
      document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => {
        // If it's already on-screen at mount (above the fold), reveal next frame.
        io.observe(el);
      });
    };

    observeAll();

    // Catch anything mounted after the first paint.
    const mo = new MutationObserver(() => observeAll());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
