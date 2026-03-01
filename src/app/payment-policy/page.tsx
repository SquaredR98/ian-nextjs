import type { Metadata } from "next";
import { paymentPolicyContent } from "@/lib/mock-data";
import { cmsApi } from "@/lib/api";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { CmsRenderer } from "@/components/shared/CmsRenderer";
import "./page.css";

export const metadata: Metadata = {
  title: "Payment Policy",
  description: "Read the Injury Assistance Network payment policy.",
};

export default async function PaymentPolicyPage() {
  const page = await cmsApi.getBySlug("payment-policy");
  const content = page?.content || paymentPolicyContent;
  const title = page?.page_title || "Payment Policy";

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Payment Policy" },
        ]}
      />
      <div className="legal-page">
        <h1 className="legal-page-title">{title}</h1>
        <CmsRenderer content={content} />
      </div>
    </>
  );
}
