"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import "./styles.css";

interface NavItem {
  label: string;
  href: string;
}

interface NavDropdownProps {
  label: string;
  items: NavItem[];
  className?: string;
}

export function NavDropdown({ label, items, className }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={cn("nav-dropdown", className)}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className="nav-dropdown-trigger"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{label}</span>
        <ChevronDown
          className={cn(
            "nav-dropdown-icon",
            isOpen && "nav-dropdown-icon-open"
          )}
        />
      </button>
      <div className={cn("nav-dropdown-menu", isOpen && "nav-dropdown-menu-open")}>
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="nav-dropdown-item"
            onClick={() => setIsOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
