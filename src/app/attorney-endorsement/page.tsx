import type { Metadata } from "next";
import { EndorsementCard } from "@/components/shared/EndorsementCard";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { endorsementsApi } from "@/lib/api";
import "./page.css";

export const metadata: Metadata = {
  title: "Attorney Endorsements",
  description:
    "See endorsements from trusted attorneys and law firms in our network.",
};

export const revalidate = 604800; // 7 days ISR — on-demand revalidation handles freshness

export default async function AttorneyEndorsementPage() {
  const res = await endorsementsApi.getAll();
  const endorsements = res.data ?? [];

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Attorney Endorsements" },
        ]}
      />
      <section className="endorsement-hero">
        <div className="endorsement-hero-inner">
          <span className="endorsement-hero-label">Trusted Voices</span>
          <h1 className="endorsement-hero-title">Attorney Endorsements</h1>
          <p className="endorsement-hero-subtitle">
            Hear from attorneys and law firms who trust and recommend the Injury
            Assistance Network to their clients.
          </p>
        </div>
      </section>
      <div className="endorsement-page">
        <div className="endorsement-list">
          {endorsements.map((endorsement) => (
            <EndorsementCard key={endorsement.id} endorsement={endorsement} />
          ))}
        </div>
      </div>
    </>
  );
}
