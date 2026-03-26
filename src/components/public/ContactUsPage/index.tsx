import Link from "next/link";
import { ContactForm } from "@/components/shared/ContactForm";
import { SITE } from "@/lib/utils/constants";
import { MapPin, Mail, Phone, ArrowRight } from "lucide-react";

export function ContactUsContent() {
  return (
    <div className="contact-page">
      {/* Hero Banner */}
      <div className="contact-hero">
        <div className="contact-hero-inner">
          <h1 className="contact-hero-title">Get in Touch</h1>
          <p className="contact-hero-subtitle">
            Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="contact-content">
        <div className="contact-layout">
          {/* Left: Form */}
          <div className="contact-left">
            <span className="contact-label">Send us a message</span>
            <p className="contact-description">
              Fill out the form below with your details and we&apos;ll get back to you shortly.
            </p>
            <ContactForm />
          </div>

          {/* Right: Info */}
          <div className="contact-right">
            <ContactWays />
            <ProviderCTA />
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactWays() {
  return (
    <div className="contact-ways">
      <h3 className="contact-ways-title">Ways to Connect</h3>
      <div className="contact-ways-list">
        <div className="contact-ways-item">
          <div className="contact-ways-icon-wrap">
            <MapPin className="contact-ways-icon" />
          </div>
          <div>
            <p className="contact-ways-item-label">Address</p>
            <span className="contact-ways-item-value">{SITE.address}</span>
          </div>
        </div>
        <div className="contact-ways-item">
          <div className="contact-ways-icon-wrap">
            <Mail className="contact-ways-icon" />
          </div>
          <div>
            <p className="contact-ways-item-label">Email</p>
            <a href={`mailto:${SITE.email}`} className="contact-ways-link">
              {SITE.email}
            </a>
          </div>
        </div>
        <div className="contact-ways-item">
          <div className="contact-ways-icon-wrap">
            <Phone className="contact-ways-icon" />
          </div>
          <div>
            <p className="contact-ways-item-label">Phone</p>
            <a href={`tel:${SITE.phoneRaw}`} className="contact-ways-link">
              {SITE.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProviderCTA() {
  return (
    <div className="contact-provider-cta">
      <h3 className="contact-provider-cta-title">Are you a Provider?</h3>
      <p className="contact-provider-cta-text">
        Get your business verified and listed to reach more customers. Sign up as a medical provider, attorney, or service provider today.
      </p>
      <Link href="/provider-sign-up" className="contact-provider-cta-btn shimmer">
        Provider Sign Up
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
