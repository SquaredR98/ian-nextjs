import Link from "next/link";
import {
  Phone,
  Clock,
  Thermometer,
  ShieldAlert,
  Activity,
  Bone,
  Scissors,
  AlertCircle,
  Bug,
  ArrowUpDown,
  MapPin,
  CalendarCheck,
  Search,
  ArrowRight,
  TriangleAlert,
} from "lucide-react";
import { SITE } from "@/lib/utils/constants";
import { FallbackImage } from "@/components/shared/FallbackImage";

export function UrgentCareContent() {
  return (
    <div className="uc-page">
      <HeroBanner />
      <OperatingHours />
      <ServicesGrid />
      <HowItWorks />
      <EmergencyDisclaimer />
      <CTABanner />
    </div>
  );
}

/* ── Hero Banner ───────────────────────────────────────────────────── */

function HeroBanner() {
  return (
    <section className="uc-hero">
      <div className="uc-hero-inner">
        <h1 className="uc-hero-title">Urgent Care</h1>
        <p className="uc-hero-subtitle">
          Find urgent care providers near you for immediate, non-emergency
          medical attention. Walk-in appointments available — no referral needed.
        </p>
        <div className="uc-hero-actions">
          <Link href="/find-a-provider?categoryId=1" className="uc-hero-btn-primary">
            Find Urgent Care <ArrowRight size={16} />
          </Link>
          <a href={`tel:${SITE.phoneRaw}`} className="uc-hero-btn-secondary">
            <Phone size={16} /> Call {SITE.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── Operating Hours ───────────────────────────────────────────────── */

function OperatingHours() {
  return (
    <section className="uc-hours">
      <div className="uc-hours-inner">
        <div className="uc-hours-content">
          <span className="uc-hours-label">Hours &amp; Contact</span>
          <h2 className="uc-hours-title">We&apos;re Here When You Need Us</h2>
          <div className="uc-hours-card">
            <div className="uc-hours-card-icon">
              <Clock size={24} />
            </div>
            <div>
              <p className="uc-hours-card-time">
                Monday &ndash; Sunday: 10:00 AM &ndash; 8:00 PM
              </p>
              <p className="uc-hours-card-note">
                Walk-in appointments for non-life-threatening injuries and
                illnesses. No appointment necessary.
              </p>
            </div>
          </div>
          <a href={`tel:${SITE.phoneRaw}`} className="uc-hours-phone">
            <Phone size={18} />
            <span>Call us: {SITE.phone}</span>
          </a>
        </div>
        <div className="uc-hours-image-wrap">
          <FallbackImage
            src="/images/about-two-img-1.png"
            alt="Urgent Care Facility"
            width={560}
            height={400}
            className="uc-hours-image"
          />
        </div>
      </div>
    </section>
  );
}

/* ── Services Grid ─────────────────────────────────────────────────── */

const SERVICES = [
  { icon: <Thermometer size={28} />, label: "Minor Illnesses" },
  { icon: <ShieldAlert size={28} />, label: "COVID-19 / Flu / RSV" },
  { icon: <Activity size={28} />, label: "Sprains & Strains" },
  { icon: <Bone size={28} />, label: "Minor Fractures" },
  { icon: <Scissors size={28} />, label: "Cuts & Lacerations" },
  { icon: <AlertCircle size={28} />, label: "Allergic Reactions" },
  { icon: <Bug size={28} />, label: "Infections & Rashes" },
  { icon: <ArrowUpDown size={28} />, label: "Back & Neck Pain" },
];

function ServicesGrid() {
  return (
    <section className="uc-services">
      <div className="uc-services-inner">
        <span className="uc-services-label">What We Treat</span>
        <h2 className="uc-services-title">Services We Cover</h2>
        <div className="uc-services-grid">
          {SERVICES.map((svc) => (
            <div key={svc.label} className="uc-service-card">
              <div className="uc-service-icon">{svc.icon}</div>
              <span className="uc-service-name">{svc.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── How It Works ──────────────────────────────────────────────────── */

const STEPS = [
  {
    number: "1",
    icon: <Search size={22} />,
    title: "See Available Providers",
    desc: "Browse our network of verified urgent care providers in your area.",
  },
  {
    number: "2",
    icon: <MapPin size={22} />,
    title: "Find One Near You",
    desc: "Use location search to find the closest urgent care facility.",
  },
  {
    number: "3",
    icon: <CalendarCheck size={22} />,
    title: "Locate on Google Maps",
    desc: "Get directions and navigate directly to your chosen provider.",
  },
  {
    number: "4",
    icon: <Phone size={22} />,
    title: "Connect to Urgent Care",
    desc: "Call or book an appointment directly through our platform.",
  },
];

function HowItWorks() {
  return (
    <section className="uc-hiw">
      <div className="uc-hiw-inner">
        <span className="uc-hiw-label">Getting Started</span>
        <h2 className="uc-hiw-title">How It Works</h2>
        <div className="uc-hiw-steps">
          {STEPS.map((step) => (
            <div key={step.number} className="uc-hiw-step">
              <div className="uc-hiw-number">{step.number}</div>
              <div className="uc-hiw-step-icon">{step.icon}</div>
              <h3 className="uc-hiw-step-title">{step.title}</h3>
              <p className="uc-hiw-step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Emergency Disclaimer ──────────────────────────────────────────── */

function EmergencyDisclaimer() {
  return (
    <div className="uc-disclaimer">
      <div className="uc-disclaimer-inner">
        <TriangleAlert size={20} className="uc-disclaimer-icon" />
        <p className="uc-disclaimer-text">
          If you are experiencing a <strong>life-threatening emergency</strong>,
          please call <strong>911</strong> immediately. Urgent care is intended
          for non-emergency medical needs.
        </p>
      </div>
    </div>
  );
}

/* ── CTA Banner ────────────────────────────────────────────────────── */

function CTABanner() {
  return (
    <section className="uc-cta">
      <div className="uc-cta-inner">
        <h2 className="uc-cta-title">Ready to Get Care?</h2>
        <p className="uc-cta-desc">
          Find urgent care providers in your area and get the treatment you need
          today.
        </p>
        <div className="uc-cta-actions">
          <Link href="/find-a-provider?categoryId=1" className="uc-cta-btn-primary">
            Book Online <ArrowRight size={16} />
          </Link>
          <a href={`tel:${SITE.phoneRaw}`} className="uc-cta-btn-secondary">
            <Phone size={16} /> Call Now
          </a>
        </div>
      </div>
    </section>
  );
}
