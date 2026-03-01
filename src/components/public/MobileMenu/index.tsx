"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, X } from "lucide-react";
import "./styles.css";
import { cn } from "@/lib/utils/cn";

interface MobileNavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: MobileNavItem[];
}

export function MobileMenu({ isOpen, onClose, items }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="mobile-menu-overlay" onClick={onClose}>
      <nav
        className="mobile-menu"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mobile-menu-header">
          <span className="mobile-menu-title">Menu</span>
          <button className="mobile-menu-close" onClick={onClose} aria-label="Close menu">
            <X className="mobile-menu-close-icon" />
          </button>
        </div>
        <div className="mobile-menu-items">
          {items.map((item) => (
            <MobileMenuItem key={item.label} item={item} onClose={onClose} />
          ))}
        </div>
      </nav>
    </div>
  );
}

function MobileMenuItem({
  item,
  onClose,
}: {
  item: MobileNavItem;
  onClose: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (item.children) {
    return (
      <MobileMenuGroup
        item={item}
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded((prev) => !prev)}
        onClose={onClose}
      />
    );
  }

  return (
    <Link href={item.href || "/"} className="mobile-menu-link" onClick={onClose}>
      {item.label}
    </Link>
  );
}

function MobileMenuGroup({
  item,
  isExpanded,
  onToggle,
  onClose,
}: {
  item: MobileNavItem;
  isExpanded: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  return (
    <div className="mobile-menu-group">
      <button className="mobile-menu-group-trigger" onClick={onToggle}>
        <span>{item.label}</span>
        <ChevronDown
          className={cn(
            "mobile-menu-group-icon",
            isExpanded && "mobile-menu-group-icon-open"
          )}
        />
      </button>
      {isExpanded && (
        <div className="mobile-menu-group-items">
          {item.children?.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="mobile-menu-sublink"
              onClick={onClose}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
