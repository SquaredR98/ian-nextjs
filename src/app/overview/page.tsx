import type { Metadata } from "next";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { OverviewContent } from "@/components/public/OverviewPage";
import "./page.css";

export const metadata: Metadata = {
  title: "Overview",
  description:
    "Learn about Injury Assistance Network, our services, and how we help personal injury victims.",
};

export default function OverviewPage() {
  return (
    <div className="overview-page">
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Overview" }]}
      />
      <OverviewContent />
    </div>
  );
}
