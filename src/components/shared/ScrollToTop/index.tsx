"use client";

import { ChevronUp } from "lucide-react";
import { useScrollToTop } from "@/lib/hooks/useScrollToTop";
import "./styles.css";
import { cn } from "@/lib/utils/cn";

export function ScrollToTop() {
  const { isVisible, scrollToTop } = useScrollToTop();

  return (
    <button
      className={cn("scroll-to-top", isVisible && "scroll-to-top-visible")}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <ChevronUp className="scroll-to-top-icon" />
    </button>
  );
}
