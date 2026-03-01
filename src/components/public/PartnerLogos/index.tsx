import Link from "next/link";
import { ArrowRight, ShieldCheck, Users, TrendingUp } from "lucide-react";
import { FallbackImage } from "@/components/shared/FallbackImage";
import { mockPartnerLogos } from "@/lib/mock-data";
import "./styles.css";

export function PartnerLogos() {
  return (
    <section className="partner-section">
      <div className="partner-section-inner">
        <div className="partner-top">
          <PartnerInfo />
          <PartnerGrid />
        </div>
        <div className="partner-highlights">
          <Highlight
            icon={<ShieldCheck size={24} />}
            title="Verified Providers"
            desc="Every provider in our network is thoroughly vetted and verified."
          />
          <Highlight
            icon={<Users size={24} />}
            title="Direct Connections"
            desc="Connect with injury victims seeking your specific expertise."
          />
          <Highlight
            icon={<TrendingUp size={24} />}
            title="Grow Your Practice"
            desc="Increase visibility and attract more clients to your business."
          />
        </div>
      </div>
    </section>
  );
}

function PartnerInfo() {
  return (
    <div className="partner-info">
      <span className="partner-info-label">For Providers</span>
      <h2 className="partner-info-heading">
        Join Our Network of Top-Rated Personal Injury Service Providers
      </h2>
      <p className="partner-info-desc">
        Boost your visibility, connect directly with personal injury victims,
        and become part of a trusted, growing community of professionals.
      </p>
      <Link href="/provider-sign-up" className="partner-info-btn shimmer">
        Register as a Provider <ArrowRight size={16} />
      </Link>
    </div>
  );
}

function PartnerGrid() {
  return (
    <div className="partner-logos-grid">
      {mockPartnerLogos.map((logo) => (
        <div key={logo.name} className="partner-logo-card">
          <FallbackImage
            src={logo.image}
            alt={logo.name}
            width={160}
            height={60}
            className="partner-logo-img"
            fallbackType="provider"
            fallbackText={logo.name}
          />
        </div>
      ))}
    </div>
  );
}

function Highlight({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="partner-highlight">
      <div className="partner-highlight-icon">{icon}</div>
      <h3 className="partner-highlight-title">{title}</h3>
      <p className="partner-highlight-desc">{desc}</p>
    </div>
  );
}
