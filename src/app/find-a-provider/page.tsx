import type { Metadata } from "next";
import { Suspense } from "react";
import { Spinner } from "@/components/shared/Spinner";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { FindAProviderContent } from "@/components/public/FindAProviderContent";
import "./page.css";

export const metadata: Metadata = {
  title: "Find a Provider",
  description:
    "Search and find trusted medical providers, attorneys, and service providers near you.",
};

export default function FindAProviderPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Find a Provider" },
        ]}
      />
      <Suspense
        fallback={
          <div className="fp-loading">
            <Spinner size="lg" />
          </div>
        }
      >
        <FindAProviderContent />
      </Suspense>
    </>
  );
}
