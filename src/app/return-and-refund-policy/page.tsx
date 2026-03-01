import type { Metadata } from "next";
import { refundPolicyContent } from "@/lib/mock-data";
import { cmsApi } from "@/lib/api";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { CmsRenderer } from "@/components/shared/CmsRenderer";
import "./page.css";

export const metadata: Metadata = {
  title: "Return & Refund Policy",
  description:
    "Read the Injury Assistance Network return and refund policy.",
};

export default async function ReturnAndRefundPolicyPage() {
  const page = await cmsApi.getBySlug("return-refund-policy");
  const content = page?.content || refundPolicyContent;
  const title = page?.page_title || "Return & Refund Policy";

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Return & Refund Policy" },
        ]}
      />
      <div className="legal-page">
        <h1 className="legal-page-title">{title}</h1>
        <CmsRenderer content={content} />
      </div>
    </>
  );
}
