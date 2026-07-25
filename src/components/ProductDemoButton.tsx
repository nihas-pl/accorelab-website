"use client";

import { useDemoModal } from "@/context/DemoModalContext";
import { Icon } from "@/components/Icon";

export function ProductDemoButton({ productName }: { productName: string }) {
  const { openModal } = useDemoModal();

  return (
    <button
      type="button"
      className="btn--prod-primary"
      onClick={() => openModal(`${productName} Demo`)}
    >
      <span>Request a Demo</span>
      <Icon name="arrow-right" size={18} />
    </button>
  );
}
