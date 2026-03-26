import type { Metadata } from "next";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { teamApi } from "@/lib/api";
import { TeamCard } from "@/components/public/TeamCard";
import "./page.css";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the team behind Injury Assistance Network.",
};

export const revalidate = 604800; // 7 days ISR — on-demand revalidation handles freshness

export default async function OurTeamPage() {
  const { data: members } = await teamApi.getAll();

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Our Team" },
        ]}
      />
      <section className="team-hero">
        <span className="team-hero-label">Our Team</span>
        <h1 className="team-hero-heading">
          Meet the People Behind I.A.N.
        </h1>
        <p className="team-hero-desc">
          Our dedicated team of professionals is committed to connecting
          injury victims with the trusted providers they need for recovery.
        </p>
      </section>
      <div className="team-page">
        {members.length > 0 ? (
          members.map((member, i) => (
            <TeamCard key={i} member={member} />
          ))
        ) : (
          <p className="text-center text-muted-foreground py-10">No team members found.</p>
        )}
      </div>
    </>
  );
}
