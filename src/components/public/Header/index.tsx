"use client";

import { useState } from "react";
import Link from "next/link";
import { FallbackImage } from "@/components/shared/FallbackImage";
import { Menu, ChevronDown, User, LogIn } from "lucide-react";
import { NavDropdown } from "@/components/public/NavDropdown";
import { MobileMenu } from "@/components/public/MobileMenu";
import { cn } from "@/lib/utils/cn";
import "./styles.css";

const NAV_ITEMS = [
  {
    label: "For Providers",
    children: [
      { label: "Overview", href: "/overview" },
      { label: "Medical Providers", href: "/business-category/medical-providers" },
      { label: "Law Firms/Attorneys", href: "/business-category/lawyers" },
      { label: "Service Providers", href: "/business-category/service-providers" },
    ],
  },
  {
    label: "Our Company",
    children: [
      { label: "Our Team", href: "/our-team" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact Us", href: "/contact-us" },
    ],
  },
  { label: "Urgent Care", href: "/urgent-care" },
];

const LOGIN_ITEMS = [
  { label: "For Providers", href: "/login" },
  { label: "For Users", href: "/login" },
];

const SIGNUP_ITEMS = [
  { label: "Medical Provider", href: "/provider-sign-up" },
  { label: "Attorney/Law Firm", href: "/provider-sign-up" },
  { label: "User", href: "/signup" },
];

const ALL_NAV_ITEMS = [
  ...NAV_ITEMS,
  {
    label: "Login / Signup",
    children: [
      { label: "Provider Login", href: "/login" },
      { label: "User Login", href: "/login" },
      { label: "Medical Provider Sign Up", href: "/provider-sign-up" },
      { label: "Attorney/Law Firm Sign Up", href: "/provider-sign-up" },
      { label: "User Sign Up", href: "/signup" },
    ],
  },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <HeaderLogo />
          <DesktopNav />
          <AuthButtons />
          <button
            className="header-hamburger"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="header-hamburger-icon" />
          </button>
        </div>
      </header>
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        items={ALL_NAV_ITEMS}
      />
    </>
  );
}

function HeaderLogo() {
  return (
    <Link href="/" className="header-logo-link">
      <FallbackImage
        src="/home/logo.png"
        alt="Injury Assistance Network"
        width={280}
        height={100}
        className="header-logo"
        priority
        fallbackType="generic"
        fallbackText="IAN"
      />
    </Link>
  );
}

function DesktopNav() {
  return (
    <nav className="header-nav">
      {NAV_ITEMS.map((item) =>
        item.children ? (
          <NavDropdown
            key={item.label}
            label={item.label}
            items={item.children}
          />
        ) : (
          <Link
            key={item.href}
            href={item.href!}
            className={cn(
              "header-nav-link",
              item.label === "Urgent Care" && "header-nav-urgent"
            )}
          >
            {item.label}
          </Link>
        )
      )}
    </nav>
  );
}

function AuthButtons() {
  return (
    <div className="header-auth">
      <AuthDropdown
        label="Log In"
        icon={<User className="auth-btn-icon" />}
        items={LOGIN_ITEMS}
        variant="filled"
      />
      <AuthDropdown
        label="Sign Up"
        icon={<LogIn className="auth-btn-icon" />}
        items={SIGNUP_ITEMS}
        variant="filled"
      />
    </div>
  );
}

function AuthDropdown({
  label,
  icon,
  items,
  variant,
}: {
  label: string;
  icon: React.ReactNode;
  items: { label: string; href: string }[];
  variant: "filled" | "outline";
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="auth-dropdown"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className={cn(
          "auth-btn shimmer",
          variant === "outline" ? "auth-btn-outline" : "auth-btn-filled"
        )}
        onClick={() => setOpen(!open)}
      >
        {icon}
        {label}
        <ChevronDown className="auth-btn-chevron" />
      </button>
      <div className={cn("auth-dropdown-menu", open && "auth-dropdown-menu-open")}>
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="auth-dropdown-item"
            onClick={() => setOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
