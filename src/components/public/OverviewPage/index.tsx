import { FallbackImage } from "@/components/shared/FallbackImage";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/* ── Static data ──────────────────────────────────────────────────── */

const STATS = [
  { value: "500+", label: "Verified Providers" },
  { value: "50+", label: "Specialties" },
  { value: "200+", label: "Cities Covered" },
  { value: "24/7", label: "Support Available" },
];

const OFFER_CARDS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="ov-offer-card-icon">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: "Medical Providers",
    desc: "Find chiropractors, orthopedic surgeons, pain management specialists, and more — all verified and ready to help with your injury recovery.",
    href: "/business-category/medical-providers",
    cta: "Browse Medical",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="ov-offer-card-icon">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Attorneys & Law Firms",
    desc: "Connect with experienced personal injury attorneys who specialize in auto accidents, workers' comp, medical malpractice, and more.",
    href: "/business-category/lawyers",
    cta: "Browse Legal",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="ov-offer-card-icon">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
    title: "Service Providers",
    desc: "Access tow services, auto body shops, medical equipment suppliers, and other essential services for your recovery journey.",
    href: "/business-category/service-providers",
    cta: "Browse Services",
  },
];

const MARKETING_SERVICES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="ov-mkt-card-icon">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    title: "Search Engine Optimization",
    desc: "Optimize your website to rank higher on Google, driving organic traffic and new patient leads to your practice.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="ov-mkt-card-icon">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "Search Engine Marketing",
    desc: "Appear at the top of search results with targeted paid advertising that reaches patients actively seeking your services.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="ov-mkt-card-icon">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
    title: "Social Media Marketing",
    desc: "Build your brand presence across social platforms, engage with your community, and convert followers into patients.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="ov-mkt-card-icon">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    title: "Email Outreach",
    desc: "Reach prospective clients with personalized email campaigns that nurture leads and drive conversions on autopilot.",
  },
];

/* ── Main component ───────────────────────────────────────────────── */

export function OverviewContent() {
  return (
    <>
      <HeroBanner />
      <StatsBar />
      <WhoWeAre />
      <WhatWeOffer />
      <DigitalMarketing />
      <CTABanner />
    </>
  );
}

/* ── Hero Banner ──────────────────────────────────────────────────── */

function HeroBanner() {
  return (
    <section className="ov-hero">
      <div className="ov-hero-inner">
        <h1 className="ov-hero-title">
          Your Personal Injury Concierge
        </h1>
        <p className="ov-hero-subtitle">
          I.A.N. connects injury victims with trusted medical providers,
          experienced attorneys, and essential service providers — all in one
          place.
        </p>
        <div className="ov-hero-actions">
          <Link href="/find-a-provider" className="ov-hero-btn-primary">
            Find a Provider
          </Link>
          <Link href="/provider-sign-up" className="ov-hero-btn-secondary">
            List Your Business <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Stats Bar ────────────────────────────────────────────────────── */

function StatsBar() {
  return (
    <section className="ov-stats">
      <div className="ov-stats-inner">
        {STATS.map((stat) => (
          <div key={stat.label} className="ov-stat">
            <span className="ov-stat-value">{stat.value}</span>
            <span className="ov-stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Who We Are ───────────────────────────────────────────────────── */

function WhoWeAre() {
  return (
    <section className="ov-about">
      <div className="ov-about-inner">
        <div className="ov-about-image-wrap">
          <FallbackImage
            src="/overview/hero.jpg"
            alt="I.A.N. Personal Injury Concierge"
            width={560}
            height={400}
            className="ov-about-image"
          />
        </div>
        <div className="ov-about-content">
          <span className="ov-about-label">Who We Are</span>
          <h2 className="ov-about-title">
            More Than a Provider Network
          </h2>
          <p className="ov-about-desc">
            Injury Assistance Network is not just a provider directory — we are
            a comprehensive personal injury resource. We connect victims with
            verified medical professionals, experienced attorneys, and essential
            service providers to ensure a smoother recovery journey.
          </p>
          <p className="ov-about-desc">
            We are a fast-growing company that has never lost sight of our core
            values: collaboration, innovation, and putting the injured first. We
            continuously improve our platform to help people find the right care
            at the right time.
          </p>
          <Link href="/how-it-works" className="ov-about-link">
            See How It Works <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── What We Offer ────────────────────────────────────────────────── */

function WhatWeOffer() {
  return (
    <section className="ov-offer">
      <div className="ov-offer-inner">
        <span className="ov-offer-label">What We Offer</span>
        <h2 className="ov-offer-title">
          Three Categories of Trusted Providers
        </h2>
        <p className="ov-offer-subtitle">
          Whether you need medical treatment, legal representation, or support
          services — we have you covered.
        </p>
        <div className="ov-offer-grid">
          {OFFER_CARDS.map((card) => (
            <Link key={card.title} href={card.href} className="ov-offer-card">
              <div className="ov-offer-card-icon-wrap">{card.icon}</div>
              <h3 className="ov-offer-card-title">{card.title}</h3>
              <p className="ov-offer-card-desc">{card.desc}</p>
              <span className="ov-offer-card-cta">
                {card.cta} <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Digital Marketing ────────────────────────────────────────────── */

function DigitalMarketing() {
  return (
    <section className="ov-mkt">
      <div className="ov-mkt-inner">
        <div className="ov-mkt-header">
          <div className="ov-mkt-header-text">
            <span className="ov-mkt-label">For Providers</span>
            <h2 className="ov-mkt-title">
              Grow Your Practice with Digital Marketing
            </h2>
            <p className="ov-mkt-desc">
              Harness cutting-edge digital marketing solutions to enhance your
              online presence, drive targeted traffic, and convert leads into
              loyal patients. Our comprehensive services are designed to meet
              your unique needs.
            </p>
          </div>
          <div className="ov-mkt-header-image-wrap">
            <FallbackImage
              src="/overview/digital-marketing-solutions.jpg"
              alt="Digital Marketing Solutions"
              width={480}
              height={360}
              className="ov-mkt-header-image"
            />
          </div>
        </div>
        <div className="ov-mkt-grid">
          {MARKETING_SERVICES.map((service) => (
            <div key={service.title} className="ov-mkt-card">
              <div className="ov-mkt-card-icon-wrap">{service.icon}</div>
              <h3 className="ov-mkt-card-title">{service.title}</h3>
              <p className="ov-mkt-card-desc">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA Banner ───────────────────────────────────────────────────── */

function CTABanner() {
  return (
    <section className="ov-cta">
      <div className="ov-cta-inner">
        <h2 className="ov-cta-title">Ready to Get Started?</h2>
        <p className="ov-cta-desc">
          Whether you need to find a provider or list your business, we make it
          simple.
        </p>
        <div className="ov-cta-actions">
          <Link href="/find-a-provider" className="ov-cta-btn-primary">
            Find a Provider
          </Link>
          <Link href="/provider-sign-up" className="ov-cta-btn-secondary">
            Sign Up &amp; Grow Your Business{" "}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
