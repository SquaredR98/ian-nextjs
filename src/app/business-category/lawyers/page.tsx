import type { Metadata } from "next";
import { specialtiesApi, faqApi } from "@/lib/api";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { LawyersContent } from "@/components/public/LawyersPage";
import "./page.css";

export const metadata: Metadata = {
  title: "Law Firms & Attorneys",
  description:
    "Find experienced personal injury attorneys and law firms in your area.",
};

export default async function LawyersPage() {
  const [specRes, faqRes] = await Promise.all([
    specialtiesApi.getAll("2"),
    faqApi.getAll("2"),
  ]);
  const legalSpecs = specRes.data ?? [];
  const faqs = faqRes.data ?? [];

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Law Firms/Attorneys" },
        ]}
      />
      <LawyersContent specialties={legalSpecs} faqs={faqs} />
    </>
  );
}
