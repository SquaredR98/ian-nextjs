"use client";

import type { ReactNode } from "react";
import type { ProviderDetail, Provider } from "@/lib/types";
import { sanitizeHtml } from "@/lib/utils/sanitize";
import { GoogleReviews } from "@/components/shared/GoogleReviews";
import { PhotoGallery } from "@/components/shared/PhotoGallery";
import Link from "next/link";
import { AppointmentForm } from "@/components/shared/AppointmentForm";
import { ProviderCard } from "@/components/shared/ProviderCard";
import { EmblaCarousel, EmblaSlide } from "@/components/shared/EmblaCarousel";

/* ------------------------------------------------------------------ */
/*  Main content (left column)                                         */
/* ------------------------------------------------------------------ */

function ProviderProfileMainContent({
  provider,
  relatedProviders,
  children,
}: {
  provider: ProviderDetail;
  relatedProviders: Provider[];
  children?: ReactNode;
}) {
  return (
    <>
      <ProviderAbout provider={provider} />
      {children}
      <ProviderReviews provider={provider} />
      <ProviderVideo videoId={provider.youtube_video_id} />
      <ProviderGallery
        gallery={provider.gallery}
        businessName={provider.business_name}
      />
      <RelatedProviders providers={relatedProviders} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Sidebar (right column)                                             */
/* ------------------------------------------------------------------ */

function ProviderSidebar({ provider }: { provider: ProviderDetail }) {
  return (
    <>
      <AppointmentForm
        providerId={provider.id}
        location={`${provider.city}, ${provider.state}`}
        businessName={provider.business_name}
        className="provider-appointment-sidebar"
      />
      <BecomeProviderCTA />
    </>
  );
}

function BecomeProviderCTA() {
  return (
    <div className="provider-sidebar-cta">
      <h4 className="provider-sidebar-cta-title">
        Become an I.A.N. Provider Today
      </h4>
      <p className="provider-sidebar-cta-desc">
        Get your business verified and listed to reach more customers and grow
        consistently. Whether you are a medical provider, attorney, or service
        professional, I.A.N. connects you with people who need your help.
      </p>
      <Link href="/provider-sign-up" className="provider-sidebar-cta-btn">
        Sign Up Now
      </Link>
    </div>
  );
}

export { ProviderProfileMainContent as ProviderProfileContent };
export { ProviderSidebar };

/* ------------------------------------------------------------------ */
/*  Sub-component: About                                               */
/* ------------------------------------------------------------------ */

function ProviderAbout({ provider }: { provider: ProviderDetail }) {
  if (!provider.description) return null;

  return (
    <section className="provider-about card-section">
      <h4 className="provider-section-title">About</h4>
      <p
        className="provider-about-text"
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(provider.description.replace(/\n/g, "<br/>")),
        }}
      />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-component: ProviderReviews                                     */
/* ------------------------------------------------------------------ */

function ProviderReviews({ provider }: { provider: ProviderDetail }) {
  if (!provider.google_reviews?.reviews?.length) return null;

  return (
    <section className="provider-reviews card-section">
      <h4 className="provider-section-title">Google Reviews</h4>
      <GoogleReviews
        reviews={provider.google_reviews.reviews}
        overallRating={provider.google_reviews.rating}
        googleCid={provider.google_cid}
      />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-component: YouTube Video                                       */
/* ------------------------------------------------------------------ */

function ProviderVideo({ videoId }: { videoId: string }) {
  if (!videoId) return null;

  return (
    <section className="provider-video card-section">
      <h4 className="provider-section-title">Video</h4>
      <div className="provider-video-wrap">
        <iframe
          width="100%"
          height="350"
          src={`https://www.youtube.com/embed/${videoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="provider-video-iframe"
        />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-component: ProviderGallery                                     */
/* ------------------------------------------------------------------ */

function ProviderGallery({
  gallery,
  businessName,
}: {
  gallery: string[];
  businessName: string;
}) {
  if (!gallery?.length) return null;

  return (
    <section className="provider-gallery card-section">
      <h4 className="provider-section-title">Photo Gallery</h4>
      <PhotoGallery images={gallery} alt={businessName} />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-component: RelatedProviders                                    */
/* ------------------------------------------------------------------ */

function RelatedProviders({ providers }: { providers: Provider[] }) {
  if (!providers?.length) return null;

  return (
    <section className="provider-related card-section">
      <h4 className="provider-section-title">See More</h4>
      <EmblaCarousel loop>
        {providers.map((p) => (
          <EmblaSlide key={p.id}>
            <ProviderCard provider={p} />
          </EmblaSlide>
        ))}
      </EmblaCarousel>
    </section>
  );
}
