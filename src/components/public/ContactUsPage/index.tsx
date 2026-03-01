import Link from "next/link";
import { ContactForm } from "@/components/shared/ContactForm";
import { SITE } from "@/lib/utils/constants";
import { MapPin, Mail, Phone } from "lucide-react";

const PROVIDER_CARDS = [
  {
    title: "Medical Providers:",
    text: "Get your business verified and listed to reach more customers and grow consistently. Sign up for multiple locations by adjusting your order quantity and listing the locations in the order notes.",
    href: "/provider-sign-up",
  },
  {
    title: "Attorney / Law Firm:",
    text: "Lawyers are legal professionals who provide advice, represent clients, and handle legal matters. They specialize in various areas such as criminal law, civil litigation, corporate law, and more. Lawyers work in law firms, government agencies, and as solo practitioners.",
    href: "/provider-sign-up",
  },
] as const;

export function ContactUsContent() {
  return (
    <div className="contact-page">
      <div className="contact-layout">
        <ContactLeftColumn />
        <ContactRightColumn />
      </div>
    </div>
  );
}

function ContactLeftColumn() {
  return (
    <div className="contact-left">
      <span className="contact-label">Get in touch</span>
      <h1 className="contact-heading">Connect with us</h1>
      <p className="contact-description">
        Please fill out the form below with your contact details and message.
      </p>
      <ContactForm />
    </div>
  );
}

function ContactRightColumn() {
  return (
    <div className="contact-right">
      <ProviderCTA />
      <ContactWays />
    </div>
  );
}

function ProviderCTA() {
  return (
    <div className="contact-provider-cta">
      <h2 className="contact-provider-cta-title">
        Become an I.A.N. provider Today
      </h2>
      <div className="contact-provider-cards">
        {PROVIDER_CARDS.map((card) => (
          <div key={card.title} className="contact-provider-card">
            <p className="contact-provider-card-text">
              <strong>{card.title}</strong> {card.text}
            </p>
            <Link href={card.href} className="contact-provider-card-btn shimmer">
              SIGN UP
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactWays() {
  return (
    <div className="contact-ways">
      <h3 className="contact-ways-title">Ways to connect with us</h3>
      <div className="contact-ways-list">
        <div className="contact-ways-item">
          <MapPin className="contact-ways-icon" />
          <span>{SITE.address}</span>
        </div>
        <div className="contact-ways-item">
          <Mail className="contact-ways-icon" />
          <a href={`mailto:${SITE.email}`} className="contact-ways-link">
            {SITE.email}
          </a>
        </div>
        <div className="contact-ways-item">
          <Phone className="contact-ways-icon" />
          <a href={`tel:${SITE.phoneRaw}`} className="contact-ways-link">
            {SITE.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
