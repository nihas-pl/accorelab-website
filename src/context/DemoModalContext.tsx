"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface DemoModalContextType {
  isOpen: boolean;
  topic: string;
  openModal: (topic?: string) => void;
  closeModal: () => void;
}

const DemoModalContext = createContext<DemoModalContextType | undefined>(undefined);

export function DemoModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [topic, setTopic] = useState("");

  const openModal = useCallback((newTopic?: string) => {
    if (newTopic) setTopic(newTopic);
    else setTopic("Request Demo");
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <DemoModalContext.Provider value={{ isOpen, topic, openModal, closeModal }}>
      {children}
    </DemoModalContext.Provider>
  );
}

export function useDemoModal() {
  const context = useContext(DemoModalContext);
  if (!context) {
    throw new Error("useDemoModal must be used within a DemoModalProvider");
  }
  return context;
}
