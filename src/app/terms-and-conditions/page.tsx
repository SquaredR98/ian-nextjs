import type { Metadata } from "next";
import { termsContent } from "@/lib/mock-data";
import { cmsApi } from "@/lib/api";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { CmsRenderer } from "@/components/shared/CmsRenderer";
import "./page.css";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Read the Injury Assistance Network terms and conditions.",
};

export default async function TermsAndConditionsPage() {
  const page = await cmsApi.getBySlug("terms-conditions");
  const content = page?.content || termsContent;
  const title = page?.page_title || "Terms & Conditions";

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Terms & Conditions" },
        ]}
      />
      <div className="legal-page">
        <h1 className="legal-page-title">{title}</h1>
        <CmsRenderer content={content} />
      </div>
    </>
  );
}
