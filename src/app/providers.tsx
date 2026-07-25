"use client";

import React from "react";
import { DemoModalProvider } from "@/context/DemoModalContext";
import { ContactModal } from "@/components/ContactModal";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <DemoModalProvider>
      {children}
      <ContactModal />
    </DemoModalProvider>
  );
}
