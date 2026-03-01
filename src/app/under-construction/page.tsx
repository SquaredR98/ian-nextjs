import type { Metadata } from "next";
import Link from "next/link";
import "./page.css";

export const metadata: Metadata = {
  title: "Under Construction",
  description: "This page is currently under construction.",
};

export default function UnderConstructionPage() {
  return (
    <div className="under-construction-page">
      <div className="under-construction-content">
        <h1 className="under-construction-title">Under Construction</h1>
        <p className="under-construction-text">
          We are working hard to bring you something great. This page is
          currently under construction and will be available soon.
        </p>
        <Link href="/" className="under-construction-btn">
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}
