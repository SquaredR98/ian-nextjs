import type { Metadata } from "next";
import { privacyPolicyContent } from "@/lib/mock-data";
import { cmsApi } from "@/lib/api";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { CmsRenderer } from "@/components/shared/CmsRenderer";
import "./page.css";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read the Injury Assistance Network privacy policy.",
};

export default async function PrivacyPolicyPage() {
  const page = await cmsApi.getBySlug("privacy-policy");
  const content = page?.content || privacyPolicyContent;
  const title = page?.page_title || "Privacy Policy";

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy" },
        ]}
      />
      <div className="legal-page">
        <h1 className="legal-page-title">{title}</h1>
        <CmsRenderer content={content} />
      </div>
    </>
  );
}
