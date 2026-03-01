import type { Metadata } from "next";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { ContactUsContent } from "@/components/public/ContactUsPage";
import "./page.css";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Injury Assistance Network. We are here to help.",
};

export default function ContactUsPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Contact Us" },
        ]}
      />
      <ContactUsContent />
    </>
  );
}
