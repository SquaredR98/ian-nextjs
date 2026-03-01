import type { Metadata } from "next";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { UrgentCareContent } from "@/components/public/UrgentCarePage";
import "./page.css";

export const metadata: Metadata = {
  title: "Urgent Care",
  description:
    "Find urgent care services for personal injury victims. Open extended hours.",
};

export default function UrgentCarePage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Urgent Care" },
        ]}
      />
      <UrgentCareContent />
    </>
  );
}
