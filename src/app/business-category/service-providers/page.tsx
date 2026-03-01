import type { Metadata } from "next";
import { specialtiesApi, faqApi } from "@/lib/api";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { ServiceProvidersContent } from "@/components/public/ServiceProvidersPage";
import "./page.css";

export const metadata: Metadata = {
  title: "Service Providers",
  description:
    "Find trusted service providers for personal injury recovery including auto body shops, tow services, and more.",
};

export default async function ServiceProvidersPage() {
  const [specRes, faqRes] = await Promise.all([
    specialtiesApi.getGrouped("3"),
    faqApi.getAll("3"),
  ]);
  const groups = specRes.data ?? [];
  const faqs = faqRes.data ?? [];

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Service Providers" },
        ]}
      />
      <ServiceProvidersContent groups={groups} faqs={faqs} />
    </>
  );
}
