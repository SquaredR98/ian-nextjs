import type { Metadata } from "next";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { ProviderSignUpForm } from "@/components/public/ProviderSignUpForm";
import "./page.css";

export const metadata: Metadata = {
  title: "Provider Sign Up",
  description:
    "Join the Injury Assistance Network as a medical provider, attorney, or service provider.",
};

export default function ProviderSignUpPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Provider Sign Up" },
        ]}
      />
      <ProviderSignUpForm />
    </>
  );
}
