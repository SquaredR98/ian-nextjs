import Link from "next/link";
import "./styles.css";
import { cn } from "@/lib/utils/cn";

interface ProviderSignupCTAProps {
  className?: string;
}

export function ProviderSignupCTA({ className }: ProviderSignupCTAProps) {
  return (
    <div className={cn("provider-cta", className)}>
      <div className="provider-cta-content">
        <h3 className="provider-cta-title">
          Are you a healthcare provider or attorney?
        </h3>
        <p className="provider-cta-text">
          Join the Injury Assistance Network and connect with patients who need
          your services. Get listed today and grow your practice.
        </p>
        <Link href="/provider-sign-up" className="provider-cta-btn shimmer">
          Sign Up as a Provider
        </Link>
      </div>
    </div>
  );
}
