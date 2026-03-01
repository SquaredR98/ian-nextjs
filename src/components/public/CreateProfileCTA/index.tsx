import Link from "next/link";
import { ArrowRight } from "lucide-react";
import "./styles.css";

export function CreateProfileCTA() {
  return (
    <section className="cta-profile">
      <div className="cta-profile-bg" />
      <div className="cta-profile-inner">
        <span className="cta-profile-label">For Users</span>
        <h2 className="cta-profile-title">
          Create Your Free Account Today
        </h2>
        <div className="cta-profile-grid">
          <div className="cta-profile-video">
            <iframe
              src="https://www.youtube.com/embed/hAmxZIdqE9M?rel=0&controls=0&showinfo=0"
              title="Injury Assistance Network: Your Lifeline After an Accident"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="cta-profile-info">
            <p className="cta-profile-desc-bold">
              Injured in an accident? The Injury Assistance Network connects you
              with trusted medical providers, attorneys, and service
              professionals — all in one place.
            </p>
            <p className="cta-profile-desc">
              Create your free account to find verified specialists near you,
              book appointments, and get the personalized care you deserve. From
              your first consultation to full recovery, we&apos;re with you
              every step of the way.
            </p>
            <div className="cta-profile-actions">
              <a
                href="https://user.injuryassistancenetwork.com"
                className="cta-profile-btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sign Up Free <ArrowRight size={16} />
              </a>
              <Link href="/contact-us" className="cta-profile-btn-secondary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
