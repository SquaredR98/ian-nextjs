import type { Metadata } from "next";
import { Suspense } from "react";
import { Spinner } from "@/components/shared/Spinner";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { BlogIndexContent } from "@/components/public/BlogIndexContent";
import "./page.css";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read the latest articles about personal injury, recovery tips, and legal guidance.",
};

export default function BlogPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Blog" },
        ]}
      />
      <Suspense
        fallback={
          <div className="blog-loading">
            <Spinner size="lg" />
          </div>
        }
      >
        <BlogIndexContent />
      </Suspense>
    </>
  );
}
