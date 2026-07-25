"use client";

import { useEffect } from "react";
import * as amplitude from "@amplitude/unified";

/* Initializes Amplitude Analytics + Session Replay for the whole site.
   Runs only in the browser (client component + useEffect) and guards with a
   module-level flag so init happens exactly once for the app's lifetime,
   even across Fast Refresh or route-driven remounts. Autocapture records key
   interactions (page views, clicks, form submits) automatically. */
let initialized = false;

export function AmplitudeAnalytics() {
  useEffect(() => {
    if (initialized) return;
    initialized = true;

    amplitude.initAll("ceffb1098b7a31b2a825d8eee26e27d3", {
      analytics: { autocapture: true },
      sessionReplay: { sampleRate: 1 },
    });
  }, []);

  return null;
}
