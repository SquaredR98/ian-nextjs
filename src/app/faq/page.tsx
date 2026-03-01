import type { Metadata } from "next";
import { Accordion } from "@/components/shared/Accordion";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { faqApi } from "@/lib/api";
import "./page.css";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Find answers to commonly asked questions about Injury Assistance Network.",
};

export default async function FAQPage() {
  const res = await faqApi.getAll("null");
  const items = res.data ?? [];

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "FAQ" },
        ]}
      />

      <section className="faq-hero">
        <div className="faq-hero-inner">
          <span className="faq-hero-label">Support</span>
          <h1 className="faq-hero-title">Frequently Asked Questions</h1>
          <p className="faq-hero-subtitle">
            Find answers to common questions about our services, providers,
            appointments, and how Injury Assistance Network works.
          </p>
        </div>
      </section>

      <div className="faq-page">
        <div className="faq-page-inner">
          <Accordion items={items} className="faq-accordion" />
        </div>
      </div>
    </>
  );
}
