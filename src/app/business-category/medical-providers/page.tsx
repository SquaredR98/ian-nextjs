import type { Metadata } from "next";
import { specialtiesApi, faqApi } from "@/lib/api";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { MedicalProvidersContent } from "@/components/public/MedicalProvidersPage";
import "./page.css";

export const metadata: Metadata = {
  title: "Medical Providers",
  description:
    "Find trusted medical providers for personal injury treatment including chiropractors, orthopedic surgeons, and more.",
};

export default async function MedicalProvidersPage() {
  const [specRes, faqRes] = await Promise.all([
    specialtiesApi.getGrouped("1"),
    faqApi.getAll("1"),
  ]);
  const groups = specRes.data ?? [];
  const faqs = faqRes.data ?? [];

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Medical Providers" },
        ]}
      />
      <MedicalProvidersContent groups={groups} faqs={faqs} />
    </>
  );
}
